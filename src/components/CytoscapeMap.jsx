import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'

export default function CytoscapeMap({ bullets=[], citations=[] }){
  const containerRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(()=>{
    const elements = []
    elements.push({ data:{ id:'answer', label:'Answer', kind:'answer' } })
    citations.forEach((c,i)=>{
      const id = `s${i+1}`
      elements.push({ data:{ id, label: c.source||`Doc-${i+1}`, kind:'source', excerpt:c.excerpt||'' } })
      elements.push({ data:{ id:`e-a-${i}`, source:'answer', target:id } })
    })
    bullets.forEach((b,i)=>{
      const id = `b${i+1}`
      elements.push({ data:{ id, label:`• ${b.slice(0,60)}…`, kind:'bullet' } })
      elements.push({ data:{ id:`e-ab-${i}`, source:'answer', target:id } })
      const sid = `s${(i % (citations.length||1))+1}`
      elements.push({ data:{ id:`e-bs-${i}`, source:id, target:sid } })
    })

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        { selector: 'node', style: {
            'label':'data(label)',
            'font-size':11, 'text-wrap':'wrap', 'text-max-width':160,
            'text-valign':'center','text-halign':'center',
            'border-width':1,'border-color':'#cbd5e1',
            'background-color': (el)=> el.data('kind')==='answer' ? '#a7f3d0' : el.data('kind')==='bullet' ? '#c7d2fe' : '#fde68a',
            'width': (el)=> el.data('kind')==='answer'? 64:40, 'height': (el)=> el.data('kind')==='answer'?64:40,
            'color':'#111'
        }},
        { selector: 'edge', style: {
            'width':1,'line-color':'#94a3b8','target-arrow-color':'#94a3b8','target-arrow-shape':'triangle','curve-style':'bezier'
        }}
      ],
      layout:{ name:'cose', animate:false },
      wheelSensitivity: .2
    })

    cy.ready(()=> cy.fit(undefined, 30))
    cy.on('tap', 'node', e=>{
      const nd=e.target; const pos=e.renderedPosition()
      setTooltip({ x:pos.x, y:pos.y, text: nd.data('excerpt') || nd.data('label') })
    })
    cy.on('tap', e=>{ if(e.target===cy) setTooltip(null) })

    return ()=>cy.destroy()
  }, [bullets, citations])

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-200 mb-2">Source Map</h3>
      <div className="relative card">
        <div className="h-[380px]" ref={containerRef} />
        {tooltip && (
          <div className="absolute max-w-sm p-3 text-xs rounded-lg bg-white/95 dark:bg-ink-800/95 border border-ink-100 dark:border-ink-700 shadow-soft"
               style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}>
            {tooltip.text}
          </div>
        )}
      </div>
    </section>
  )
}
