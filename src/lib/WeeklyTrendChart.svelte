<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let weeks = []
  let benchmark = null
  let conversion = null

  onMount(async () => {
    const [{ data: trend, error: e1 }, { data: kpi, error: e2 }, { data: conv, error: e3 }] = await Promise.all([
      supabase.from('weekly_trend').select('*').order('week_start', { ascending: true }),
      supabase.from('kpi_scorecards').select('weekly_velocity_benchmark').single(),
      supabase.from('conversion_metrics').select('*').single(),
    ])
    if (e1) console.error(e1)
    else weeks = trend
    if (e2) console.error(e2)
    else benchmark = kpi.weekly_velocity_benchmark
    if (e3) console.error(e3)
    else conversion = conv
  })

  function formatDate(d) {
    const date = new Date(d)
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  // build chart geometry from real data — no hardcoded points
  function buildChart(weeks, benchmark) {
    if (!weeks.length) return null
    const counts = weeks.map(w => w.villas_acquired)
    const maxVal = Math.max(...counts, benchmark || 0, 1) * 1.25
    const x0 = 10, x1 = 315, y0 = 140, y1 = 25
    const step = (x1 - x0) / (weeks.length - 1)

    const points = weeks.map((w, i) => {
      const x = x0 + i * step
      const y = y0 - (w.villas_acquired / maxVal) * (y0 - y1)
      return { x, y, value: w.villas_acquired, label: formatDate(w.week_start) }
    })

    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ')
    const areaPoints = `${polylinePoints} ${x1},${y0} ${x0},${y0}`
    const benchmarkY = benchmark ? y0 - (benchmark / maxVal) * (y0 - y1) : null

    const peak = points.reduce((max, p) => (p.value > max.value ? p : max), points[0])

    return { points, polylinePoints, areaPoints, benchmarkY, peak }
  }

  $: chart = buildChart(weeks, benchmark)
</script>

{#if chart}
<div class="bg-surface-container-lowest rounded-lg p-space-lg flex flex-col justify-between">
  <div class="flex items-center justify-between pb-space-sm">
    <div class="flex flex-col">
      <h3 class="font-headline-sm text-headline-sm text-on-surface">Weekly Acquisition Run</h3>
      <span class="font-caption text-caption text-outline">8-week trend</span>
    </div>
    <span class="px-space-xs py-space-2xs bg-surface-container-low text-primary font-code-mono text-code-mono rounded font-semibold">
      Peak: {chart.peak.label} ({chart.peak.value})
    </span>
  </div>

  <div class="py-space-md">
    <svg class="w-full h-40 overflow-visible" viewBox="0 0 320 160">
      <line stroke="#F3F4F6" stroke-width="1" x1="0" x2="320" y1="30" y2="30"></line>
      <line stroke="#F3F4F6" stroke-width="1" x1="0" x2="320" y1="70" y2="70"></line>
      <line stroke="#F3F4F6" stroke-width="1" x1="0" x2="320" y1="110" y2="110"></line>
      <line stroke="#E5E7EB" stroke-width="1" x1="0" x2="320" y1="140" y2="140"></line>

      {#if chart.benchmarkY !== null}
        <line stroke="#00C7A6" stroke-dasharray="4 4" stroke-opacity="0.5" stroke-width="1" x1="0" x2="320" y1={chart.benchmarkY} y2={chart.benchmarkY}></line>
        <text class="font-code-mono text-[9px] fill-primary" text-anchor="end" x="315" y={chart.benchmarkY - 4}>Benchmark: {benchmark}</text>
      {/if}

      <defs>
        <linearGradient id="chart-teal-grad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#00C7A6" stop-opacity="0.25"></stop>
          <stop offset="100%" stop-color="#00C7A6" stop-opacity="0.0"></stop>
        </linearGradient>
      </defs>

      <polygon fill="url(#chart-teal-grad)" points={chart.areaPoints}></polygon>
      <polyline fill="none" points={chart.polylinePoints} stroke="#006B58" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></polyline>

      {#each chart.points as p}
        {#if p === chart.peak}
          <circle cx={p.x} cy={p.y} fill="#00C7A6" r="4.5" stroke="#004D3F" stroke-width="2"></circle>
        {:else}
          <circle cx={p.x} cy={p.y} fill="#006B58" r="3" stroke="#FFFFFF" stroke-width="1.5"></circle>
        {/if}
      {/each}
    </svg>

    <div class="flex justify-between font-code-mono text-[10px] text-outline pt-space-xs">
      {#each chart.points as p}
        <span class={p === chart.peak ? 'text-primary font-bold' : ''}>{p.label}</span>
      {/each}
    </div>
  </div>

  {#if conversion}
    <div class="pt-space-sm flex items-center justify-between text-on-surface-variant font-caption text-caption">
      <span>Conversion to Publish: <strong class="text-on-surface">{conversion.conversion_pct}%</strong></span>
      <span>Avg Cycle: <strong class="text-on-surface">{conversion.avg_cycle_days} Days</strong></span>
    </div>
  {/if}
</div>
{/if}