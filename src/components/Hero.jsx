import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero({ onAsk, onIngestUrl, onUploadPdf }){
  const [q,setQ]=useState('')
  const [url,setUrl]=useState('')
  const fileRef = useRef(null)

  return (
    <section className="relative py-12 gradient-ring">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.4}} className="text-3xl md:text-4xl font-semibold tracking-tight text-ink-900 dark:text-white">
          Ask. Understand. Present.<br/>A research UI that feels crafted.
        </motion.h1>
        <p className="text-ink-500 dark:text-ink-300 mt-3">Upload PDFs, ingest URLs, ask questions, and export stunning reports with provenance.</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-2xl p-2 shadow-soft">
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') onAsk(q)}}
              className="flex-1 bg-transparent px-3 py-3 outline-none text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500"
              placeholder="Ask anything about your uploaded docs…" />
            <button onClick={()=>onAsk(q)} className="px-4 py-2 rounded-xl bg-ink-900 text-white hover:bg-black">Ask</button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-2xl p-2">
              <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') onIngestUrl(url)}}
                className="flex-1 bg-transparent px-3 py-2 outline-none text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500"
                placeholder="Ingest a URL (optional)" />
              <button onClick={()=>onIngestUrl(url)} className="px-3 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Ingest URL</button>
            </div>
            <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f) onUploadPdf(f)}} />
            <button onClick={()=>fileRef.current?.click()} className="px-3 py-2 rounded-xl bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200">Choose PDF</button>
          </div>
        </div>
      </div>
    </section>
  )
}
