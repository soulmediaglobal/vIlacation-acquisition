<script>
  import { onMount } from 'svelte'
  import { supabase } from './lib/supabase.js'

  let status = 'Checking connection...'

  onMount(async () => {
    const { data, error } = await supabase.from('config').select('*')
    if (error) {
      status = 'Error: ' + error.message
    } else {
      status = 'Connected! Found ' + data.length + ' config rows.'
      console.log(data)
    }
  })
</script>

<main style="padding: 2rem; font-family: sans-serif;">
  <h1>Supabase connection test</h1>
  <p>{status}</p>
</main>
