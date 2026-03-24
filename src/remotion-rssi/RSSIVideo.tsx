import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ── Color palette ──
const COLORS = {
  darkBg: "#0a1628",
  primary: "#00d4aa",
  secondary: "#ff6b35",
  accent: "#ffd700",
  white: "#ffffff",
  lightGray: "#b0bec5",
  gradientStart: "#0f2027",
  gradientMid: "#203a43",
  gradientEnd: "#2c5364",
};

// ── Scene 1: Title Screen ──
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [10, 50], [0, 600], {
    extrapolateRight: "clamp",
  });
  const pulseOpacity = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.3, 0.8, 0.3]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientMid}, ${COLORS.gradientEnd})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated signal circles */}
      {[1, 2, 3].map((i) => {
        const circleScale = interpolate(
          frame,
          [i * 10, i * 10 + 40],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 200 * i,
              height: 200 * i,
              borderRadius: "50%",
              border: `2px solid ${COLORS.primary}`,
              opacity: pulseOpacity * (1 - i * 0.2),
              transform: `scale(${circleScale})`,
            }}
          />
        );
      })}

      {/* WiFi icon */}
      <div
        style={{
          position: "absolute",
          top: 180,
          fontSize: 120,
          opacity: interpolate(frame, [5, 25], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        📡
      </div>

      {/* Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          textAlign: "center",
          marginTop: 80,
        }}
      >
        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "Arial, sans-serif",
            margin: 0,
            textShadow: `0 0 40px ${COLORS.primary}`,
            letterSpacing: 4,
          }}
        >
          RSSI en Afrique
        </h1>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          marginTop: 20,
          borderRadius: 2,
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 36,
          color: COLORS.lightGray,
          fontFamily: "Arial, sans-serif",
          marginTop: 30,
          letterSpacing: 2,
        }}
      >
        Received Signal Strength Indicator
      </p>

      <p
        style={{
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateRight: "clamp",
          }),
          fontSize: 26,
          color: COLORS.accent,
          fontFamily: "Arial, sans-serif",
          marginTop: 10,
        }}
      >
        État des lieux et enjeux de la connectivité mobile
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 2: What is RSSI? ──
const WhatIsRSSI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 10 } });

  const bars = [-30, -50, -70, -85, -100];
  const labels = ["Excellent", "Bon", "Moyen", "Faible", "Très faible"];
  const barColors = ["#00e676", "#66bb6a", "#ffc107", "#ff9800", "#f44336"];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkBg}, #1a2a3a)`,
        padding: 80,
      }}
    >
      <h2
        style={{
          fontSize: 64,
          color: COLORS.primary,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          transform: `translateX(${interpolate(titleSpring, [0, 1], [-200, 0])}px)`,
          opacity: titleSpring,
          marginBottom: 20,
        }}
      >
        Qu'est-ce que le RSSI ?
      </h2>

      <p
        style={{
          fontSize: 30,
          color: COLORS.white,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          opacity: interpolate(frame, [15, 35], [0, 1], {
            extrapolateRight: "clamp",
          }),
          maxWidth: 1200,
          marginBottom: 50,
        }}
      >
        Le RSSI mesure la puissance du signal reçu par un appareil mobile.
        Plus la valeur est proche de 0 dBm, meilleur est le signal.
      </p>

      {/* Signal bars */}
      <div style={{ display: "flex", gap: 40, alignItems: "flex-end", marginTop: 20 }}>
        {bars.map((val, i) => {
          const barHeight = interpolate(
            frame,
            [20 + i * 8, 40 + i * 8],
            [0, 300 - i * 50],
            { extrapolateRight: "clamp" }
          );
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 120,
                  height: barHeight,
                  backgroundColor: barColors[i],
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 10,
                }}
              >
                <span
                  style={{
                    color: COLORS.darkBg,
                    fontWeight: 800,
                    fontSize: 22,
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {val} dBm
                </span>
              </div>
              <span
                style={{
                  color: COLORS.lightGray,
                  fontSize: 20,
                  fontFamily: "Arial, sans-serif",
                  marginTop: 10,
                  display: "block",
                }}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3: RSSI in Africa - Stats ──
const AfricaStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { label: "Couverture 4G", value: "~50%", icon: "📶", detail: "de la population africaine" },
    { label: "Abonnés mobiles", value: "590M+", icon: "📱", detail: "en Afrique subsaharienne" },
    { label: "RSSI moyen zones rurales", value: "-85 dBm", icon: "🏘️", detail: "signal souvent faible" },
    { label: "Tours cellulaires", value: "~170K", icon: "🗼", detail: "sur tout le continent" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0d1b2a, #1b2838, #162447)`,
        padding: 80,
      }}
    >
      <h2
        style={{
          fontSize: 60,
          color: COLORS.accent,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          opacity: spring({ frame, fps, config: { damping: 12 } }),
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        🌍 RSSI en Afrique : Les chiffres clés
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {stats.map((stat, i) => {
          const cardOpacity = interpolate(
            frame,
            [15 + i * 12, 35 + i * 12],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const cardY = interpolate(
            frame,
            [15 + i * 12, 35 + i * 12],
            [60, 0],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.primary}33`,
                borderRadius: 20,
                padding: "40px 50px",
                width: 380,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 10 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: COLORS.primary,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: COLORS.white,
                  fontWeight: 700,
                  fontFamily: "Arial, sans-serif",
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.lightGray,
                  fontFamily: "Arial, sans-serif",
                  marginTop: 6,
                }}
              >
                {stat.detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4: Challenges ──
const Challenges: React.FC = () => {
  const frame = useCurrentFrame();

  const challenges = [
    { text: "Infrastructure limitée en zones rurales", icon: "🏗️" },
    { text: "Coût élevé du déploiement des antennes", icon: "💰" },
    { text: "Obstacles géographiques (forêts, montagnes)", icon: "🏔️" },
    { text: "Alimentation électrique instable", icon: "⚡" },
    { text: "Densité de population variable", icon: "👥" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1a0a2e, #2d1b4e, #1a2a3a)`,
        padding: 80,
      }}
    >
      <h2
        style={{
          fontSize: 58,
          color: COLORS.secondary,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
          marginBottom: 50,
        }}
      >
        Défis du RSSI en Afrique
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {challenges.map((item, i) => {
          const slideIn = interpolate(
            frame,
            [10 + i * 10, 30 + i * 10],
            [-800, 0],
            { extrapolateRight: "clamp" }
          );
          const opacity = interpolate(
            frame,
            [10 + i * 10, 30 + i * 10],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                transform: `translateX(${slideIn}px)`,
                opacity,
                background: "rgba(255,107,53,0.08)",
                border: "1px solid rgba(255,107,53,0.2)",
                borderRadius: 16,
                padding: "24px 36px",
              }}
            >
              <span style={{ fontSize: 48 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 30,
                  color: COLORS.white,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 600,
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

// ── Scene 5: Closing ──
const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 8, mass: 0.8 } });
  const glowIntensity = interpolate(frame % 40, [0, 20, 40], [20, 50, 20]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientMid}, ${COLORS.gradientEnd})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        <div style={{ fontSize: 100, marginBottom: 20 }}>🌍📡</div>
        <h2
          style={{
            fontSize: 64,
            color: COLORS.white,
            fontFamily: "Arial, sans-serif",
            fontWeight: 900,
            textShadow: `0 0 ${glowIntensity}px ${COLORS.primary}`,
            margin: 0,
          }}
        >
          Améliorer le RSSI
        </h2>
        <h2
          style={{
            fontSize: 64,
            color: COLORS.primary,
            fontFamily: "Arial, sans-serif",
            fontWeight: 900,
            margin: "10px 0 30px",
          }}
        >
          c'est connecter l'Afrique
        </h2>
        <div
          style={{
            width: interpolate(frame, [20, 50], [0, 500], {
              extrapolateRight: "clamp",
            }),
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            margin: "0 auto 30px",
          }}
        />
        <p
          style={{
            fontSize: 28,
            color: COLORS.lightGray,
            fontFamily: "Arial, sans-serif",
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Merci d'avoir regardé ! 🙏
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Video Composition ──
export const RSSIVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={75}>
        <TitleScene />
      </Sequence>
      <Sequence from={75} durationInFrames={60}>
        <WhatIsRSSI />
      </Sequence>
      <Sequence from={135} durationInFrames={70}>
        <AfricaStats />
      </Sequence>
      <Sequence from={205} durationInFrames={60}>
        <Challenges />
      </Sequence>
      <Sequence from={265} durationInFrames={35}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
