import axios from 'axios'
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'
export const api = axios.create({ baseURL: BACKEND_URL, timeout: 20000 })
export const askQuestion = async (q)=>{ const {data}=await api.post('/query',{q}); return data }
export const ingestUrl = async (url)=>{ const {data}=await api.post('/ingest_url',{url}); return data }
export const ingestPdf = async (file)=>{
  const f=new FormData(); f.append('file',file)
  const {data}=await api.post('/ingest_pdf',f,{headers:{'Content-Type':'multipart/form-data'}})
  return data
}
export const exportReport = async (q)=>{ const {data}=await api.post('/export',{q}); return data }
export const getStatus = async ()=>{ const {data}=await api.get('/status'); return data }
