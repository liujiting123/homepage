"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";

import styles from "./navbar.module.css";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations();
  const home = locale === "zh" ? "/zh" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = [
    ["projects", "research"],
    ["news", "news"],
    ["publications", "publications"],
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
          {t("name.full")}
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
