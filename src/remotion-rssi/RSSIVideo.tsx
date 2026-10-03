import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const COLORS = {
  darkBg: "#050a18",
  deepBlue: "#0a1628",
  primary: "#00e5ff",
  secondary: "#ff3d71",
  accent: "#ffd700",
  green: "#00e676",
  orange: "#ff9100",
  purple: "#b388ff",
  white: "#ffffff",
  lightGray: "#90a4ae",
  card: "rgba(10,22,40,0.85)",
};

// ── Reusable animated background grid ──
const CyberGrid: React.FC<{ frame: number; color?: string }> = ({
  frame,
  color = COLORS.primary,
}) => {
  const offset = (frame * 0.5) % 60;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.06,
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `${offset}px ${offset}px`,
      }}
    />
  );
};

// ── Floating particles ──
const Particles: React.FC<{ frame: number; count?: number; color?: string }> = ({
  frame,
  count = 20,
  color = COLORS.primary,
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const x = ((i * 97 + 31) % 1920);
      const baseY = ((i * 73 + 17) % 1080);
      const y = (baseY - frame * (0.3 + (i % 5) * 0.2) + 1200) % 1200 - 60;
      const size = 2 + (i % 4);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.15 + (i % 3) * 0.1,
          }}
        />
      );
    })}
  </>
);

// ── Animated counter component ──
const AnimatedNumber: React.FC<{
  frame: number;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ frame, start, end, startFrame, endFrame, prefix = "", suffix = "", style }) => {
  const value = Math.round(
    interpolate(frame, [startFrame, endFrame], [start, end], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );
  return (
    <span style={style}>
      {prefix}{value.toLocaleString("fr-FR")}{suffix}
    </span>
  );
};

// ── Scan line effect ──
const ScanLine: React.FC<{ frame: number }> = ({ frame }) => {
  const y = (frame * 3) % 1120 - 20;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${COLORS.primary}40, transparent)`,
        boxShadow: `0 0 20px ${COLORS.primary}30`,
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 1: TITLE — Cybersecurity Shield Intro
// ═══════════════════════════════════════════════════════════════
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({ frame, fps, config: { damping: 10, mass: 1.2 } });
  const titleSlide = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [30, 70], [0, 700], { extrapolateRight: "clamp" });
  const pulseGlow = interpolate(frame % 50, [0, 25, 50], [15, 45, 15]);

  // Hex grid background
  const hexPoints: Array<{ x: number; y: number; delay: number }> = [];
  for (let i = 0; i < 30; i++) {
    hexPoints.push({
      x: (i * 137 + 42) % 1920,
      y: (i * 89 + 23) % 1080,
      delay: i * 3,
    });
  }

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #0d2137 0%, #050a18 60%, #020408 100%)`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} />
      <Particles frame={frame} count={30} />
      <ScanLine frame={frame} />

      {/* Animated hex nodes */}
      {hexPoints.map((p, i) => {
        const nodeOpacity = interpolate(frame, [p.delay, p.delay + 30], [0, 0.12], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: `1px solid ${COLORS.primary}`,
              opacity: nodeOpacity,
              boxShadow: `0 0 10px ${COLORS.primary}40`,
            }}
          />
        );
      })}

      {/* Shield icon */}
      <div
        style={{
          transform: `scale(${shieldScale})`,
          fontSize: 130,
          position: "absolute",
          top: 140,
          textShadow: `0 0 ${pulseGlow}px ${COLORS.primary}`,
          filter: `drop-shadow(0 0 20px ${COLORS.primary}60)`,
        }}
      >
        🛡️
      </div>

      {/* Title block */}
      <div
        style={{
          textAlign: "center",
          marginTop: 100,
          transform: `translateY(${interpolate(titleSlide, [0, 1], [40, 0])}px)`,
          opacity: titleSlide,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.primary,
            fontFamily: "Arial, sans-serif",
            margin: 0,
            letterSpacing: 14,
            textTransform: "uppercase",
          }}
        >
          Responsable de la Sécurité
        </h1>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.primary,
            fontFamily: "Arial, sans-serif",
            margin: "5px 0 0",
            letterSpacing: 14,
            textTransform: "uppercase",
          }}
        >
          des Systèmes d'Information
        </h1>

        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.accent}, ${COLORS.primary}, transparent)`,
            margin: "25px auto",
          }}
        />

        <h2
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "Arial, sans-serif",
            margin: 0,
            textShadow: `0 0 40px ${COLORS.primary}80, 0 0 80px ${COLORS.primary}30`,
            letterSpacing: 8,
          }}
        >
          RSSI en Afrique
        </h2>
      </div>

      {/* Subtitle */}
      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 32,
          color: COLORS.lightGray,
          fontFamily: "Arial, sans-serif",
          marginTop: 30,
          letterSpacing: 3,
        }}
      >
        Cybersécurité · Gouvernance · Résilience
      </p>

      {/* Tagline */}
      <p
        style={{
          opacity: taglineOpacity,
          fontSize: 24,
          color: COLORS.accent,
          fontFamily: "Arial, sans-serif",
          marginTop: 15,
          fontWeight: 600,
        }}
      >
        État des lieux, défis et perspectives
      </p>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2: What is a RSSI / CISO?
// ═══════════════════════════════════════════════════════════════
const RoleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const responsibilities = [
    { icon: "📋", text: "Définir la politique de sécurité de l'information" },
    { icon: "🔍", text: "Surveillance et réponse aux incidents cyber" },
    { icon: "⚖️", text: "Conformité réglementaire (ISO 27001, Malabo)" },
    { icon: "🎓", text: "Sensibilisation et formation des employés" },
    { icon: "🛡️", text: "Protection contre ransomware, phishing, DDoS" },
    { icon: "📊", text: "Gestion des risques organisationnels" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #050a18 0%, #0d1b2a 50%, #0a1628 100%)`,
        padding: 80,
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} color={COLORS.purple} />
      <Particles frame={frame} count={12} color={COLORS.purple} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          transform: `translateX(${interpolate(titleSpring, [0, 1], [-300, 0])}px)`,
          opacity: titleSpring,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            width: 8,
            height: 70,
            background: `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.purple})`,
            borderRadius: 4,
          }}
        />
        <h2
          style={{
            fontSize: 58,
            color: COLORS.white,
            fontFamily: "Arial, sans-serif",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Qu'est-ce qu'un <span style={{ color: COLORS.primary }}>RSSI</span> ?
        </h2>
      </div>

      {/* Definition */}
      <p
        style={{
          fontSize: 28,
          color: COLORS.lightGray,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          maxWidth: 1400,
          marginBottom: 40,
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" }),
          paddingLeft: 32,
          borderLeft: `3px solid ${COLORS.primary}30`,
        }}
      >
        Le RSSI (Chief Information Security Officer) est le cadre dirigeant responsable
        de la vision, de la stratégie et du programme de sécurité des systèmes d'information.
        En Afrique, seulement <span style={{ color: COLORS.accent, fontWeight: 700 }}>22% des entreprises de 500+ employés</span> ont
        un responsable cybersécurité dédié.
      </p>

      {/* Responsibilities grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 1500,
        }}
      >
        {responsibilities.map((item, i) => {
          const delay = 30 + i * 12;
          const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
          });
          const slideX = interpolate(frame, [delay, delay + 20], [i % 2 === 0 ? -100 : 100, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: itemOpacity,
                transform: `translateX(${slideX}px)`,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${COLORS.primary}20`,
                borderRadius: 14,
                padding: "20px 28px",
              }}
            >
              <span style={{ fontSize: 40, flexShrink: 0 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 25,
                  color: COLORS.white,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3: Cyber Threat Landscape — Stats
// ═══════════════════════════════════════════════════════════════
const ThreatStatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const stats = [
    { value: 3153, suffix: "", label: "Cyberattaques / semaine", subtext: "par organisation en Afrique", color: COLORS.secondary, icon: "⚠️" },
    { value: 60, suffix: "%", label: "Au-dessus de la moyenne", subtext: "mondiale des cyberattaques", color: COLORS.orange, icon: "📈" },
    { value: 10, suffix: " Mrd $", label: "Pertes annuelles", subtext: "dues à la cybercriminalité", color: COLORS.accent, icon: "💰" },
    { value: 90, suffix: "%", label: "Entreprises non protégées", subtext: "opèrent sans protocoles cyber", color: COLORS.secondary, icon: "🚨" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 50%, #1a0a0a 0%, #0a0514 40%, #050a18 100%)`,
        padding: 80,
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} color={COLORS.secondary} />
      <ScanLine frame={frame} />

      {/* Alert bar top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${COLORS.secondary}, ${COLORS.orange}, ${COLORS.secondary}, transparent)`,
          opacity: interpolate(frame % 60, [0, 30, 60], [0.3, 1, 0.3]),
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 50,
          opacity: titleSpring,
          transform: `scale(${titleSpring})`,
        }}
      >
        <span style={{ fontSize: 55 }}>🌍</span>
        <h2
          style={{
            fontSize: 56,
            color: COLORS.secondary,
            fontFamily: "Arial, sans-serif",
            fontWeight: 800,
            margin: 0,
            textShadow: `0 0 30px ${COLORS.secondary}50`,
          }}
        >
          Paysage des Menaces Cyber en Afrique
        </h2>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 35,
          maxWidth: 1600,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 20 + i * 18;
          const cardScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 10, mass: 0.8 },
          });

          return (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${stat.color}30`,
                borderRadius: 20,
                padding: "35px 40px",
                transform: `scale(${cardScale})`,
                opacity: cardScale,
                display: "flex",
                alignItems: "center",
                gap: 30,
                boxShadow: `0 0 30px ${stat.color}10`,
              }}
            >
              <span style={{ fontSize: 60, flexShrink: 0 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 52, fontWeight: 900, color: stat.color, fontFamily: "Arial, sans-serif" }}>
                  <AnimatedNumber
                    frame={frame}
                    start={0}
                    end={stat.value}
                    startFrame={delay + 5}
                    endFrame={delay + 40}
                    suffix={stat.suffix}
                    style={{}}
                  />
                </div>
                <div style={{ fontSize: 26, color: COLORS.white, fontWeight: 700, fontFamily: "Arial, sans-serif", marginTop: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginTop: 4 }}>
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source line */}
      <p
        style={{
          position: "absolute",
          bottom: 30,
          right: 60,
          fontSize: 16,
          color: COLORS.lightGray,
          fontFamily: "Arial, sans-serif",
          opacity: interpolate(frame, [80, 100], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      >
        Sources : Check Point Research, INTERPOL, Deloitte
      </p>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4: Major Incidents Timeline
// ═══════════════════════════════════════════════════════════════
const IncidentsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const incidents = [
    { year: "2023", event: "MTN Nigeria", detail: "Perte de 53M $ — Mobile Money", color: COLORS.orange },
    { year: "2024", event: "Union Africaine", detail: "200+ appareils infectés — 1 semaine", color: COLORS.secondary },
    { year: "2024", event: "Flutterwave", detail: "Transfert non autorisé de ~7M $", color: COLORS.accent },
    { year: "2024", event: "NHLS Afrique du Sud", detail: "Système de santé national paralysé", color: COLORS.secondary },
    { year: "2025", event: "Kenya Q1", detail: "2,5 milliards d'incidents (+201%)", color: COLORS.orange },
    { year: "2025", event: "BEC Sénégal Pétrole", detail: "Tentative de fraude de 7,9M $", color: COLORS.accent },
  ];

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  // Timeline line animation
  const lineHeight = interpolate(frame, [15, 140], [0, 820], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #050a18 0%, #0d0a1a 50%, #0a0818 100%)`,
        padding: "70px 100px",
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} color="#ff3d7130" />

      <h2
        style={{
          fontSize: 52,
          color: COLORS.secondary,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          textAlign: "center",
          opacity: titleSpring,
          marginBottom: 40,
          textShadow: `0 0 25px ${COLORS.secondary}40`,
        }}
      >
        🔓 Incidents Majeurs en Afrique
      </h2>

      <div style={{ display: "flex", position: "relative", paddingLeft: 40 }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 0,
            width: 3,
            height: lineHeight,
            background: `linear-gradient(180deg, ${COLORS.secondary}, ${COLORS.orange}, ${COLORS.accent})`,
            borderRadius: 2,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingLeft: 50 }}>
          {incidents.map((inc, i) => {
            const delay = 20 + i * 20;
            const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
              extrapolateRight: "clamp",
            });
            const slideX = interpolate(frame, [delay, delay + 18], [120, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity: itemOpacity,
                  transform: `translateX(${slideX}px)`,
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: 33,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: inc.color,
                    border: `3px solid ${COLORS.darkBg}`,
                    boxShadow: `0 0 12px ${inc.color}60`,
                  }}
                />

                {/* Year badge */}
                <div
                  style={{
                    background: `${inc.color}20`,
                    border: `1px solid ${inc.color}50`,
                    borderRadius: 8,
                    padding: "6px 16px",
                    fontSize: 22,
                    fontWeight: 800,
                    color: inc.color,
                    fontFamily: "Arial, sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {inc.year}
                </div>

                {/* Event card */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${inc.color}20`,
                    borderRadius: 14,
                    padding: "16px 28px",
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white, fontFamily: "Arial, sans-serif" }}>
                    {inc.event}
                  </div>
                  <div style={{ fontSize: 22, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginTop: 4 }}>
                    {inc.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 5: Talent Gap — Dramatic Visualization
// ═══════════════════════════════════════════════════════════════
const TalentGapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  // Bar chart data
  const barData = [
    { label: "Experts actuels", value: 20000, max: 200000, color: COLORS.secondary },
    { label: "Postes non pourvus", value: 200000, max: 200000, color: COLORS.primary },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 70% 30%, #0a1a2e 0%, #050a18 60%)`,
        padding: 80,
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} />
      <Particles frame={frame} count={15} />

      <h2
        style={{
          fontSize: 56,
          color: COLORS.accent,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          textAlign: "center",
          opacity: titleSpring,
          marginBottom: 20,
          textShadow: `0 0 25px ${COLORS.accent}30`,
        }}
      >
        👥 Le Déficit de Talents en Cybersécurité
      </h2>

      <div style={{ display: "flex", gap: 60, marginTop: 20, justifyContent: "center" }}>
        {/* Left: Big numbers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 600 }}>
          {/* Expert count */}
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.secondary}30`,
              borderRadius: 20,
              padding: "30px 40px",
              textAlign: "center",
              opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [20, 40], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", letterSpacing: 3, textTransform: "uppercase" }}>
              Experts cybersécurité en Afrique
            </div>
            <div style={{ fontSize: 72, fontWeight: 900, color: COLORS.secondary, fontFamily: "Arial, sans-serif", margin: "10px 0" }}>
              <AnimatedNumber frame={frame} start={0} end={20000} startFrame={25} endFrame={60} prefix="~" style={{}} />
            </div>
            <div style={{ fontSize: 24, color: COLORS.lightGray, fontFamily: "Arial, sans-serif" }}>
              pour 1,4 milliard d'habitants
            </div>
          </div>

          {/* Unfilled roles */}
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.primary}30`,
              borderRadius: 20,
              padding: "30px 40px",
              textAlign: "center",
              opacity: interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [45, 65], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", letterSpacing: 3, textTransform: "uppercase" }}>
              Postes non pourvus
            </div>
            <div style={{ fontSize: 72, fontWeight: 900, color: COLORS.primary, fontFamily: "Arial, sans-serif", margin: "10px 0" }}>
              <AnimatedNumber frame={frame} start={0} end={200000} startFrame={50} endFrame={90} prefix="+" suffix="" style={{}} />
            </div>
          </div>
        </div>

        {/* Right: Visual bar comparison */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 25, width: 650 }}>
          <div
            style={{
              fontSize: 24,
              color: COLORS.white,
              fontFamily: "Arial, sans-serif",
              fontWeight: 600,
              opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
              marginBottom: 10,
            }}
          >
            Comparaison visuelle
          </div>

          {barData.map((bar, i) => {
            const barDelay = 65 + i * 20;
            const barWidth = interpolate(
              frame,
              [barDelay, barDelay + 35],
              [0, (bar.value / bar.max) * 550],
              { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
            );

            return (
              <div key={i}>
                <div style={{ fontSize: 22, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginBottom: 8 }}>
                  {bar.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div
                    style={{
                      height: 45,
                      width: barWidth,
                      backgroundColor: bar.color,
                      borderRadius: "0 8px 8px 0",
                      boxShadow: `0 0 20px ${bar.color}40`,
                      minWidth: 2,
                    }}
                  />
                  <span style={{ fontSize: 24, color: bar.color, fontWeight: 800, fontFamily: "Arial, sans-serif" }}>
                    {bar.value.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Ratio */}
          <div
            style={{
              marginTop: 20,
              padding: "20px 30px",
              background: `${COLORS.secondary}10`,
              border: `1px solid ${COLORS.secondary}30`,
              borderRadius: 14,
              opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <span style={{ fontSize: 28, color: COLORS.secondary, fontWeight: 800, fontFamily: "Arial, sans-serif" }}>
              {"< 2 "}
            </span>
            <span style={{ fontSize: 24, color: COLORS.white, fontFamily: "Arial, sans-serif" }}>
              experts pour 100 000 habitants
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 6: Regulations & Malabo Convention
// ═══════════════════════════════════════════════════════════════
const RegulationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const keyFacts = [
    { icon: "📜", text: "Convention de Malabo", detail: "Adoptée en 2014, entrée en vigueur juin 2023", color: COLORS.primary },
    { icon: "🏛️", text: "15 pays signataires", detail: "Angola, Ghana, Rwanda, Sénégal, Côte d'Ivoire...", color: COLORS.green },
    { icon: "📋", text: "33 pays (61%)", detail: "ont adopté une loi sur la protection des données", color: COLORS.accent },
    { icon: "🚔", text: "Op. Serengeti 2.0", detail: "1 209 arrestations, 97,4M $ récupérés (2025)", color: COLORS.orange },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #050a18 0%, #0a1a10 50%, #050a18 100%)`,
        padding: 80,
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} color={COLORS.green} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: titleSpring,
          transform: `scale(${titleSpring})`,
          marginBottom: 50,
        }}
      >
        <span style={{ fontSize: 55 }}>⚖️</span>
        <h2
          style={{
            fontSize: 54,
            color: COLORS.green,
            fontFamily: "Arial, sans-serif",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Cadre Réglementaire et Actions
        </h2>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {keyFacts.map((fact, i) => {
          const delay = 20 + i * 18;
          const cardSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 10, mass: 0.8 },
          });

          return (
            <div
              key={i}
              style={{
                background: COLORS.card,
                border: `1px solid ${fact.color}25`,
                borderLeft: `4px solid ${fact.color}`,
                borderRadius: 16,
                padding: "30px 35px",
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 48, flexShrink: 0 }}>{fact.icon}</span>
              <div>
                <div style={{ fontSize: 30, fontWeight: 700, color: fact.color, fontFamily: "Arial, sans-serif" }}>
                  {fact.text}
                </div>
                <div style={{ fontSize: 24, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginTop: 8, lineHeight: 1.4 }}>
                  {fact.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infrastructure stats bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 45,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {[
          { pct: "30%", label: "ont un système de signalement" },
          { pct: "29%", label: "ont un dépôt de preuves numériques" },
          { pct: "~37", label: "CERT/CSIRT nationaux en Afrique" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 38, fontWeight: 900, color: COLORS.green, fontFamily: "Arial, sans-serif" }}>
              {item.pct}
            </div>
            <div style={{ fontSize: 18, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", maxWidth: 250, marginTop: 4 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 7: Training & Certifications
// ═══════════════════════════════════════════════════════════════
const TrainingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const certs = [
    { name: "CISSP", desc: "Gold standard CISO", color: COLORS.accent },
    { name: "CISM", desc: "Management sécurité", color: COLORS.primary },
    { name: "CEH", desc: "Ethical Hacking", color: COLORS.green },
    { name: "ISO 27001", desc: "Gouvernance", color: COLORS.purple },
    { name: "CompTIA S+", desc: "Fondation", color: COLORS.orange },
  ];

  const networks = [
    { name: "CESIA", detail: "170+ membres, réseau francophone premier", icon: "🌐" },
    { name: "Africa CISO Summit", detail: "Nairobi 2026, 200+ leaders de 15+ pays", icon: "🎤" },
    { name: "CyberSafe Foundation", detail: "NGO la plus active, CyberGirls Fellowship", icon: "👩‍💻" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #050a18 0%, #0a0828 50%, #050a18 100%)`,
        padding: "70px 80px",
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} color={COLORS.purple} />

      <h2
        style={{
          fontSize: 52,
          color: COLORS.purple,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
          marginBottom: 35,
        }}
      >
        🎓 Formation et Certifications
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {/* Left: Certifications */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginBottom: 20, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            Certifications clés
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {certs.map((cert, i) => {
              const delay = 15 + i * 10;
              const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
                extrapolateRight: "clamp",
              });
              const scaleX = interpolate(frame, [delay, delay + 15], [0.8, 1], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    opacity: itemOpacity,
                    transform: `scaleX(${scaleX})`,
                    transformOrigin: "left",
                    background: `${cert.color}08`,
                    border: `1px solid ${cert.color}25`,
                    borderRadius: 12,
                    padding: "16px 24px",
                  }}
                >
                  <div
                    style={{
                      background: `${cert.color}20`,
                      borderRadius: 8,
                      padding: "6px 14px",
                      fontSize: 24,
                      fontWeight: 900,
                      color: cert.color,
                      fontFamily: "Arial, sans-serif",
                      minWidth: 130,
                      textAlign: "center",
                    }}
                  >
                    {cert.name}
                  </div>
                  <span style={{ fontSize: 22, color: COLORS.white, fontFamily: "Arial, sans-serif" }}>
                    {cert.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Networks */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginBottom: 20, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            Réseaux professionnels
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {networks.map((net, i) => {
              const delay = 40 + i * 15;
              const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
                extrapolateRight: "clamp",
              });
              const slideY = interpolate(frame, [delay, delay + 18], [40, 0], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    transform: `translateY(${slideY}px)`,
                    background: COLORS.card,
                    border: `1px solid ${COLORS.primary}20`,
                    borderRadius: 14,
                    padding: "22px 28px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32 }}>{net.icon}</span>
                    <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, fontFamily: "Arial, sans-serif" }}>
                      {net.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 21, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", marginTop: 8 }}>
                    {net.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Salary info */}
          <div
            style={{
              marginTop: 20,
              padding: "18px 24px",
              background: `${COLORS.accent}08`,
              border: `1px solid ${COLORS.accent}25`,
              borderRadius: 12,
              opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 20, color: COLORS.accent, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
              💰 Salaire RSSI (Afrique francophone)
            </div>
            <div style={{ fontSize: 22, color: COLORS.white, fontFamily: "Arial, sans-serif", marginTop: 6 }}>
              580 — 2 850 EUR / mois
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 8: Future Outlook & Market Growth
// ═══════════════════════════════════════════════════════════════
const FutureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const trends = [
    { icon: "🤖", text: "Défense propulsée par l'IA", growth: "N°1" },
    { icon: "🔐", text: "Architecture Zero Trust", growth: "Top" },
    { icon: "☁️", text: "Sécurité Cloud", growth: "14% CAGR" },
    { icon: "🏥", text: "Cybersécurité Santé", growth: "15.1% CAGR" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #0a1a28 0%, #050a18 70%)`,
        padding: 80,
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} />
      <Particles frame={frame} count={25} color={COLORS.primary} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: titleSpring,
          marginBottom: 40,
        }}
      >
        <span style={{ fontSize: 55 }}>🚀</span>
        <h2
          style={{
            fontSize: 54,
            color: COLORS.primary,
            fontFamily: "Arial, sans-serif",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Perspectives et Opportunités
        </h2>
      </div>

      {/* Market size */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.primary}25`,
            borderRadius: 20,
            padding: "35px 40px",
            textAlign: "center",
            opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [15, 35], [20, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
            Marché Cybersécurité Afrique
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.lightGray, fontFamily: "Arial, sans-serif" }}>
                0,77 Mrd $
              </div>
              <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif" }}>2026</div>
            </div>
            <div
              style={{
                fontSize: 40,
                color: COLORS.primary,
                opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              →
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.primary, fontFamily: "Arial, sans-serif" }}>
                <AnimatedNumber frame={frame} start={77} end={144} startFrame={30} endFrame={65} prefix="1," suffix=" Mrd $" style={{}} />
              </div>
              <div style={{ fontSize: 20, color: COLORS.primary, fontFamily: "Arial, sans-serif", fontWeight: 600 }}>2031</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              fontSize: 28,
              color: COLORS.accent,
              fontWeight: 800,
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            +13,3% CAGR
          </div>
        </div>

        {/* Training growth */}
        <div
          style={{
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.accent}25`,
            borderRadius: 20,
            padding: "35px 40px",
            textAlign: "center",
            opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [25, 45], [20, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ fontSize: 20, color: COLORS.lightGray, fontFamily: "Arial, sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
            Segment le plus dynamique
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.accent, fontFamily: "Arial, sans-serif" }}>
            Formation & Éducation
          </div>
          <div
            style={{
              fontSize: 36,
              color: COLORS.green,
              fontWeight: 800,
              fontFamily: "Arial, sans-serif",
              marginTop: 10,
              opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            +21,3% CAGR
          </div>
        </div>
      </div>

      {/* Trends */}
      <div style={{ display: "flex", gap: 24 }}>
        {trends.map((trend, i) => {
          const delay = 55 + i * 12;
          const trendSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 10 },
          });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${COLORS.primary}20`,
                borderRadius: 14,
                padding: "24px 20px",
                textAlign: "center",
                transform: `scale(${trendSpring})`,
                opacity: trendSpring,
              }}
            >
              <span style={{ fontSize: 40 }}>{trend.icon}</span>
              <div style={{ fontSize: 22, color: COLORS.white, fontFamily: "Arial, sans-serif", fontWeight: 600, marginTop: 10 }}>
                {trend.text}
              </div>
              <div style={{ fontSize: 20, color: COLORS.green, fontFamily: "Arial, sans-serif", fontWeight: 800, marginTop: 6 }}>
                {trend.growth}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 9: Closing
// ═══════════════════════════════════════════════════════════════
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, mass: 1 } });
  const glowIntensity = interpolate(frame % 50, [0, 25, 50], [20, 60, 20]);
  const ringScale = interpolate(frame, [0, 60], [0.5, 1.2], { extrapolateRight: "clamp" });
  const ringOpacity = interpolate(frame, [0, 30, 60], [0, 0.3, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #0d2137 0%, #050a18 60%, #020408 100%)`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <CyberGrid frame={frame} />
      <Particles frame={frame} count={30} color={COLORS.primary} />

      {/* Expanding ring */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `2px solid ${COLORS.primary}`,
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />

      <div style={{ textAlign: "center", transform: `scale(${scale})`, zIndex: 1 }}>
        <div style={{ fontSize: 100, marginBottom: 15 }}>🛡️🌍</div>
        <h2
          style={{
            fontSize: 58,
            color: COLORS.white,
            fontFamily: "Arial, sans-serif",
            fontWeight: 900,
            textShadow: `0 0 ${glowIntensity}px ${COLORS.primary}`,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Sécuriser l'Afrique Numérique
        </h2>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            fontFamily: "Arial, sans-serif",
            fontWeight: 900,
            margin: "10px 0 25px",
          }}
        >
          Un impératif stratégique
        </h2>

        <div
          style={{
            width: interpolate(frame, [20, 50], [0, 600], { extrapolateRight: "clamp" }),
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.accent}, ${COLORS.primary}, transparent)`,
            margin: "0 auto 25px",
          }}
        />

        <p
          style={{
            fontSize: 26,
            color: COLORS.lightGray,
            fontFamily: "Arial, sans-serif",
            opacity: interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" }),
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Former · Réglementer · Protéger
        </p>

        <p
          style={{
            fontSize: 22,
            color: COLORS.accent,
            fontFamily: "Arial, sans-serif",
            opacity: interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" }),
            marginTop: 20,
          }}
        >
          josueromba.wordpress.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN VIDEO COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const RSSIVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={120}>
        <TitleScene />
      </Sequence>
      <Sequence from={120} durationInFrames={150}>
        <RoleScene />
      </Sequence>
      <Sequence from={270} durationInFrames={180}>
        <ThreatStatsScene />
      </Sequence>
      <Sequence from={450} durationInFrames={180}>
        <IncidentsScene />
      </Sequence>
      <Sequence from={630} durationInFrames={150}>
        <TalentGapScene />
      </Sequence>
      <Sequence from={780} durationInFrames={150}>
        <RegulationsScene />
      </Sequence>
      <Sequence from={930} durationInFrames={130}>
        <TrainingScene />
      </Sequence>
      <Sequence from={1060} durationInFrames={130}>
        <FutureScene />
      </Sequence>
      <Sequence from={1190} durationInFrames={110}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
