<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let funnel = []
  let matrix = []
  let config = {}

  const barColors = ['bg-on-surface-variant', 'bg-primary', 'bg-primary-container', 'bg-primary-container']

  onMount(async () => {
    const [{ data: f, error: e1 }, { data: m, error: e2 }, { data: c, error: e3 }] = await Promise.all([
      supabase.from('funnel_dropoff').select('*').order('ord', { ascending: true }),
      supabase.from('touch_velocity_matrix').select('*'),
      supabase.from('config').select('*'),
    ])
    if (e1) console.error(e1); else funnel = f
    if (e2) console.error(e2); else matrix = m
    if (e3) console.error(e3)
    else {
      const map = {}
      c.forEach(row => { map[row.key] = Number(row.value) })
      config = map
    }
  })

  function cellClass(value, threshold, colValues) {
    if (value === null || value === undefined) return 'bg-surface-container-low text-on-surface'
    if (value > threshold) return 'bg-rose-100 text-rose-800 font-bold'
    const min = Math.min(...colValues.filter(v => v !== null && v !== undefined))
    if (value === min) return 'bg-emerald-50 text-primary font-bold'
    return 'bg-surface-container-low text-on-surface'
  }

  $: anomalyCount = matrix.filter(r => r.is_anomaly).length
  $: hotValues = matrix.map(r => r.hot_avg_days)
  $: warmValues = matrix.map(r => r.warm_avg_days)
  $: coldValues = matrix.map(r => r.cold_avg_days)
  $: netPct = funnel.length ? funnel[funnel.length - 1].pct_of_outreach : null
</script>

{#if funnel.length}
<div class="bg-surface-container-lowest rounded-lg p-space-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between pb-space-xs">
      <h3 class="font-headline-sm text-headline-sm text-on-surface">Funnel Drop-Off</h3>
      {#if netPct !== null}
        <span class="font-code-mono text-code-mono text-outline">{netPct}% NET</span>
      {/if}
    </div>

    <div class="flex flex-col gap-space-xs my-space-sm">
      {#each funnel as stage, i}
        <div class="flex items-center justify-between text-body-compact font-body-compact {i > 0 ? 'mt-space-2xs' : ''}">
          <span class="text-on-surface-variant">{stage.stage}</span>
          <span class="font-code-mono text-code-mono font-semibold">{stage.villa_count} ({stage.pct_of_outreach}%)</span>
        </div>
        <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div class="{barColors[i] || 'bg-primary-container'} h-full" style="width: {stage.pct_of_outreach}%"></div>
        </div>
      {/each}
    </div>
  </div>

  {#if matrix.length}
  <div class="pt-space-sm">
    <div class="flex items-center justify-between mb-space-xs">
      <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Touch Velocity Matrix</span>
      {#if anomalyCount > 0}
        <span class="font-caption text-caption text-rose-600 font-semibold">{anomalyCount} Anomaly flagged</span>
      {/if}
    </div>
    <div class="grid grid-cols-4 gap-space-2xs text-center font-code-mono text-[10px]">
      <span class="text-left text-outline py-space-2xs">PIC</span>
      <span class="bg-rose-50 text-rose-800 rounded py-space-2xs">HOT</span>
      <span class="bg-amber-50 text-amber-800 rounded py-space-2xs">WARM</span>
      <span class="bg-sky-50 text-sky-800 rounded py-space-2xs">COLD</span>

      {#each matrix as row}
        <span class="text-left font-body-compact text-[11px] text-on-surface truncate">{row.staff_name}</span>
        <span class="{cellClass(row.hot_avg_days, config.anomaly_threshold_hot, hotValues)} rounded py-space-2xs">
          {row.hot_avg_days !== null ? row.hot_avg_days + 'd' : '-'}
        </span>
        <span class="{cellClass(row.warm_avg_days, config.anomaly_threshold_warm, warmValues)} rounded py-space-2xs">
          {row.warm_avg_days !== null ? row.warm_avg_days + 'd' : '-'}
        </span>
        <span class="{cellClass(row.cold_avg_days, config.anomaly_threshold_cold, coldValues)} rounded py-space-2xs">
          {row.cold_avg_days !== null ? row.cold_avg_days + 'd' : '-'}
        </span>
      {/each}
    </div>
  </div>
  {/if}
</div>
{/if}