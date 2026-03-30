import { ImageResponse } from "next/og";
import { type Locale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const textMap: Record<Locale, { title: string; subtitle: string; cta: string }> = {
  he: {
    title: "GATE ירושלים",
    subtitle: "5 קומות משרדים אחרונות למכירה",
    cta: "מגדל 40 קומות · תקן LEED · 32 דק׳ מתל אביב",
  },
  en: {
    title: "GATE Jerusalem",
    subtitle: "Last 5 Office Floors for Sale",
    cta: "40-Story Tower · LEED Certified · 32 min to Tel Aviv",
  },
  ar: {
    title: "GATE القدس",
    subtitle: "آخر 5 طوابق مكاتب للبيع",
    cta: "برج 40 طابقاً · شهادة LEED · 32 دقيقة لتل أبيب",
  },
};

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang as Locale) || "he";
  const t = textMap[locale] || textMap.he;
  const isRtl = locale === "he" || locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0d1829 0%, #1a2744 40%, #243356 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #a67c2e, #c9a84c, #e6c06a, #c9a84c, #a67c2e)",
            display: "flex",
          }}
        />

        {/* Bottom gold accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #a67c2e, #c9a84c, #e6c06a, #c9a84c, #a67c2e)",
            display: "flex",
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundSize: "60px 60px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontWeight: 500,
              display: "flex",
            }}
          >
            THE
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0px",
            direction: isRtl ? "rtl" : "ltr",
          }}
        >
          <span
            style={{
              fontSize: "82px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "0.12em",
            }}
          >
            {t.title.replace(".", "")}
          </span>
          <span
            style={{
              fontSize: "82px",
              fontWeight: 800,
              color: "#c9a84c",
            }}
          >
            .
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "#c9a84c",
            margin: "28px 0",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            color: "white",
            fontWeight: 600,
            marginBottom: "16px",
            direction: isRtl ? "rtl" : "ltr",
            display: "flex",
          }}
        >
          {t.subtitle}
        </div>

        {/* CTA line */}
        <div
          style={{
            fontSize: "22px",
            color: "#c9a84c",
            fontWeight: 400,
            letterSpacing: "0.05em",
            direction: isRtl ? "rtl" : "ltr",
            display: "flex",
          }}
        >
          {t.cta}
        </div>
      </div>
    ),
    { ...size }
  );
}
