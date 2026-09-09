<script>
  import { onMount, onDestroy } from 'svelte'
  import { supabase } from './supabase.js'
  import 'leaflet/dist/leaflet.css'

  let mapContainer
  let map
  let villas = []
  let touchMap = {}
  let tempBreakdown = []

  const tempColor = { Hot: '#EF4444', Warm: '#F59E0B', Cold: '#3B82F6' }
  const tempDotClass = { Hot: 'bg-rose-500', Warm: 'bg-amber-500', Cold: 'bg-sky-500' }

  function fmtRp(n) {
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1) + 'M'
    return 'Rp ' + n
  }

  onMount(async () => {
    const L = (await import('leaflet')).default

    map = L.map(mapContainer, {
      center: [-7.7956, 110.3695], // Yogyakarta region center
      zoom: 10,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    const [{ data: v, error: e1 }, { data: touch, error: e2 }, { data: tb, error: e3 }] = await Promise.all([
      supabase.from('villas').select('id, name, district, temperature, annual_value_rp, lat, long'),
      supabase.from('villa_touch').select('id, days_since_touch'),
      supabase.from('temperature_breakdown').select('*'),
    ])
    if (e1 || e2 || e3) { console.error(e1 || e2 || e3); return }

    touch.forEach(t => { touchMap[t.id] = t.days_since_touch })
    tempBreakdown = tb
    villas = v.filter(villa => villa.lat && villa.long)

    const markerBounds = []

    villas.forEach(villa => {
      const marker = L.circleMarker([villa.lat, villa.long], {
        radius: 7,
        fillColor: tempColor[villa.temperature] || '#999',
        color: '#fff',
        weight: 1.5,
        fillOpacity: 0.9,
      }).addTo(map)

      marker.bindPopup(`
        <strong>${villa.name}</strong><br/>
        ${villa.district} • ${villa.temperature}<br/>
        Touch: ${touchMap[villa.id] ?? '-'}d ago<br/>
        ${fmtRp(villa.annual_value_rp || 0)}
      `)

      markerBounds.push([villa.lat, villa.long])
    })

     if (markerBounds.length) {
      const avgLat = markerBounds.reduce((sum, p) => sum + p[0], 0) / markerBounds.length
      const avgLng = markerBounds.reduce((sum, p) => sum + p[1], 0) / markerBounds.length
      map.setView([avgLat, avgLng], 11)
    }
  })

  onDestroy(() => {
    if (map) map.remove()
  })

  $: totalVillas = villas.length
  $: totalValue = villas.reduce((sum, v) => sum + (v.annual_value_rp || 0), 0)
</script>

<section class="w-full bg-surface-container-lowest rounded-lg overflow-hidden">
  <div class="px-space-lg py-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-sm">
      <div class="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
      <h2 class="font-headline-sm text-headline-sm text-on-surface">Geographic Acquisition Density</h2>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12">
    <div class="lg:col-span-8 relative min-h-[460px]">
      <div bind:this={mapContainer} class="w-full h-full min-h-[460px]"></div>
    </div>

    {#if tempBreakdown.length}
    <div class="lg:col-span-4 bg-surface-container-lowest p-space-lg flex flex-col justify-between">
      <div class="flex flex-col gap-space-md">
        <div class="flex flex-col pb-space-md">
          <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Total Tracked Pipeline</span>
          <div class="flex items-baseline justify-between mt-space-2xs">
            <span class="font-metric-display text-metric-display text-on-surface font-semibold">{totalVillas} Villas</span>
            <span class="font-code-mono text-code-mono text-primary font-semibold">{fmtRp(totalValue)} GMV</span>
          </div>
          <div class="w-full h-2.5 bg-surface-container-high rounded-full flex overflow-hidden mt-space-sm">
            {#each tempBreakdown as t}
              <div class="h-full {tempDotClass[t.temperature]}" style="width: {t.pct_of_total}%" title="{t.temperature}: {t.pct_of_total}%"></div>
            {/each}
          </div>
          <div class="flex justify-between font-caption text-caption text-outline mt-space-2xs">
            {#each tempBreakdown as t}
              <span>{t.temperature} {t.pct_of_total}%</span>
            {/each}
          </div>
        </div>

        {#each tempBreakdown as t}
          <div class="p-space-sm rounded bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-space-xs">
                <span class="w-2 h-2 rounded-full {tempDotClass[t.temperature]}"></span>
                <span class="font-body-compact-medium text-body-compact-medium text-on-surface">{t.temperature} Status</span>
              </div>
              <span class="font-code-mono text-code-mono font-semibold">{t.villa_count} Villas</span>
            </div>
            <div class="mt-space-xs flex items-center justify-between text-on-surface-variant font-caption text-caption">
              <span>Avg touch: {t.avg_days_since_touch} days</span>
              <span class="font-code-mono">{fmtRp(t.total_annual_value_rp)}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    {/if}
  </div>
</section>