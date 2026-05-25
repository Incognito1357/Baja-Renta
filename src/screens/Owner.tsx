import { useState } from 'react';
import { Icon } from '../Icons';
import { MOCK_LISTED } from '../data';
import { PhotoUploader, FaceCapture } from '../components/Shared';
import { SelfRegisterScreen, LoginScreen } from './Auth';
import { MasterDashboard } from './MasterGuest';

export function ApplicantDetail({ applicant, onBack, isApproved, isRejected, onApprove }: any) {
  const [docTab, setDocTab] = useState("profile");
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [refVerified, setRefVerified] = useState(
    isApproved ? applicant.refs.map(() => true) : applicant.refs.map((r: any) => r.verified)
  );
  const toggleRef = (i: number) => {
    if (isApproved) return;
    setRefVerified((s: any) => { const n = [...s]; n[i] = !n[i]; return n; });
  };
  const docsMap = [
    { key: "ine", label: "INE / Identificación", icon: "🪪" },
    { key: "comprobante", label: "Comprobante de ingresos", icon: "💼" },
    { key: "estadoCuenta", label: "Estado de cuenta", icon: "🏦" },
  ];
  const [docVerified, setDocVerified] = useState<any>(
    docsMap.reduce((acc, d) => ({ ...acc, [d.key]: isApproved ? true : applicant.docs[d.key] }), {})
  );
  const toggleDoc = (key: string) => {
    if (isApproved) return;
    setDocVerified((s: any) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 32 }}>
      {confirmApprove && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#000000c0", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ background: "#0d1f3c", border: "1px solid #10b98140", borderRadius: 24, padding: "32px 24px", width: "100%", maxWidth: 360, textAlign: "center", animation: "fadeUp .3s ease" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 30px #10b98140" }}><Icon name="check" size={34} color="white" /></div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Confirmar aprobación</h2>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>¿Estás seguro que deseas aprobar a</p>
            <p style={{ color: "white", fontSize: 16, fontWeight: 700, fontFamily: "'Syne',sans-serif", marginBottom: 24 }}>{applicant.name}?</p>
            <p style={{ color: "#64748b", fontSize: 12, marginBottom: 28, lineHeight: 1.5 }}>Esta acción rechazará automáticamente a todos los demás candidatos.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmApprove(false)} style={{ flex: 1, background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 14, padding: "14px", color: "#94a3b8", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Cancelar</button>
              <button onClick={() => { setConfirmApprove(false); if (onApprove) onApprove(); }} style={{ flex: 1, background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: 14, padding: "14px", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 0 20px #10b98140" }}>✓ Aprobar</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #ffffff08" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <img src={applicant.photo} alt={applicant.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2px solid #f59e0b" }} />
          <div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 20, fontWeight: 800, marginBottom: 2 }}>{applicant.name}</h2>
            <p style={{ color: "#64748b", fontSize: 13 }}>{applicant.age} años · {applicant.job}</p>
            {isApproved ? (
              <span style={{ display: "inline-block", marginTop: 6, background: "#10b98115", border: "1px solid #10b98140", borderRadius: 99, padding: "3px 10px", color: "#10b981", fontSize: 11, fontWeight: 700 }}>✓ Aprobado</span>
            ) : isRejected ? (
              <span style={{ display: "inline-block", marginTop: 6, background: "#ef444415", border: "1px solid #ef444430", borderRadius: 99, padding: "3px 10px", color: "#ef4444", fontSize: 11, fontWeight: 700 }}>✗ Rechazado</span>
            ) : (
              <span style={{ display: "inline-block", marginTop: 6, background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 99, padding: "3px 10px", color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>⚠️ {applicant.status}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["profile","Perfil"],["refs","Referencias"],["docs","Documentos"]].map(([k,l]) => (
            <button key={k} onClick={() => setDocTab(k)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer", background: docTab === k ? "#f59e0b" : "#ffffff08", color: docTab === k ? "#000" : "#64748b", fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {docTab === "profile" && (
          <>
            {[
              { label: "Teléfono", val: applicant.phone, icon: "📱", isPhone: true },
              { label: "Empleo", val: applicant.job, icon: "💼" },
              { label: "Ingreso mensual", val: `$${applicant.income.toLocaleString()} MXN`, icon: "💰" },
            ].map((r: any, i) => (
              r.isPhone ? (
                <a key={i} href={`tel:${applicant.phone.replace(/\D/g,"")}`} style={{ background: "#10b98115", border: "1px solid #10b98130", borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 20 }}>📱</span><div><p style={{ color: "#64748b", fontSize: 11 }}>Teléfono — toca para llamar</p><p style={{ color: "#10b981", fontSize: 14, fontWeight: 700 }}>{applicant.phone}</p></div></div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                </a>
              ) : (
                <div key={i} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span><div><p style={{ color: "#64748b", fontSize: 11 }}>{r.label}</p><p style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{r.val}</p></div>
                </div>
              )
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {(() => {
                const allDocsVerified = docsMap.every(d => docVerified[d.key]) && refVerified.every(Boolean);
                return (
                  <>
                    {!allDocsVerified && !isApproved && (
                      <div style={{ width: "100%", background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span style={{ fontSize: 14 }}>🔒</span><p style={{ color: "#f59e0b", fontSize: 12, lineHeight: 1.4 }}>Verifica todos los <strong>documentos</strong> y <strong>referencias</strong> para habilitar Aprobar / Rechazar</p></div>
                    )}
                    {isApproved ? (
                      <div style={{ width: "100%", background: "#10b98115", border: "1px solid #10b98140", borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><Icon name="check" size={20} color="#10b981" /><p style={{ color: "#10b981", fontSize: 15, fontWeight: 700 }}>Candidato aprobado</p></div>
                    ) : isRejected ? (
                      <div style={{ width: "100%", background: "#ef444415", border: "1px solid #ef444430", borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><Icon name="x" size={20} color="#ef4444" /><p style={{ color: "#ef4444", fontSize: 15, fontWeight: 700 }}>Candidato rechazado automáticamente</p></div>
                    ) : (
                      <>
                        <button onClick={() => allDocsVerified && setConfirmApprove(true)} disabled={!allDocsVerified} style={{ flex: 1, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "all .3s", border: "none", background: allDocsVerified ? "linear-gradient(135deg, #10b981, #059669)" : "#ffffff08", color: allDocsVerified ? "white" : "#334155", cursor: allDocsVerified ? "pointer" : "not-allowed", boxShadow: allDocsVerified ? "0 0 20px #10b98140" : "none" }}>✓ Aprobar</button>
                        <button disabled={!allDocsVerified} style={{ flex: 1, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "all .3s", background: allDocsVerified ? "#ef444415" : "#ffffff08", border: allDocsVerified ? "1px solid #ef444430" : "1px solid #ffffff10", color: allDocsVerified ? "#ef4444" : "#334155", cursor: allDocsVerified ? "pointer" : "not-allowed" }}>✗ Rechazar</button>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </>
        )}
        {docTab === "refs" && (
          <>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>3 referencias requeridas</p>
            {applicant.refs.map((r: any, i: number) => (
              <div key={i} style={{ background: "#ffffff06", border: `1px solid ${refVerified[i] ? "#10b98130" : "#f59e0b30"}`, borderRadius: 16, padding: "16px", marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div><p style={{ color: "white", fontSize: 14, fontWeight: 700 }}>Ref. {i + 1}: {r.name}</p><p style={{ color: "#64748b", fontSize: 12 }}>{r.relation}</p></div>
                  <span style={{ background: refVerified[i] ? "#10b98115" : "#f59e0b15", border: `1px solid ${refVerified[i] ? "#10b98140" : "#f59e0b40"}`, borderRadius: 99, padding: "3px 10px", color: refVerified[i] ? "#10b981" : "#f59e0b", fontSize: 10, fontWeight: 700 }}>{refVerified[i] ? "✓ Verificada" : "⚠️ Pendiente"}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <p style={{ color: "#94a3b8", fontSize: 13, flex: 1 }}>📱 {r.phone}</p>
                  <a href={`tel:${r.phone.replace(/\D/g,"")}`} style={{ background: "#10b98115", border: "1px solid #10b98130", borderRadius: 8, padding: "6px 12px", color: "#10b981", fontSize: 11, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>📞 Llamar</a>
                  <button onClick={() => toggleRef(i)} style={{ background: refVerified[i] ? "#10b981" : "#f59e0b15", border: refVerified[i] ? "none" : "1px solid #f59e0b40", borderRadius: 8, padding: "6px 12px", color: refVerified[i] ? "white" : "#f59e0b", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>{refVerified[i] ? "✓ Verificada" : "Marcar verificada"}</button>
                </div>
              </div>
            ))}
          </>
        )}
        {docTab === "docs" && (
          <>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>Revisa y verifica los documentos</p>
            {docsMap.map(d => {
              const received = applicant.docs[d.key];
              const verified = docVerified[d.key];
              return (
                <div key={d.key} style={{ background: "#ffffff06", border: `1px solid ${verified ? "#10b98140" : received ? "#f59e0b30" : "#ffffff15"}`, borderRadius: 16, padding: "16px", marginBottom: 12, transition: "border .2s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: received ? 12 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{d.icon}</span>
                      <div><p style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{d.label}</p><p style={{ color: received ? (verified ? "#10b981" : "#f59e0b") : "#475569", fontSize: 11, marginTop: 2 }}>{received ? (verified ? "✓ Documento verificado" : "⚠️ Recibido — pendiente") : "✗ No recibido"}</p></div>
                    </div>
                    <span style={{ background: verified ? "#10b98115" : received ? "#f59e0b15" : "#ffffff08", border: `1px solid ${verified ? "#10b98140" : received ? "#f59e0b40" : "#ffffff15"}`, borderRadius: 99, padding: "4px 12px", color: verified ? "#10b981" : received ? "#f59e0b" : "#475569", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{verified ? "✓ Verificado" : received ? "⚠️ Pendiente" : "✗ Sin recibir"}</span>
                  </div>
                  {received && (
                    <button onClick={() => toggleDoc(d.key)} style={{ width: "100%", borderRadius: 10, border: "none", padding: "10px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, transition: "all .2s", background: verified ? "#10b981" : "linear-gradient(135deg, #f59e0b20, #d9770620)", color: verified ? "white" : "#f59e0b", border: verified ? "none" : "1px solid #f59e0b40" }}>{verified ? "✓ Marcado como verificado" : "Marcar documento como verificado"}</button>
                  )}
                </div>
              );
            })}
            <div style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 14, padding: "14px 16px", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "#94a3b8", fontSize: 13 }}>Documentos verificados</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: Object.values(docVerified).every(Boolean) ? "#10b981" : "#f59e0b", fontSize: 18, fontWeight: 700 }}>{Object.values(docVerified).filter(Boolean).length} / {docsMap.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function PropertyDetail_Owner({ property, onBack, approvedApplicants, onApprove }: any) {
  const [tab, setTab] = useState(property.applicants.length > 0 ? "applicants" : "stats");
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const handleApprove = (id: number) => {
    if (onApprove) onApprove(id);
  };

  if (selectedApplicant) {
    const key = `${property.id}-${selectedApplicant.id}`;
    return <ApplicantDetail applicant={selectedApplicant} isApproved={approvedApplicants[key] === true} isRejected={approvedApplicants[key] === "rejected"} onApprove={() => { handleApprove(selectedApplicant.id); }} onBack={() => setSelectedApplicant(null)} />;
  }

  const days = ["L","M","X","J","V","S","D"];
  const isRented = property.applicants.some((a: any) => approvedApplicants[`${property.id}-${a.id}`] === true);
  const currentStatus = isRented ? "Rentado" : property.status;
  const statusColor = (s: string) => s === "Rentado" ? "#6366f1" : s === "Activo" ? "#10b981" : "#f59e0b";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 40 }}>
      {/* Header image */}
      <div style={{ position: "relative", height: "28vh", overflow: "hidden" }}>
        <img src={property.img} alt={property.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #00000050, #0a0f1e)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "#000000a0", backdropFilter: "blur(8px)", border: "none", borderRadius: 99, width: 38, height: 38, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="back" size={16} color="white" /></button>
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div><h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{property.name}</h2><p style={{ color: "#94a3b8", fontSize: 12 }}>{property.city}</p></div>
          <span style={{ background: statusColor(currentStatus) + "30", border: `1px solid ${statusColor(currentStatus)}50`, borderRadius: 99, padding: "4px 12px", color: statusColor(currentStatus), fontSize: 11, fontWeight: 700 }}>{currentStatus === "Rentado" ? "🏠 Rentado" : currentStatus}</span>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 20px 0" }}>
        {[{ label: "Vistas", val: property.views, icon: "👁" }, { label: "Likes", val: property.likes, icon: "❤️" }, { label: "Solicitudes", val: property.applicants.length, icon: "📋" }].map((s, i) => (
          <div key={i} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
            <p style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 20, fontWeight: 700 }}>{s.val}</p>
            <p style={{ color: "#64748b", fontSize: 10 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #ffffff08", padding: "0 20px", marginTop: 16 }}>
        {[["applicants","Solicitudes"],["stats","Estadísticas"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", borderBottom: `2px solid ${tab === key ? "#f59e0b" : "transparent"}`, color: tab === key ? "#f59e0b" : "#64748b", fontSize: 12, fontWeight: tab === key ? 700 : 400, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>
            {label}
            {key === "applicants" && property.applicants.length > 0 && <span style={{ marginLeft: 4, background: "#f59e0b", borderRadius: 99, padding: "0px 5px", color: "#000", fontSize: 9, fontWeight: 900 }}>{property.applicants.length}</span>}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px" }}>
        {tab === "applicants" && (
          property.applicants.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}><p style={{ fontSize: 32, marginBottom: 8 }}>📋</p><p style={{ color: "#475569", fontSize: 14 }}>Sin solicitudes aún</p></div>
          ) : property.applicants.map((a: any) => {
            const key = `${property.id}-${a.id}`;
            return (
              <button key={a.id} onClick={() => setSelectedApplicant(a)} style={{ width: "100%", background: "#ffffff06", border: `1px solid ${approvedApplicants[key] === true ? "#10b98130" : approvedApplicants[key] === "rejected" ? "#ef444430" : "#f59e0b30"}`, borderRadius: 18, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", opacity: approvedApplicants[key] === "rejected" ? 0.5 : 1 }}>
                <img src={a.photo} alt={a.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `2px solid ${approvedApplicants[key] === true ? "#10b981" : approvedApplicants[key] === "rejected" ? "#ef4444" : "#f59e0b"}`, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 15, fontWeight: 700 }}>{a.name}</p>
                    {approvedApplicants[key] === true ? <span style={{ background: "#10b98115", border: "1px solid #10b98140", borderRadius: 99, padding: "2px 8px", color: "#10b981", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓ Aprobado</span> : approvedApplicants[key] === "rejected" ? <span style={{ background: "#ef444415", border: "1px solid #ef444430", borderRadius: 99, padding: "2px 8px", color: "#ef4444", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✗ Rechazado</span> : <span style={{ background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 99, padding: "2px 8px", color: "#f59e0b", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>⚠️ Revisión</span>}
                  </div>
                  <p style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>{a.job}</p>
                  <div style={{ display: "flex", gap: 12 }}><span style={{ color: "#94a3b8", fontSize: 11 }}>💰 ${a.income.toLocaleString()}/mes</span><span style={{ color: "#94a3b8", fontSize: 11 }}>📎 {Object.values(a.docs).filter(Boolean).length}/3 docs</span></div>
                </div>
                <Icon name="arrow" size={14} color="#475569" />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export function OwnerDashboard({ onPublish, onBack }: any) {
  const [tab, setTab] = useState("properties");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [allApprovedApplicants, setAllApprovedApplicants] = useState<any>({});
  const handleApprove = (propertyId: number, applicantId: number, applicants: any[]) => {
    const rejected: any = {};
    applicants.forEach(a => { if (a.id !== applicantId) rejected[`${propertyId}-${a.id}`] = "rejected"; });
    setAllApprovedApplicants((s: any) => ({ ...s, [`${propertyId}-${applicantId}`]: true, ...rejected }));
  };

  if (selectedProperty) {
    return <PropertyDetail_Owner property={selectedProperty} approvedApplicants={allApprovedApplicants} onApprove={(applicantId: number) => handleApprove(selectedProperty.id, applicantId, selectedProperty.applicants)} onBack={() => setSelectedProperty(null)} />;
  }

  const statusColor = (s: string) => s === "Rentado" ? "#6366f1" : s === "Activo" ? "#10b981" : "#f59e0b";
  const statusBg   = (s: string) => s === "Rentado" ? "#6366f115" : s === "Activo" ? "#10b98115" : "#f59e0b15";
  const getRentedStatus = (p: any) => {
    const isRented = p.applicants.some((a: any) => allApprovedApplicants[`${p.id}-${a.id}`] === true);
    return isRented ? "Rentado" : p.status;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 100 }}>
      <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 24px", borderBottom: "1px solid #ffffff08" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="36" height="24" viewBox="0 0 110 72" fill="none" style={{ filter: "drop-shadow(0 0 8px #3b82f650)" }}>
              <path d="M10 18 C22 6,38 6,50 18 C62 30,78 30,100 18" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
              <path d="M10 36 C22 24,38 24,50 36 C62 48,78 48,100 36" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
              <path d="M10 54 C22 42,38 42,50 54 C62 66,78 66,100 54" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" fill="none"/>
            </svg>
            <div><h1 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>Mi Panel</h1><p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Propietario</p></div>
          </div>
          <button onClick={onBack} style={{ background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 99, padding: "8px 14px", color: "#94a3b8", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Salir</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Propiedades", val: MOCK_LISTED.length },
            { label: "Total vistas", val: MOCK_LISTED.reduce((a, p) => a + p.views, 0) },
            { label: "Solicitudes", val: MOCK_LISTED.reduce((a, p) => a + p.applicants.length, 0) },
          ].map((s, i) => (
            <div key={i} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}><p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700 }}>{s.val}</p><p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{s.label}</p></div>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <h3 style={{ color: "white", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", marginBottom: 14 }}>Mis propiedades</h3>
        {MOCK_LISTED.map(p => (
          <button key={p.id} onClick={() => setSelectedProperty(p)} style={{ width: "100%", background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 20, overflow: "hidden", marginBottom: 14, display: "flex", cursor: "pointer", textAlign: "left" }}>
            <img src={p.img} alt={p.name} style={{ width: 100, height: 100, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ padding: "12px 14px", flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{p.name}</p>
                {(() => {
                  const st = getRentedStatus(p);
                  return <span style={{ background: statusBg(st), border: `1px solid ${statusColor(st)}30`, borderRadius: 99, padding: "2px 8px", color: statusColor(st), fontSize: 10, fontWeight: 700, flexShrink: 0, marginLeft: 6 }}>{st === "Rentado" ? "🏠 Rentado" : st}</span>;
                })()}
              </div>
              <p style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>{p.city}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#3b82f6", fontSize: 14, fontWeight: 700 }}>${p.price.toLocaleString()}<span style={{ color: "#475569", fontSize: 10 }}>/mes</span></p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#64748b", fontSize: 11 }}>👁 {p.views}</span><span style={{ color: "#64748b", fontSize: 11 }}>❤️ {p.likes}</span>
                  {p.applicants.length > 0 && (() => {
                    const hasApproved = p.applicants.some((a: any) => allApprovedApplicants[`${p.id}-${a.id}`] === true);
                    const pendingCount = p.applicants.filter((a: any) => !allApprovedApplicants[`${p.id}-${a.id}`]).length;
                    return hasApproved ? <span style={{ color: "#10b981", fontSize: 11, fontWeight: 700 }}>✓ Aprobado</span> : <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>⚠️ {pendingCount}</span>;
                  })()}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 24px 32px", background: "linear-gradient(to top, #0a0f1e 70%, transparent)" }}>
        <button onClick={onPublish} className="btn-glow" style={{ width: "100%", background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="upload" size={18} color="white" /> Publicar nueva propiedad
        </button>
      </div>
    </div>
  );
}

export function OwnerPanel({ onBack, onPublish }: any) {
  const [mode, setMode] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState("details");
  const [masterApproved, setMasterApproved] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [managed_agreed, setManaged_agreed] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [propForm, setPropForm] = useState({
    name: "", state: "", city: "", address: "", price: "", deposit: "", floors: "1",
    bedrooms: "1", bathrooms: "1", parking: "Privado",
    livingRoom: false, diningRoom: false, kitchen: false, laundry: false,
    patio: false, pool: false, petFriendly: false, parkingIncluded: false, kidsAllowed: false,
  });
  const setPF = (k: string, v: any) => setPropForm(f => ({ ...f, [k]: v }));
  const togglePF = (k: string) => setPropForm(f => ({ ...f, [k]: !(f as any)[k] }));

  const formatCard = (v: string) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExp  = (v: string) => { const d = v.replace(/\D/g,"").slice(0,4); return d.length > 2 ? d.slice(0,2)+"/"+d.slice(2) : d; };
  const canPay = cardName && cardNum.replace(/\s/g,"").length === 16 && expiry.length === 5 && cvv.length >= 3;
  const buildAndPublish = () => {
    const newProp = {
      id: Date.now(),
      name: propForm.name || "Nueva propiedad",
      city: propForm.city, state: propForm.state, address: propForm.address,
      price: parseInt(propForm.price) || 0, deposit: parseInt(propForm.deposit) || 0,
      type: "Casa", bedrooms: parseInt(propForm.bedrooms) || 0, bathrooms: parseInt(propForm.bathrooms) || 0,
      floors: propForm.floors === "2+" ? 2 : 1, livingRoom: propForm.livingRoom, diningRoom: propForm.diningRoom, kitchen: propForm.kitchen, laundry: propForm.laundry, patio: propForm.patio, pool: propForm.pool, petFriendly: propForm.petFriendly, parking: propForm.parking || "Privado", kidsAllowed: propForm.kidsAllowed,
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80","https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
      views: 0, likes: 0, applicants: []
    };
    if (onPublish) onPublish(newProp);
    setSubmitted(true);
  };

  const accent = mode === "managed" ? "#3b82f6" : "#f59e0b";
  const accentGrad = mode === "managed" ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "linear-gradient(135deg, #f59e0b, #d97706)";

  if (mode === "selfRegister") return <SelfRegisterScreen onBack={() => setMode(null)} onComplete={() => setMode("dashboard")} onLogin={() => setMode("ownerLogin")} />;
  if (mode === "ownerLogin") return <LoginScreen onBack={() => setMode("selfRegister")} onLogin={() => setMode("dashboard")} onMasterLogin={() => setMode("masterPanel")} />;
  if (mode === "masterPanel") return <MasterDashboard onBack={() => setMode(null)} />;

  if (mode === "managedAgreement") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 28px", borderBottom: "1px solid #ffffff08" }}>
          <button onClick={() => setMode(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 28, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}><div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 20px #3b82f650" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>Gestión Baja Renta</h2><p style={{ color: "#3b82f6", fontSize: 12, marginTop: 3, fontWeight: 600 }}>🛎️ Nosotros nos encargamos de todo</p></div></div>
        </div>
        <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg, #451a0380, #78350f80)", border: "2px solid #f59e0b", borderRadius: 22, padding: "24px 20px", marginBottom: 24, position: "relative", overflow: "hidden", boxShadow: "0 0 30px #f59e0b25" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "#f59e0b15" }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f59e0b20", border: "1px solid #f59e0b50", borderRadius: 99, padding: "4px 12px", marginBottom: 12 }}><span style={{ fontSize: 12 }}>⚠️</span><span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>Tarifa de administración</span></div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 8 }}><span style={{ fontFamily: "'Syne',sans-serif", color: "#f59e0b", fontSize: 52, fontWeight: 800, lineHeight: 1 }}>1</span><span style={{ color: "#fcd34d", fontSize: 20, fontWeight: 700, fontFamily: "'Syne',sans-serif", marginBottom: 8 }}>mensualidad</span></div>
            <p style={{ color: "#fde68a", fontSize: 13, lineHeight: 1.6 }}>Se cobra el equivalente a <span style={{ color: "white", fontWeight: 700 }}>una mensualidad de tu propiedad</span> como tarifa única por el servicio de administración del proceso de selección.</p>
          </div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 28, background: managed_agreed ? "#f59e0b15" : "#ffffff06", border: `2px solid ${managed_agreed ? "#f59e0b" : "#ffffff15"}`, borderRadius: 16, padding: "16px", transition: "all .2s" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: managed_agreed ? "#f59e0b" : "#ffffff10", border: `2px solid ${managed_agreed ? "transparent" : "#ffffff20"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all .2s" }}>{managed_agreed && <Icon name="check" size={13} color="#000" />}</div>
            <input type="checkbox" checked={managed_agreed} onChange={e => setManaged_agreed(e.target.checked)} style={{ display: "none" }} />
            <p style={{ color: managed_agreed ? "#fde68a" : "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>Acepto que Baja Renta cobre <span style={{ color: managed_agreed ? "#f59e0b" : "white", fontWeight: 700 }}>una mensualidad</span> como tarifa de administración una vez que se concrete la renta de mi propiedad.</p>
          </label>
          <button onClick={() => managed_agreed && setMode("managed")} className="btn-glow" style={{ width: "100%", marginBottom: 12, background: managed_agreed ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: managed_agreed ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}>{managed_agreed ? "Acepto — Continuar" : "Marca el checkbox para continuar"}</button>
          <button onClick={() => setMode(null)} style={{ width: "100%", background: "transparent", border: "1px solid #ffffff15", borderRadius: 16, padding: "16px", color: "#64748b", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>No acepto — Regresar</button>
        </div>
      </div>
    );
  }

  if (mode === "dashboard") return <OwnerDashboard onBack={onBack} onPublish={() => setMode("self")} />;

  if (submitted && mode === "managed") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#3b82f615", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 40px #3b82f640" }}><span style={{ fontSize: 42 }}>📋</span></div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>¡Propiedad enviada!</h2>
        <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24, maxWidth: 300, lineHeight: 1.6 }}>Tu propiedad ha sido enviada exitosamente para revisión.</p>
        <button onClick={() => { setSubmitted(false); setMode(null); onBack(); }} className="btn-glow" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", border: "none", borderRadius: 16, padding: "16px 40px", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Volver al inicio</button>
      </div>
    );
  }

  if (submitted && mode === "self") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 40px #10b98150" }}><Icon name="check" size={42} color="white" /></div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>¡Propiedad publicada!</h2>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 12, maxWidth: 300 }}>Tu propiedad está activa. Recibirás solicitudes directamente en tu perfil.</p>
        <button onClick={() => { setSubmitted(false); setMode("dashboard"); }} className="btn-glow" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", borderRadius: 16, padding: "16px 40px", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Ver mi dashboard</button>
      </div>
    );
  }

  if (!mode) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px", display: "flex", flexDirection: "column" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>¿Cómo deseas gestionar tu propiedad?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, marginTop: 40 }}>
          <button onClick={() => setMode("selfRegister")} className="opt-btn" style={{ background: "#ffffff06", border: "1px solid #ffffff12", borderRadius: 22, padding: "24px 20px", cursor: "pointer", color: "white", textAlign: "left", transition: "all .3s" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={24} color="white" /></div>
              <div><p style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Yo administro el proceso</p><p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>Tú decides quién renta tu propiedad. Recibes solicitudes, revisas perfiles y seleccionas a tu inquilino ideal.</p></div>
            </div>
          </button>
          <button onClick={() => setMode("managedAgreement")} className="opt-btn" style={{ background: "#ffffff06", border: "1px solid #ffffff12", borderRadius: 22, padding: "14px 20px 24px", cursor: "pointer", color: "white", textAlign: "left", transition: "all .3s", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}><div style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "white" }}>⭐ Recomendado</div></div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div><p style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Baja Renta lo gestiona</p><p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>Nuestro equipo se encarga de todo: verificación de inquilinos, contratos, cobro de depósito y seguimiento mensual.</p></div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (formStep === "payment") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", paddingBottom: 48 }}>
        {showThankYou && (
          <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#000000c0", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
            <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", border: "1px solid #f59e0b40", borderRadius: 28, padding: "40px 28px", width: "100%", maxWidth: 360, textAlign: "center", animation: "fadeUp .3s ease" }}>
              <h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.2 }}>Gracias por tu confianza</h2>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>Tu pago fue procesado exitosamente.</p>
              <button onClick={() => { setShowThankYou(false); buildAndPublish(); }} className="btn-glow" style={{ width: "100%", background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", borderRadius: 16, padding: "16px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Continuar</button>
            </div>
          </div>
        )}
        <div style={{ background: "linear-gradient(135deg, #0d1f3c, #0a0f1e)", padding: "48px 24px 28px", borderBottom: "1px solid #ffffff08" }}>
          <button onClick={() => setFormStep("details")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar a la propiedad</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accent+"20", border: `1px solid ${accent}40`, borderRadius: 99, padding: "6px 16px", marginBottom: 16 }}><span style={{ fontSize: 13 }}>📅</span><span style={{ color: accent, fontSize: 12, fontWeight: 700 }}>Publicación por 90 días · Pago único</span></div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4 }}><span style={{ color: accent, fontSize: 20, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", marginTop: 10 }}>$</span><span style={{ color: "white", fontSize: 72, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", lineHeight: 1 }}>500</span><span style={{ color: "#64748b", fontSize: 14, alignSelf: "flex-end", marginBottom: 10 }}>MXN</span></div>
          </div>
        </div>
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ position: "relative", marginBottom: 10 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>👤</span><input placeholder="Nombre en la tarjeta" value={cardName} onChange={e => setCardName(e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${cardName ? accent+"50" : "#ffffff15"}`, borderRadius: 12, padding: "13px 16px 13px 42px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
          <div style={{ position: "relative", marginBottom: 10 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>💳</span><input placeholder="Número de tarjeta" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} inputMode="numeric" style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${cardNum ? accent+"50" : "#ffffff15"}`, borderRadius: 12, padding: "13px 16px 13px 42px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", letterSpacing: 2 }} /></div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ position: "relative", flex: 1 }}><span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>📅</span><input placeholder="MM/AA" value={expiry} onChange={e => setExpiry(formatExp(e.target.value))} inputMode="numeric" maxLength={5} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${expiry ? accent+"50" : "#ffffff15"}`, borderRadius: 12, padding: "13px 12px 13px 38px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
            <div style={{ position: "relative", flex: 1 }}><span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>🔒</span><input placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} inputMode="numeric" style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${cvv ? accent+"50" : "#ffffff15"}`, borderRadius: 12, padding: "13px 12px 13px 38px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }} /></div>
          </div>
          <button onClick={() => canPay && setShowThankYou(true)} className="btn-glow" style={{ width: "100%", background: canPay ? accentGrad : "#ffffff10", border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: canPay ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}><Icon name="card" size={18} color="white" /> Pagar $500 y publicar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", padding: "48px 24px" }}>
      <button onClick={() => setMode(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}><Icon name="back" size={16} /> Regresar</button>
      <h2 style={{ fontFamily: "'DM Sans',sans-serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Publicar propiedad</h2>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Llena los datos de tu inmueble</p>
      {[
        { ph: "Nombre de la propiedad", key: "name" },
        { ph: "Estado", key: "state" },
        { ph: "Ciudad", key: "city" },
        { ph: "Dirección completa", key: "address" },
        { ph: "Precio mensual (MXN)", key: "price" },
        { ph: "Depósito requerido (MXN)", key: "deposit" },
      ].map((f, i) => (
        <input key={i} placeholder={f.ph} value={(propForm as any)[f.key]} onChange={e => setPF(f.key, e.target.value)} style={{ display: "block", width: "100%", background: "#ffffff08", border: `1px solid ${(propForm as any)[f.key] ? accent+"50" : "#ffffff15"}`, borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", marginBottom: 10 }} />
      ))}
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <div style={{ height: 1, background: "#ffffff08", marginBottom: 24 }} />
        <PhotoUploader mode={mode} />
      </div>
      <div>
        {masterApproved ? (
          <button onClick={() => setFormStep("payment")} className="btn-glow" style={{ width: "100%", background: accentGrad, border: "none", borderRadius: 16, padding: "18px", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}>Continuar al pago · $500 MXN</button>
        ) : (
          <div>
            <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 16, padding: "16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 22, flexShrink: 0 }}>🔒</span><div><p style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700, marginBottom: 3 }}>Pago deshabilitado</p><p style={{ color: "#78716c", fontSize: 12, lineHeight: 1.5 }}>La sección de pago se habilitará una vez que tu propiedad sea autorizada por el equipo de Baja Renta.</p></div></div>
            <button onClick={() => setMasterApproved(true)} style={{ width: "100%", marginTop: 10, background: "transparent", border: "1px dashed #ffffff20", borderRadius: 12, padding: "10px", color: "#475569", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>[Demo] Simular autorización del equipo</button>
          </div>
        )}
      </div>
    </div>
  );
}
