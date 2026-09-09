<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let villas = []
  let districtRollup = []
  let tempBreakdown = []
  let hovered = null

  // approximate bounding boxes matching the illustrative district shapes below
  const districtBox = {
    'Kulon Progo':  { x0: 115, x1: 250, y0: 185, y1: 365 },
    'Sleman':       { x0: 300, x1: 495, y0: 60,  y1: 185 },
    'Kota Jogja':   { x0: 398, x1: 452, y0: 212, y1: 246 },
    'Bantul':       { x0: 275, x1: 475, y0: 220, y1: 385 },
    'Gunungkidul':  { x0: 515, x1: 725, y0: 125, y1: 415 },
  }

  const tempColor = { Hot: '#EF4444', Warm: '#F59E0B', Cold: '#3B82F6' }
  const tempBg = { Hot: 'bg-rose-50 text-rose-700', Warm: 'bg-amber-50 text-amber-700', Cold: 'bg-sky-50 text-sky-700' }
  const tempDotClass = { Hot: 'bg-rose-500', Warm: 'bg-amber-500', Cold: 'bg-sky-500' }

  // deterministic pseudo-random position from villa id, so dots don't jump around on refresh
  function hashPos(id, box) {
    let h = 0
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
    const fx = (h % 1000) / 1000
    const fy = ((h >> 10) % 1000) / 1000
    const pad = 0.12
    const x = box.x0 + (box.x1 - box.x0) * (pad + fx * (1 - 2 * pad))
    const y = box.y0 + (box.y1 - box.y0) * (pad + fy * (1 - 2 * pad))
    return { x, y }
  }

  onMount(async () => {
    const [{ data: v, error: e1 }, { data: touch, error: e2 }, { data: dr, error: e3 }, { data: tb, error: e4 }] = await Promise.all([
      supabase.from('villas').select('id, name, district, temperature, annual_value_rp'),
      supabase.from('villa_touch').select('id, days_since_touch'),
      supabase.from('district_rollup').select('*'),
      supabase.from('temperature_breakdown').select('*'),
    ])
    if (e1 || e2 || e3 || e4) { console.error(e1 || e2 || e3 || e4); return }

    const touchMap = {}
    touch.forEach(t => { touchMap[t.id] = t.days_since_touch })

    villas = v
      .filter(villa => districtBox[villa.district])
      .map(villa => ({
        ...villa,
        days_since_touch: touchMap[villa.id],
        pos: hashPos(villa.id, districtBox[villa.district]),
      }))

    districtRollup = dr
    tempBreakdown = tb
  })

  function fmtRp(n) {
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1) + 'M'
    return 'Rp ' + n
  }

  $: totalVillas = villas.length
  $: totalValue = villas.reduce((sum, v) => sum + (v.annual_value_rp || 0), 0)
  $: districtCount = (name) => districtRollup.find(d => d.district === name)?.villa_count ?? 0
</script>

{#if villas.length}
<section class="w-full bg-surface-container-lowest rounded-lg overflow-hidden">
  <div class="px-space-lg py-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-sm">
      <div class="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
      <h2 class="font-headline-sm text-headline-sm text-on-surface">Geographic Acquisition Density</h2>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12">
    <!-- Map column -->
    <div class="lg:col-span-8 relative bg-surface-container-low/40 p-space-base flex flex-col justify-between min-h-[460px]">

      <!-- Legend -->
      <div class="absolute top-space-base left-space-base z-10 bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded shadow-sm flex flex-col gap-space-xs">
        <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Acquisition Status</span>
        <div class="flex items-center gap-space-md pt-space-2xs">
          {#each tempBreakdown as t}
            <div class="flex items-center gap-space-xs">
              <span class="w-2.5 h-2.5 rounded-full {tempDotClass[t.temperature]}"></span>
              <span class="font-caption text-caption text-on-surface">{t.temperature} ({t.villa_count})</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Hover tooltip -->
      {#if hovered}
        <div class="absolute top-space-base right-space-base z-10 bg-surface-container-lowest p-space-sm rounded shadow-sm flex items-center gap-space-md">
          <div class="w-2 h-2 rounded-full" style="background:{tempColor[hovered.temperature]}"></div>
          <div class="flex flex-col">
            <span class="font-body-compact-medium text-body-compact-medium text-on-surface">{hovered.name}</span>
            <span class="font-caption text-caption text-on-surface-variant font-code-mono">
              {hovered.district} • Touch: {hovered.days_since_touch}d ago • {fmtRp(hovered.annual_value_rp || 0)}
            </span>
          </div>
          <span class="px-space-xs py-space-2xs {tempBg[hovered.temperature]} font-table-header text-table-header rounded uppercase">{hovered.temperature}</span>
        </div>
      {/if}

      <div class="relative w-full h-full flex items-center justify-center pt-space-xl pb-space-sm">
        <svg class="w-full max-h-[390px] select-none" viewBox="0 0 840 480">
          <!-- District shapes (illustrative, fixed) -->
          <path d="M120 180 L220 160 L270 210 L250 330 L180 390 L130 360 L100 270 Z" fill="#EEF2F6"></path>
          <text class="font-table-header text-[11px] fill-secondary font-semibold uppercase tracking-wider" x="140" y="275">Kulon Progo</text>
          <text class="font-code-mono text-[10px] fill-outline" x="140" y="292">{districtCount('Kulon Progo')} villas</text>

          <path d="M290 60 L440 40 L520 90 L480 200 L390 200 L270 200 L290 120 Z" fill="#E6F4F1"></path>
          <text class="font-table-header text-[12px] fill-primary font-bold uppercase tracking-wider" x="320" y="115">Sleman</text>
          <text class="font-code-mono text-[10px] fill-on-primary-container" x="320" y="132">{districtCount('Sleman')} villas</text>

          <polygon points="390,205 455,205 460,250 395,250" fill="#FDEEE9"></polygon>
          <text class="font-caption-bold text-[9px] fill-rose-900 font-bold uppercase tracking-tight" text-anchor="middle" x="425" y="230">Kota Jogja</text>

          <path d="M270 210 L385 210 L465 210 L470 255 L500 280 L480 370 L380 400 L250 330 Z" fill="#F1F3F5"></path>
          <text class="font-table-header text-[11px] fill-secondary font-semibold uppercase tracking-wider" x="300" y="345">Bantul</text>
          <text class="font-code-mono text-[10px] fill-outline" x="300" y="361">{districtCount('Bantul')} villas</text>

          <path d="M525 95 L680 150 L750 260 L730 410 L590 440 L490 370 L510 270 L485 200 Z" fill="#F5F6F7"></path>
          <text class="font-table-header text-[11px] fill-secondary font-semibold uppercase tracking-wider" x="590" y="330">Gunungkidul</text>
          <text class="font-code-mono text-[10px] fill-outline" x="590" y="346">{districtCount('Gunungkidul')} villas</text>

          <!-- Live villa dots -->
          {#each villas as v}
            <circle
              cx={v.pos.x} cy={v.pos.y} r={hovered === v ? 7 : 5}
              fill={tempColor[v.temperature]} stroke="#FFFFFF" stroke-width="1.5"
              class="cursor-pointer transition-all"
              role="button" tabindex="0"
              on:mouseenter={() => hovered = v}
              on:mouseleave={() => hovered = null}
            ></circle>
          {/each}
        </svg>
      </div>

      <div class="flex items-center justify-between font-code-mono text-code-mono text-outline pt-space-xs">
        <span>REGION: DIY (Yogyakarta) — -7.7956° S, 110.3695° E</span>
        <span>{totalVillas} villas plotted</span>
      </div>
    </div>

    <!-- Breakdown panel -->
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
  </div>
</section>
{/if}