import React from 'react'

export default function Sources({ citations=[] }){
  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-200 mb-2">Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {citations.map((c,i)=>(
          <div id={`src-${i+1}`} key={i} className="card p-4" title={c.excerpt}>
            <div className="text-xs text-ink-500 mb-1">{c.source || `Doc-${i+1}`}</div>
            <div className="text-sm text-ink-800 dark:text-ink-100">{c.excerpt}</div>
          </div>
        ))}
        {!citations?.length && <div className="text-sm text-ink-400">No citations yet.</div>}
      </div>
    </section>
  )
}
