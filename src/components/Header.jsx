import React, { useEffect, useState } from 'react'

export default function Header({ backend, onToggleTheme }){
  const [scroll, setScroll] = useState(false)
  useEffect(()=>{
    const onS=()=>setScroll(window.scrollY>8); window.addEventListener('scroll', onS); return ()=>window.removeEventListener('scroll', onS)
  },[])
  return (
    <header className={`sticky top-0 z-30 ${scroll?'bg-white/70 dark:bg-ink-900/60 glass border-b border-ink-100 dark:border-ink-800':'bg-transparent'} transition`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-500 to-mint-500 shadow-ring" />
          <div className="text-lg font-semibold tracking-tight text-ink-900 dark:text-white">Synapse Pro</div>
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-300">
          <span className="pill">Backend: {backend}</span>
          <button onClick={onToggleTheme} className="pill hover:bg-ink-100 dark:hover:bg-ink-700/60">Toggle theme</button>
        </div>
      </div>
    </header>
  )
}
