import React from 'react'

export default function Answer({ headline, bullets=[], bulletCitations=[] }){
  return (
    <section className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-6">
        <h2 className="text-lg font-semibold text-ink-900 dark:text-white">{headline || 'Answer'}</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-ink-700 dark:text-ink-200">
          {bullets.map((b,i)=>(
            <li key={i}>
              {b} {' '}
              {Array.isArray(bulletCitations[i]) && bulletCitations[i].length>0 && bulletCitations[i].map(ref=>(
                <a key={ref} href={`#src-${ref}`} className="text-brand-600 dark:text-brand-400 text-xs mx-1">[{ref}]</a>
              ))}
            </li>
          ))}
          {!bullets?.length && <li className="text-ink-400">No key points.</li>}
        </ul>
      </div>
      <div className="card p-6">
        <div className="text-sm font-medium text-ink-800 dark:text-ink-100">Tips</div>
        <ul className="mt-2 text-xs text-ink-500 dark:text-ink-300 space-y-2">
          <li>Hover sources to preview the exact excerpt.</li>
          <li>Inline [1][2] markers jump you to the source.</li>
          <li>Click Export to download a polished PDF.</li>
        </ul>
      </div>
    </section>
  )
}
