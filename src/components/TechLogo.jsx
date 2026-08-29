// Only skills/technologies with a genuine, recognizable brand mark are
// mapped here. Concepts without a real logo (Computer Vision, REST APIs,
// OOP, Meta XR SDK, "Data Analytics", "Machine Learning") are deliberately
// left out — TechLogo falls back to a plain text chip for those rather
// than inventing an icon association that doesn't exist.
const ICON_MAP = {
  Python: { slug: 'logos:python', mono: false },
  Java: { slug: 'logos:java', mono: false },
  JavaScript: { slug: 'logos:javascript', mono: false },
  FastAPI: { slug: 'logos:fastapi-icon', mono: false },
  Unity: { slug: 'logos:unity', mono: false },
  Blender: { slug: 'logos:blender', mono: false },
  MySQL: { slug: 'logos:mysql-icon', mono: false },
  MongoDB: { slug: 'logos:mongodb-icon', mono: false },
  SQL: { slug: 'mdi:database', mono: true },
  Git: { slug: 'logos:git-icon', mono: false },
  'Git / GitHub': { slug: 'mdi:github', mono: true },
  GitHub: { slug: 'mdi:github', mono: true },
  'VS Code': { slug: 'logos:visual-studio-code', mono: false },
};

export function getTechIcon(label) {
  return ICON_MAP[label] || null;
}

// Renders a brand logo when one genuinely exists for this label, and
// silently hides itself (onError) if the Iconify slug ever 404s — falls
// back to nothing rather than a broken image icon.
export default function TechLogo({ label, size = 16 }) {
  const icon = getTechIcon(label);
  if (!icon) return null;

  const src = icon.mono
    ? `https://api.iconify.design/${icon.slug}.svg?color=%23e7ebe9`
    : `https://api.iconify.design/${icon.slug}.svg`;

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={icon.mono ? 'tech-logo tech-logo-mono' : 'tech-logo'}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
