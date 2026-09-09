<script>
  import { onMount } from 'svelte'
  import { supabase } from './lib/supabase.js'

  let kpi = null
  let loading = true

  onMount(async () => {
    const { data, error } = await supabase.from('kpi_scorecards').select('*').single()
    if (error) {
      console.error(error)
    } else {
      kpi = data
    }
    loading = false
  })
</script>

<main style="padding: 2rem; font-family: sans-serif; background: #FBFAF7; min-height: 100vh;">
  <h1 style="color: #1B2430;">Akuisisi Villa</h1>

  {#if loading}
    <p>Loading...</p>
  {:else if kpi}
    <div style="display: flex; gap: 16px; margin-top: 24px;">
      <div style="background: white; border-radius: 16px; padding: 16px; flex: 1;">
        <div style="font-size: 12px; color: #5F5E5A;">MTD Acquisitions</div>
        <div style="font-size: 28px; font-weight: bold; color: #00C7A6;">
          {kpi.mtd_acquisitions} <span style="font-size: 14px; color: #999;">/ {kpi.mtd_target}</span>
        </div>
      </div>
      <div style="background: white; border-radius: 16px; padding: 16px; flex: 1;">
        <div style="font-size: 12px; color: #5F5E5A;">Weekly Velocity</div>
        <div style="font-size: 28px; font-weight: bold; color: #1B2430;">
          {kpi.weekly_velocity_avg.toFixed(1)}<span style="font-size: 14px;">/wk</span>
        </div>
      </div>
      <div style="background: white; border-radius: 16px; padding: 16px; flex: 1;">
        <div style="font-size: 12px; color: #5F5E5A;">Pending Audit</div>
        <div style="font-size: 28px; font-weight: bold; color: #1B2430;">{kpi.pending_audit}</div>
      </div>
      <div style="background: white; border-radius: 16px; padding: 16px; flex: 1;">
        <div style="font-size: 12px; color: #5F5E5A;">Follow-up (7d)</div>
        <div style="font-size: 28px; font-weight: bold; color: #1B2430;">{kpi.followup_activity_7d}</div>
      </div>
    </div>
  {/if}
</main>
