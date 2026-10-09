import {
  ArrowUpRight,
  Award,
  FileText,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  Star,
  University,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ComponentProps, ReactNode } from "react";

import AwardsSection from "@/components/portfolio/awards-section";
import {
  FeaturedResearch,
  PublicationList,
  type ResearchItem,
} from "@/components/portfolio/research";
import Services from "@/components/portfolio/services";
import Skills from "@/components/portfolio/skills";
import Talks from "@/components/portfolio/talks";
import Work from "@/components/portfolio/work";
import { CustomReactMarkdown } from "@/components/react-markdown";
import {
  getRepositoryStars,
  researchImpact,
  totalProjectStars,
} from "@/data/research-impact";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { jsonldScript } from "@/lib/utils";

import styles from "./page.module.css";

type NewsItem = { date: string; title: string; content: string };
type EducationItem = {
  school: string;
  degree: string;
  start: string;
  end: string;
};
type Material = { title: string; description: string; href: string };

function SectionHeading({
  icon,
  children,
}: {
  icon: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span aria-hidden="true">{icon}</span>
      <h2>{children}</h2>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const social = transformSocialData(t.raw("social"));
  const projects = t.raw("projects.items") as ResearchItem[];
  const publications = t.raw("publications.items") as ResearchItem[];
  const work = t.raw("work.items") as ComponentProps<typeof Work>["work"];
  const education = t.raw("education.items") as EducationItem[];
  const news = t.raw("news.items") as NewsItem[];
  const topics = t.raw("homepage.topics") as string[];
  const awards = t.raw("awards.items") as ComponentProps<
    typeof AwardsSection
  >["awards"];
  const talks = t.raw("invitedTalks.items") as ComponentProps<
    typeof Talks
  >["talks"];
  const skills = t.raw("skills") as string[];
  const conferences = t.raw("reviewerConferences") as string[];
  const journals = t.raw("reviewerJournals") as string[];
  const teaching = t.raw("teaching.items") as ComponentProps<
    typeof Services
  >["teaching"];
  const materials = t.raw("materials.items") as Material[];
  const neuripsCount = publications.filter(
    (p) => p.dates === "NeurIPS 2026",
  ).length;
  const cvprCount = publications.filter((p) => p.dates === "CVPR 2026").length;
  const openSource = publications.flatMap((p) =>
    p.links
      .filter((link) => link.icon === "github")
      .map((link) => ({
        title: p.title.split(":")[0],
        description: p.title,
        href: link.href,
        stars: getRepositoryStars(link.href),
      })),
  );

  return (
    <main id="main-content" className={styles.main}>
      {jsonldScript(await generatePersonJsonLd(locale))}
      <section
        id="about"
        className={styles.hero}
        aria-labelledby="profile-name"
      >
        <aside className={styles.heroAside}>
          <Image
            src={siteConfig.avatarUrl}
            alt={t("name.full")}
            width={190}
            height={190}
            sizes="190px"
            className={styles.avatar}
            priority
          />
          <div className={styles.socials}>
            <a
              href={social.GoogleScholar.url}
              aria-label="Google Scholar"
              title="Google Scholar"
              target="_blank"
              rel="noreferrer"
            >
              <GraduationCap size={20} />
            </a>
            <a
              href={social.GitHub.url}
              aria-label="GitHub"
              title="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={19} />
            </a>
            <a
              href={social.email.url}
              aria-label={t("phdSearch.contactLabel")}
              title={social.email.url.replace(/^mailto:/, "")}
            >
              <Mail size={18} />
            </a>
            <a
              href={t("phdSearch.cvHref")}
              aria-label={t("phdSearch.cvLabel")}
              title={t("phdSearch.cvLabel")}
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={18} />
            </a>
          </div>
        </aside>
        <div className={styles.heroMain}>
          <h1 id="profile-name" className={styles.name}>
            {t("name.full")}
            <span>{t("subtitle")}</span>
          </h1>
          <p className={styles.role}>{t("homepage.role")}</p>
          <p className={styles.affiliation}>
            <University size={14} aria-hidden="true" />
            {t("homepage.affiliation")}
          </p>
          <p className={styles.affiliation}>
            <Mail size={14} aria-hidden="true" />
            <a href={social.email.url}>
              {social.email.url.replace(/^mailto:/, "")}
            </a>
          </p>
          <CustomReactMarkdown className={styles.bio}>
            {t("homepage.researchBio")}
          </CustomReactMarkdown>
          <CustomReactMarkdown className={styles.bio}>
            {t("homepage.appointments")}
          </CustomReactMarkdown>
          <a href="#contact" className={styles.focusBanner}>
            <span className={styles.focusIcon}>
              <Lightbulb size={18} aria-hidden="true" />
            </span>
            <span>
              <span className={styles.focusLabel}>
                {t("homepage.opportunities")}
              </span>
              <strong>{t("phdSearch.title")}</strong>
              <span className={styles.focusDescription}>
                {t("homepage.phdFocus")}
              </span>
            </span>
          </a>
          <div className={styles.tags}>
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <a
            className={styles.achievement}
            href={t("researchHighlight.href")}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.medal}>
              <Award size={22} aria-hidden="true" />
            </span>
            <span>
              <strong>Evo-Depth · NeurIPS 2026</strong>
              <span>{t("homepage.achievementDetail")}</span>
            </span>
          </a>
          <div
            className={styles.stats}
            aria-label={t("homepage.highlightsLabel")}
          >
            <a href="#publications">
              <strong>{neuripsCount}</strong>
              <span>NeurIPS 2026</span>
              <small>{t("homepage.neuripsDetail")}</small>
            </a>
            <a href="#publications">
              <strong>{cvprCount}</strong>
              <span>CVPR 2026</span>
              <small>Evo-1</small>
            </a>
            <a href="#opensource">
              <strong>{totalProjectStars}</strong>
              <span>{t("homepage.projectStars")}</span>
              <small>Evo-Depth + Evo-1</small>
            </a>
            <a
              href={researchImpact.citations.source}
              target="_blank"
              rel="noreferrer"
              title="Google Scholar"
            >
              <strong>{researchImpact.citations.count}</strong>
              <span>{t("homepage.citations")}</span>
              <small>
                {t("homepage.citationIndices", {
                  hIndex: researchImpact.citations.hIndex,
                  i10Index: researchImpact.citations.i10Index,
                })}
              </small>
            </a>
          </div>
          <p className={styles.metricsDate}>
            {t("homepage.metricsAsOf", { date: researchImpact.verifiedAt })}
          </p>
        </div>
      </section>
      {news.length > 0 && (
        <section id="news">
          <SectionHeading icon="🔥">{t("sections.news.title")}</SectionHeading>
          <ul className={styles.newsFeed}>
            {news.map((item, index) => (
              <li
                key={item.title}
                className={index === 0 ? styles.newsHighlight : undefined}
              >
                <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
                <strong>{item.title}</strong>
                <CustomReactMarkdown className={styles.newsDetails}>
                  {item.content}
                </CustomReactMarkdown>
              </li>
            ))}
          </ul>
        </section>
      )}
      {projects.length > 0 && (
        <section id="projects">
          <SectionHeading icon="🚀">
            {t("homepage.selectedTitle")}
          </SectionHeading>
          <FeaturedResearch
            items={projects}
            contributionLabel={t("sections.contribution")}
            figureLabel={t("sections.viewFigure")}
          />
        </section>
      )}
      {publications.length > 0 && (
        <section id="publications">
          <SectionHeading icon="📚">
            {t("sections.publications.title")}
          </SectionHeading>
          <p className={styles.publicationIntro}>
            {t("sections.viewFullPublications")}{" "}
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              Google Scholar <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
          <PublicationList items={publications} />
        </section>
      )}
      {openSource.length > 0 && (
        <section id="opensource">
          <SectionHeading icon="⭐">{t("homepage.openSource")}</SectionHeading>
          <div className={styles.openSourceGrid}>
            {openSource.map((item) => (
              <a
                href={item.href}
                key={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <Github size={18} aria-hidden="true" />
                  <strong>{item.title}</strong>
                  {item.stars !== undefined && (
                    <span
                      className={styles.starCount}
                      aria-label={`${item.stars} GitHub Stars`}
                      title={`${item.stars} GitHub Stars · ${researchImpact.verifiedAt}`}
                    >
                      <Star size={13} aria-hidden="true" />
                      {item.stars}
                    </span>
                  )}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}
      <section id="work">
        <SectionHeading icon="🔬">
          {t("sections.workExperience")}
        </SectionHeading>
        <div className={styles.experience}>
          <Work work={work} />
        </div>
        {materials.map((item) => (
          <a
            key={item.href}
            className={styles.material}
            href={item.href}
            title={item.description}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={16} aria-hidden="true" />
            {item.title}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </section>
      <section id="research-interests">
        <SectionHeading icon="💡">
          {t("sections.researchInterests")}
        </SectionHeading>
        <CustomReactMarkdown className={styles.interests}>
          {t("researchInterestsMarkdown")}
        </CustomReactMarkdown>
      </section>
      {education.length > 0 && (
        <section id="education">
          <SectionHeading icon="🎓">{t("sections.education")}</SectionHeading>
          {education.map((item) => (
            <article className={styles.education} key={item.school}>
              <span>
                {item.start} – {item.end}
              </span>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </div>
            </article>
          ))}
        </section>
      )}
      {(conferences.length > 0 ||
        journals.length > 0 ||
        teaching.length > 0) && (
        <section id="academic-services">
          <SectionHeading icon="🛠️">
            {t("sections.academicServices")}
          </SectionHeading>
          <div className={styles.services}>
            <Services
              reviewerConferences={conferences}
              reviewerJournals={journals}
              teaching={teaching}
              reviewerConferencesLabel={t(
                "sections.teaching.reviewerConferencesLabel",
              )}
              reviewerJournalsLabel={t(
                "sections.teaching.reviewerJournalsLabel",
              )}
              teachingLabel={t("sections.teaching.teachingLabel")}
            />
          </div>
        </section>
      )}
      {skills.length > 0 && (
        <section id="skills">
          <SectionHeading icon="💻">{t("sections.skills")}</SectionHeading>
          <Skills skills={skills} />
        </section>
      )}
      {awards.length > 0 && (
        <section id="awards">
          <SectionHeading icon="🏆">{t("sections.awards")}</SectionHeading>
          <AwardsSection awards={awards} showAllText={t("showAll")} />
        </section>
      )}
      {talks.length > 0 && (
        <section id="invited-talks">
          <SectionHeading icon="🎤">
            {t("sections.invitedTalks.title")}
          </SectionHeading>
          <Talks talks={talks} showAllText={t("showAll")} />
        </section>
      )}
      <section id="acknowledgements">
        <SectionHeading icon="🤝">
          {t("sections.acknowledgements")}
        </SectionHeading>
        <CustomReactMarkdown className={styles.acknowledgements}>
          {t("acknowledgementsMarkdown")}
        </CustomReactMarkdown>
      </section>
      <section id="contact">
        <SectionHeading icon="✉️">{t("sections.getInTouch")}</SectionHeading>
        <p className={styles.contact}>
          {t("phdSearch.description")}{" "}
          <a href={social.email.url}>
            {social.email.url.replace(/^mailto:/, "")}
          </a>
        </p>
      </section>
    </main>
  );
}
