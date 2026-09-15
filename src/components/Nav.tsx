"use client";

import { useState, useSyncExternalStore } from "react";

const links = [
  { href: "#spectrum", label: "Spectrum" },
  { href: "#compare", label: "Compare" },
  { href: "#weekday", label: "The day" },
  { href: "#ceilings", label: "Ceilings" },
  { href: "#distance", label: "Distance" },
  { href: "#why", label: "Why" },
  { href: "#sources", label: "Sources" },
];

/* The resolved theme lives on <html data-theme>, stamped before first paint by
   the inline script in layout.tsx. A tiny external store lets the button read
   it without a setState-in-effect cascade. */
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const getSnapshot = () => document.documentElement.dataset.theme ?? "light";
const getServerSnapshot = () => "light";

function setTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("noise-theme", next);
  } catch {
    /* private mode / blocked storage — the choice just will not persist */
  }
  listeners.forEach((l) => l());
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--surface-0) 88%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          minHeight: 58,
        }}
      >
        <a
          href="#top"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-1)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Noise<span style={{ color: "var(--accent)" }}> / </span>Dossier
        </a>

        <nav
          aria-label="Sections"
          style={{ marginLeft: "auto", display: "none", gap: 22 }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                color: "var(--ink-2)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          aria-label="Toggle colour theme"
          style={{
            marginLeft: "auto",
            border: "1px solid var(--rule-strong)",
            background: "transparent",
            color: "var(--ink-2)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 12,
            cursor: "pointer",
          }}
          className="theme-btn"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle section menu"
          className="nav-burger"
          style={{
            border: "1px solid var(--rule-strong)",
            background: "transparent",
            color: "var(--ink-2)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Sections
        </button>
      </div>

      {open && (
        <nav
          aria-label="Sections"
          className="wrap nav-mobile-panel"
          style={{
            display: "grid",
            gap: 2,
            paddingBottom: 14,
            borderTop: "1px solid var(--rule)",
            paddingTop: 10,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 14,
                color: "var(--ink-2)",
                textDecoration: "none",
                padding: "8px 0",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}

      <style>{`
        @media (min-width: 860px) {
          .nav-desktop { display: flex !important; }
          .nav-burger { display: none; }
          .theme-btn { margin-left: 0 !important; }
        }
        @media (max-width: 859px) {
          .nav-mobile-panel { display: grid; }
        }
      `}</style>
    </header>
  );
}
