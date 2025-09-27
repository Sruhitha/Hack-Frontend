import React, { useEffect, useState } from 'react'
import { BACKEND_URL, askQuestion, ingestUrl, ingestPdf, exportReport, getStatus } from './api.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Answer from './components/Answer.jsx'
import Sources from './components/Sources.jsx'
import CytoscapeMap from './components/CytoscapeMap.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  const [dark, setDark] = useState(false)
  const [data, setData] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(()=>{
    const html=document.documentElement
    if(dark) html.classList.add('dark'); else html.classList.remove('dark')
  },[dark])

  async function onAsk(q){
    try{
      const res = await askQuestion(q||'')
      setData(res)
    }catch(e){ setToast('Backend unavailable.'); setTimeout(()=>setToast(null), 2500) }
  }
  async function onIngestUrl(url){
    if(!url) return
    try{ await ingestUrl(url); setToast('URL ingested.'); setTimeout(()=>setToast(null), 1500) }catch{}
  }
  async function onUploadPdf(file){
    try{ const d = await ingestPdf(file); setToast(`PDF ingested: ${d.chunks||0} chunks.`); setTimeout(()=>setToast(null), 1800) }catch{}
  }
  async function onExport(){
    const q = (data?.headline||'export report')
    try{ await exportReport(q); window.open(`${BACKEND_URL}/download`, '_blank') }catch{}
  }

  return (
    <div className="min-h-screen">
      <Header backend={BACKEND_URL} onToggleTheme={()=>setDark(v=>!v)} />
      <Hero onAsk={onAsk} onIngestUrl={onIngestUrl} onUploadPdf={onUploadPdf} />
      {toast && <div className="max-w-3xl mx-auto -mt-4 text-center text-xs text-ink-600 dark:text-ink-300">{toast}</div>}
      {data && (
        <>
          <Stats tags={data.tags||[]} trust={data.trust||0} />
          <div className="max-w-6xl mx-auto px-4 mt-4 flex gap-3">
            <button onClick={onExport} className="px-4 py-2 rounded-xl bg-ink-900 text-white hover:bg-black">Export PDF</button>
            <a href="#sources" className="px-3 py-2 pill">Jump to Sources</a>
          </div>
          <Answer headline={data.headline} bullets={data.bullets} bulletCitations={data.bullet_citations} />
          <CytoscapeMap bullets={data.bullets} citations={data.citations} />
          <div id="sources"><Sources citations={data.citations} /></div>
        </>
      )}
      <Footer />
    </div>
  )
}
