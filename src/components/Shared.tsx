import { useState, useRef } from 'react';
import { Icon } from '../Icons';

export function MiniBar({ values, color }: any) {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40 }}>
      {values.map((v: number, i: number) => (
        <div key={i} style={{ flex: 1, background: color, borderRadius: 4, opacity: 0.3 + 0.7 * (v / max), height: `${Math.max(4, (v / max) * 40)}px`, transition: "height .3s" }} />
      ))}
    </div>
  );
}

export function DrumPicker({ items, selected, onSelect, color = "#3b82f6" }: any) {
  const itemH = 52;
  const visibleCount = 5;
  const containerH = itemH * visibleCount;
  const selectedIdx = items.indexOf(selected);
  const scroll = (dir: number) => {
    const newIdx = Math.max(0, Math.min(items.length - 1, selectedIdx + dir));
    onSelect(items[newIdx]);
  };
  return (
    <div style={{ position: "relative", height: containerH, overflow: "hidden", userSelect: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: itemH, background: color + "15", border: `1px solid ${color}40`, borderRadius: 12, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: itemH * 1.5, background: "linear-gradient(to bottom, #0a0f1e, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: itemH * 1.5, background: "linear-gradient(to top, #0a0f1e, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ display: "flex", flexDirection: "column", transform: `translateY(${(2 - selectedIdx) * itemH}px)`, transition: "transform .3s cubic-bezier(.25,.46,.45,.94)" }}>
        {items.map((item: any, i: number) => {
          const dist = Math.abs(i - selectedIdx);
          return (
            <div key={item} onClick={() => onSelect(item)} style={{ height: itemH, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .3s", opacity: dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2, transform: `scale(${dist === 0 ? 1 : 0.85})` }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: dist === 0 ? 800 : 400, fontSize: dist === 0 ? 18 : 14, color: dist === 0 ? "white" : "#64748b", transition: "all .3s" }}>{item}</span>
            </div>
          );
        })}
      </div>
      <button onClick={() => scroll(-1)} style={{ position: "absolute", top: 0, right: 12, zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: "8px", color: color }}>▲</button>
      <button onClick={() => scroll(1)} style={{ position: "absolute", bottom: 0, right: 12, zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: "8px", color: color }}>▼</button>
    </div>
  );
}

export function PhotoUploader({ mode }: any) {
  const [photos, setPhotos] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (e: any) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.slice(0, 5 - photos.length).map((file: any) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
  };
  const removePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx));
  const accent = mode === "managed" ? "#3b82f6" : "#f59e0b";
  const accentBg = mode === "managed" ? "#3b82f615" : "#f59e0b15";
  const accentBorder = mode === "managed" ? "#3b82f630" : "#f59e0b30";
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: "'Syne',sans-serif", color: "white", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Fotos de la propiedad</h3>
      <p style={{ color: "#64748b", fontSize: 12, marginBottom: 14 }}>Sube hasta 5 fotos · JPG, PNG, WEBP</p>
      {photos.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", border: `1px solid ${accentBorder}` }}>
              <img src={p.url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {i === 0 && <div style={{ position: "absolute", top: 6, left: 6, background: accent, borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "white" }}>Principal</div>}
              <button onClick={() => removePhoto(i)} style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "#ef444490", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={11} color="white" /></button>
            </div>
          ))}
          {[...Array(5 - photos.length)].map((_, i) => (
            <div key={`e${i}`} style={{ aspectRatio: "1", borderRadius: 12, border: "1px dashed #ffffff15", background: "#ffffff04", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#334155", fontSize: 18 }}>+</span></div>
          ))}
        </div>
      )}
      {photos.length < 5 && (
        <>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />
          <button onClick={() => inputRef.current?.click()} style={{ width: "100%", background: accentBg, border: `1.5px dashed ${accent}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all .2s" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="upload" size={18} color={accent} /></div>
            <span style={{ color: accent, fontSize: 14, fontWeight: 600 }}>{photos.length === 0 ? "Seleccionar fotos" : `Agregar más (${photos.length}/5)`}</span>
            <span style={{ color: "#475569", fontSize: 12 }}>Toca para abrir galería o cámara</span>
          </button>
        </>
      )}
      {photos.length === 5 && (
        <div style={{ background: "#10b98115", border: "1px solid #10b98130", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="check" size={14} color="#10b981" />
          <span style={{ color: "#10b981", fontSize: 13, fontWeight: 600 }}>5 fotos listas para publicar</span>
        </div>
      )}
    </div>
  );
}

export function FaceCapture({ onPhotoCapture }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("idle"); 
  const [countdown, setCountdown] = useState(5);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<any>(null);

  const requestCamera = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setStatus("preview");
    } catch (e) {
      setStatus("error");
    }
  };

  const takePhotoAndRecord = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth || 320;
        canvasRef.current.height = videoRef.current.videoHeight || 240;
        ctx.save(); ctx.scale(-1, 1); ctx.drawImage(videoRef.current, -canvasRef.current.width, 0); ctx.restore();
        const url = canvasRef.current.toDataURL("image/jpeg", 0.85);
        setPhotoUrl(url);
        if (onPhotoCapture) onPhotoCapture(url);
      }
    }
    setStatus("recording");
    setCountdown(5);
    let count = 5;
    timerRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timerRef.current);
        if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
        setStatus("done");
      }
    }, 1000);
  };

  const reset = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    clearInterval(timerRef.current);
    setStatus("idle"); setCountdown(5); setPhotoUrl(null);
    if (onPhotoCapture) onPhotoCapture(null);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {status === "idle" && (
        <button onClick={requestCamera} style={{ width: "100%", background: "#3b82f615", border: "1.5px dashed #3b82f6", borderRadius: 14, padding: "20px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#3b82f620", border: "1px solid #3b82f640", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 30 }}>📸</span></div>
          <span style={{ color: "#3b82f6", fontSize: 14, fontWeight: 600 }}>Abrir cámara</span>
          <span style={{ color: "#475569", fontSize: 12 }}>Se tomará foto de perfil + video de 5 segundos</span>
          <span style={{ color: "#334155", fontSize: 11 }}>Se solicitará permiso de acceso a tu cámara</span>
        </button>
      )}
      {status === "requesting" && (
        <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 14, padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>⏳ Solicitando acceso a la cámara...</p>
          <p style={{ color: "#64748b", fontSize: 12 }}>Por favor acepta el permiso en tu dispositivo</p>
        </div>
      )}
      {status === "preview" && (
        <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", background: "#000", border: "2px solid #3b82f6" }}>
          <video ref={videoRef} muted playsInline style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block", transform: "scaleX(-1)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ width: 120, height: 150, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", border: "2px dashed #3b82f680" }} />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #000000e0, transparent)", padding: "16px" }}>
            <p style={{ color: "#94a3b8", fontSize: 11, textAlign: "center", marginBottom: 10 }}>Centra tu cara en el óvalo</p>
            <button onClick={takePhotoAndRecord} style={{ width: "100%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", border: "none", borderRadius: 12, padding: "13px", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>📸 Tomar foto y grabar 5s</button>
          </div>
        </div>
      )}
      {status === "recording" && (
        <div>
          {photoUrl && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#10b98115", border: "1px solid #10b98130", borderRadius: 14, padding: "10px 14px", marginBottom: 10 }}>
              <img src={photoUrl} alt="perfil" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #10b981" }} />
              <div><p style={{ color: "#10b981", fontSize: 13, fontWeight: 600 }}>📸 Foto de perfil capturada</p><p style={{ color: "#475569", fontSize: 11 }}>Se usará en tu solicitud</p></div>
            </div>
          )}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", background: "#000", border: "2px solid #ef4444" }}>
            <video ref={videoRef} muted playsInline style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block", transform: "scaleX(-1)" }} />
            <div style={{ position: "absolute", top: 12, right: 12, width: 48, height: 48, borderRadius: "50%", background: "#000000c0", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ef4444" }}><span style={{ color: "#ef4444", fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>{countdown}</span></div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #000000c0, transparent)", padding: "10px 14px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "pulse0 1s infinite" }} /><span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>Grabando video... {countdown}s</span></div></div>
          </div>
        </div>
      )}
      {status === "done" && (
        <div>
          {photoUrl && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#10b98115", border: "1px solid #10b98130", borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
              <img src={photoUrl} alt="perfil" style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "2px solid #10b981", flexShrink: 0 }} />
              <div style={{ flex: 1 }}><p style={{ color: "#10b981", fontSize: 14, fontWeight: 700 }}>📸 Foto de perfil lista ✓</p><p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>Aparecerá en tu solicitud al propietario</p></div>
            </div>
          )}
          <div style={{ background: "#3b82f615", border: "1px solid #3b82f630", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={16} color="white" /></div><div><p style={{ color: "#93c5fd", fontSize: 13, fontWeight: 700 }}>🎥 Video de 5s capturado ✓</p><p style={{ color: "#475569", fontSize: 11 }}>Verificación facial completada</p></div></div>
            <button onClick={reset} style={{ background: "none", border: "1px solid #ffffff15", borderRadius: 8, padding: "5px 10px", color: "#64748b", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Repetir</button>
          </div>
        </div>
      )}
      {status === "error" && (
        <div style={{ background: "#ef444415", border: "1px solid #ef444430", borderRadius: 14, padding: "16px", textAlign: "center" }}><p style={{ color: "#ef4444", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>⚠️ No se pudo acceder a la cámara</p><p style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Revisa los permisos en la configuración de tu dispositivo</p><button onClick={reset} style={{ background: "#ef444420", border: "1px solid #ef444440", borderRadius: 8, padding: "8px 16px", color: "#ef4444", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Reintentar</button></div>
      )}
    </div>
  );
}
