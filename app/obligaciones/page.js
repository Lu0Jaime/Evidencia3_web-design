'use client'

import { useState, useEffect, useCallback } from 'react'
import { IconCheck, IconEdit, IconPlus, IconTrash, IconSearch, IconSave, IconList, IconClock, IconX, IconWarning } from '@/components/Icons'
import { Toast } from '@/components/Toast'
import { BadgeEV } from '@/components/BadgeEV'

const TIPOS = ['ISR Mensual','ISR Anual','IVA Mensual','Declaración Anual','IMSS','Nómina','DIOT','Reparto de Utilidades (PTU)']

export default function ObligacionesPage() {
  const [obligs,   setObligs]   = useState([])
  const [clientes, setClientes] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [search,   setSearch]   = useState('')
  const [fEstatus, setFEstatus] = useState('')
  const [fCumpl,   setFCumpl]   = useState('Pendiente')
  const [toasts,   setToasts]   = useState([])
  const [editId,   setEditId]   = useState(null)
  const [confirm,  setConfirm]  = useState(null)

  const BLANK = { id_cliente:'', tipo_obligacion:'', periodo_fiscal:'', fecha_vencimiento:'', monto_estimado:'', estatus_cumplimiento:'Pendiente' }
  const [form,   setForm]   = useState(BLANK)
  const [errors, setErrors] = useState({})

  const addToast = (msg, type='success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
  }
  const removeToast = id => setToasts(t => t.filter(x => x.id !== id))

  useEffect(() => {
    fetch('/api/clientes').then(r=>r.json()).then(j=>setClientes(j.data||[]))
  }, [])

  const fetchObligs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search)   params.set('q', search)
      if (fEstatus) params.set('estatus', fEstatus)
      if (fCumpl)   params.set('cumpl', fCumpl)
      const res  = await fetch(`/api/obligaciones?${params}`)
      const json = await res.json()
      setObligs(json.data || [])
    } catch { addToast('Error al cargar', 'error') }
    setLoading(false)
  }, [search, fEstatus, fCumpl])

  useEffect(() => {
    const t = setTimeout(fetchObligs, 250)
    return () => clearTimeout(t)
  }, [fetchObligs])

  async function guardar() {
    setErrors({})
    setSaving(true)
    const method = editId ? 'PUT'  : 'POST'
    const url    = editId ? `/api/obligaciones/${editId}` : '/api/obligaciones'
    const res  = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) {
      if (json.errors) { setErrors(json.errors); return }
      addToast(json.error||'Error','error'); return
    }
    addToast(json.message, 'success')
    setForm(BLANK); setEditId(null)
    fetchObligs()
  }

  async function marcarPresentada(o) {
    const updated = { ...o, estatus_cumplimiento: 'Presentada' }
    const res  = await fetch(`/api/obligaciones/${o.id_obligacion}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updated) })
    const json = await res.json()
    if (!res.ok) { addToast(json.error||'Error','error'); return }
    addToast('Marcada como Presentada', 'success')
    fetchObligs()
  }

  function iniciarEdicion(o) {
    setForm({ id_cliente: o.id_cliente, tipo_obligacion: o.tipo_obligacion, periodo_fiscal: o.periodo_fiscal, fecha_vencimiento: o.fecha_vencimiento, monto_estimado: o.monto_estimado||'', estatus_cumplimiento: o.estatus_cumplimiento })
    setEditId(o.id_obligacion); setErrors({})
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  async function eliminar(id) {
    const res  = await fetch(`/api/obligaciones/${id}`, { method:'DELETE' })
    const json = await res.json()
    setConfirm(null)
    if (!res.ok) { addToast(json.error||'Error','error'); return }
    addToast('Obligación eliminada','warn')
    fetchObligs()
  }

  const f = (k,v) => setForm(p=>({...p,[k]:v}))

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="page-title" style={{ display:'flex', alignItems:'center', gap:8 }}>
          <IconList size={20} /> Obligaciones Fiscales
        </div>
        <div className="page-sub">Registro y seguimiento de ISR, IVA, Declaración Anual y más</div>
      </div>

      {/* ─── FORMULARIO ─── */}
      <div className="card">
        <div className="card-header">
          {editId ? <IconEdit size={15} /> : <IconPlus size={15} />}
          <span className="card-title">{editId ? 'Editar Obligación' : 'Registrar Nueva Obligación'}</span>
          {editId && (
            <button className="btn btn-secondary btn-sm" style={{marginLeft:'auto'}} onClick={()=>{setForm(BLANK);setEditId(null);setErrors({})}}>
              <IconX size={13} /> Cancelar
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="form-grid cols3">
            <div className="form-group">
              <label>Cliente <span className="req">*</span></label>
              <select value={form.id_cliente} onChange={e=>f('id_cliente',e.target.value)} className={errors.id_cliente?'err':''}>
                <option value="">-- Seleccionar --</option>
                {clientes.filter(c=>c.estatus_cliente==='Activo').map(c=>(
                  <option key={c.id_cliente} value={c.id_cliente}>{c.nombre_cliente} · {c.rfc_cliente}</option>
                ))}
              </select>
              {errors.id_cliente && <div className="field-err show">{errors.id_cliente}</div>}
            </div>
            <div className="form-group">
              <label>Tipo de Obligación <span className="req">*</span></label>
              <select value={form.tipo_obligacion} onChange={e=>f('tipo_obligacion',e.target.value)} className={errors.tipo_obligacion?'err':''}>
                <option value="">-- Seleccionar --</option>
                {TIPOS.map(t=><option key={t}>{t}</option>)}
              </select>
              {errors.tipo_obligacion && <div className="field-err show">{errors.tipo_obligacion}</div>}
            </div>
            <div className="form-group">
              <label>Periodo Fiscal <span className="req">*</span></label>
              <input value={form.periodo_fiscal} onChange={e=>f('periodo_fiscal',e.target.value)} placeholder="Ej: Enero 2026 / Anual 2025" className={errors.periodo_fiscal?'err':''} />
              {errors.periodo_fiscal && <div className="field-err show">{errors.periodo_fiscal}</div>}
            </div>
            <div className="form-group">
              <label>Fecha de Vencimiento <span className="req">*</span></label>
              <input type="date" value={form.fecha_vencimiento} onChange={e=>f('fecha_vencimiento',e.target.value)} className={errors.fecha_vencimiento?'err':''} />
              {errors.fecha_vencimiento && <div className="field-err show">{errors.fecha_vencimiento}</div>}
            </div>
            <div className="form-group">
              <label>Monto Estimado (MXN)</label>
              <input type="number" value={form.monto_estimado} onChange={e=>f('monto_estimado',e.target.value)} placeholder="0.00" min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Estatus</label>
              <select value={form.estatus_cumplimiento} onChange={e=>f('estatus_cumplimiento',e.target.value)}>
                <option>Pendiente</option>
                <option>Presentada</option>
              </select>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary" onClick={guardar} disabled={saving}>
              {saving ? <><span className="spinner"></span> Guardando…</> : <><IconSave size={14} /> {editId ? 'Actualizar' : 'Registrar'} Obligación</>}
            </button>
          </div>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div style={{ display:'flex', gap:0, borderBottom:'2px solid var(--border)' }}>
        {[
          { key:'Pendiente',  label:'Pendientes' },
          { key:'Presentada', label:'Archivadas' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setFCumpl(key)} style={{
            padding:'9px 20px', border:'none', background:'none',
            fontFamily:'var(--font)', fontSize:'.83rem', cursor:'pointer',
            fontWeight: fCumpl===key ? 600 : 400,
            color: fCumpl===key ? 'var(--primary)' : 'var(--text2)',
            borderBottom: fCumpl===key ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom:'-2px',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* ─── FILTROS ─── */}
      <div className="toolbar">
        <div className="search-wrap" style={{maxWidth:260}}>
          <span className="search-icon"><IconSearch size={14} /></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente o tipo…" />
        </div>
        <select value={fEstatus} onChange={e=>setFEstatus(e.target.value)} style={{padding:'8px 11px',border:'1px solid var(--border2)',borderRadius:6,fontFamily:'var(--font)',fontSize:'.82rem',color:'var(--text)',background:'var(--surface2)'}}>
          <option value="">Todos los estados</option>
          <option>Al día</option>
          <option>Próximo a vencer</option>
          <option>Vencido</option>
        </select>
        <span className="badge badge-blue">{obligs.length} resultado(s)</span>
      </div>

      {/* ─── TABLA ─── */}
      <div className="card">
        <div style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Cliente / RFC</th><th>Tipo</th><th>Periodo</th>
                  <th>Vencimiento</th><th>Días</th><th>Estado</th><th>Cumplimiento</th>
                  <th>Monto</th><th style={{minWidth:90}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={10} style={{textAlign:'center',padding:32,color:'var(--text3)'}}>Cargando…</td></tr>
                ) : obligs.length === 0 ? (
                  <tr><td colSpan={10}>
                    <div className="empty">
                      <div className="empty-icon"><IconList size={36} /></div>
                      <div className="empty-title">Sin resultados</div>
                      <div className="empty-sub">Registra una obligación o ajusta los filtros</div>
                    </div>
                  </td></tr>
                ) : obligs.map(o => {
                  const monto = o.monto_estimado ? `$${parseFloat(o.monto_estimado).toLocaleString('es-MX',{minimumFractionDigits:2})}` : '—'
                  const diasColor = o.estatus_visual==='Vencido' ? 'var(--red)' : o.estatus_visual==='Próximo a vencer' ? '#b45309' : 'var(--primary)'
                  return (
                    <tr key={o.id_obligacion}>
                      <td className="td-mono" style={{color:'var(--text3)'}}>#{o.id_obligacion}</td>
                      <td>
                        <div style={{fontWeight:500,fontSize:'.82rem'}}>{o.clientes?.nombre_cliente||'—'}</div>
                        <div className="td-mono" style={{fontSize:'.7rem',color:'var(--text3)'}}>{o.clientes?.rfc_cliente||'—'}</div>
                      </td>
                      <td><span className="badge badge-blue">{o.tipo_obligacion}</span></td>
                      <td style={{fontSize:'.78rem'}}>{o.periodo_fiscal}</td>
                      <td className="td-mono" style={{fontSize:'.78rem'}}>{o.fecha_vencimiento}</td>
                      <td>
                        <span style={{fontFamily:'var(--mono)',fontSize:'.82rem',fontWeight:600,color:diasColor}}>
                          {o.dias_restantes >= 0 ? `+${o.dias_restantes}d` : `${o.dias_restantes}d`}
                        </span>
                      </td>
                      <td><BadgeEV label={o.estatus_visual} /></td>
                      <td>
                        {o.estatus_cumplimiento==='Presentada'
                          ? <span className="badge badge-green"><IconCheck size={10} /> Presentada</span>
                          : <span className="badge badge-amber"><IconClock size={10} /> Pendiente</span>}
                      </td>
                      <td style={{fontSize:'.78rem'}}>{monto}</td>
                      <td>
                        <div style={{display:'flex',gap:4,flexWrap:'nowrap'}}>
                          {o.estatus_cumplimiento==='Pendiente' && (
                            <button className="btn btn-secondary btn-sm" onClick={()=>marcarPresentada(o)} title="Marcar presentada"><IconCheck size={13} /></button>
                          )}
                          <button className="btn btn-secondary btn-sm" onClick={()=>iniciarEdicion(o)} title="Editar"><IconEdit size={13} /></button>
                          <button className="btn btn-danger btn-sm" onClick={()=>setConfirm({id:o.id_obligacion,tipo:o.tipo_obligacion})} title="Eliminar"><IconTrash size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── MODAL CONFIRMAR ─── */}
      {confirm && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setConfirm(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title" style={{display:'flex',alignItems:'center',gap:8}}><IconWarning size={16} /> Confirmar eliminación</div>
              <button className="modal-close" onClick={()=>setConfirm(null)}><IconX size={16} /></button>
            </div>
            <div className="modal-body">
              <p style={{color:'var(--text2)',fontSize:'.85rem',lineHeight:1.6}}>
                ¿Eliminar la obligación <strong>{confirm.tipo}</strong>?<br/>
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setConfirm(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={()=>eliminar(confirm.id)}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      <div className="toast-wrap">
        {toasts.map(t=><Toast key={t.id} msg={t.msg} type={t.type} onDone={()=>removeToast(t.id)} />)}
      </div>
    </div>
  )
}
