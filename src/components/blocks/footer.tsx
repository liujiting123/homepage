"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { siteConfig } from "@/data/site";

import styles from "./footer.module.css";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const prefix = locale === "zh" ? "/zh" : "";
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} {t("name.full")} ·{" "}
        {t("footer.bottom.lastUpdated")} {siteConfig.lastUpdated}
      </p>
      <p className={styles.credits}>
        {locale === "zh" ? "主页样式参考" : "Design adapted from"}{" "}
        <a href="https://linb203.github.io/" target="_blank" rel="noreferrer">
          Bin Lin
        </a>{" "}
        ·{" "}
        <a
          href="https://github.com/zhengzangw/nextjs-portfolio-blog-research"
          target="_blank"
          rel="noreferrer"
        >
          nextjs-portfolio-blog-research
        </a>
      </p>
      <div className={styles.legal}>
        <Link href={prefix + "/privacy-policy"}>
          {t("footer.legal.privacyPolicy")}
        </Link>
        <Link href={prefix + "/terms-of-service"}>
          {t("footer.legal.termsDisclaimer")}
        </Link>
      </div>
    </footer>
  );
}
