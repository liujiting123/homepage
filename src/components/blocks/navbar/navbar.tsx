"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";

import styles from "./navbar.module.css";

const accents = [
  "ruby",
  "indigo",
  "ocean",
  "emerald",
  "rose",
  "amber",
] as const;

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations();
  const home = locale === "zh" ? "/zh" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [accent, setAccent] = useState("indigo");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("homepage-accent");
      if (saved && accents.some((value) => value === saved)) {
        setAccent(saved);
        document.documentElement.dataset.accent = saved;
      }
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, []);
  function selectAccent(value: string) {
    setAccent(value);
    document.documentElement.dataset.accent = value;
    try {
      localStorage.setItem("homepage-accent", value);
    } catch {
      /* The selected color still applies for this visit. */
    }
  }
  const sections = [
    ["about", "about"],
    ["news", "news"],
    ["projects", "research"],
    ["publications", "publications"],
    ["opensource", "openSource"],
    ["work", "experience"],
    ["education", "education"],
    ["academic-services", "service"],
  ];
  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">
        {t("homepage.navigation.skip")}
      </a>
      <div className={styles.inner}>
        <a href={home + "#about"} className={styles.brand}>
          {t("homepage.navigation.home")}
        </a>
        <nav
          id="main-navigation"
          className={`${styles.navigation} ${menuOpen ? styles.open : ""}`}
          aria-label={t("sections.research")}
        >
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={home + "#" + id}
              onClick={() => setMenuOpen(false)}
            >
              {t("homepage.navigation." + label)}
            </a>
          ))}
        </nav>
        <div className={styles.controls}>
          <div
            className={styles.palette}
            role="group"
            aria-label={t("homepage.navigation.colors")}
          >
            {accents.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={value}
                aria-pressed={accent === value}
                className={styles.colorDot}
                data-color={value}
                onClick={() => selectAccent(value)}
              />
            ))}
          </div>
          <LanguageToggle />
          <ModeToggle />
        </div>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={t("homepage.navigation.menu")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
