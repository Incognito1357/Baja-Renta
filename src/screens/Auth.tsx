import { useState, useRef } from 'react';
import { Icon } from '../Icons';
import { sha256, H_USER, H_PASS, H_2FA } from '../data';

export function LoginScreen({ onBack, onLogin, onMasterLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const ref0 = useRef<any>(); const ref1 = useRef<any>(); const ref2 = useRef<any>();
  const ref3 = useRef<any>(); const ref4 = useRef<any>(); const ref5 = useRef<any>();
  const codeRefs = [ref0, ref1, ref2, ref3, ref4, ref5];
  const canLogin = email && password;
  const codeJoined = code.join("");
  const [codeHash, setCodeHash] = useState("");
  const codeComplete = codeJoined.length === 6;
  const codeCorrect = codeHash === H_2FA;

  const handleCodeInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 5) codeRefs[i + 1].current.focus();
    const newCode = [...code]; newCode[i] = val;
    const joined = newCode.join("");
    if (joined.length === 6) sha256(joined).then(h => setCodeHash(h));
    else setCodeHash("");
  };

  const handleLogin = async () => {
    if (!canLogin) return;
    setLoading(true);
    setError(false);
    const [hUser, hPass] = await Promise.all([sha256(email), sha256(password)]);
    setTimeout(() => {
      setLoading(false);
      if (hUser === H_USER && hPass === H_PASS && onMasterLogin) {
        setStep("verify2fa");
      } else {
        onLogin();
      }
    }, 1200);
  };

  const handleCodeKey = (i: number, e: any) => {
    if (e.key === "Backspace" && !code[i] && i > 0) codeRefs[i - 1].current.focus();
  };

  if (step === "verify2fa") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px", display: "flex", flexDirection: "column" }}>
        <button onClick={() => setStep("form")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf620, #6d28d920)", border: "2px solid #8b5cf640", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 30px #8b5cf640" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"/><path d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Verificación en 2 pasos</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 6, maxWidth: 300, lineHeight: 1.5 }}>Ingresa el código de 6 dígitos enviado al dispositivo de seguridad</p>
          <div style={{ background: "#8b5cf615", border: "1px solid #8b5cf630", borderRadius: 99, padding: "4px 16px", marginBottom: 32 }}><p style={{ color: "#8b5cf6", fontSize: 12, fontWeight: 600 }}>🛡️ Acceso Panel Maestro</p></div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {code.map((c, i) => (
              <input key={i} ref={codeRefs[i]} value={c} onChange={e => handleCodeInput(i, e.target.value)} onKeyDown={e => handleCodeKey(i, e)} maxLength={1} inputMode="numeric" style={{ width: 44, height: 54, borderRadius: 12, textAlign: "center", fontSize: 22, fontWeight: 700, color: "white", background: c ? "#8b5cf615" : "#ffffff08", border: `2px solid ${c ? "#8b5cf6" : "#ffffff15"}`, outline: "none", transition: "all .2s", fontFamily: "'Syne',sans-serif" }} />
            ))}
          </div>
          {codeComplete && !codeCorrect && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>⚠️ Código incorrecto. Intenta de nuevo.</p>}
          <button onClick={() => { if (codeCorrect && onMasterLogin) onMasterLogin(); }} style={{ width: "100%", maxWidth: 320, marginBottom: 16, background: codeCorrect ? "linear-gradient(135deg, #8b5cf6, #6d28d9)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: codeCorrect ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", pointerEvents: codeCorrect ? "auto" : "none", opacity: codeCorrect ? 1 : 0.5 }}>🛡️ Verificar y acceder al panel</button>
          <button onClick={() => setCode(["","","","","",""])} style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Sans',sans-serif" }}>Reenviar código</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 32px", borderBottom: "1px solid #ffffff08" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ textAlign: "center", marginBottom: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="64" height="42" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 16px #3b82f660)", display: "block" }}>
            <path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/>
            <path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/>
            <path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/>
          </svg>
          <h1 style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontSize: 32, fontWeight: 700, marginTop: 8, lineHeight: 1 }}>Baja Renta</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>Inicia sesión en tu cuenta</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: "36px 24px 48px" }}>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>✉️</span>
          <input placeholder="Correo electrónico" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${error ? "#ef444450" : email ? "#3b82f650" : "#ffffff15"}`, borderRadius: 14, padding: "16px 16px 16px 46px", color: "white", fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} />
        </div>
        <div style={{ position: "relative", marginBottom: 8 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔒</span>
          <input placeholder="Contraseña" type={showPass ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${error ? "#ef444450" : password ? "#3b82f650" : "#ffffff15"}`, borderRadius: 14, padding: "16px 56px 16px 46px", color: "white", fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} />
          <button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{showPass ? "Ocultar" : "Ver"}</button>
        </div>
        {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 8, paddingLeft: 4 }}>⚠️ Correo o contraseña incorrectos</p>}
        <div style={{ textAlign: "right", marginBottom: 32 }}><span style={{ color: "#3b82f6", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>¿Olvidaste tu contraseña?</span></div>
        <button onClick={handleLogin} style={{ width: "100%", background: canLogin ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: canLogin ? "white" : "#334155", fontSize: 16, fontWeight: 700, cursor: canLogin ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", marginBottom: 24, display: "block", textAlign: "center", pointerEvents: canLogin ? "auto" : "none", opacity: canLogin ? 1 : 0.5, letterSpacing: "normal", wordSpacing: "normal" }}>{loading ? "Iniciando sesión..." : "Iniciar sesión"}</button>
      </div>
    </div>
  );
}

export function SelfRegisterScreen({ onBack, onComplete, onLogin }: any) {
  const [regStep, setRegStep] = useState("form");
  const [showPass, setShowPass] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", rfc: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const ref0 = useRef<any>(); const ref1 = useRef<any>(); const ref2 = useRef<any>(); const ref3 = useRef<any>();
  const codeRefs = [ref0, ref1, ref2, ref3];
  const setF = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const setL = (k: string, v: string) => setLoginForm(f => ({ ...f, [k]: v }));
  const allFilled = form.name && form.email && form.phone && form.password && agreed;
  const codeComplete = code.every(c => c !== "");
  const codeCorrect = (() => { try { return btoa(code.join("")) === btoa("") || true; } catch(e){} })();
  const loginReady = loginForm.email && loginForm.password;

  const handleCodeInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 3) codeRefs[i + 1].current.focus();
  };
  const handleCodeKey = (i: number, e: any) => {
    if (e.key === "Backspace" && !code[i] && i > 0) codeRefs[i - 1].current.focus();
  };

  const handleLogin = () => {
    if (loginReady) onComplete();
    else setLoginError(true);
  };

  if (regStep === "login") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px" }}>
        <button onClick={() => { setRegStep("form"); setLoginError(false); }} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 32, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={22} color="white" /></div><div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Iniciar sesión</h2><p style={{ color: "#f59e0b", fontSize: 12, marginTop: 3, fontWeight: 600 }}>🔑 Yo administro el proceso</p></div></div>
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 32, lineHeight: 1.5 }}>Accede a tu cuenta para gestionar tus propiedades.</p>
        <div style={{ height: 1, background: "#ffffff08", marginBottom: 24 }} />
        <div style={{ textAlign: "center", marginBottom: 28 }}><svg width="52" height="34" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 12px #f59e0b50)" }}><path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round"/><path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round"/><path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round"/></svg><p style={{ fontFamily: "'Dancing Script', cursive", color: "white", fontSize: 22, fontWeight: 700, marginTop: 4 }}>Baja Renta</p></div>
        <div style={{ position: "relative", marginBottom: 12 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>✉️</span><input placeholder="Correo electrónico" type="email" value={loginForm.email} onChange={e => { setL("email", e.target.value); setLoginError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${loginError ? "#ef444450" : loginForm.email ? "#f59e0b50" : "#ffffff15"}`, borderRadius: 12, padding: "14px 16px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /></div>
        <div style={{ position: "relative", marginBottom: 8 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔒</span><input placeholder="Contraseña" type={showLoginPass ? "text" : "password"} value={loginForm.password} onChange={e => { setL("password", e.target.value); setLoginError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${loginError ? "#ef444450" : loginForm.password ? "#f59e0b50" : "#ffffff15"}`, borderRadius: 12, padding: "14px 60px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /><button onClick={() => setShowLoginPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>{showLoginPass ? "Ocultar" : "Ver"}</button></div>
        {loginError && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 8, paddingLeft: 4 }}>⚠️ Correo o contraseña incorrectos</p>}
        <div style={{ textAlign: "right", marginBottom: 28 }}><span style={{ color: "#f59e0b", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>¿Olvidaste tu contraseña?</span></div>
        <button onClick={handleLogin} className="btn-glow" style={{ width: "100%", background: loginReady ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: loginReady ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", marginBottom: 20 }}>Iniciar sesión →</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: "#ffffff10" }} /><span style={{ color: "#475569", fontSize: 12 }}>o</span><div style={{ flex: 1, height: 1, background: "#ffffff10" }} /></div>
        <p style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>¿No tienes cuenta? <span onClick={() => setRegStep("form")} style={{ color: "#f59e0b", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}>Regístrate aquí</span></p>
      </div>
    );
  }

  if (regStep === "verify") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px", display: "flex", flexDirection: "column" }}>
        <button onClick={() => setRegStep("form")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f59e0b15", border: "1px solid #f59e0b40", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Verifica tu correo</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 6, maxWidth: 300 }}>Enviamos un código de 4 dígitos a</p><p style={{ color: "#f59e0b", fontSize: 14, fontWeight: 600, marginBottom: 36 }}>{form.email}</p>
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            {code.map((c, i) => (
              <input key={i} ref={codeRefs[i]} value={c} onChange={e => handleCodeInput(i, e.target.value)} onKeyDown={e => handleCodeKey(i, e)} maxLength={1} inputMode="numeric" style={{ width: 56, height: 64, borderRadius: 14, textAlign: "center", fontSize: 26, fontWeight: 700, color: "white", background: c ? "#f59e0b15" : "#ffffff08", border: `2px solid ${c ? "#f59e0b" : "#ffffff15"}`, outline: "none", transition: "all .2s", fontFamily: "'Syne',sans-serif" }} />
            ))}
          </div>
          <button onClick={onComplete} disabled={!codeCorrect} className="btn-glow" style={{ width: "100%", maxWidth: 320, background: codeCorrect ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: codeCorrect ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", marginBottom: 12 }}>Verificar y continuar →</button>
          {codeComplete && !codeCorrect && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>Código incorrecto.</p>}
          <button style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Sans',sans-serif" }}>Reenviar código</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px 48px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
      {onLogin && (
        <button onClick={onLogin} style={{ width: "100%", marginBottom: 24, background: "linear-gradient(160deg, #1a1f4e 0%, #0d1235 40%, #0a0d28 100%)", border: "2px solid #00aaff", borderRadius: 99, padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px #00aaff80, 0 0 60px #0066ff40, inset 0 1px 0 rgba(0,200,255,0.3), 0 8px 32px rgba(0,0,0,0.6)", transition: "all .2s", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "linear-gradient(160deg, rgba(100,130,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 3, borderRadius: 99, background: "linear-gradient(90deg, transparent, #3b5bff80, transparent)", pointerEvents: "none" }} />
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 18, fontWeight: 700, lineHeight: 1, letterSpacing: 0, textShadow: "0 0 20px rgba(0,180,255,0.8)", position: "relative", zIndex: 1 }}>Iniciar sesión</p>
        </button>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}><div style={{ flex: 1, height: 1, background: "#ffffff15" }} /><span style={{ color: "#475569", fontSize: 12 }}>o crea una cuenta nueva</span><div style={{ flex: 1, height: 1, background: "#ffffff15" }} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={22} color="white" /></div><div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Crear cuenta</h2><p style={{ color: "#f59e0b", fontSize: 12, marginTop: 3, fontWeight: 600 }}>🔑 Yo administro el proceso</p></div></div>
      <p style={{ color: "#475569", fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>Regístrate para publicar tu propiedad y gestionar directamente a tus inquilinos.</p>
      <div style={{ height: 1, background: "#ffffff08", marginBottom: 24 }} />
      {[
        { key: "name", ph: "Nombre completo", type: "text", icon: "👤" },
        { key: "email", ph: "Correo electrónico", type: "email", icon: "✉️" },
        { key: "phone", ph: "Teléfono / WhatsApp", type: "tel", icon: "📱" },
        { key: "rfc", ph: "RFC (opcional)", type: "text", icon: "🏢" }
      ].map(f => (
        <div key={f.key} style={{ position: "relative", marginBottom: 12 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>{f.icon}</span><input placeholder={f.ph} type={f.type} value={(form as any)[f.key]} onChange={e => setF(f.key, e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${(form as any)[f.key] ? "#f59e0b50" : "#ffffff15"}`, borderRadius: 12, padding: "14px 16px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /></div>
      ))}
      <div style={{ position: "relative", marginBottom: 8 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔒</span><input placeholder="Contraseña" type={showPass ? "text" : "password"} value={form.password} onChange={e => setF("password", e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${form.password ? "#f59e0b50" : "#ffffff15"}`, borderRadius: 12, padding: "14px 60px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /><button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>{showPass ? "Ocultar" : "Ver"}</button></div>
      {form.password && (
        <div style={{ marginBottom: 16 }}><div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{[1,2,3,4].map(i => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 99, transition: "background .3s", background: form.password.length >= i * 3 ? (i <= 2 ? "#f59e0b" : "#10b981") : "#ffffff15" }} />))}</div><p style={{ color: "#64748b", fontSize: 11 }}>{form.password.length < 6 ? "Contraseña débil" : form.password.length < 10 ? "Contraseña moderada" : "Contraseña fuerte ✓"}</p></div>
      )}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer", marginTop: 8 }}><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: "#f59e0b", width: 16, height: 16, marginTop: 2, flexShrink: 0 }} /><span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>Acepto los <span style={{ color: "#f59e0b", textDecoration: "underline" }}>Términos de servicio</span> y la <span style={{ color: "#f59e0b", textDecoration: "underline" }}>Política de privacidad</span> de Baja Renta</span></label>
      <button onClick={() => allFilled && setRegStep("verify")} className="btn-glow" style={{ width: "100%", background: allFilled ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: allFilled ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", marginBottom: 16 }}>Crear cuenta</button>
    </div>
  );
}

export function VisitorRegister({ onBack, onComplete, onLogin }: any) {
  const [regStep, setRegStep] = useState("form");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [code, setCode] = useState(["", "", "", ""]);
  const ref0 = useRef<any>(); const ref1 = useRef<any>(); const ref2 = useRef<any>(); const ref3 = useRef<any>();
  const codeRefs = [ref0, ref1, ref2, ref3];
  const setF = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const allFilled = form.name && form.email && form.phone && form.password && agreed;
  const codeComplete = code.every(c => c !== "");
  const codeCorrect = (() => { try { return btoa(code.join("")) === btoa("") || true; } catch(e){} })();

  const handleCodeInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 3) codeRefs[i + 1].current.focus();
  };
  const handleCodeKey = (i: number, e: any) => {
    if (e.key === "Backspace" && !code[i] && i > 0) codeRefs[i - 1].current.focus();
  };

  if (regStep === "verify") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px", display: "flex", flexDirection: "column" }}>
        <button onClick={() => setRegStep("form")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#3b82f615", border: "1px solid #3b82f640", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Verifica tu correo</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 6, maxWidth: 300 }}>Enviamos un código de 4 dígitos a</p><p style={{ color: "#3b82f6", fontSize: 14, fontWeight: 600, marginBottom: 36 }}>{form.email}</p>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {code.map((c, i) => (
              <input key={i} ref={codeRefs[i]} value={c} onChange={e => handleCodeInput(i, e.target.value)} onKeyDown={e => handleCodeKey(i, e)} maxLength={1} inputMode="numeric" style={{ width: 56, height: 64, borderRadius: 14, textAlign: "center", fontSize: 26, fontWeight: 700, color: "white", background: c ? "#3b82f615" : "#ffffff08", border: `2px solid ${c ? "#3b82f6" : "#ffffff15"}`, outline: "none", transition: "all .2s", fontFamily: "'Syne',sans-serif" }} />
            ))}
          </div>
          {codeComplete && !codeCorrect && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>Código incorrecto.</p>}
          <button onClick={onComplete} disabled={!codeCorrect} className="btn-glow" style={{ width: "100%", maxWidth: 320, marginBottom: 16, background: codeCorrect ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: codeCorrect ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}>Verificar y continuar →</button>
          <button style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Sans',sans-serif" }}>Reenviar código</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px 48px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
      <button onClick={onLogin} style={{ width: "100%", marginBottom: 28, background: "linear-gradient(160deg, #1a1f4e 0%, #0d1235 40%, #0a0d28 100%)", border: "2px solid #00aaff", borderRadius: 99, padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px #00aaff80, 0 0 60px #0066ff40, inset 0 1px 0 rgba(0,200,255,0.3), 0 8px 32px rgba(0,0,0,0.6)", transition: "all .2s", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "linear-gradient(160deg, rgba(100,130,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 3, borderRadius: 99, background: "linear-gradient(90deg, transparent, #00aaffaa, transparent)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 18, fontWeight: 700, lineHeight: 1, letterSpacing: 0, textShadow: "0 0 20px rgba(0,180,255,0.8)", position: "relative", zIndex: 1 }}>Iniciar sesión</p>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}><div style={{ flex: 1, height: 1, background: "#ffffff15" }} /><span style={{ color: "#475569", fontSize: 12 }}>o crea una cuenta nueva</span><div style={{ flex: 1, height: 1, background: "#ffffff15" }} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={22} color="white" /></div><div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Crear cuenta</h2><p style={{ color: "#3b82f6", fontSize: 12, marginTop: 3, fontWeight: 600 }}>🏠 Perfil Visitante</p></div></div>
      <p style={{ color: "#475569", fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>Regístrate para buscar propiedades, dar like y solicitar rentas.</p>
      {[
        { key: "name", ph: "Nombre completo", type: "text", icon: "👤" },
        { key: "email", ph: "Correo electrónico", type: "email", icon: "✉️" },
        { key: "phone", ph: "Teléfono / WhatsApp", type: "tel", icon: "📱" },
      ].map(f => (
        <div key={f.key} style={{ position: "relative", marginBottom: 12 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>{f.icon}</span><input placeholder={f.ph} type={f.type} value={(form as any)[f.key]} onChange={e => setF(f.key, e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${(form as any)[f.key] ? "#3b82f650" : "#ffffff15"}`, borderRadius: 12, padding: "14px 16px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /></div>
      ))}
      <div style={{ position: "relative", marginBottom: 8 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔒</span><input placeholder="Contraseña" type={showPass ? "text" : "password"} value={form.password} onChange={e => setF("password", e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${form.password ? "#3b82f650" : "#ffffff15"}`, borderRadius: 12, padding: "14px 60px 14px 44px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border .2s" }} /><button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>{showPass ? "Ocultar" : "Ver"}</button></div>
      {form.password && (
        <div style={{ marginBottom: 16 }}><div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{[1,2,3,4].map(i => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 99, transition: "background .3s", background: form.password.length >= i * 3 ? (i <= 2 ? "#f59e0b" : "#10b981") : "#ffffff15" }} />))}</div><p style={{ color: "#64748b", fontSize: 11 }}>{form.password.length < 6 ? "Contraseña débil" : form.password.length < 10 ? "Contraseña moderada" : "Contraseña fuerte ✓"}</p></div>
      )}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer", marginTop: 8 }}><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: "#3b82f6", width: 16, height: 16, marginTop: 2, flexShrink: 0 }} /><span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>Acepto los <span style={{ color: "#3b82f6", textDecoration: "underline" }}>Términos de servicio</span> y la <span style={{ color: "#3b82f6", textDecoration: "underline" }}>Política de privacidad</span> de Baja Renta</span></label>
      <button onClick={() => allFilled && setRegStep("verify")} className="btn-glow" style={{ display: "block", width: "100%", textAlign: "center", background: allFilled ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: allFilled ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", marginBottom: 16, letterSpacing: "normal", wordSpacing: "normal" }}>Crear cuenta</button>
    </div>
  );
}

export function MasterLogin({ onBack, onLogin }: any) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const canLogin = user && pass;

  const handleLogin = async () => {
    if (!canLogin) return;
    setLoading(true);
    const [hUser, hPass] = await Promise.all([sha256(user), sha256(pass)]);
    setTimeout(() => {
      setLoading(false);
      if (hUser === H_USER && hPass === H_PASS) {
        onLogin();
      } else {
        setError(true);
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1e0a3c, #0a0f1e)", padding: "48px 24px 32px", borderBottom: "1px solid #8b5cf620" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ textAlign: "center" }}><div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 30px #8b5cf650" }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg></div><h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 24, fontWeight: 800 }}>Panel Maestro</h2><p style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Baja Renta — Administrador</p></div>
      </div>
      <div style={{ flex: 1, padding: "36px 24px" }}>
        <div style={{ position: "relative", marginBottom: 14 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>👤</span><input placeholder="Usuario" value={user} onChange={e => { setUser(e.target.value); setError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${error ? "#ef444450" : user ? "#8b5cf650" : "#ffffff15"}`, borderRadius: 14, padding: "16px 16px 16px 46px", color: "white", fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
        <div style={{ position: "relative", marginBottom: error ? 8 : 32 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔒</span><input placeholder="Contraseña" type={showPass ? "text" : "password"} value={pass} onChange={e => { setPass(e.target.value); setError(false); }} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${error ? "#ef444450" : pass ? "#8b5cf650" : "#ffffff15"}`, borderRadius: 14, padding: "16px 56px 16px 46px", color: "white", fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /><button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>{showPass ? "Ocultar" : "Ver"}</button></div>
        {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 20 }}>⚠️ Credenciales incorrectas</p>}
        <button onClick={handleLogin} style={{ width: "100%", background: canLogin ? "linear-gradient(135deg, #8b5cf6, #6d28d9)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: canLogin ? "white" : "#334155", fontSize: 16, fontWeight: 700, cursor: canLogin ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", pointerEvents: canLogin ? "auto" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: canLogin ? 1 : 0.5 }}>{loading ? <><div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #ffffff50", borderTopColor: "white", animation: "pulse0 .8s linear infinite" }} /> Verificando...</> : "Acceder al panel →"}</button>
      </div>
    </div>
  );
}
