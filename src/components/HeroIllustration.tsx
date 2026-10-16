/**
 * Hero artwork: a fine-line globe held inside a circular-economy loop,
 * framed by botanical sprigs, soft organic shapes and a few sparkles.
 * Pure SVG — no external assets.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-labelledby="hero-art-title"
      className={className}
    >
      <title id="hero-art-title">
        Illustration of a globe encircled by recycling arrows and leaves
      </title>
      <defs>
        <clipPath id="globe-clip">
          <circle cx="210" cy="210" r="104" />
        </clipPath>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#FFFBF4" />
          <stop offset="70%" stopColor="#FFEACB" />
          <stop offset="100%" stopColor="#F5C98A" />
        </radialGradient>
      </defs>

      {/* Organic background shapes */}
      <path
        d="M96 92c46-50 150-62 214-20 64 42 86 132 52 196-34 64-126 104-200 86C88 336 40 270 44 204c3-46 18-78 52-112Z"
        fill="#FFEACB"
        opacity=".75"
      />
      <path
        d="M300 300c34-12 66 4 74 32 8 30-16 56-48 58-30 2-54-16-56-40-2-22 8-42 30-50Z"
        fill="#FFC6C6"
        opacity=".55"
      />
      <path
        d="M70 110c18-24 50-28 66-10 14 16 6 44-18 54-22 10-48 4-54-14-4-12-2-20 6-30Z"
        fill="#C7D8BC"
        opacity=".6"
      />

      {/* Orbit / loop with arrowheads (slowly rotates; static with reduced motion) */}
      <g className="origin-center motion-safe:animate-spin-slow" style={{ transformOrigin: "210px 210px" }}>
        <g fill="none" stroke="#5F8B4C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M210 76a134 134 0 0 1 116 67" />
          <path d="m329 128-3 16-15-5" />
          <path d="M338 246a134 134 0 0 1-104 96" />
          <path d="m243 352-11-9 9-12" />
          <path d="M108 296a134 134 0 0 1-30-120" />
          <path d="m66 186 12-10 9 13" />
        </g>
        <circle cx="210" cy="76" r="3.5" fill="#945034" />
        <circle cx="338" cy="246" r="3.5" fill="#945034" />
        <circle cx="108" cy="296" r="3.5" fill="#945034" />
      </g>

      {/* Globe */}
      <circle cx="210" cy="210" r="104" fill="url(#globe-fill)" />
      <g clipPath="url(#globe-clip)">
        {/* Land masses — soft sage */}
        <path
          d="M128 150c18-16 42-18 56-8 10 8 4 22 14 30 12 10 34 2 40 16 6 14-10 26-24 30-18 6-22 22-36 26-16 4-34-8-42-24-10-20-26-50-8-70Z"
          fill="#A2BF92"
          opacity=".85"
        />
        <path
          d="M244 120c16-6 40 0 52 14 10 12 4 28 18 38 10 8 20 20 14 34-6 14-26 10-36 22-8 10-6 30-22 34-18 4-26-16-24-32 2-18-14-26-14-42 0-22-6-58 12-68Z"
          fill="#7FA56B"
          opacity=".75"
        />
        <path
          d="M176 268c14-6 34-2 42 10 6 10-2 22-14 26-16 6-36 2-40-10-2-10 2-20 12-26Z"
          fill="#A2BF92"
          opacity=".8"
        />
        {/* Meridians / parallels */}
        <g fill="none" stroke="#945034" strokeWidth=".9" opacity=".35">
          <ellipse cx="210" cy="210" rx="104" ry="36" />
          <ellipse cx="210" cy="210" rx="104" ry="72" />
          <ellipse cx="210" cy="210" rx="40" ry="104" />
          <ellipse cx="210" cy="210" rx="78" ry="104" />
          <path d="M106 210h208" />
          <path d="M210 106v208" />
        </g>
      </g>
      <circle cx="210" cy="210" r="104" fill="none" stroke="#945034" strokeWidth="1.4" />

      {/* Botanical sprig hugging the globe (left) */}
      <g fill="none" stroke="#3E5F33" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 330c-8-40 -2-84 26-124" />
        <path d="M122 300c-18-2-32-14-36-30 16 0 30 12 36 30Z" fill="#E3ECDD" />
        <path d="M126 270c14-8 22-22 22-38-14 6-22 20-22 38Z" fill="#E3ECDD" />
        <path d="M134 246c-16-4-26-16-28-30 14 2 26 14 28 30Z" fill="#E3ECDD" />
      </g>
      {/* Sprig (right, top) */}
      <g fill="none" stroke="#3E5F33" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M300 92c16 18 22 40 20 64" />
        <path d="M306 104c14-6 30-2 40 8-14 6-30 4-40-8Z" fill="#FFE4E3" />
        <path d="M316 128c14 0 26 8 32 20-14 0-26-8-32-20Z" fill="#E3ECDD" />
      </g>

      {/* Sparkles */}
      <g fill="#FF9A9A">
        <path className="motion-safe:animate-twinkle" style={{ transformOrigin: "352px 92px" }} d="M352 78c.8 7 6.2 12.4 13.2 13.2-7 .8-12.4 6.2-13.2 13.2-.8-7-6.2-12.4-13.2-13.2 7-.8 12.4-6.2 13.2-13.2Z" />
        <path className="motion-safe:animate-twinkle twinkle-delay-2" style={{ transformOrigin: "70px 250px" }} d="M70 240c.6 5 4.4 8.9 9.4 9.4-5 .6-8.9 4.4-9.4 9.4-.6-5-4.4-8.9-9.4-9.4 5-.5 8.8-4.4 9.4-9.4Z" />
        <path className="motion-safe:animate-twinkle twinkle-delay-4" style={{ transformOrigin: "300px 360px" }} d="M300 352c.5 4 3.5 7 7.5 7.5-4 .5-7 3.5-7.5 7.5-.5-4-3.5-7-7.5-7.5 4-.5 7-3.5 7.5-7.5Z" />
      </g>
      <g fill="#945034">
        <path d="M168 58c.4 3 2.6 5.2 5.6 5.6-3 .4-5.2 2.6-5.6 5.6-.4-3-2.6-5.2-5.6-5.6 3-.4 5.2-2.6 5.6-5.6Z" />
        <path d="M376 210c.4 3 2.6 5.2 5.6 5.6-3 .4-5.2 2.6-5.6 5.6-.4-3-2.6-5.2-5.6-5.6 3-.4 5.2-2.6 5.6-5.6Z" opacity=".7" />
      </g>
    </svg>
  );
}
