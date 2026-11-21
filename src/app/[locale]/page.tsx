import Image from "next/image";
import { getTranslations } from "next-intl/server";

import PageMotion from "@/components/portfolio/page-motion";
import {
  FeaturedResearch,
  PublicationList,
  type ResearchItem,
} from "@/components/portfolio/research";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { researchImpact, totalProjectStars } from "@/data/research-impact";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { jsonldScript } from "@/lib/utils";

import styles from "./page.module.css";

type NewsItem = { date: string; title: string; content: string };
type Affiliation = { name: string; href: string; detail: string };
type WorkItem = {
  company: string;
  short: string;
  unit?: string;
  title: string;
  href: string;
  start: string;
  end: string;
  current?: boolean;
  affiliations?: Affiliation[];
  description: string;
};
type EducationItem = {
  school: string;
  degree: string;
  start: string;
  end: string;
};
type Material = { title: string; description: string; href: string };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale || routing.defaultLocale;
  const zh = locale === "zh";
  const t = await getTranslations({ locale });
  const social = transformSocialData(t.raw("social"));
  const projects = t.raw("projects.items") as ResearchItem[];
  const publications = t.raw("publications.items") as ResearchItem[];
  const work = t.raw("work.items") as WorkItem[];
  const education = t.raw("education.items") as EducationItem[];
  const news = t.raw("news.items") as NewsItem[];
  const conferences = t.raw("reviewerConferences") as string[];
  const journals = t.raw("reviewerJournals") as string[];
  const materials = t.raw("materials.items") as Material[];

  return (
    <main id="main-content" className={styles.main}>
      {jsonldScript(await generatePersonJsonLd(locale))}
      <PageMotion />
      <section
        id="about"
        className={styles.hero}
        aria-labelledby="profile-name"
      >
        <div className={styles.profileIdentity}>
          <Image
            src={siteConfig.avatarUrl}
            alt={t("name.full")}
            width={176}
            height={176}
            sizes="(max-width: 600px) 88px, (max-width: 900px) 128px, 176px"
            className={styles.avatar}
            priority
            data-reveal
          />
          <div className={styles.identityText}>
            <h1 id="profile-name" className={styles.name} data-reveal>
              {t("name.full")}
            </h1>
            <p className={styles.otherName} data-reveal>
              {t("subtitle")}
              <span className={styles.nameSep} aria-hidden="true">
                {" · "}
              </span>
              <span className={styles.headlineText}>{t("headline")}</span>
            </p>
            <div className={styles.profileLinks} data-reveal>
              <a
                href={social.GoogleScholar.url}
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar
              </a>
              <a
                href={social.semanticScholar.url}
                target="_blank"
                rel="noreferrer"
              >
                Semantic Scholar
              </a>
              <a href={social.GitHub.url} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <aside
          id="contact"
          className={styles.opportunity}
          aria-labelledby="opportunity-title"
        >
          <h2 id="opportunity-title" data-reveal>
            {t("phdSearch.shortTitle")}
          </h2>
          <p data-reveal>{t("phdSearch.description")}</p>
          <div className={styles.opportunityActions} data-reveal>
            <a className={styles.primaryAction} href={social.email.url}>
              {social.email.url.replace(/^mailto:/, "")}
            </a>
            <a href={t("phdSearch.cvHref")} target="_blank" rel="noreferrer">
              {t("phdSearch.cvLabel")}
            </a>
          </div>
        </aside>
        <div className={styles.heroCopy}>
          <p className={styles.lead} data-reveal>
            {t("homepage.researchBio")}
          </p>
          <div data-reveal>
            <CustomReactMarkdown className={styles.appointments}>
              {t("homepage.appointments")}
            </CustomReactMarkdown>
          </div>
        </div>
        <div className={styles.interests}>
          <h2 data-reveal>{t("homepage.interestsTitle")}</h2>
          <div data-reveal>
            <CustomReactMarkdown className={styles.bio}>
              {t("researchInterestsMarkdown")}
            </CustomReactMarkdown>
          </div>
        </div>
      </section>

      <section id="work" className={styles.backgroundSection}>
        <div className={styles.experienceLayout}>
          <h2 data-reveal className={styles.experienceHeading}>
            {zh ? "科研经历" : "Research experience"}
          </h2>
          <ol className={styles.timeline}>
            {work.map((item) => (
              <li
                key={item.company}
                className={item.current ? styles.timelineCurrent : undefined}
                data-reveal
              >
                <div className={styles.timelineMeta}>
                  <time>
                    {[item.start, item.end].filter(Boolean).join(" – ")}
                  </time>
                  {item.current ? (
                    <span className={styles.nowBadge}>
                      {zh ? "进行中" : "Current"}
                    </span>
                  ) : null}
                </div>
                <div className={styles.timelineBody}>
                  <h3>
                    {item.affiliations?.length ? (
                      item.short
                    ) : (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.short}
                      </a>
                    )}
                  </h3>
                  <p className={styles.timelineRole}>
                    {[item.title, item.unit].filter(Boolean).join(" · ")}
                  </p>
                  {item.affiliations?.length ? (
                    <ul className={styles.affiliations}>
                      {item.affiliations.map((aff) => (
                        <li key={aff.name}>
                          <a href={aff.href} target="_blank" rel="noreferrer">
                            {aff.name}
                          </a>
                          <CustomReactMarkdown
                            className={styles.affiliationDetail}
                          >
                            {aff.detail}
                          </CustomReactMarkdown>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <CustomReactMarkdown className={styles.experienceText}>
                    {item.description}
                  </CustomReactMarkdown>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className={styles.projectSection}>
        <div className={styles.sectionHeading}>
          <h2 data-reveal>{t("homepage.selectedTitle")}</h2>
        </div>
        <FeaturedResearch
          items={projects}
          contributionLabel={t("sections.contribution")}
          figureLabel={t("sections.viewFigure")}
        />
      </section>

      <section id="publications" className={styles.publicationSection}>
        <div className={styles.publicationHeading}>
          <h2 data-reveal>{zh ? "论文" : "Publications"}</h2>
          <p data-reveal>
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              {zh ? "Google Scholar 完整列表" : "Full list on Google Scholar"}
            </a>
          </p>
        </div>
        <div className={styles.metrics} data-reveal>
          <p>
            <strong>{totalProjectStars}</strong>
            <span>{t("homepage.projectStars")}</span>
          </p>
          <p>
            <a
              href={researchImpact.citations.source}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{researchImpact.citations.count}</strong>
              <span>{t("homepage.citations")}</span>
            </a>
          </p>
        </div>
        <PublicationList
          heading={zh ? "共一论文" : "Co-first-author papers"}
          items={publications}
        />
      </section>

      <section id="news" className={styles.newsSection}>
        <h2 data-reveal>{t("sections.news.title")}</h2>
        <div className={styles.newsFeed}>
          {news.map((item) => (
            <article key={item.title} data-reveal>
              <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
              <p className={styles.newsTitle}>{item.title}</p>
              <CustomReactMarkdown className={styles.newsDetails}>
                {item.content}
              </CustomReactMarkdown>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.credentialsSection}>
        <div className={styles.credentials}>
          <div id="education" data-reveal>
            <h3>{t("sections.education")}</h3>
            {education.map((item) => (
              <div key={item.school}>
                <p>{item.school}</p>
                <p>{item.degree}</p>
                <p className={styles.secondary}>
                  {item.start} – {item.end}
                </p>
              </div>
            ))}
          </div>
          <div id="academic-services" data-reveal>
            <h3>{t("sections.academicServices")}</h3>
            {[...conferences, ...journals].map((item) => (
              <p key={item}>{item}</p>
            ))}
            {materials.map((item) => (
              <p key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </p>
            ))}
          </div>
        </div>
        <details
          className={styles.acknowledgements}
          id="acknowledgements"
          data-reveal
        >
          <summary>{t("sections.acknowledgements")}</summary>
          <CustomReactMarkdown>
            {t("acknowledgementsMarkdown")}
          </CustomReactMarkdown>
        </details>
      </section>
    </main>
  );
}
