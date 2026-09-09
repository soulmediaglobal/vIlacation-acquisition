<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let kpi = null

  onMount(async () => {
    const { data, error } = await supabase.from('kpi_scorecards').select('*').single()
    if (error) {
      console.error(error)
    } else {
      kpi = data
    }
  })

  function mtdProgressPct(k) {
    if (!k.mtd_target) return 0
    return Math.min(100, (k.mtd_acquisitions / k.mtd_target) * 100)
  }

  // "on pace" = comparing actual MTD progress to the pace needed to hit target by month end.
  // Real, derived from date — not a fabricated number.
  function mtdPaceDelta(k) {
    const now = new Date()
    const dayOfMonth = now.getDate()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const expected = (dayOfMonth / daysInMonth) * k.mtd_target
    if (expected === 0) return null
    const diffPct = ((k.mtd_acquisitions - expected) / expected) * 100
    return diffPct
  }

  function velocityDelta(k) {
    if (!k.weekly_velocity_benchmark) return null
    return ((k.weekly_velocity_avg - k.weekly_velocity_benchmark) / k.weekly_velocity_benchmark) * 100
  }
</script>

{#if kpi}
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

  <!-- KPI Card 1: MTD Acquisitions -->
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="font-table-header text-table-header text-outline uppercase tracking-wider">MTD Acquisitions</span>
      <span class="material-symbols-outlined text-outline text-[18px]">verified</span>
    </div>
    <div class="my-space-sm">
      <div class="flex items-baseline gap-space-xs">
        <span class="font-metric-display text-metric-display text-on-surface font-semibold">{kpi.mtd_acquisitions}</span>
        <span class="font-body-compact text-body-compact text-outline">/ {kpi.mtd_target} target</span>
      </div>
      <div class="w-full bg-surface-container-high h-1.5 rounded-full mt-space-xs overflow-hidden">
        <div class="bg-primary-container h-full" style="width: {mtdProgressPct(kpi)}%"></div>
      </div>
    </div>
    {#if mtdPaceDelta(kpi) !== null}
      {#if mtdPaceDelta(kpi) >= 0}
        <div class="flex items-center gap-space-2xs text-primary font-caption-bold text-caption-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
          <span>+{mtdPaceDelta(kpi).toFixed(1)}% ahead of pace</span>
        </div>
      {:else}
        <div class="flex items-center gap-space-2xs text-rose-600 font-caption-bold text-caption-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
          <span>{mtdPaceDelta(kpi).toFixed(1)}% behind pace</span>
        </div>
      {/if}
    {/if}
  </div>

  <!-- KPI Card 2: Weekly Velocity -->
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Weekly Velocity</span>
      <span class="material-symbols-outlined text-outline text-[18px]">speed</span>
    </div>
    <div class="my-space-sm">
      <div class="flex items-baseline gap-space-xs">
        <span class="font-metric-display text-metric-display text-on-surface font-semibold">{kpi.weekly_velocity_avg.toFixed(1)}</span>
        <span class="font-body-compact text-body-compact text-outline">villas/wk</span>
      </div>
      <p class="font-caption text-caption text-on-surface-variant mt-space-2xs">Rolling 4-week average run rate</p>
    </div>
    {#if velocityDelta(kpi) !== null}
      {#if velocityDelta(kpi) >= 0}
        <div class="flex items-center gap-space-2xs text-primary font-caption-bold text-caption-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
          <span>+{velocityDelta(kpi).toFixed(1)}% vs benchmark</span>
        </div>
      {:else}
        <div class="flex items-center gap-space-2xs text-rose-600 font-caption-bold text-caption-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
          <span>{velocityDelta(kpi).toFixed(1)}% vs benchmark</span>
        </div>
      {/if}
    {/if}
  </div>

  <!-- KPI Card 3: Pending Audit (no fabricated WoW trend — no history snapshot yet) -->
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Pending Audit</span>
      <span class="material-symbols-outlined text-outline text-[18px]">fact_check</span>
    </div>
    <div class="my-space-sm">
      <div class="flex items-baseline gap-space-xs">
        <span class="font-metric-display text-metric-display text-on-surface font-semibold">{kpi.pending_audit}</span>
        <span class="font-body-compact text-body-compact text-outline">villas queue</span>
      </div>
      <p class="font-caption text-caption text-on-surface-variant mt-space-2xs">Awaiting structural &amp; legal clearance</p>
    </div>
  </div>

  <!-- KPI Card 4: Follow-up Activity (no fabricated WoW trend — no history snapshot yet) -->
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <span class="font-table-header text-table-header text-outline uppercase tracking-wider">Follow-Up Activity (7D)</span>
      <span class="material-symbols-outlined text-outline text-[18px]">history_toggle_off</span>
    </div>
    <div class="my-space-sm">
      <div class="flex items-baseline gap-space-xs">
        <span class="font-metric-display text-metric-display text-on-surface font-semibold">{kpi.followup_activity_7d}</span>
        <span class="font-body-compact text-body-compact text-outline">logged touches</span>
      </div>
      <p class="font-caption text-caption text-on-surface-variant mt-space-2xs">WhatsApp, phone &amp; on-site audits</p>
    </div>
  </div>

</section>
{/if}