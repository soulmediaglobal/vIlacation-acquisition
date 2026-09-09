<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'

  let villas = []
  let loading = true
  let searchTerm = ''
  let tempFilter = 'All'
  let sortKey = 'name'
  let sortDir = 1

  const tempPill = { Hot: 'bg-rose-50 text-rose-700', Warm: 'bg-amber-50 text-amber-700', Cold: 'bg-sky-50 text-sky-700' }

  function fmtRp(n) {
    if (!n) return '-'
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1) + 'M'
    return 'Rp ' + n
  }

  onMount(async () => {
    const [{ data: v, error: e1 }, { data: staff, error: e2 }, { data: touch, error: e3 }] = await Promise.all([
      supabase.from('villas').select('*'),
      supabase.from('staff').select('id, name'),
      supabase.from('villa_touch').select('id, days_since_touch'),
    ])
    if (e1 || e2 || e3) { console.error(e1 || e2 || e3); loading = false; return }

    const staffMap = {}
    staff.forEach(s => { staffMap[s.id] = s.name })
    const touchMap = {}
    touch.forEach(t => { touchMap[t.id] = t.days_since_touch })

    villas = v.map(villa => ({
      ...villa,
      picName: staffMap[villa.pic] || 'Unassigned',
      daysSinceTouch: touchMap[villa.id] ?? null,
    }))
    loading = false
  })

  function setSort(key) {
    if (sortKey === key) { sortDir *= -1 } else { sortKey = key; sortDir = 1 }
  }

  $: filtered = villas
    .filter(v => tempFilter === 'All' || v.temperature === tempFilter)
    .filter(v =>
      !searchTerm ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.picName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey] ?? ''
      const bv = b[sortKey] ?? ''
      if (av < bv) return -1 * sortDir
      if (av > bv) return 1 * sortDir
      return 0
    })

  const columns = [
    { key: 'name', label: 'Villa Name' },
    { key: 'district', label: 'District' },
    { key: 'picName', label: 'PIC' },
    { key: 'temperature', label: 'Status' },
    { key: 'funnel_stage', label: 'Funnel Stage' },
    { key: 'annual_value_rp', label: 'Value/yr' },
    { key: 'daysSinceTouch', label: 'Last Touch' },
  ]
</script>

<div class="w-full flex flex-col gap-space-md">
  <div class="bg-surface-container-lowest rounded-lg p-space-md flex flex-wrap items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md">
      <h2 class="font-headline-sm text-headline-sm text-on-surface">Villa Directory</h2>
      <span class="font-caption text-caption text-outline">{filtered.length} of {villas.length} villas</span>
    </div>
    <div class="flex items-center gap-space-sm">
      <input
        bind:value={searchTerm}
        class="px-space-sm py-1 bg-surface-container-low rounded font-body-compact text-body-compact text-on-surface placeholder:text-outline focus:outline-none"
        placeholder="Search villa, district, PIC..."
        type="text"
      />
      <select bind:value={tempFilter} class="px-space-sm py-1 bg-surface-container-low rounded font-body-compact text-body-compact text-on-surface focus:outline-none">
        <option value="All">All Status</option>
        <option value="Hot">Hot</option>
        <option value="Warm">Warm</option>
        <option value="Cold">Cold</option>
      </select>
    </div>
  </div>

  {#if loading}
    <div class="bg-surface-container-lowest rounded-lg p-space-lg text-center text-outline font-caption text-caption">Loading...</div>
  {:else}
    <div class="bg-surface-container-lowest rounded-lg overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-surface-container-high">
            {#each columns as col}
              <th
                class="px-space-md py-space-sm font-table-header text-table-header text-outline uppercase tracking-wider cursor-pointer select-none whitespace-nowrap"
                on:click={() => setSort(col.key)}
              >
                {col.label} {sortKey === col.key ? (sortDir === 1 ? '↑' : '↓') : ''}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each filtered as v}
            <tr class="border-b border-surface-container-high hover:bg-surface-container-low/50 transition-colors">
              <td class="px-space-md py-space-sm font-body-compact-medium text-body-compact-medium text-on-surface whitespace-nowrap">{v.name}</td>
              <td class="px-space-md py-space-sm font-body-compact text-body-compact text-on-surface-variant whitespace-nowrap">{v.district}</td>
              <td class="px-space-md py-space-sm font-body-compact text-body-compact text-on-surface-variant whitespace-nowrap">{v.picName}</td>
              <td class="px-space-md py-space-sm whitespace-nowrap">
                <span class="px-space-xs py-space-2xs {tempPill[v.temperature]} font-table-header text-[10px] rounded uppercase">{v.temperature}</span>
              </td>
              <td class="px-space-md py-space-sm font-body-compact text-body-compact text-on-surface-variant whitespace-nowrap">{v.funnel_stage}</td>
              <td class="px-space-md py-space-sm font-code-mono text-code-mono text-on-surface whitespace-nowrap">{fmtRp(v.annual_value_rp)}</td>
              <td class="px-space-md py-space-sm font-code-mono text-code-mono text-on-surface-variant whitespace-nowrap">
                {v.daysSinceTouch !== null ? v.daysSinceTouch + 'd ago' : 'No activity'}
              </td>
            </tr>
          {:else}
            <tr><td colspan="7" class="px-space-md py-space-lg text-center text-outline font-caption text-caption">No villas match your filter</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>