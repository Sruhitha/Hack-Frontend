import React from 'react'

export default function Stats({ tags=[], trust=0 }){
  return (
    <section className="max-w-6xl mx-auto px-4 -mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card p-5">
        <div className="text-xs text-ink-500">Trust</div>
        <div className="mt-2 h-2 bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-400 to-mint-500 rounded-full" style={{width: `${trust}%`}}/>
        </div>
        <div className="text-xs text-ink-400 mt-1">{trust}%</div>
      </div>
      <div className="card p-5">
        <div className="text-xs text-ink-500 mb-2">Tags</div>
        <div className="flex flex-wrap gap-2">{tags.map((t,i)=>(<span key={i} className="pill">{t}</span>))}</div>
      </div>
      <div className="card p-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-ink-500">Export</div>
          <div className="text-sm text-ink-800 dark:text-ink-100">One-click PDF report</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-mint-500" />
      </div>
    </section>
  )
}
