<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let config = []
  let staff = []
  let loading = true

  onMount(async () => {
    const [{ data: cfg, error: e1 }, { data: st, error: e2 }] = await Promise.all([
      supabase.from('config').select('*'),
      supabase.from('staff').select('*'),
    ])
    if (e1) console.error(e1); else config = cfg
    if (e2) console.error(e2); else staff = st
    loading = false
  })
</script>

<div class="w-full flex flex-col gap-space-md">
  <div class="bg-surface-container-lowest rounded-lg p-space-md">
    <h2 class="font-headline-sm text-headline-sm text-on-surface">Settings</h2>
    <p class="font-caption text-caption text-outline mt-space-2xs">
      Read-only for now — edit these values directly in Supabase (table <code>config</code>) until an edit UI is built.
    </p>
  </div>

  {#if !loading}
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
    <div class="bg-surface-container-lowest rounded-lg p-space-md">
      <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Dashboard Parameters</h3>
      <table class="w-full text-left">
        <tbody>
          {#each config as c}
            <tr class="border-b border-surface-container-high">
              <td class="py-space-xs font-body-compact text-body-compact text-on-surface-variant">{c.key}</td>
              <td class="py-space-xs font-code-mono text-code-mono text-on-surface text-right">{c.value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="bg-surface-container-lowest rounded-lg p-space-md">
      <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Acquisition Staff</h3>
      <table class="w-full text-left">
        <tbody>
          {#each staff as s}
            <tr class="border-b border-surface-container-high">
              <td class="py-space-xs font-body-compact text-body-compact text-on-surface">{s.name}</td>
              <td class="py-space-xs font-caption text-caption text-outline text-right">{s.active ? 'Active' : 'Inactive'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  {/if}
</div>