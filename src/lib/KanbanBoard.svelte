<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let cards = []
  let config = {}
  let searchTerm = ''

  const columns = [
    { key: 'Hot', label: 'Hot Status', dot: 'bg-rose-500', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700', strip: 'bg-rose-500', tag: 'Priority 1' },
    { key: 'Warm', label: 'Warm Status', dot: 'bg-amber-500', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', strip: 'bg-amber-500', tag: 'Active Nurture' },
    { key: 'Cold', label: 'Cold Status', dot: 'bg-sky-500', badgeBg: 'bg-sky-50', badgeText: 'text-sky-700', strip: 'bg-sky-500', tag: 'Requires Intervention' },
  ]

  const thresholdKey = { Hot: 'anomaly_threshold_hot', Warm: 'anomaly_threshold_warm', Cold: 'anomaly_threshold_cold' }

  function initials(name) {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  function fmtRp(n) {
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1) + 'M'
    return 'Rp ' + n
  }

  onMount(async () => {
    const [
      { data: villas, error: e1 },
      { data: staff, error: e2 },
      { data: touch, error: e3 },
      { data: logs, error: e4 },
      { data: cfg, error: e5 },
    ] = await Promise.all([
      supabase.from('villas').select('id, name, district, temperature, pic, annual_value_rp'),
      supabase.from('staff').select('id, name'),
      supabase.from('villa_touch').select('id, days_since_touch, last_touch_date'),
      supabase.from('followup_log').select('villa_id'),
      supabase.from('config').select('*'),
    ])
    if (e1 || e2 || e3 || e4 || e5) { console.error(e1 || e2 || e3 || e4 || e5); return }

    const staffMap = {}
    staff.forEach(s => { staffMap[s.id] = s.name })

    const touchMap = {}
    touch.forEach(t => { touchMap[t.id] = t })

    const countMap = {}
    logs.forEach(l => { countMap[l.villa_id] = (countMap[l.villa_id] || 0) + 1 })

    const cfgMap = {}
    cfg.forEach(row => { cfgMap[row.key] = Number(row.value) })
    config = cfgMap

    cards = villas.map(v => ({
      ...v,
      picName: staffMap[v.pic] || 'Unassigned',
      touchCount: countMap[v.id] || 0,
      daysSinceTouch: touchMap[v.id]?.days_since_touch ?? null,
    }))
  })

  $: filteredCards = cards.filter(c =>
    !searchTerm ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.picName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function cardsForColumn(key) {
    return filteredCards
      .filter(c => c.temperature === key)
      .sort((a, b) => (b.daysSinceTouch ?? 0) - (a.daysSinceTouch ?? 0))
  }
</script>

{#if cards.length}
<section class="w-full flex flex-col gap-space-md" id="pipeline-kanban">
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-wrap items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md">
      <h2 class="font-headline-sm text-headline-sm text-on-surface">Active Villa Pipeline by Status</h2>
      <div class="relative hidden sm:flex items-center">
        <span class="material-symbols-outlined text-outline absolute left-2 text-[16px]">filter_list</span>
        <input
          bind:value={searchTerm}
          class="pl-7 pr-space-sm py-1 bg-surface-container-low rounded font-body-compact text-body-compact text-on-surface placeholder:text-outline focus:outline-none"
          placeholder="Quick filter cards..."
          type="text"
        />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
    {#each columns as col}
      <div class="flex flex-col gap-space-sm bg-surface-container-low/50 rounded-lg p-space-sm">
        <div class="h-1 {col.strip} rounded-full w-full"></div>
        <div class="flex items-center justify-between px-space-2xs py-space-2xs">
          <div class="flex items-center gap-space-xs">
            <span class="w-2.5 h-2.5 rounded-full {col.dot}"></span>
            <span class="font-body-compact-medium text-body-compact-medium font-semibold text-on-surface">{col.label}</span>
            <span class="px-space-xs py-space-2xs {col.badgeBg} {col.badgeText} font-code-mono text-[11px] rounded font-bold">{cardsForColumn(col.key).length}</span>
          </div>
          <span class="font-caption text-caption text-outline">{col.tag}</span>
        </div>

        {#each cardsForColumn(col.key) as card}
          {@const threshold = config[thresholdKey[col.key]]}
          {@const overdue = threshold && card.daysSinceTouch !== null && card.daysSinceTouch > threshold}
          <div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface-container-lowest/90 transition-all cursor-pointer flex flex-col gap-space-xs">
            <div class="flex items-start justify-between">
              <span class="font-body-compact-medium text-body-compact-medium text-on-surface font-semibold">{card.name}</span>
              <span class="px-space-xs py-space-2xs {col.badgeBg} {col.badgeText} font-table-header text-[10px] rounded uppercase">{card.temperature}</span>
            </div>
            <div class="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
              <span class="material-symbols-outlined text-[14px]">location_on</span>
              <span>{card.district}</span>
              <span>•</span>
              <span class="font-code-mono">{fmtRp(card.annual_value_rp || 0)} / yr</span>
            </div>
            <div class="pt-space-xs flex items-center justify-between font-caption text-caption">
              <div class="flex items-center gap-space-xs">
                <div class="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-code-mono text-[10px] flex items-center justify-center font-bold">{initials(card.picName)}</div>
                <span class="text-on-surface font-medium">{card.picName}</span>
              </div>
              <span class="font-code-mono text-outline">{card.touchCount} Touches</span>
            </div>
            <div class="pt-space-2xs bg-surface-container-low p-space-xs rounded flex items-center justify-between text-body-compact font-body-compact">
              <span class="text-outline text-[11px]">Last touch</span>
              {#if card.daysSinceTouch === null}
                <span class="text-outline font-caption-bold text-caption-bold font-semibold">No activity yet</span>
              {:else if overdue}
                <span class="text-rose-600 font-caption-bold text-caption-bold font-semibold">{card.daysSinceTouch}d ago — overdue</span>
              {:else}
                <span class="text-on-surface font-caption-bold text-caption-bold font-semibold">{card.daysSinceTouch}d ago</span>
              {/if}
            </div>
          </div>
        {:else}
          <p class="text-caption text-outline text-center py-space-md">No villas match</p>
        {/each}
      </div>
    {/each}
  </div>
</section>
{/if}