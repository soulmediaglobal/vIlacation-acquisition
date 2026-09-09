<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let staffList = []

  onMount(async () => {
    const { data, error } = await supabase.from('field_agent_pipeline').select('*')
    if (error) console.error(error)
    else staffList = data
  })

  function pct(part, total) {
    if (!total) return 0
    return (part / total) * 100
  }
</script>

{#if staffList.length}
<div class="bg-surface-container-lowest rounded-lg p-space-lg flex flex-col justify-between">
  <div class="flex items-center justify-between pb-space-sm">
    <div class="flex flex-col">
      <h3 class="font-headline-sm text-headline-sm text-on-surface">Field Agent Pipeline</h3>
      <span class="font-caption text-caption text-outline">Composition by Villa Temperature</span>
    </div>
    <span class="material-symbols-outlined text-outline text-[18px]">badge</span>
  </div>

  <div class="flex flex-col gap-space-sm py-space-xs">
    {#each staffList as agent, i}
      <div class="flex flex-col gap-space-2xs">
        <div class="flex items-center justify-between font-body-compact text-body-compact">
          <span class="font-body-compact-medium text-body-compact-medium text-on-surface">{i + 1}. {agent.staff_name}</span>
          <span class="font-code-mono text-code-mono text-on-surface font-semibold">{agent.total} villas</span>
        </div>
        {#if agent.total > 0}
          <div class="w-full h-2 rounded flex overflow-hidden bg-surface-container-high">
            <div class="bg-rose-500 h-full" style="width: {pct(agent.hot, agent.total)}%" title="Hot: {agent.hot}"></div>
            <div class="bg-amber-500 h-full" style="width: {pct(agent.warm, agent.total)}%" title="Warm: {agent.warm}"></div>
            <div class="bg-sky-500 h-full" style="width: {pct(agent.cold, agent.total)}%" title="Cold: {agent.cold}"></div>
          </div>
        {:else}
          <div class="w-full h-2 rounded bg-surface-container-high"></div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="pt-space-sm flex items-center justify-end gap-space-md text-caption text-outline font-caption">
    <span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded bg-rose-500"></span>Hot</span>
    <span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded bg-amber-500"></span>Warm</span>
    <span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded bg-sky-500"></span>Cold</span>
  </div>
</div>
{/if}