<script>
  import Header from './lib/Header.svelte'
  import { currentRoute } from './lib/router.js'

  import InsightStrip from './lib/InsightStrip.svelte'
  import KpiScorecards from './lib/KpiScorecards.svelte'
  import RealMap from './lib/RealMap.svelte'
  import WeeklyTrendChart from './lib/WeeklyTrendChart.svelte'
  import FieldAgentPipeline from './lib/FieldAgentPipeline.svelte'
  import FunnelAndVelocity from './lib/FunnelAndVelocity.svelte'
  import KanbanBoard from './lib/KanbanBoard.svelte'

  import VillaDirectory from './lib/VillaDirectory.svelte'
  import StaffPerformancePage from './lib/StaffPerformancePage.svelte'
  import GeographicDensityPage from './lib/GeographicDensityPage.svelte'
  import SettingsPage from './lib/SettingsPage.svelte'
</script>

<Header />

<main class="min-h-screen bg-background pt-36 p-space-2xl flex flex-col gap-space-lg">
  {#if $currentRoute === '/overview'}
    <InsightStrip />
    <RealMap />
    <KpiScorecards />
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
      <WeeklyTrendChart />
      <FieldAgentPipeline />
      <FunnelAndVelocity />
    </section>
    <KanbanBoard />
  {:else if $currentRoute === '/villa-directory'}
    <VillaDirectory />
  {:else if $currentRoute === '/staff-performance'}
    <StaffPerformancePage />
  {:else if $currentRoute === '/geographic-density'}
    <GeographicDensityPage />
  {:else if $currentRoute === '/settings'}
    <SettingsPage />
  {:else}
    <div class="bg-surface-container-lowest rounded-lg p-space-lg text-center text-outline font-caption text-caption">
      Page not found
    </div>
  {/if}
</main>