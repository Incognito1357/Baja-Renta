import { useState, useRef } from 'react';
import { Icon } from '../Icons';
import { FaceCapture } from '../components/Shared';

export function SplashScreen({ onStart }: any) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 50%, #0a1628 100%)" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", background: `radial-gradient(circle, ${["#3b82f640","#10b98140","#6366f140","#f59e0b30","#ec489930","#06b6d440"][i]} 0%, transparent 70%)`, width: `${[300,200,250,180,220,160][i]}px`, height: `${[300,200,250,180,220,160][i]}px`, left: `${[10,60,5,70,40,80][i]}%`, top: `${[10,5,60,55,30,75][i]}%`, transform: "translate(-50%,-50%)", animation: `pulse${i} ${[8,6,10,7,9,5][i]}s ease-in-out infinite` }} />
      ))}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", animation: "fadeUp .8s ease forwards", padding: "0 32px" }}>
        <div style={{ margin: "0 auto 16px", filter: "drop-shadow(0 0 24px #3b82f680)" }}>
          <svg width="110" height="72" viewBox="0 0 110 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18 C22 6, 38 6, 50 18 C62 30, 78 30, 100 18" stroke="white" strokeWidth="9" strokeLinecap="round"/><path d="M10 36 C22 24, 38 24, 50 36 C62 48, 78 48, 100 36" stroke="white" strokeWidth="9" strokeLinecap="round"/><path d="M10 54 C22 42, 38 42, 50 54 C62 66, 78 66, 100 54" stroke="white" strokeWidth="9" strokeLinecap="round"/></svg>
        </div>
        <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: 46, fontWeight: 700, color: "white", lineHeight: 1, textShadow: "0 2px 20px #3b82f640" }}>Baja Renta</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, marginTop: 8, fontWeight: 300 }}>Desliza, conecta y vive!</p>
        <p style={{ color: "#cbd5e1", fontSize: 17, lineHeight: 1.6, maxWidth: 300, margin: "32px auto 40px" }}>Bienvenido y gracias por tu preferencia, significa mucho para nosotros.</p>
        <button className="btn-glow" onClick={onStart} style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "white", border: "none", borderRadius: 16, padding: "18px 48px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all .3s", fontFamily: "'DM Sans', sans-serif", letterSpacing: .5 }}>Comenzar →</button>
        <p style={{ color: "#334155", fontSize: 12, marginTop: 24 }}>Al continuar aceptas nuestros <a href="#" style={{ color: "#3b82f6", textDecoration: "underline", fontWeight: 600 }}>Términos y Condiciones</a> y el <a href="#" style={{ color: "#10b981", textDecoration: "underline", fontWeight: 600 }}>Aviso de Privacidad</a></p>
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ position: "absolute", bottom: `${[10,18,8][i]}%`, left: `${[5,45,80][i]}%`, opacity: .05, transform: `scale(${[2,1.5,1.8][i]})` }}>
          <svg width="60" height="40" viewBox="0 0 110 72" fill="none"><path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="white" strokeWidth="9" strokeLinecap="round"/><path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="white" strokeWidth="9" strokeLinecap="round"/><path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="white" strokeWidth="9" strokeLinecap="round"/></svg>
        </div>
      ))}
    </div>
  );
}

export function ProfileSelect({ onSelect }: any) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 100%)", padding: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <svg width="80" height="52" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 16px #3b82f660)" }}><path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/><path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/><path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/></svg>
        <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: 32, fontWeight: 700, color: "white", marginTop: 6, lineHeight: 1 }}>Baja Renta</h1>
      </div>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>¿Cómo deseas continuar?</h2>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32, textAlign: "center" }}>Selecciona tu perfil</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 380 }}>
        {[
          { key: "visitor", icon: "user", title: "Soy Visitante", desc: "Busco rentar una propiedad", grad: "#3b82f6, #6366f1" },
          { key: "owner", icon: "upload", title: "Soy Propietario", desc: "Quiero publicar mi propiedad", grad: "#10b981, #059669" },
        ].map((p: any) => (
          <button key={p.key} onClick={() => onSelect(p.key)} className="opt-btn" style={{ background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 20, padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all .3s", color: "white", textAlign: "left" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${p.grad})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={p.icon} size={22} color="white" /></div>
            <div><div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700 }}>{p.title}</div><div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{p.desc}</div></div>
          </button>
        ))}
        <button onClick={() => onSelect("guest")} style={{ background: "transparent", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", padding: "12px", textDecoration: "underline", fontFamily: "'DM Sans', sans-serif" }}>Continuar sin registrarme</button>
      </div>
    </div>
  );
}

export function FilterSlide({ step, stepIndex, total, filters, onAnswer, onNext, onBack }: any) {
  const [selected, setSelected] = useState<any>(null);
  const [priceMin, setPriceMin] = useState(filters.priceMin || 5000);
  const [priceMax, setPriceMax] = useState(filters.priceMax || 25000);

  const handleNext = () => {
    if (!step.isPrice && !selected) return;
    if (step.isPrice) onAnswer({ priceMin, priceMax });
    else if (selected) onAnswer({ [step.key]: selected });
    onNext();
  };

  const canAdvance = step.isPrice || !!selected;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(160deg, #0a0f1e 0%, #0d1f3c 100%)", padding: "32px 24px" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
        {[...Array(total)].map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= stepIndex ? "linear-gradient(90deg, #3b82f6, #6366f1)" : "#ffffff15", transition: "background .4s" }} />
        ))}
      </div>
      <p style={{ color: "#64748b", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Paso {stepIndex + 1} de {total}</p>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 32, lineHeight: 1.3 }}>{step.label}</h2>
      {step.isPrice ? (
        <div style={{ flex: 1 }}>
          <div style={{ background: "#ffffff08", borderRadius: 20, padding: 24, border: "1px solid #ffffff10", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <div><p style={{ color: "#64748b", fontSize: 12 }}>Mínimo</p><p style={{ color: "#3b82f6", fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 700 }}>${priceMin.toLocaleString()}</p></div>
              <div style={{ textAlign: "right" }}><p style={{ color: "#64748b", fontSize: 12 }}>Máximo</p><p style={{ color: "#6366f1", fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 700 }}>${priceMax.toLocaleString()}</p></div>
            </div>
            {[
              { label: "Mínimo", val: priceMin, set: setPriceMin, color: "#3b82f6" },
              { label: "Máximo", val: priceMax, set: setPriceMax, color: "#6366f1" },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 8 }}>{s.label}</label>
                <input type="range" min={3000} max={60000} step={500} value={s.val} onChange={e => s.set(Number(e.target.value))} style={{ width: "100%", accentColor: s.color }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {step.options.map((opt: any) => (
            <button key={opt} onClick={() => setSelected(opt)} className={`opt-btn${selected === opt ? " selected" : ""}`} style={{ background: selected === opt ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff08", border: `1px solid ${selected === opt ? "transparent" : "#ffffff15"}`, borderRadius: 16, padding: "16px 20px", cursor: "pointer", color: "white", fontSize: 15, textAlign: "left", fontFamily: "'DM Sans', sans-serif", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {opt}{selected === opt && <Icon name="check" size={16} color="white" />}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        {stepIndex > 0 && <button onClick={onBack} style={{ flex: 1, background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 16, padding: "16px", color: "#94a3b8", cursor: "pointer", fontSize: 15, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon name="back" size={16} /> Regresar</button>}
        <button onClick={() => { if (canAdvance) handleNext(); }} style={{ flex: 2, background: canAdvance ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#1e293b", border: `1px solid ${canAdvance ? "transparent" : "#ffffff10"}`, borderRadius: 16, padding: "16px", color: canAdvance ? "white" : "#334155", cursor: canAdvance ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .3s", pointerEvents: canAdvance ? "auto" : "none", opacity: canAdvance ? 1 : 0.5 }}>{stepIndex === total - 1 ? "Ver propiedades" : "Siguiente"} <Icon name="arrow" size={16} color={canAdvance ? "white" : "#475569"} /></button>
      </div>
    </div>
  );
}

export function SettingsScreen({ onBack, onSignOut }: any) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [emails, setEmails] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 48 }}>
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #ffffff08" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
          <div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Configuración</h2><p style={{ color: "#64748b", fontSize: 12, marginTop: 3 }}>Ajustes de tu cuenta</p></div>
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 20, padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="user" size={26} color="white" /></div><div><p style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 16, fontWeight: 700 }}>Mi Perfil</p><p style={{ color: "#64748b", fontSize: 13 }}>Visitante · Baja California</p></div></div>
          {[
            { label: "Nombre", val: "Usuario Baja Renta" },
            { label: "Correo", val: "usuario@email.com" },
            { label: "Teléfono", val: "664 000 0000" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #ffffff08" }}><span style={{ color: "#64748b", fontSize: 13 }}>{r.label}</span><span style={{ color: "#94a3b8", fontSize: 13 }}>{r.val}</span></div>
          ))}
          <button style={{ width: "100%", marginTop: 14, background: "#3b82f615", border: "1px solid #3b82f630", borderRadius: 12, padding: "11px", color: "#3b82f6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>✏️ Editar perfil</button>
        </div>
        <p style={{ color: "#475569", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Notificaciones</p>
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
          {[
            { label: "Notificaciones push", icon: "🔔", val: notifications, set: setNotifications },
            { label: "Correo electrónico", icon: "✉️", val: emails, set: setEmails },
            { label: "Modo oscuro", icon: "🌙", val: darkMode, set: setDarkMode },
          ].map((s: any, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: i < arr.length - 1 ? "1px solid #ffffff08" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18 }}>{s.icon}</span><span style={{ color: "white", fontSize: 14 }}>{s.label}</span></div>
              <button onClick={() => s.set((v: boolean) => !v)} style={{ width: 48, height: 26, borderRadius: 99, border: "none", cursor: "pointer", background: s.val ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#334155", position: "relative", transition: "background .3s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: s.val ? 25 : 3, transition: "left .3s" }} />
              </button>
            </div>
          ))}
        </div>
        <p style={{ color: "#475569", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Cuenta</p>
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
          {[
            { label: "Cambiar contraseña", icon: "🔒" }, { label: "Privacidad y seguridad", icon: "🛡️" },
            { label: "Términos de servicio", icon: "📄" }, { label: "Ayuda y soporte", icon: "💬" },
          ].map((item, i, arr) => (
            <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: i < arr.length - 1 ? "1px solid #ffffff08" : "none", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18 }}>{item.icon}</span><span style={{ color: "white", fontSize: 14 }}>{item.label}</span></div>
              <Icon name="arrow" size={14} color="#475569" />
            </button>
          ))}
        </div>
        <button onClick={onSignOut} style={{ width: "100%", background: "#ef444415", border: "1px solid #ef444430", borderRadius: 16, padding: "16px", color: "#ef4444", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>🚪 Cerrar sesión</button>
      </div>
    </div>
  );
}

export function PropertyCard({ property, onLike, onDislike, onSettings, onFilter }: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [action, setAction] = useState<any>(null);
  const startX = useRef<any>(null);

  const handleAction = (type: string) => {
    setAction(type);
    if (type === "dislike") {
      setTimeout(() => setAction(null), 1000);
      setTimeout(() => onDislike(), 400);
    } else {
      setTimeout(() => onLike(property), 400);
    }
  };

  const handleTouchStart = (e: any) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: any) => {
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 60) handleAction(diff > 0 ? "like" : "dislike");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", animation: "cardIn .4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 20px 12px", position: "relative", zIndex: 10 }}>
        <button onClick={() => onFilter && onFilter()} style={{ width: 40, height: 40, borderRadius: "50%", background: "#ffffff12", backdropFilter: "blur(8px)", border: "1px solid #ffffff20", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg></button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "absolute", left: "50%", transform: "translateX(-50%)" }}><svg width="28" height="18" viewBox="0 0 110 72" fill="none"><path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" /><path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" /><path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" /></svg><span style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontSize: 18, fontWeight: 700 }}>Baja Renta</span></div>
        <button onClick={onSettings} style={{ width: 40, height: 40, borderRadius: "50%", background: "#ffffff12", backdropFilter: "blur(8px)", border: "1px solid #ffffff20", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
      </div>
      <div style={{ position: "relative", height: "55vh", overflow: "hidden" }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <img src={property.images[imgIdx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: action === "like" ? "brightness(1.2) saturate(1.2)" : action === "dislike" ? "brightness(.7) saturate(.5)" : "none", transition: "filter .3s" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #00000020 0%, transparent 30%, #0a0f1e 100%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {property.images.map((_: any, i: number) => (
            <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 99, background: i === imgIdx ? "#3b82f6" : "#ffffff50", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 20, left: 20, background: "#000000a0", backdropFilter: "blur(8px)", borderRadius: 99, padding: "6px 14px", color: "white", fontSize: 12, fontWeight: 600 }}>{property.type}</div>
        {action === "like" && <div style={{ position: "absolute", top: 20, right: 20, background: "#10b98180", backdropFilter: "blur(8px)", borderRadius: 99, padding: "8px 18px", color: "white", fontSize: 14, fontWeight: 700, animation: "fadeUp .3s ease" }}>❤️ LIKE</div>}
        {action === "dislike" && <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", background: "#ef444490", backdropFilter: "blur(8px)", borderRadius: 99, padding: "8px 24px", color: "white", fontSize: 16, fontWeight: 800, animation: "fadeUp .3s ease", whiteSpace: "nowrap" }}>✕ SKIP</div>}
      </div>
      <div style={{ flex: 1, padding: "16px 24px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{property.name}</h2><div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: 13 }}><Icon name="map" size={12} color="#64748b" /> {property.city}, {property.state}</div></div>
          <div style={{ textAlign: "right" }}><p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 18, fontWeight: 700 }}>${property.price.toLocaleString()}</p><p style={{ color: "#64748b", fontSize: 11 }}>/mes</p></div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {[
            { icon: "bed", val: `${property.bedrooms} rec` }, { icon: "bath", val: `${property.bathrooms} baños` },
            property.pool && { icon: "pool", val: "Alberca" }, property.petFriendly && { icon: "pet", val: "Pet Friendly" },
            { icon: "car", val: property.parking }, property.kidsAllowed && { icon: "kids", val: "Niños OK" },
          ].filter(Boolean).map((f: any, i: number) => (
            <span key={i} style={{ background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 99, padding: "5px 12px", color: "#94a3b8", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}><Icon name={f.icon} size={11} color="#3b82f6" /> {f.val}</span>
          ))}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "20px 48px 32px", background: "linear-gradient(to top, #0a0f1e 80%, transparent)", display: "flex", justifyContent: "center", gap: 32 }}>
        <button className="dislike-btn" onClick={() => handleAction("dislike")} style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #ef4444", background: "#ef444415", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}><Icon name="x" size={26} color="#ef4444" /></button>
        <button className="like-btn" onClick={() => handleAction("like")} style={{ width: 72, height: 72, borderRadius: "50%", border: "none", background: "linear-gradient(135deg, #10b981, #059669)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", boxShadow: "0 0 20px #10b98150" }}><Icon name="heart" size={30} color="white" /></button>
      </div>
    </div>
  );
}

export function PropertyDetail({ property, onBack, onRent }: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [contract, setContract] = useState("12");
  const [step, setStep] = useState("info");
  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", workPhone: "", job: "", income: "", refs: [{name:"",phone:"",relation:""},{name:"",phone:"",relation:""},{name:"",phone:"",relation:""}] });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [approved, setApproved] = useState(false);
  const setF = (k: string, v: string) => setAppForm(f => ({ ...f, [k]: v }));
  const setRef = (i: number, field: string, v: string) => setAppForm((f: any) => { const r = [...f.refs]; r[i] = { ...r[i], [field]: v }; return { ...f, refs: r }; });
  const appReady = appForm.name && appForm.email && appForm.phone && appForm.job && appForm.income;
  const deposit = property.deposit;
  const monthly = property.price;

  if (step === "apply") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 48 }}>
        <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #ffffff08" }}>
          <button onClick={() => setStep("info")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}><img src={property.images[0]} alt="" style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", border: "1px solid #3b82f630" }} /><div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{property.name}</h2><p style={{ color: "#3b82f6", fontSize: 12, marginTop: 3, fontWeight: 600 }}>📋 Solicitud de renta</p></div></div>
        </div>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>👤 Información personal</h3>
          {[
            { key: "name", ph: "Nombre completo", icon: "👤", type: "text" }, { key: "email", ph: "Correo electrónico", icon: "✉️", type: "email" },
            { key: "phone", ph: "Teléfono / WhatsApp", icon: "📱", type: "tel" }, { key: "workPhone", ph: "Teléfono de trabajo", icon: "☎️", type: "tel" },
            { key: "job", ph: "Empleo / Ocupación", icon: "💼", type: "text" }, { key: "income", ph: "Ingreso mensual (MXN)", icon: "💰", type: "number" },
          ].map(f => (
            <div key={f.key} style={{ position: "relative", marginBottom: 10 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{f.icon}</span><input placeholder={f.ph} type={f.type} value={(appForm as any)[f.key]} onChange={e => setF(f.key, e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${(appForm as any)[f.key] ? "#3b82f650" : "#ffffff15"}`, borderRadius: 12, padding: "13px 16px 13px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
          ))}
          <h3 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 6, marginTop: 20 }}>📞 3 Referencias personales</h3>
          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Nombre y teléfono de cada referencia</p>
          {appForm.refs.map((r, i) => (
            <div key={i} style={{ background: "#ffffff06", border: `1px solid ${(r.name && r.phone) ? "#3b82f640" : "#ffffff10"}`, borderRadius: 14, padding: "14px", marginBottom: 12 }}>
              <p style={{ color: "#64748b", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Referencia {i + 1}</p>
              <div style={{ position: "relative", marginBottom: 8 }}><span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>👤</span><input placeholder="Nombre completo" value={r.name} onChange={e => setRef(i, "name", e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${r.name ? "#3b82f650" : "#ffffff15"}`, borderRadius: 10, padding: "11px 14px 11px 36px", color: "white", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
              <div style={{ position: "relative", marginBottom: 8 }}><span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>📱</span><input placeholder="Número de teléfono" type="tel" value={r.phone} onChange={e => setRef(i, "phone", e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${r.phone ? "#3b82f650" : "#ffffff15"}`, borderRadius: 10, padding: "11px 14px 11px 36px", color: "white", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
              <div style={{ position: "relative", marginBottom: r.phone ? 8 : 0 }}><span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🤝</span><input placeholder="Relación (ej. Jefe, Amigo, Familiar)" type="text" value={r.relation} onChange={e => setRef(i, "relation", e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${r.relation ? "#3b82f650" : "#ffffff15"}`, borderRadius: 10, padding: "11px 14px 11px 36px", color: "white", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
              {r.phone && <a href={`tel:${r.phone.replace(/\D/g,"")}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#10b98115", border: "1px solid #10b98130", borderRadius: 10, padding: "8px 12px", color: "#10b981", fontSize: 12, fontWeight: 600, textDecoration: "none", marginTop: 8 }}>📞 Llamar a referencia</a>}
            </div>
          ))}
          <h3 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 6, marginTop: 20 }}>📎 Documentos requeridos</h3>
          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Sube tus documentos para ser considerado</p>
          {[
            { label: "INE / Identificación oficial", icon: "🪪" }, { label: "Comprobante de ingresos", icon: "💼" }, { label: "Estado de cuenta (3 meses)", icon: "🏦" },
          ].map((doc, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ffffff06", border: "1px solid #3b82f620", borderRadius: 14, padding: "13px 16px", marginBottom: 8, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 18 }}>{doc.icon}</span><p style={{ color: "#94a3b8", fontSize: 13 }}>{doc.label}</p></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#3b82f6", fontSize: 11, fontWeight: 600 }}>Subir</span><div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3b82f620", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="upload" size={13} color="#3b82f6" /></div></div>
              <input type="file" accept=".pdf,.jpg,.png" style={{ display: "none" }} />
            </label>
          ))}
          <h3 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 15, fontWeight: 700, marginBottom: 6, marginTop: 20 }}>🎥 Foto de perfil y video de verificación</h3>
          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Se tomará una foto de perfil y un video de 5 segundos para verificar tu identidad.</p>
          <FaceCapture onPhotoCapture={(u:any) => setProfilePhoto(u)} />
          <button onClick={() => appReady && setStep("pending")} className="btn-glow" style={{ width: "100%", background: appReady ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: appReady ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon name="upload" size={18} color="white" /> Solicitar rentar propiedad</button>
          <p style={{ color: "#475569", fontSize: 12, textAlign: "center", marginTop: 8 }}>Tu solicitud será enviada al propietario</p>
        </div>
      </div>
    );
  }

  if (step === "pending") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <button onClick={() => setStep("apply")} style={{ position: "absolute", top: 48, left: 24, background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        {approved ? (
          <>
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 40px #10b98150" }}><Icon name="check" size={42} color="white" /></div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>¡Solicitud aprobada!</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32, maxWidth: 300, lineHeight: 1.6 }}>El propietario ha aprobado tu solicitud. Ya puedes proceder con el pago.</p>
            <div style={{ background: "#10b98115", border: "1px solid #10b98130", borderRadius: 14, padding: "12px 24px", marginBottom: 32 }}><p style={{ color: "#10b981", fontSize: 14, fontWeight: 700 }}>✓ Aprobado por el propietario</p></div>
            <button onClick={() => setStep("payment")} className="btn-glow" style={{ width: "100%", maxWidth: 340, background: "linear-gradient(135deg, #3b82f6, #6366f1)", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon name="card" size={18} color="white" /> Realizar pago de 1ª mensualidad</button>
          </>
        ) : (
          <>
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#f59e0b15", border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ fontSize: 40 }}>⏳</span></div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Solicitud enviada</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24, maxWidth: 300, lineHeight: 1.6 }}>Tu solicitud fue enviada al propietario. Recibirás una notificación cuando sea revisada.</p>
            <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 14, padding: "14px 20px", marginBottom: 32, width: "100%", maxWidth: 340 }}><p style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>⚠️ Pendiente de aprobación</p><p style={{ color: "#78716c", fontSize: 12 }}>El propietario revisará tus documentos</p></div>
            <button onClick={() => setApproved(true)} style={{ background: "#ffffff08", border: "1px dashed #ffffff20", borderRadius: 12, padding: "10px 20px", color: "#475569", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 8 }}>[Demo] Simular aprobación del propietario</button>
            <button disabled style={{ width: "100%", maxWidth: 340, background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 16, padding: "18px", color: "#334155", fontSize: 15, fontWeight: 700, cursor: "not-allowed", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>🔒 Realizar pago — pendiente de aprobación</button>
          </>
        )}
      </div>
    );
  }

  const features = [
    { emoji: "🛏️", label: "Recámaras", val: property.bedrooms }, { emoji: "🚿", label: "Baños", val: property.bathrooms },
    { emoji: property.floors === 1 ? "🏠" : "🏢", label: "Pisos", val: property.floors === 1 ? "1 piso" : `${property.floors} pisos` },
    { emoji: "🛋️", label: "Sala", val: property.livingRoom ? "✓" : "✗" }, { emoji: "🍽️", label: "Comedor", val: property.diningRoom ? "✓" : "✗" },
    { emoji: "🍳", label: "Cocina", val: property.kitchen ? "✓" : "✗" }, { emoji: "🧺", label: "Cuarto lavado", val: property.laundry ? "✓" : "✗" },
    { emoji: "🌿", label: "Patio", val: property.patio ? "✓" : "✗" }, { emoji: "🏊", label: "Alberca", val: property.pool ? "✓" : "✗" },
    { emoji: "🐾", label: "Pet Friendly", val: property.petFriendly ? "✓" : "✗" }, { emoji: "🚗", label: "Estacionamiento", val: property.parking },
    { emoji: "👶", label: "Niños", val: property.kidsAllowed ? "Sí" : "No" },
  ];

  if (step === "payment") {
    const total = monthly;
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "32px 24px", animation: "slideDetail .4s ease" }}>
        <button onClick={() => setStep("info")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Primer pago</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 32 }}>{property.name}</p>
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}><span style={{ color: "#94a3b8", fontSize: 14 }}>1ra mensualidad</span><span style={{ color: "white", fontWeight: 600, fontFamily: "'Syne',sans-serif" }}>${monthly.toLocaleString()}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 0", borderTop: "1px solid #ffffff10" }}><span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>Total</span><span style={{ color: "#3b82f6", fontWeight: 800, fontSize: 20, fontFamily: "'Syne',sans-serif" }}>${total.toLocaleString()}</span></div>
        </div>
        <h3 style={{ color: "white", fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: "'Syne',sans-serif" }}>Datos de pago</h3>
        {[
          { ph: "Nombre en la tarjeta" }, { ph: "Número de tarjeta", type: "number" }, { ph: "MM/AA — CVV" },
        ].map((f, i) => (
          <input key={i} placeholder={f.ph} type={f.type || "text"} style={{ display: "block", width: "100%", background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", marginBottom: 12 }} />
        ))}
        <button onClick={onRent} className="btn-glow" style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginTop: 8, transition: "all .3s" }}><Icon name="card" size={18} color="white" /> &nbsp;Pagar ${total.toLocaleString()}</button>
        <p style={{ color: "#475569", fontSize: 12, textAlign: "center", marginTop: 12 }}>Pago seguro con encriptación SSL</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", animation: "slideDetail .4s ease" }}>
      <div style={{ position: "relative", height: "45vh", overflow: "hidden" }}>
        <img src={property.images[imgIdx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #00000040, transparent 40%, #0a0f1e 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "#000000a0", backdropFilter: "blur(8px)", border: "none", borderRadius: 99, width: 38, height: 38, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="back" size={16} color="white" /></button>
        <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {property.images.map((_: any, i: number) => (
            <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 99, background: i === imgIdx ? "#3b82f6" : "#ffffff50", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "0 24px 120px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div><h1 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{property.name}</h1><p style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}><Icon name="map" size={12} color="#64748b" /> {property.address}</p></div>
          <div style={{ textAlign: "right" }}><p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 20, fontWeight: 700 }}>${monthly.toLocaleString()}</p><p style={{ color: "#64748b", fontSize: 11 }}>/mes</p></div>
        </div>
        <h3 style={{ color: "white", fontSize: 15, fontWeight: 700, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>Características</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
          {features.map((f: any, i: number) => (
            <div key={i} style={{ background: "#ffffff06", borderRadius: 12, padding: "12px 14px", border: "1px solid #ffffff08" }}>
              <p style={{ color: "#64748b", fontSize: 11, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>{f.emoji ? <span style={{ fontSize: 13 }}>{f.emoji}</span> : f.icon ? <Icon name={f.icon} size={11} color="#64748b" /> : null}{f.label}</p>
              <p style={{ color: "white", fontWeight: 600, fontSize: 14 }}>{f.val}</p>
            </div>
          ))}
        </div>
        <h3 style={{ color: "white", fontSize: 15, fontWeight: 700, marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Condiciones de renta</h3>
        <div style={{ background: "#ffffff06", borderRadius: 20, padding: 20, border: "1px solid #ffffff10", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><div><p style={{ color: "#64748b", fontSize: 12 }}>Depósito requerido</p><p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f59e0b", fontSize: 20, fontWeight: 700 }}>${deposit.toLocaleString()}</p></div><div style={{ textAlign: "right" }}><p style={{ color: "#64748b", fontSize: 12 }}>Renta mensual</p><p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 20, fontWeight: 700 }}>${monthly.toLocaleString()}</p></div></div>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>Duración del contrato</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[["6", "6 meses"], ["12", "1 año"]].map(([val, label]) => (
              <button key={val} onClick={() => setContract(val)} style={{ flex: 1, padding: "10px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, background: contract === val ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff08", border: `1px solid ${contract === val ? "transparent" : "#ffffff15"}`, color: "white", fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 24px 32px", background: "linear-gradient(to top, #0a0f1e 70%, transparent)" }}>
        <button onClick={() => setStep("apply")} className="btn-glow" style={{ width: "100%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="card" size={18} color="white" /> Rentar esta propiedad
        </button>
      </div>
    </div>
  );
}

export function SuccessScreen({ onRestart }: any) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 50px #10b98150" }}><Icon name="check" size={48} color="white" /></div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>¡Pago exitoso!</h2>
      <p style={{ color: "#64748b", fontSize: 15, marginBottom: 40, maxWidth: 300 }}>Tu reserva ha sido confirmada. Recibirás los detalles de tu contrato por correo.</p>
      <button onClick={onRestart} className="btn-glow" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", border: "none", borderRadius: 16, padding: "16px 40px", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Volver al inicio</button>
    </div>
  );
}
