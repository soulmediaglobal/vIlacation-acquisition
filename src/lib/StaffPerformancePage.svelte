<script>
  import FieldAgentPipeline from './FieldAgentPipeline.svelte'
  import FunnelAndVelocity from './FunnelAndVelocity.svelte'
</script>

<div class="w-full flex flex-col gap-space-md">
  <div class="bg-surface-container-lowest rounded-lg p-space-md">
    <h2 class="font-headline-sm text-headline-sm text-on-surface">Staff Performance</h2>
    <p class="font-caption text-caption text-outline mt-space-2xs">Villa load, temperature mix, and touch velocity per acquisition staff</p>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
    <FieldAgentPipeline />
    <FunnelAndVelocity />
  </div>
</div>