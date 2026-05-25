import { useState } from 'react';
import { Icon } from '../Icons';
import { ALL_PROPERTIES, PROPERTIES, GUEST_STATES, GUEST_CITIES } from '../data';
import { DrumPicker } from '../components/Shared';

export function MasterDashboard({ onBack }: any) {
  const [properties, setProperties] = useState(ALL_PROPERTIES);
  const [filter, setFilter] = useState("todas");
  const [selected, setSelected] = useState<any>(null);

  const toggleStatus = (id: number) => {
    setProperties(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === "pendiente" ? "aprobada" : "pendiente" } : p
    ));
  };

  const filtered = filter === "todas" ? properties : properties.filter(p => p.status === filter);
  const pendingCount = properties.filter(p => p.status === "pendiente").length;
  const approvedCount = properties.filter(p => p.status === "aprobada").length;

  if (selected) {
    const p = properties.find((x:any) => x.id === selected.id) as any;
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 48 }}>
        <div style={{ position: "relative", height: "35vh", overflow: "hidden" }}>
          <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #00000050, #0a0f1e)" }} />
          <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, left: 16, background: "#000000a0", backdropFilter: "blur(8px)", border: "none", borderRadius: 99, width: 38, height: 38, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="back" size={16} color="white" />
          </button>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 20, fontWeight: 700 }}>{p.name}</h2>
              <p style={{ color: "#64748b", fontSize: 13, marginTop: 3 }}>👤 {p.owner} · {p.city}</p>
              <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>📅 Enviado: {p.submitted}</p>
            </div>
            <span style={{
              background: p.status === "aprobada" ? "#10b98115" : "#f59e0b15",
              border: `1px solid ${p.status === "aprobada" ? "#10b98130" : "#f59e0b30"}`,
              borderRadius: 99, padding: "5px 14px", color: p.status === "aprobada" ? "#10b981" : "#f59e0b",
              fontSize: 12, fontWeight: 700,
            }}>
              {p.status === "aprobada" ? "✓ Aprobada" : "⚠️ Pendiente"}
            </span>
          </div>
          {[
            { label: "Tipo", val: p.type, icon: "🏠" },
            { label: "Ciudad", val: p.city, icon: "📍" },
            { label: "Precio mensual", val: `$${p.price.toLocaleString()} MXN`, icon: "💰" },
            { label: "Propietario", val: p.owner, icon: "👤" },
          ].map((r, i) => (
            <div key={i} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <div>
                <p style={{ color: "#64748b", fontSize: 11 }}>{r.label}</p>
                <p style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{r.val}</p>
              </div>
            </div>
          ))}
          <button onClick={() => { toggleStatus(p.id); setSelected(null); }} style={{
            width: "100%", marginTop: 16,
            background: p.status === "pendiente" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #f59e0b, #d97706)",
            border: "none", borderRadius: 16, padding: "18px", color: "white",
            fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
          }}>
            {p.status === "pendiente" ? "✓ Aprobar propiedad" : "↩ Revocar aprobación"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 48 }}>
      <div style={{ background: "linear-gradient(135deg, #1e0a3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #8b5cf620" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 18, fontWeight: 800, lineHeight: 1 }}>Panel Maestro</h1>
              <p style={{ color: "#8b5cf6", fontSize: 11, marginTop: 2, fontWeight: 600 }}>Administrador Baja Renta</p>
            </div>
          </div>
          <button onClick={onBack} style={{ background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 99, padding: "8px 14px", color: "#94a3b8", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
            Salir
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Total", val: properties.length, color: "#8b5cf6" },
            { label: "Pendientes", val: pendingCount, color: "#f59e0b" },
            { label: "Aprobadas", val: approvedCount, color: "#10b981" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#ffffff06", border: `1px solid ${s.color}20`, borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Syne',sans-serif", color: s.color, fontSize: 24, fontWeight: 800 }}>{s.val}</p>
              <p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", padding: "0 24px", borderBottom: "1px solid #ffffff08" }}>
        {[["todas","Todas"],["pendiente","Pendientes"],["aprobada","Aprobadas"]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            flex: 1, padding: "12px 0", background: "none", border: "none",
            borderBottom: `2px solid ${filter === key ? "#8b5cf6" : "transparent"}`,
            color: filter === key ? "#8b5cf6" : "#64748b",
            fontSize: 12, fontWeight: filter === key ? 700 : 400,
            cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s",
          }}>{label}</button>
        ))}
      </div>
      <div style={{ padding: "20px 24px" }}>
        {filtered.map(p => (
          <button key={p.id} onClick={() => setSelected(p)} style={{
            width: "100%", background: "#ffffff06",
            border: `1px solid ${p.status === "aprobada" ? "#10b98120" : "#f59e0b20"}`,
            borderRadius: 20, overflow: "hidden", marginBottom: 14,
            display: "flex", cursor: "pointer", textAlign: "left",
          }}>
            <img src={p.img} alt={p.name} style={{ width: 100, height: 100, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ padding: "12px 14px", flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                <p style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 14, fontWeight: 700, lineHeight: 1.2, flex: 1, marginRight: 8 }}>{p.name}</p>
                <span style={{
                  background: p.status === "aprobada" ? "#10b98115" : "#f59e0b15",
                  border: `1px solid ${p.status === "aprobada" ? "#10b98140" : "#f59e0b40"}`,
                  borderRadius: 99, padding: "2px 8px",
                  color: p.status === "aprobada" ? "#10b981" : "#f59e0b",
                  fontSize: 10, fontWeight: 700, flexShrink: 0,
                }}>
                  {p.status === "aprobada" ? "✓ Aprobada" : "⚠️ Pendiente"}
                </span>
              </div>
              <p style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>👤 {p.owner}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'Syne',sans-serif", color: "#8b5cf6", fontSize: 14, fontWeight: 700 }}>
                  ${p.price.toLocaleString()}<span style={{ color: "#475569", fontSize: 10, fontWeight: 400 }}>/mes</span>
                </p>
                <span style={{ color: "#475569", fontSize: 11 }}>{p.city}</span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🏠</p>
            <p style={{ color: "#475569", fontSize: 14 }}>Sin propiedades en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function GuestPropertyDetail({ p, onBack, onRegister }: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e" }}>
      {zoomed && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#000000f5", display: "flex", flexDirection: "column", animation: "fadeUp .2s ease" }}>
          <div style={{ padding: "48px 20px 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 24, fontWeight: 700, lineHeight: 1 }}>${p.price.toLocaleString()}<span style={{ color: "#475569", fontSize: 12, fontWeight: 400 }}>/mes</span></p>
              <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="map" size={11} color="#94a3b8" /> {p.address}
              </p>
            </div>
            <button onClick={() => setZoomed(false)} style={{ background: "#ffffff15", backdropFilter: "blur(8px)", border: "none", borderRadius: 99, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>
              <Icon name="x" size={20} color="white" />
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src={p.images[imgIdx]} alt="" style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ padding: "16px 20px 36px", display: "flex", gap: 8, justifyContent: "center" }}>
            {p.images.map((img: string, i: number) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                width: i === imgIdx ? 52 : 44, height: 44, borderRadius: 10, overflow: "hidden",
                border: `2px solid ${i === imgIdx ? "#3b82f6" : "transparent"}`,
                padding: 0, cursor: "pointer", transition: "all .2s", flexShrink: 0,
              }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ position: "relative", height: "45vh", overflow: "hidden" }}>
        <img src={p.images[imgIdx]} alt="" onClick={() => setZoomed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #00000040, transparent 40%, #0a0f1e 100%)", pointerEvents: "none" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "#000000a0", backdropFilter: "blur(8px)", border: "none", borderRadius: 99, width: 38, height: 38, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="back" size={16} color="white" />
        </button>
        <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {p.images.map((_: any, i: number) => (
            <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 99, background: i === imgIdx ? "#3b82f6" : "#ffffff50", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "0 24px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{p.name}</h2>
            <p style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}><Icon name="map" size={12} color="#64748b" /> {p.address}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 22, fontWeight: 700 }}>${p.price.toLocaleString()}</p>
            <p style={{ color: "#64748b", fontSize: 11 }}>/mes</p>
          </div>
        </div>
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 16, padding: 18, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#64748b", fontSize: 12 }}>Depósito requerido</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f59e0b", fontSize: 18, fontWeight: 700 }}>${p.deposit.toLocaleString()}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#64748b", fontSize: 12 }}>Renta mensual</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 18, fontWeight: 700 }}>${p.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <button onClick={onRegister} className="btn-glow" style={{
          width: "100%", background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          border: "none", borderRadius: 14, padding: "16px", marginBottom: 16, cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all .3s",
        }}>
          <p style={{ color: "white", fontSize: 14, fontWeight: 700 }}>🏠 ¿Te interesa esta propiedad?</p>
          <p style={{ color: "#bfdbfe", fontSize: 12 }}>Crea una cuenta para solicitar la renta</p>
        </button>
      </div>
    </div>
  );
}

export function GuestFilter({ onBack, onContinue }: any) {
  const [state, setState] = useState("Baja California");
  const [city, setCity] = useState("Tijuana");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 28px", borderBottom: "1px solid #ffffff08" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>
          <Icon name="back" size={16} /> Regresar
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="36" height="24" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 8px #3b82f650)" }}>
            <path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
            <path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
            <path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
          </svg>
          <div>
            <h1 style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Baja Renta</h1>
            <p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>Selecciona tu ubicación</p>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "32px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Estado</h3>
          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 16 }}>Desliza para seleccionar</p>
          <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 18, overflow: "hidden" }}>
            <DrumPicker items={GUEST_STATES} selected={state} onSelect={setState} color="#3b82f6" />
          </div>
        </div>
        <div style={{ height: 1, background: "#ffffff08", marginBottom: 32 }} />
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Ciudad</h3>
          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 16 }}>Desliza para seleccionar</p>
          <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 18, overflow: "hidden" }}>
            <DrumPicker items={GUEST_CITIES} selected={city} onSelect={setCity} color="#6366f1" />
          </div>
        </div>
        <div style={{ background: "#3b82f610", border: "1px solid #3b82f630", borderRadius: 14, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="map" size={16} color="#3b82f6" />
          <p style={{ color: "#93c5fd", fontSize: 14, fontWeight: 600 }}>{city}, {state}</p>
        </div>
        <button onClick={() => onContinue({ state, city })} className="btn-glow" style={{
          width: "100%", background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          border: "none", borderRadius: 16, padding: "18px", color: "white",
          fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
          transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          Ver propiedades → 
        </button>
      </div>
    </div>
  );
}

export function GuestCatalog({ onBack, filters, onRegister }: any) {
  const [selected, setSelected] = useState<any>(null);

  if (selected) {
    return <GuestPropertyDetail p={selected} onBack={() => setSelected(null)} onRegister={onRegister} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 32 }}>
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #ffffff08" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>
          <Icon name="back" size={16} /> Regresar
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="36" height="24" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 8px #3b82f650)" }}>
            <path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
            <path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
            <path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
          </svg>
          <div>
            <h1 style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Baja Renta</h1>
            <p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>Catálogo de propiedades</p>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>{PROPERTIES.length} propiedades disponibles</p>
        {PROPERTIES.map(p => (
          <button key={p.id} onClick={() => setSelected(p)} style={{
            width: "100%", background: "#ffffff06", border: "1px solid #ffffff10",
            borderRadius: 20, overflow: "hidden", marginBottom: 16, display: "flex", cursor: "pointer", textAlign: "left",
          }}>
            <img src={p.images[0]} alt={p.name} style={{ width: 110, height: 110, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ padding: "14px 14px", flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ background: "#3b82f620", border: "1px solid #3b82f640", borderRadius: 99, padding: "2px 8px", color: "#93c5fd", fontSize: 10, fontWeight: 700 }}>{p.type}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 14, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>{p.name}</p>
              <p style={{ color: "#64748b", fontSize: 11, marginBottom: 8, display: "flex", alignItems: "center", gap: 3 }}>
                <Icon name="map" size={10} color="#64748b" /> {p.city}, {p.state}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 16, fontWeight: 700 }}>
                  ${p.price.toLocaleString()}<span style={{ color: "#475569", fontSize: 10, fontWeight: 400 }}>/mes</span>
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ color: "#64748b", fontSize: 11 }}>🛏️ {p.bedrooms}</span>
                  <span style={{ color: "#64748b", fontSize: 11 }}>🚿 {p.bathrooms}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
