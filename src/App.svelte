<script>
  import Header from './lib/Header.svelte'
  import InsightStrip from './lib/InsightStrip.svelte'
  import KpiScorecards from './lib/KpiScorecards.svelte'
  import RealMap from './lib/RealMap.svelte'
  import WeeklyTrendChart from './lib/WeeklyTrendChart.svelte'
  import FieldAgentPipeline from './lib/FieldAgentPipeline.svelte'
  import FunnelAndVelocity from './lib/FunnelAndVelocity.svelte'
  import KanbanBoard from './lib/KanbanBoard.svelte'
</script>

<Header />

<main class="min-h-screen bg-background pt-36 p-space-2xl flex flex-col gap-space-lg">
  <InsightStrip />
  <RealMap />
  <KpiScorecards />
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
    <WeeklyTrendChart />
    <FieldAgentPipeline />
    <FunnelAndVelocity />
  </section>
  <KanbanBoard />
</main>