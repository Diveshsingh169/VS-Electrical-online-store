// Inline SVG icons (svgrepo / feather line-icon style). Themeable via currentColor.
// Usage: <Icon name="fan" className="h-6 w-6" />

function Line({ children, className = 'h-6 w-6', sw = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Solid({ children, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  );
}

const ICONS = {
  // ---- Category icons ----
  fan: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      <path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2" />
    </Line>
  ),
  bulb: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.1 14c.2-1 .7-1.7 1.4-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.8 1.2 1.5 1.4 2.5" />
    </Line>
  ),
  switch: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <circle cx="16" cy="12" r="3" />
    </Line>
  ),
  cable: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M4 4v4a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v4" />
      <path d="M2 4h4" />
      <path d="M18 20h4" />
    </Line>
  ),
  appliance: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="1.4" />
      <path d="M7.5 6h.01M11 6h.01" />
    </Line>
  ),
  heater: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="6" y="3" width="12" height="17" rx="5" />
      <path d="M9 20v1.5M15 20v1.5" />
      <path d="M10 7h4" />
      <circle cx="12" cy="13" r="2.4" />
    </Line>
  ),
  panel: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 7v3M12 7v3M16 7v3" />
      <path d="M7 15h10" />
    </Line>
  ),
  kitchen: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M8 2h8l-1 4H9z" />
      <path d="M9.5 6l.8 6h3.4l.8-6" />
      <rect x="8" y="14" width="8" height="7" rx="1.5" />
    </Line>
  ),

  // ---- UI icons ----
  search: (c, sw) => (
    <Line className={c} sw={sw}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Line>
  ),
  menu: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </Line>
  ),
  close: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Line>
  ),
  phone: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </Line>
  ),
  mail: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </Line>
  ),
  arrowRight: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </Line>
  ),
  arrowLeft: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </Line>
  ),
  arrowUp: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </Line>
  ),
  chevronDown: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="m6 9 6 6 6-6" />
    </Line>
  ),
  chevronRight: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="m9 6 6 6-6 6" />
    </Line>
  ),
  check: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M20 6 9 17l-5-5" />
    </Line>
  ),
  shield: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </Line>
  ),
  truck: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M2 5h11v11H2zM13 8h4l4 4v4h-8" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </Line>
  ),
  headset: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M3 13a9 9 0 0 1 18 0" />
      <path d="M21 13v3a2 2 0 0 1-2 2h-2v-5h2a2 2 0 0 1 2 0zM3 13v3a2 2 0 0 0 2 2h2v-5H5a2 2 0 0 0-2 0z" />
      <path d="M12 22a3 3 0 0 0 3-3" />
    </Line>
  ),
  bolt: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </Line>
  ),
  location: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Line>
  ),
  filter: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" />
    </Line>
  ),
  sparkles: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15l.7 1.8L21.5 17.5 19.7 18.2 19 20l-.7-1.8L16.5 17.5l1.8-.7z" />
    </Line>
  ),
  plus: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M12 5v14M5 12h14" />
    </Line>
  ),
  minus: (c, sw) => (
    <Line className={c} sw={sw}>
      <path d="M5 12h14" />
    </Line>
  ),
  clock: (c, sw) => (
    <Line className={c} sw={sw}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Line>
  ),
  award: (c, sw) => (
    <Line className={c} sw={sw}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.2 13.3 7 22l5-3 5 3-1.2-8.7" />
    </Line>
  ),

  // ---- Solid glyphs ----
  star: (c) => (
    <Solid className={c}>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </Solid>
  ),
  quote: (c) => (
    <Solid className={c}>
      <path d="M7.5 6C5 6 3 8 3 10.5V18h7.5v-7.5H7c0-1.4 1.1-2.5 2.5-2.5V6zm9 0C14 6 12 8 12 10.5V18h7.5v-7.5H16c0-1.4 1.1-2.5 2.5-2.5V6z" />
    </Solid>
  ),
  whatsapp: (c) => (
    <Solid className={c}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.2 4.42c-.15 0-.4.06-.6.28-.2.22-.79.77-.79 1.88s.81 2.18.92 2.33c.11.15 1.57 2.5 3.9 3.4 1.94.75 2.33.6 2.76.56.42-.04 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.1-.2-.15-.42-.26-.22-.11-1.37-.68-1.58-.76-.21-.08-.37-.11-.53.11-.15.22-.6.76-.74.92-.14.15-.27.17-.5.06-.22-.11-.94-.35-1.79-1.11-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.27.33-.4.11-.14.15-.23.22-.38.07-.15.04-.28-.02-.4-.06-.1-.53-1.28-.72-1.75-.19-.46-.38-.4-.53-.4z" />
    </Solid>
  ),
  facebook: (c) => (
    <Solid className={c}>
      <path d="M13.5 21v-7H16l.5-3h-3V9c0-.9.3-1.5 1.6-1.5H17V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7h3z" />
    </Solid>
  ),
  twitter: (c) => (
    <Solid className={c}>
      <path d="M18.9 2H22l-7.1 8.1L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.6-8.7L1.5 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.7L7.2 3.8H5.4L17.7 20z" />
    </Solid>
  ),
  youtube: (c) => (
    <Solid className={c}>
      <path d="M22 8.3a3 3 0 0 0-2.1-2.1C18 5.7 12 5.7 12 5.7s-6 0-7.9.5A3 3 0 0 0 2 8.3 31 31 0 0 0 1.7 12 31 31 0 0 0 2 15.7a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.3-3.7.3-3.7s0-2.5-.3-3.7zM10 15V9l5.2 3L10 15z" />
    </Solid>
  ),
  linkedin: (c) => (
    <Solid className={c}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.08 1.4-2.08 2.85V21H10z" />
    </Solid>
  ),
  instagram: (c, sw) => (
    <Line className={c} sw={sw}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </Line>
  ),
};

export function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.8 }) {
  const render = ICONS[name];
  return render ? render(className, strokeWidth) : null;
}

/** Map a category's `icon` key to an Icon name, with a safe fallback. */
export function categoryIconName(key) {
  return ICONS[key] ? key : 'bolt';
}
