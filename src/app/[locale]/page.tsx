import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { CustomReactMarkdown as Md } from "@/components/react-markdown";
import { getRepositoryStars } from "@/data/research-impact";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { jsonldScript } from "@/lib/utils";

import styles from "./page.module.css";

type Link = { label: string; href: string };
type Publication = {
  title: string;
  href: string;
  authors: string;
  venue: string;
  image?: string;
  imageAlt?: string;
  summary?: string;
  contribution?: string;
  links: Link[];
};
type News = { date: string; text: string };
type Experience = {
  company: string;
  href: string;
  title: string;
  dates: string;
  current?: boolean;
  lab: string;
  people: string;
  text: string;
};
type Education = { school: string; detail: string; dates: string };
type Service = { text: string; href?: string };

function LinkRow({ links }: { links: Link[] }) {
  if (!links.length) return null;
  return (
    <p className={styles.linkRow}>
      {links.map((link) => {
        const stars = getRepositoryStars(link.href);
        return (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            {stars !== undefined ? (
              <span className={styles.stars} title={`${stars} GitHub stars`}>
                ★ {stars}
              </span>
            ) : null}
          </a>
        );
      })}
    </p>
  );
}

function shortName(title: string) {
  return title.split(":")[0];
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const social = transformSocialData(t.raw("social"));
  const home = t.raw("home") as {
    role: string;
    about: string;
    seeking: string;
    email: string;
    cvLabel: string;
    cvHref: string;
    titles: Record<string, string>;
    pubNote: string;
    scholarLabel: string;
    otherPubsTitle: string;
    contributionLabel: string;
    currentLabel: string;
    news: News[];
    publications: Publication[];
    otherPubs: Publication[];
    education: Education[];
    service: Service[];
  };
  const experience = t.raw("work.items") as Experience[];

  return (
    <main id="main-content" className={styles.main}>
      {jsonldScript(await generatePersonJsonLd(locale))}

      <section id="about" className={styles.intro} aria-labelledby="name">
        <div className={styles.introText}>
          <h1 id="name" className={styles.name}>
            {t("name.full")}
            <span className={styles.altName}>{t("subtitle")}</span>
          </h1>
          <p className={styles.role}>{home.role}</p>
          <Md className={styles.about}>{home.about}</Md>
          <p className={styles.contact}>
            <a className={styles.mail} href={`mailto:${home.email}`}>
              {home.email}
            </a>
            <a href={home.cvHref} target="_blank" rel="noreferrer">
              {home.cvLabel}
            </a>
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              Google Scholar
            </a>
            <a href={social.GitHub.url} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href={social.semanticScholar.url}
              target="_blank"
              rel="noreferrer"
            >
              Semantic Scholar
            </a>
          </p>
        </div>
        <Image
          src={siteConfig.avatarUrl}
          alt={t("name.full")}
          width={220}
          height={220}
          sizes="(max-width: 700px) 112px, 220px"
          className={styles.portrait}
          priority
        />
        <p className={styles.seeking}>{home.seeking}</p>
      </section>

      <section id="news" className={styles.section}>
        <h2>{home.titles.news}</h2>
        <ul className={styles.news}>
          {home.news.map((item) => (
            <li key={item.text}>
              <time>{item.date}</time>
              <Md>{item.text}</Md>
            </li>
          ))}
        </ul>
      </section>

      <section id="publications" className={styles.section}>
        <div className={styles.headingRow}>
          <h2>{home.titles.publications}</h2>
          <p>
            {home.pubNote}
            <span aria-hidden="true"> · </span>
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              {home.scholarLabel}
            </a>
          </p>
        </div>
        <div className={styles.pubs}>
          {home.publications.map((pub) => (
            <article key={pub.title} className={styles.pub}>
              <div className={styles.thumb}>
                {pub.image ? (
                  <a href={pub.image} target="_blank" rel="noreferrer">
                    <Image
                      src={pub.image}
                      alt={pub.imageAlt || pub.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 300px"
                    />
                  </a>
                ) : (
                  <span className={styles.thumbName}>
                    {shortName(pub.title)}
                  </span>
                )}
              </div>
              <div className={styles.pubBody}>
                <h3>
                  {pub.href ? (
                    <a href={pub.href} target="_blank" rel="noreferrer">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>
                <Md className={styles.authors}>{pub.authors}</Md>
                <p className={styles.venue}>{pub.venue}</p>
                {pub.summary ? (
                  <p className={styles.summary}>{pub.summary}</p>
                ) : null}
                {pub.contribution ? (
                  <p className={styles.summary}>
                    <strong>{home.contributionLabel}</strong>
                    {pub.contribution}
                  </p>
                ) : null}
                <LinkRow links={pub.links} />
              </div>
            </article>
          ))}
        </div>

        <h3 className={styles.subheading}>{home.otherPubsTitle}</h3>
        <ul className={styles.otherPubs}>
          {home.otherPubs.map((pub) => (
            <li key={pub.title}>
              <a
                className={styles.otherTitle}
                href={pub.href}
                target="_blank"
                rel="noreferrer"
              >
                {pub.title}
              </a>
              <Md className={styles.authors}>{pub.authors}</Md>
              <div className={styles.otherMeta}>
                <span className={styles.venue}>{pub.venue}</span>
                <LinkRow links={pub.links} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience" className={styles.section}>
        <h2>{home.titles.experience}</h2>
        <ol className={styles.experience}>
          {experience.map((item) => (
            <li key={item.company}>
              <p className={styles.dates}>
                {item.dates}
                {item.current ? (
                  <span className={styles.current}>{home.currentLabel}</span>
                ) : null}
              </p>
              <div>
                <h3>{item.company}</h3>
                <Md className={styles.lab}>
                  {[item.title, item.lab].filter(Boolean).join(" · ")}
                </Md>
                {item.people ? (
                  <Md className={styles.people}>{item.people}</Md>
                ) : null}
                {item.text ? (
                  <Md className={styles.expText}>{item.text}</Md>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.closing}`}>
        <div id="education">
          <h2>{home.titles.education}</h2>
          {home.education.map((item) => (
            <div key={item.school} className={styles.closingItem}>
              <h3>{item.school}</h3>
              <p>{item.detail}</p>
              <p className={styles.muted}>{item.dates}</p>
            </div>
          ))}
        </div>
        <div id="service">
          <h2>{home.titles.service}</h2>
          <ul className={styles.serviceList}>
            {home.service.map((item) => (
              <li key={item.text}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
