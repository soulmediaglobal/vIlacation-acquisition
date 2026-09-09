<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let insight = null

  onMount(async () => {
    const { data, error } = await supabase.from('insight_data').select('*').single()
    if (error) {
      console.error(error)
    } else {
      insight = data
    }
  })
</script>

{#if insight}
<section class="w-full bg-surface-container-lowest rounded-lg p-space-sm">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-space-sm">

    <!-- Cold alert -->
    <div class="flex items-center justify-between p-space-sm bg-surface-container-low rounded">
      <div class="flex items-center gap-space-sm min-w-0">
        <span class="px-space-xs py-space-2xs bg-amber-50 text-amber-700 font-table-header text-table-header rounded uppercase tracking-wider whitespace-nowrap">
          Warning
        </span>
        <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0">warning</span>
        <p class="font-body-compact text-body-compact text-on-surface truncate">
          <span class="font-body-compact-medium text-body-compact-medium font-semibold">{insight.cold_alert_count} villas</span>
          cold for {insight.cold_alert_threshold}+ days without touch
        </p>
      </div>
      <a class="shrink-0 ml-space-sm font-caption-bold text-caption-bold text-primary hover:text-on-primary-container inline-flex items-center gap-space-2xs transition-colors" href="#pipeline-kanban">
        <span>Review</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>

    <!-- Staff anomaly -->
    {#if insight.anomaly_staff}
    <div class="flex items-center justify-between p-space-sm bg-surface-container-low rounded">
      <div class="flex items-center gap-space-sm min-w-0">
        <span class="px-space-xs py-space-2xs bg-amber-50 text-amber-700 font-table-header text-table-header rounded uppercase tracking-wider whitespace-nowrap">
          Staff Lag
        </span>
        <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0">trending_down</span>
        <p class="font-body-compact text-body-compact text-on-surface truncate">
          <span class="font-body-compact-medium text-body-compact-medium font-semibold">Staff {insight.anomaly_staff}:</span>
          touch velocity above threshold
        </p>
      </div>
      <a class="shrink-0 ml-space-sm font-caption-bold text-caption-bold text-primary hover:text-on-primary-container inline-flex items-center gap-space-2xs transition-colors" href="#staff-performance">
        <span>Staff Log</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
    {/if}

    <!-- Geographic -->
    <div class="flex items-center justify-between p-space-sm bg-surface-container-low rounded">
      <div class="flex items-center gap-space-sm min-w-0">
        <span class="px-space-xs py-space-2xs bg-amber-50 text-amber-700 font-table-header text-table-header rounded uppercase tracking-wider whitespace-nowrap">
          Geographic
        </span>
        <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0">location_on</span>
        <p class="font-body-compact text-body-compact text-on-surface truncate">
          <span class="font-body-compact-medium text-body-compact-medium font-semibold">{insight.top_cold_district}</span>
          has the most cold-status villas ({insight.top_cold_district_count})
        </p>
      </div>
      <a class="shrink-0 ml-space-sm font-caption-bold text-caption-bold text-primary hover:text-on-primary-container inline-flex items-center gap-space-2xs transition-colors" href="#geographic-density">
        <span>Filter Map</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>

  </div>
</section>
{/if}