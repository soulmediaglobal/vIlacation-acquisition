<script>
  import RealMap from './RealMap.svelte'
</script>

<div class="w-full flex flex-col gap-space-md">
  <div class="bg-surface-container-lowest rounded-lg p-space-md">
    <h2 class="font-headline-sm text-headline-sm text-on-surface">Geographic Density</h2>
    <p class="font-caption text-caption text-outline mt-space-2xs">Full-size map view — click any pin for villa detail</p>
  </div>
  <RealMap />
</div>