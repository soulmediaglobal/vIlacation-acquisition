<script>
  import { onMount } from 'svelte'
  import { supabase } from './supabase.js'
  import { currentRoute } from './router.js'

  let pipelineHealthPct = null

  onMount(async () => {
    const { data: kpi, error } = await supabase.from('kpi_scorecards').select('*').single()
    if (error) { console.error(error); return }

    const now = new Date()
    const dayOfMonth = now.getDate()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const expected = (dayOfMonth / daysInMonth) * kpi.mtd_target
    pipelineHealthPct = expected > 0 ? (kpi.mtd_acquisitions / expected) * 100 : null
  })

  function currentMonthRange() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const opts = { month: 'short', day: 'numeric' }
    return `${start.toLocaleDateString('en-US', opts)} - ${now.toLocaleDateString('en-US', opts)}, ${now.getFullYear()}`
  }

  const navTabs = [
    { label: 'Overview & Pipeline', path: '/overview' },
    { label: 'Villa Directory', path: '/villa-directory' },
    { label: 'Staff Performance', path: '/staff-performance' },
    { label: 'Geographic Density', path: '/geographic-density' },
    { label: 'Settings', path: '/settings' },
  ]
</script>

<header class="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="h-24 w-full px-gutter-desktop flex items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md">
      <img src="/vilacation-logo.png" alt="Vilacation" class="h-10 w-auto object-contain" />
      <div class="flex flex-col justify-center border-l border-outline-variant pl-space-md">
        <span class="font-headline-sm text-headline-sm text-on-surface leading-tight">Ops Acquisition Command</span>
        <span class="font-caption text-caption text-on-surface-variant flex items-center gap-space-2xs mt-space-2xs">
          <span class="w-2 h-2 rounded-full bg-primary-container inline-block"></span>Yogyakarta Region
        </span>
      </div>
    </div>

    <div class="flex-1 max-w-xl mx-space-lg hidden lg:block">
      <div class="relative flex items-center w-full bg-surface-container-low rounded-lg">
        <span class="material-symbols-outlined text-outline absolute left-space-md pointer-events-none text-[18px]">search</span>
        <input
          class="w-full bg-transparent pl-10 pr-space-md py-space-sm font-body-compact text-body-compact text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest rounded-lg transition-colors"
          placeholder="Search coming soon..."
          type="text"
          disabled
        />
      </div>
    </div>

    <div class="flex items-center gap-space-md">
      <div class="hidden sm:flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low rounded-lg text-on-surface font-body-compact-medium text-body-compact-medium">
        <span class="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
        <span>{currentMonthRange()}</span>
      </div>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined text-[22px] text-on-surface-variant">notifications</span>
      </div>
      <div class="flex items-center gap-space-sm pl-space-xs">
        <div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-body-compact-medium text-body-compact-medium">?</div>
        <div class="hidden xl:flex flex-col text-left">
          <span class="font-body-compact-medium text-body-compact-medium text-on-surface leading-snug">Guest</span>
          <span class="font-caption text-caption text-on-surface-variant leading-none">No login yet</span>
        </div>
      </div>
    </div>
  </div>

  <div class="h-12 w-full px-gutter-desktop bg-surface-container-low/70 flex items-center justify-between gap-space-md overflow-x-auto">
    <nav class="flex items-center gap-space-xs h-full py-space-2xs">
      {#each navTabs as tab}
        
          href="#{tab.path}"
          class="px-space-md py-space-xs rounded font-body-compact text-body-compact whitespace-nowrap transition-colors
            {$currentRoute === tab.path
              ? 'text-on-surface bg-surface-container-lowest font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}"
        >
          {tab.label}
        </a>
      {/each}
    </nav>
    {#if pipelineHealthPct !== null}
      <div class="hidden sm:flex items-center gap-space-xs px-space-md py-space-2xs bg-surface-container-lowest rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <span class="w-2 h-2 rounded-full {pipelineHealthPct >= 100 ? 'bg-primary' : 'bg-amber-500'} inline-block"></span>
        <span class="font-caption-bold text-caption-bold text-on-surface">Pipeline Health: {pipelineHealthPct.toFixed(1)}% on pace</span>
      </div>
    {/if}
  </div>
</header>