import { useState, useEffect, useRef } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:       "#F3F0E8",
  bgAlt:    "#EBE7DC",
  forest:   "#3D6B5A",
  forestLt: "#5A8C78",
  mist:     "#A8C5D4",
  dark:     "#1C2422",
  darkMid:  "#2E3D38",
  offWhite: "#F0EDE5",
};

// ── RÈGLE TYPO — 3 styles, pas un de plus ───────────────────────────────────
// T1 : Cormorant Garamond Italic  → titres H1/H2, citations fortes
// T2 : DM Sans Medium 500         → corps courant, labels, CTA
// T3 : DM Sans Regular 400 italic → cards témoignage uniquement
const T = {
  h1:    { fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600 },
  h2:    { fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600 },
  cite:  { fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400 },
  body:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  card:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontStyle: "italic" },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `opacity .85s ease ${delay}s, transform .85s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ── FEUILLE UNIQUE réutilisable ───────────────────────────────────────────
function Leaf({ x, y, size = 14, rotate = 0, color, animClass }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} className={animClass}>
      <path
        d={`M0,0 C${size*0.3},-${size*0.8} ${size},-${size*0.6} ${size*0.5},-${size*1.4}
           C${size*0.8},-${size*0.8} ${size*1.1},-${size*0.3} ${size*0.5},0
           C${size*0.3},${size*0.3} ${size*0.1},${size*0.15} 0,0 Z`}
        fill={color} opacity=".55"
      />
      <path d={`M0,0 L${size*0.5},-${size*1.4}`} stroke={color} strokeWidth="0.6" opacity=".4" fill="none"/>
    </g>
  );
}

// Branches avec feuilles — hero
function Branches({ style }) {
  return (
    <svg viewBox="0 0 320 340" fill="none" style={style} overflow="visible">
      {/* Tronc */}
      <path d="M275 340 Q268 275 250 210 Q238 165 205 125" stroke={C.forest} strokeWidth="2" fill="none" opacity=".35" strokeLinecap="round"/>
      {/* Branche gauche */}
      <path d="M205 125 Q172 92 132 72 Q108 60 78 54" stroke={C.forest} strokeWidth="1.6" fill="none" opacity=".30" strokeLinecap="round"/>
      {/* Branche droite */}
      <path d="M205 125 Q225 98 248 76 Q262 62 278 44" stroke={C.forest} strokeWidth="1.4" fill="none" opacity=".28" strokeLinecap="round"/>
      {/* Sous-branches */}
      <path d="M162 90 Q140 72 116 60 Q98 50 82 42" stroke={C.forest} strokeWidth="1" fill="none" opacity=".22" strokeLinecap="round"/>
      <path d="M224 102 Q238 82 252 62 Q262 48 268 30" stroke={C.forest} strokeWidth="1" fill="none" opacity=".22" strokeLinecap="round"/>
      <path d="M132 72 Q115 52 104 34 Q97 20 94 6" stroke={C.forest} strokeWidth="0.8" fill="none" opacity=".18" strokeLinecap="round"/>
      <path d="M248 210 Q262 192 274 172 Q282 156 288 136" stroke={C.forest} strokeWidth="1" fill="none" opacity=".20" strokeLinecap="round"/>
      <path d="M78 54 Q66 42 56 28" stroke={C.forest} strokeWidth="0.7" fill="none" opacity=".16" strokeLinecap="round"/>
      <path d="M78 54 Q70 40 64 24" stroke={C.forest} strokeWidth="0.6" fill="none" opacity=".14" strokeLinecap="round"/>
      {/* Feuilles — balancement lent */}
      <Leaf x={78}  y={54}  size={13} rotate={-30}  color={C.forest} animClass="sway-1"/>
      <Leaf x={64}  y={24}  size={11} rotate={20}   color={C.forest} animClass="sway-2"/>
      <Leaf x={94}  y={6}   size={10} rotate={-15}  color={C.forest} animClass="sway-3"/>
      <Leaf x={132} y={72}  size={14} rotate={-45}  color={C.forest} animClass="sway-1"/>
      <Leaf x={116} y={60}  size={10} rotate={10}   color={C.forest} animClass="sway-2"/>
      <Leaf x={278} y={44}  size={12} rotate={30}   color={C.forest} animClass="sway-3"/>
      <Leaf x={268} y={30}  size={10} rotate={-20}  color={C.forest} animClass="sway-1"/>
      <Leaf x={288} y={136} size={11} rotate={15}   color={C.forest} animClass="sway-2"/>
      <Leaf x={252} y={62}  size={9}  rotate={-35}  color={C.forest} animClass="sway-3"/>
      <Leaf x={82}  y={42}  size={8}  rotate={25}   color={C.forest} animClass="sway-1"/>
      {/* Feuilles qui flottent librement */}
      <Leaf x={170} y={55}  size={9}  rotate={40}   color={C.forestLt} animClass="float-1"/>
      <Leaf x={210} y={30}  size={7}  rotate={-60}  color={C.forestLt} animClass="float-2"/>
      <Leaf x={50}  y={80}  size={8}  rotate={15}   color={C.forestLt} animClass="float-3"/>
    </svg>
  );
}

// Liane avec feuilles — section miroir, côté droit discret
function Vine({ style }) {
  return (
    <svg viewBox="0 0 80 400" fill="none" style={style} overflow="visible">
      <path d="M40 0 Q55 40 42 80 Q28 120 45 160 Q60 200 38 240 Q20 275 42 310 Q58 340 40 380 Q35 395 38 400" stroke={C.forest} strokeWidth="1.2" fill="none" opacity=".25" strokeLinecap="round"/>
      <Leaf x={42}  y={80}  size={12} rotate={40}  color={C.forest} animClass="sway-2"/>
      <Leaf x={45}  y={160} size={13} rotate={-30} color={C.forest} animClass="sway-1"/>
      <Leaf x={38}  y={240} size={11} rotate={50}  color={C.forest} animClass="sway-3"/>
      <Leaf x={42}  y={310} size={12} rotate={-20} color={C.forest} animClass="sway-2"/>
      <Leaf x={38}  y={380} size={10} rotate={35}  color={C.forest} animClass="sway-1"/>
      {/* Vrilles */}
      <path d="M42 80 Q60 70 65 55 Q62 45 52 48" stroke={C.forest} strokeWidth="0.7" fill="none" opacity=".18" strokeLinecap="round"/>
      <path d="M45 160 Q20 148 18 132 Q22 122 32 126" stroke={C.forest} strokeWidth="0.7" fill="none" opacity=".18" strokeLinecap="round"/>
      <path d="M38 240 Q58 228 62 212 Q58 202 48 206" stroke={C.forest} strokeWidth="0.7" fill="none" opacity=".16" strokeLinecap="round"/>
    </svg>
  );
}

// Racines avec quelques pousses — section sombre
function Roots({ style }) {
  return (
    <svg viewBox="0 0 500 220" fill="none" style={style} overflow="visible">
      <path d="M250 0 Q248 45 238 90 Q226 135 200 168 Q175 195 140 215" stroke={C.offWhite} strokeWidth="1.8" fill="none" opacity=".28" strokeLinecap="round"/>
      <path d="M250 0 Q232 38 210 72 Q188 105 158 128 Q128 148 95 162" stroke={C.offWhite} strokeWidth="1.4" fill="none" opacity=".22" strokeLinecap="round"/>
      <path d="M250 0 Q268 42 285 80 Q305 120 330 150 Q352 175 378 195" stroke={C.offWhite} strokeWidth="1.4" fill="none" opacity=".22" strokeLinecap="round"/>
      <path d="M200 168 Q182 190 168 218" stroke={C.offWhite} strokeWidth="1" fill="none" opacity=".18" strokeLinecap="round"/>
      <path d="M140 215 Q122 218 105 215" stroke={C.offWhite} strokeWidth="0.8" fill="none" opacity=".15" strokeLinecap="round"/>
      <path d="M158 128 Q138 148 118 165 Q98 180 78 195" stroke={C.offWhite} strokeWidth="1" fill="none" opacity=".18" strokeLinecap="round"/>
      <path d="M95 162 Q72 175 50 192 Q32 205 15 218" stroke={C.offWhite} strokeWidth="0.8" fill="none" opacity=".16" strokeLinecap="round"/>
      <path d="M285 80 Q302 100 314 125 Q320 142 315 162" stroke={C.offWhite} strokeWidth="0.8" fill="none" opacity=".15" strokeLinecap="round"/>
      <path d="M330 150 Q345 168 355 190 Q362 205 365 218" stroke={C.offWhite} strokeWidth="0.8" fill="none" opacity=".15" strokeLinecap="round"/>
      <path d="M378 195 Q392 205 404 218" stroke={C.offWhite} strokeWidth="0.7" fill="none" opacity=".14" strokeLinecap="round"/>
      {/* Petites pousses claires */}
      <Leaf x={200} y={168} size={10} rotate={-40} color={C.mist} animClass="sway-2"/>
      <Leaf x={158} y={128} size={9}  rotate={30}  color={C.mist} animClass="sway-3"/>
      <Leaf x={330} y={150} size={10} rotate={-25} color={C.mist} animClass="sway-1"/>
      <Leaf x={95}  y={162} size={8}  rotate={45}  color={C.mist} animClass="sway-2"/>
      <Leaf x={378} y={195} size={9}  rotate={-50} color={C.mist} animClass="sway-3"/>
    </svg>
  );
}

function Btn({ children, variant = "forest", onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        ...T.body, display: "inline-block", padding: "14px 36px",
        background: h ? C.forestLt : (variant === "forest" ? C.forest : "transparent"),
        color: C.offWhite, fontSize: 14, letterSpacing: ".06em",
        textTransform: "uppercase", textDecoration: "none", borderRadius: 2,
        border: variant === "ghost" ? `1px solid ${C.offWhite}55` : "none",
        transition: "all .3s ease",
        transform: h ? "translateY(-2px)" : "none",
        boxShadow: h ? `0 8px 28px ${C.forest}35` : "none",
        cursor: "pointer",
      }}>
      {children}
    </button>
  );
}

function BtnLink({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...T.body, color: C.forest, fontSize: 16, textDecoration: h ? "underline" : "none", opacity: h ? .75 : 1, transition: "opacity .2s", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
      {children}
    </button>
  );
}

// ── THEMES à cocher ──────────────────────────────────────────────────────────
const THEMES = [
  "Gestion de l'énergie et du rythme",
  "Focus, procrastination et charge mentale",
  "Hypersensibilité dans les relations pro et clients",
  "Clarté de l'offre quand on fait beaucoup de choses",
  "Posture commerciale et vente sans se trahir",
  "Structurer son business sans se mettre en cage",
  "Visibilité et communication authentique",
  "Prévenir le burnout et tenir dans la durée",
  "Intelligence émotionnelle comme ressource",
  "Rencontrer d'autres personnes qui se sentent différentes",
  "J'ai vu de la lumière ✦",
];

function FormModal({ onClose }) {
  const [step, setStep] = useState(0); // 0=form, 1=merci
  const [themes, setThemes] = useState([]);
  const [autreTheme, setAutreTheme] = useState("");
  const [dispo, setDispo] = useState([]);
  const [form, setForm] = useState({
    activite: "", imageUrl: "", imagePourquoi: "",
    pourquoi: "",
    prenom: "", nom: "", email: "", tel: "",
    age: "", anciennete: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleTheme = (t) => setThemes(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);
  const toggleDispo = (d) => setDispo(ds => ds.includes(d) ? ds.filter(x => x !== d) : [...ds, d]);

  const inp = (extra = {}) => ({
    ...T.body, fontWeight: 400, fontSize: 15,
    background: C.bgAlt, border: `1px solid ${C.dark}15`,
    borderRadius: 3, padding: "12px 16px", width: "100%",
    color: C.dark, outline: "none", resize: "vertical",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box", ...extra,
  });

  const label = (txt, opt) => (
    <label style={{ ...T.body, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: C.forest, display: "block", marginBottom: 8 }}>
      {txt}{opt && <span style={{ color: `${C.dark}45`, marginLeft: 6, textTransform: "none", letterSpacing: 0, fontSize: 11 }}>optionnel</span>}
    </label>
  );

  const field = (k, placeholder, rows) => rows
    ? <textarea value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} rows={rows} style={inp({ lineHeight: 1.7 })} />
    : <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} style={inp()} />;

  const handleSubmit = () => setStep(1);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(28,36,34,.72)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      overflowY: "auto", padding: "40px 16px",
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: C.bg, borderRadius: 4, width: "100%", maxWidth: 620,
        padding: "48px 40px", position: "relative",
        boxShadow: `0 32px 80px rgba(0,0,0,.25)`,
      }}>
        {/* Fermer */}
        <button onClick={onClose} style={{
          position: "absolute", top: 20, right: 20,
          background: "none", border: "none", cursor: "pointer",
          ...T.body, fontSize: 22, color: `${C.dark}50`, lineHeight: 1, padding: 4,
        }}>×</button>

        {step === 0 ? (
          <>
            {/* En-tête */}
            <p style={{ ...T.body, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: C.forest, margin: "0 0 10px 0" }}>Candidature</p>
            <h2 style={{ ...T.h2, fontSize: "clamp(22px,5vw,30px)", color: C.dark, margin: "0 0 12px 0", lineHeight: 1.2 }}>
              Rejoindre le Cercle Mozaïc
            </h2>
            <p style={{ fontSize: 15, color: `${C.dark}70`, margin: "0 0 40px 0", lineHeight: 1.7 }}>
              Ce formulaire est court, vraiment. 3 questions,<br />pas de bonne ou mauvaise réponse. On veut juste commencer à te connaître. ✦
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Q1 */}
              <div>
                <p style={{ ...T.cite, fontSize: 18, color: C.dark, margin: "0 0 6px 0" }}>1 — Qui es-tu en tant qu'entrepreneur·e ?</p>
                <p style={{ fontSize: 13, color: `${C.dark}60`, margin: "0 0 16px 0", lineHeight: 1.6 }}>Ton activité, ta façon d'entreprendre, ce qui te rend différent·e… Raconte-toi comme tu veux.</p>
                {field("activite", "Raconte-toi...", 5)}
                <div style={{ marginTop: 16 }}>
                  {label("Une image qui te représente ici et maintenant", true)}
                  {field("imageUrl", "Lien de l'image (URL)")}
                  <div style={{ marginTop: 10 }}>
                    {field("imagePourquoi", "Pourquoi cette image ?", 2)}
                  </div>
                </div>
              </div>

              {/* Q2 */}
              <div>
                <p style={{ ...T.cite, fontSize: 18, color: C.dark, margin: "0 0 6px 0" }}>2 — Qu'est-ce qui t'a amené·e vers le Cercle Mozaïc ?</p>
                <p style={{ fontSize: 13, color: `${C.dark}60`, margin: "0 0 16px 0", lineHeight: 1.6 }}>Un besoin, une intuition, quelque chose qu'on t'a dit, ou une lassitude de te sentir seul·e à naviguer autrement.</p>
                {field("pourquoi", "Ce qui t'a fait cliquer...", 4)}
              </div>

              {/* Q3 */}
              <div>
                <p style={{ ...T.cite, fontSize: 18, color: C.dark, margin: "0 0 6px 0" }}>3 — Les thèmes qui t'attirent</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {THEMES.map(t => (
                    <label key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                      <div onClick={() => toggleTheme(t)} style={{
                        width: 18, height: 18, borderRadius: 2, flexShrink: 0, marginTop: 2,
                        border: `1.5px solid ${themes.includes(t) ? C.forest : C.dark+"30"}`,
                        background: themes.includes(t) ? C.forest : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all .2s", cursor: "pointer",
                      }}>
                        {themes.includes(t) && <span style={{ color: C.offWhite, fontSize: 11, lineHeight: 1 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 14, color: `${C.dark}85`, lineHeight: 1.5 }}>{t}</span>
                    </label>
                  ))}
                  {/* Autre */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => toggleTheme("autre")} style={{
                      width: 18, height: 18, borderRadius: 2, flexShrink: 0, marginTop: 2,
                      border: `1.5px solid ${themes.includes("autre") ? C.forest : C.dark+"30"}`,
                      background: themes.includes("autre") ? C.forest : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .2s", cursor: "pointer",
                    }}>
                      {themes.includes("autre") && <span style={{ color: C.offWhite, fontSize: 11, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 14, color: `${C.dark}85`, lineHeight: 1.5 }}>Autre</span>
                  </label>
                  {themes.includes("autre") && (
                    <input value={autreTheme} onChange={e => setAutreTheme(e.target.value)} placeholder="Précise ici..." style={{ ...inp(), marginLeft: 28, width: "calc(100% - 28px)" }} />
                  )}
                </div>
              </div>

              {/* Infos pratiques */}
              <div style={{ borderTop: `1px solid ${C.dark}12`, paddingTop: 28 }}>
                <p style={{ ...T.cite, fontSize: 18, color: C.dark, margin: "0 0 20px 0" }}>Pour qu'on se retrouve</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>{label("Prénom")}{field("prenom", "")}</div>
                  <div>{label("Nom")}{field("nom", "")}</div>
                  <div style={{ gridColumn: "1/-1" }}>{label("Email")}{field("email", "")}</div>
                  <div style={{ gridColumn: "1/-1" }}>{label("Téléphone", true)}{field("tel", "")}</div>
                  <div>
                    {label("Tranche d'âge")}
                    <select value={form.age} onChange={e => set("age", e.target.value)} style={inp()}>
                      <option value="">—</option>
                      {["25–35 ans","35–45 ans","45–55 ans","55 ans et +"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    {label("Ancienneté")}
                    <select value={form.anciennete} onChange={e => set("anciennete", e.target.value)} style={inp()}>
                      <option value="">—</option>
                      {["Moins d'un an","1 à 5 ans","Plus de 5 ans"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  {label("Disponibilités pour la visio 20 min")}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Matin","Midi","Après-midi","Soirée"].map(d => (
                      <button key={d} onClick={() => toggleDispo(d)} style={{
                        ...T.body, fontWeight: 400, fontSize: 13,
                        padding: "8px 18px", borderRadius: 2, cursor: "pointer",
                        border: `1.5px solid ${dispo.includes(d) ? C.forest : C.dark+"25"}`,
                        background: dispo.includes(d) ? `${C.forest}15` : "transparent",
                        color: dispo.includes(d) ? C.forest : `${C.dark}70`,
                        transition: "all .2s",
                      }}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} style={{
                ...T.body, fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase",
                background: C.forest, color: C.offWhite,
                border: "none", borderRadius: 2, padding: "16px 32px",
                cursor: "pointer", width: "100%", marginTop: 8,
                transition: "background .3s",
              }}>
                Envoyer ma candidature →
              </button>
            </div>
          </>
        ) : (
          /* Merci */
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: 32, margin: "0 0 24px 0" }}>✦</p>
            <h2 style={{ ...T.h2, fontSize: 28, color: C.dark, margin: "0 0 20px 0" }}>Merci.</h2>
            <p style={{ fontSize: 16, color: `${C.dark}75`, lineHeight: 1.9, margin: "0 0 36px 0" }}>
              On prend le temps de lire chaque candidature.<br />
              Tu auras des nouvelles de notre part dans les 48h. ✦
            </p>
            <button onClick={onClose} style={{
              ...T.body, fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase",
              background: "none", color: C.forest, border: `1.5px solid ${C.forest}`,
              borderRadius: 2, padding: "12px 28px", cursor: "pointer",
            }}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Carte témoignage — T3 uniquement (italic regular)
function TestiCard({ quote, name, role }) {
  return (
    <div style={{
      background: C.bg,
      borderRadius: 3,
      padding: "28px 24px",
      border: `1px solid ${C.forest}20`,
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      {/* Guillemet décoratif */}
      <span style={{ ...T.cite, fontSize: 40, color: `${C.forest}30`, lineHeight: 1, display: "block", marginBottom: -8 }}>"</span>
      <p style={{ ...T.card, fontSize: 15, color: `${C.dark}85`, lineHeight: 1.8, margin: 0 }}>{quote}</p>
      <div style={{ borderTop: `1px solid ${C.dark}12`, paddingTop: 14 }}>
        <p style={{ ...T.body, fontSize: 13, color: C.forest, margin: "0 0 2px 0" }}>{name}</p>
        <p style={{ ...T.body, fontSize: 12, color: `${C.dark}50`, margin: 0, fontWeight: 400 }}>{role}</p>
      </div>
    </div>
  );
}

const wrap = { maxWidth: 660, margin: "0 auto", padding: "0 28px" };

// ── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────
export default function CercleMozaic() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const open = () => { setModal(true); document.body.style.overflow = "hidden"; };
  const close = () => { setModal(false); document.body.style.overflow = ""; };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap";
    document.head.appendChild(link);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.dark, ...T.body, overflowX: "hidden" }}>
      {modal && <FormModal onClose={close} />}

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? `${C.bg}F4` : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.forest}15` : "none",
        transition: "all .4s ease",
      }}>
        <span style={{ ...T.cite, fontSize: 18, color: C.dark }}>Cercle Mozaïc</span>
        <Btn onClick={open}>Je candidate</Btn>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
        <Branches style={{ position: "absolute", top: -20, right: -30, width: 300, height: 320, pointerEvents: "none" }} />
        <Branches style={{ position: "absolute", bottom: 20, left: -40, width: 220, height: 240, transform: "scaleX(-1) rotate(15deg)", pointerEvents: "none" }} />

        <div style={{ ...wrap, textAlign: "center", paddingTop: 64, paddingBottom: 88 }}>
          <FadeIn delay={.1}>
            <p style={{ ...T.cite, fontSize: 20, color: `${C.dark}85`, lineHeight: 1.8, margin: "0 0 4px 0" }}>
              Les entrepreneurs ne manquent pas de stratégies.
            </p>
            <p style={{ ...T.cite, fontSize: 20, color: `${C.dark}85`, lineHeight: 1.8, margin: "0 0 40px 0" }}>
              Ils manquent souvent de lucidité sur eux-mêmes.
            </p>
          </FadeIn>

          <FadeIn delay={.3}>
            <h1 style={{ ...T.h1, fontSize: "clamp(32px, 8vw, 54px)", color: C.dark, lineHeight: 1.15, margin: "0 0 10px 0" }}>
              Le Cercle Mozaïc
            </h1>
            <h1 style={{ ...T.h1, fontSize: "clamp(22px, 5vw, 36px)", color: C.forest, lineHeight: 1.3, fontWeight: 400, margin: "0 0 36px 0" }}>
              — un chemin vers la lucidité.
            </h1>
          </FadeIn>

          <FadeIn delay={.5}>
            <p style={{ ...T.body, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: `${C.dark}50`, marginBottom: 52 }}>
              Du pilote automatique au leader pleinement vivant.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Btn onClick={open}>Je candidate</Btn>
            </div>
          </FadeIn>

          <FadeIn delay={.9}>
            <div style={{ marginTop: 72, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 1, height: 52, background: `linear-gradient(to bottom, ${C.forest}60, transparent)`, animation: "breathe 2.4s ease-in-out infinite" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LE MIROIR ── */}
      <section style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        <Vine style={{ position: "absolute", right: -12, top: 0, width: 80, height: "100%", pointerEvents: "none" }} />
        <div style={wrap}>
          <FadeIn>
            <div style={{ fontSize: 16, lineHeight: 2.2 }}>

              <div style={{ marginBottom: 44 }}>
                {["Tu performes.", "Tu livres. Tu gères.", "Tu optimises. Tu perfectionnes.", "Tu ajoutes. Tu avances."].map((l, i) => (
                  <p key={i} style={{ margin: "4px 0", color: `${C.dark}75` }}>{l}</p>
                ))}
              </div>

              {/* Citation forte — T1 */}
              <div style={{ borderLeft: `2px solid ${C.forest}`, paddingLeft: 24, margin: "0 0 40px 0" }}>
                <p style={{ ...T.cite, fontSize: 25, color: C.dark, lineHeight: 1.55, margin: 0 }}>
                  Mais à l'intérieur,<br />quelque chose ne tourne pas rond.
                </p>
              </div>

              <p style={{ margin: "0 0 16px 0", color: `${C.dark}85` }}>Tu sur-analyses chaque décision.</p>
              <p style={{ margin: "0 0 12px 0", color: `${C.dark}85` }}>Tu t'épuises à empiler tous tes masques :</p>

              <div style={{ paddingLeft: 20, borderLeft: `1px solid ${C.dark}15`, margin: "12px 0 28px 0" }}>
                {["Le bon manageur, le bon leader,", "Le bon gestionnaire, le bon fournisseur,", "Le bon mari, le bon fils, le bon papa."].map((l, i) => (
                  <p key={i} style={{ margin: "6px 0", fontSize: 15, color: `${C.dark}65` }}>{l}</p>
                ))}
              </div>

              <p style={{ margin: "0 0 32px 0", color: `${C.dark}85` }}>Tu t'épuises à ressembler à tous ces quelqu'un que tu n'es pas.</p>

              <div style={{ marginBottom: 36 }}>
                {[["Tu fonctionnes. Tu enchaînes.", true], ["Ton cerveau ne s'arrête jamais.", false], ["Tes émotions n'osent plus s'exprimer.", false], ["Parfois une colère qui explose.", false], ["Tu ne sais souvent même pas pourquoi.", false], ["Ce n'était pas si grave.", false, true]].map(([t, bold, dim], i) => (
                  <p key={i} style={{ margin: "8px 0", fontWeight: bold ? 500 : 400, color: `${C.dark}${dim ? "50" : "80"}` }}>{t}</p>
                ))}
              </div>

              <div style={{ textAlign: "center", margin: "52px 0" }}>
                {/* Climax — T1 */}
                <p style={{ ...T.h2, fontSize: 30, color: C.dark, margin: "0 0 20px 0" }}>Tu t'épuises.</p>
                <p style={{ margin: "0 0 6px 0", color: `${C.dark}80` }}>Tu sens que quelque chose ne va pas.</p>
                <p style={{ margin: "0 0 32px 0", color: `${C.dark}80` }}>Que ton énergie fuit comme l'eau dans une passoire.</p>
                <p style={{ ...T.cite, fontSize: 22, color: `${C.dark}60`, margin: "0 0 12px 0" }}>Et pourtant.</p>
                <p style={{ margin: "0 0 6px 0", color: `${C.dark}80` }}>Tu continues.</p>
                <p style={{ margin: "0 0 6px 0", fontSize: 15, color: `${C.dark}60` }}>Parce que c'est comme ça que ça marche, non ?</p>
                <p style={{ margin: "0 0 44px 0", fontSize: 15, color: `${C.dark}55` }}>
                  Et même si tu détestes cette phrase :<br />
                  <span style={{ fontWeight: 500 }}>"On a toujours fait comme ça."</span>
                </p>
                <BtnLink onClick={open}>J'en peux plus → je candidate</BtnLink>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LE CERCLE — fond sombre ── */}
      <section style={{ background: C.darkMid, padding: "88px 0", position: "relative", overflow: "hidden" }}>
        <Roots style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, pointerEvents: "none" }} />
        <Branches style={{ position: "absolute", top: -10, right: -20, width: 200, height: 220, opacity: .5, pointerEvents: "none" }} />
        <div style={{ ...wrap, textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ ...T.h2, fontSize: "clamp(28px, 7vw, 44px)", color: C.offWhite, margin: "0 0 14px 0" }}>
              Le Cercle Mozaïc
            </h2>
            <p style={{ ...T.cite, fontSize: 20, color: `${C.offWhite}80`, marginBottom: 52 }}>
              Un cercle mensuel fermé.
            </p>
          </FadeIn>

          <FadeIn delay={.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
              {["6 à 8 entrepreneurs atypiques.", "Un espace volontairement restreint.", "2h en visio. Une fois par mois."].map((f, i) => (
                <p key={i} style={{ fontSize: 15, color: `${C.offWhite}65`, margin: 0 }}>{f}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={.2}>
            <div style={{ padding: "28px 24px", margin: "0 0 40px 0", border: `1px solid ${C.mist}45`, borderRadius: 3 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: C.mist, margin: 0, lineHeight: 1.9 }}>
                Pas un cours. Pas une thérapie.<br />Pas un groupe de parole.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={.3}>
            {/* Citation forte — T1 */}
            <p style={{ ...T.cite, fontSize: 24, color: C.offWhite, marginBottom: 12, lineHeight: 1.5 }}>
              Un espace de lucidité entre pairs.
            </p>
            {["Pour se connaître vraiment.", "Pour diriger depuis qui tu es."].map((l, i) => (
              <p key={i} style={{ fontSize: 15, color: `${C.offWhite}60`, marginBottom: 6 }}>{l}</p>
            ))}
            <div style={{ width: 36, height: 1, background: `${C.mist}50`, margin: "32px auto" }} />
            {["Un parcours progressif de 10 séances.", "Chaque mois, un thème choisi par le groupe."].map((l, i) => (
              <p key={i} style={{ fontSize: 14, color: `${C.offWhite}55`, marginBottom: 8 }}>{l}</p>
            ))}
            <p style={{ ...T.cite, fontSize: 20, color: C.mist, marginTop: 16 }}>
              De ton mode d'emploi vers ton rayonnement.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── HISTOIRE D'HENRI ── */}
      <section style={{ padding: "88px 0" }}>
        <div style={wrap}>
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: C.forest, marginBottom: 14 }}>Henri</p>
            <h2 style={{ ...T.h2, fontSize: "clamp(26px, 6vw, 38px)", color: C.dark, lineHeight: 1.2, marginBottom: 52 }}>
              Qui suis-je<br />et quelle est mon histoire
            </h2>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={.1}>
            <div style={{ maxWidth: 300, margin: "0 auto 60px", position: "relative" }}>
              <div style={{ width: "100%", paddingBottom: "115%", background: `linear-gradient(145deg, ${C.bgAlt}, ${C.forest}14)`, borderRadius: 3, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <Branches style={{ width: 80, height: 90, opacity: .3 }} />
                  <p style={{ fontSize: 12, color: `${C.dark}40`, textAlign: "center", lineHeight: 1.6, padding: "0 20px" }}>
                    Photo d'Henri<br /><span style={{ fontSize: 11 }}>Portrait 3/4 · lumière naturelle</span>
                  </p>
                </div>
              </div>
              <div style={{ position: "absolute", left: -7, top: 48, bottom: 48, width: 2, background: C.forest, opacity: .45, borderRadius: 1 }} />
            </div>
          </FadeIn>

          <FadeIn delay={.15}>
            <div style={{ fontSize: 16, lineHeight: 2.1 }}>
              <p style={{ marginBottom: 16 }}>Il y a 4 ans, ma femme est diagnostiquée d'un cancer rare et grave.</p>
              <p style={{ marginBottom: 32, color: `${C.dark}75` }}>
                Mon fils avait 3 ans.<br />
                Pour tenir — pour lui — je suis passé en mode automatique.<br />
                Un robot qui fonctionnait encore, mais qui ne vivait plus.
              </p>

              {/* Citation T1 */}
              <div style={{ borderLeft: `2px solid ${C.forest}`, paddingLeft: 24, margin: "0 0 36px 0" }}>
                <p style={{ ...T.cite, fontSize: 23, color: C.dark, lineHeight: 1.55, margin: 0 }}>
                  C'est là, dans ce chaos,<br />que j'ai commencé à travailler sur moi.
                </p>
              </div>

              <p style={{ marginBottom: 6, fontSize: 15, color: `${C.dark}70` }}>Accompagné de mes coachs et de ma psy.</p>
              <p style={{ marginBottom: 36, fontSize: 15, color: `${C.dark}55` }}>J'ai exploré mes fragments. Mon câblage. Mon mode d'emploi.</p>

              <p style={{ marginBottom: 8, fontWeight: 500 }}>Elle est décédée il y a presque 2 ans.</p>
              <p style={{ marginBottom: 8, color: `${C.dark}75` }}>Ma maman a suivi.</p>
              <p style={{ marginBottom: 32, color: `${C.dark}75` }}>Et j'ai continué.</p>
              <p style={{ marginBottom: 8, fontSize: 15, color: `${C.dark}70` }}>Parce que je n'avais plus l'énergie de lutter contre moi-même.</p>
              <p style={{ marginBottom: 32, fontSize: 15, color: `${C.dark}70` }}>Plus l'énergie de maintenir tous ces masques.</p>

              {/* Citation forte T1 */}
              <div style={{ background: `${C.forest}0C`, border: `1px solid ${C.forest}28`, borderRadius: 3, padding: "22px 26px", margin: "0 0 36px 0" }}>
                <p style={{ ...T.cite, fontSize: 20, color: C.dark, margin: 0, lineHeight: 1.65 }}>
                  Face à la réalité de la mort —<br />les masques deviennent ridicules.
                </p>
              </div>

              <p style={{ marginBottom: 16, color: `${C.dark}75` }}>Alors j'ai choisi.</p>
              <div style={{ marginBottom: 36 }}>
                {["De vivre pleinement chacun de mes deuils.", "De traverser chacune des émotions qui s'exprimaient,", "De laisser la marmite exploser puis se vider entièrement.", "D'accompagner mon fils avec ses atypismes.", "De me séparer de ce qui me coûtait trop d'énergie.", "De me mettre au centre.", "D'écouter mon corps.", "D'accepter mes propres limites.", "D'accepter que je suis moi-même limité."].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <span style={{ color: C.forest, fontSize: 11, marginTop: 6, flexShrink: 0 }}>◆</span>
                    <p style={{ margin: 0, fontSize: 15, color: `${C.dark}80`, lineHeight: 1.65 }}>{c}</p>
                  </div>
                ))}
              </div>

              <p style={{ marginBottom: 6, fontWeight: 500, fontSize: 17 }}>C'est ce chemin que je te propose de faire.</p>
              <p style={{ marginBottom: 4, color: `${C.dark}70` }}>Pas seul.</p>
              <p style={{ color: C.forest, fontWeight: 500 }}>Entre pairs.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COMMENT ÇA FONCTIONNE ── */}
      <section style={{ background: C.bgAlt, padding: "88px 0" }}>
        <div style={wrap}>
          <FadeIn>
            <h2 style={{ ...T.h2, fontSize: "clamp(26px, 6vw, 38px)", color: C.dark, marginBottom: 52, textAlign: "center" }}>
              Comment ça fonctionne
            </h2>
          </FadeIn>

          <FadeIn delay={.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 44 }}>
              {[["Durée", "2h en visio", "une fois par mois"], ["Groupe", "6 à 8", "cercle fermé"], ["Parcours", "10 séances", "progressif"], ["Lancement", "Avril 2026", ""]].map(([label, val, sub], i) => (
                <div key={i} style={{ background: C.bg, borderRadius: 3, padding: "22px 18px", border: `1px solid ${C.dark}0D` }}>
                  <p style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: C.forest, margin: "0 0 8px 0" }}>{label}</p>
                  {/* Valeur — T1 */}
                  <p style={{ ...T.cite, fontSize: 24, color: C.dark, margin: "0 0 4px 0", lineHeight: 1.2 }}>{val}</p>
                  {sub && <p style={{ fontSize: 11, color: `${C.dark}50`, margin: 0 }}>{sub}</p>}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={.2}>
            <div style={{ textAlign: "center", background: C.bg, borderRadius: 3, padding: "30px 24px", border: `1px solid ${C.forest}30`, marginBottom: 52 }}>
              {/* Prix — T1 */}
              <p style={{ ...T.h1, fontSize: 52, color: C.dark, margin: "0 0 4px 0", lineHeight: 1 }}>150€</p>
              <p style={{ fontSize: 12, color: `${C.dark}50`, margin: 0, letterSpacing: ".07em", textTransform: "uppercase" }}>par mois</p>
            </div>
          </FadeIn>

          <FadeIn delay={.25}>
            <div style={{ borderLeft: `2px solid ${C.forest}`, paddingLeft: 24, marginBottom: 32 }}>
              <p style={{ ...T.cite, fontSize: 20, color: C.dark, lineHeight: 1.6, margin: 0 }}>
                Le Cercle Mozaïc n'est pas une inscription automatique.<br />
                C'est une candidature.
              </p>
            </div>
            <p style={{ fontSize: 15, color: `${C.dark}70`, marginBottom: 32 }}>Parce que le groupe compte autant que le parcours.</p>
          </FadeIn>

          <FadeIn delay={.3}>
            <div style={{ marginBottom: 56 }}>
              {[["01", "Tu remplis le formulaire."], ["02", "Je te réponds personnellement sous 48h."], ["03", "On se retrouve en visio — 20 minutes — pour voir si c'est le bon moment et le bon groupe pour toi."]].map(([num, text], i) => (
                <div key={i} style={{ display: "flex", gap: 20, marginBottom: 22, alignItems: "flex-start" }}>
                  {/* Numéro — T1 */}
                  <span style={{ ...T.cite, fontSize: 22, color: `${C.forest}65`, minWidth: 28, lineHeight: 1.4 }}>{num}</span>
                  <p style={{ fontSize: 15, color: `${C.dark}80`, lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="candidature" style={{ background: C.darkMid, padding: "100px 0 120px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <Roots style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) scaleY(-1)", width: 400, height: 180, pointerEvents: "none", opacity: .6 }} />

        <div style={wrap}>
          <FadeIn>
            <p style={{ ...T.cite, fontSize: 21, color: `${C.offWhite}70`, marginBottom: 20, lineHeight: 1.7 }}>
              Si tu te reconnais dans ces mots,<br />si tu sens que c'est le bon moment,
            </p>
            <h2 style={{ ...T.h2, fontSize: "clamp(30px, 7vw, 48px)", color: C.offWhite, marginBottom: 52 }}>
              Fais le premier pas.
            </h2>
            <Btn variant="ghost" onClick={open}>→ Je candidate</Btn>
            <p style={{ fontSize: 12, color: `${C.offWhite}35`, marginTop: 22, letterSpacing: ".05em" }}>
              Réponse personnelle sous 48h
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.darkMid, borderTop: `1px solid ${C.offWhite}0A`, padding: "20px 28px", textAlign: "center" }}>
        <p style={{ ...T.cite, fontSize: 15, color: `${C.offWhite}30`, margin: 0 }}>Cercle Mozaïc — Henri</p>
      </footer>

      <style>{`
        @keyframes breathe    { 0%,100%{opacity:.3;transform:scaleY(.8)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes sway       { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(6deg)} }
        @keyframes swayAlt    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-6deg)} }
        @keyframes swayMid    { 0%,100%{transform:rotate(2deg)} 50%{transform:rotate(-4deg)} }
        @keyframes floatUp    { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(8deg)} }
        @keyframes floatAlt   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(-6deg)} }
        @keyframes floatMid   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(5deg)} }

        .sway-1 { transform-origin: bottom center; animation: sway    5s ease-in-out infinite; }
        .sway-2 { transform-origin: bottom center; animation: swayAlt 6.5s ease-in-out infinite; }
        .sway-3 { transform-origin: bottom center; animation: swayMid 4.2s ease-in-out infinite; }
        .float-1 { animation: floatUp  7s ease-in-out infinite; }
        .float-2 { animation: floatAlt 9s ease-in-out infinite; }
        .float-3 { animation: floatMid 5.5s ease-in-out infinite; }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
