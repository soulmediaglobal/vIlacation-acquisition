import { writable } from 'svelte/store'

function getPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/overview'
}

export const currentRoute = writable(getPath())

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    currentRoute.set(getPath())
  })
}

export function navigate(path) {
  window.location.hash = path
}