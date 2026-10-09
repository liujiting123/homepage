import {
  ArrowUpRight,
  FileText,
  Github,
  GraduationCap,
  Mail,
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
import { researchImpact, totalProjectStars } from "@/data/research-impact";
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

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionHeading}>
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

  return (
    <main id="main-content" className={styles.main}>
      {jsonldScript(await generatePersonJsonLd(locale))}
      <section
        id="about"
        className={styles.hero}
        aria-labelledby="profile-name"
      >
        <div className={styles.heroMain}>
          <p className={styles.identity}>
            <span>{t("homepage.role")}</span>
            <span>{t("homepage.affiliation")}</span>
          </p>
          <h1 id="profile-name" className={styles.name}>
            {t("name.full")}
            <span>{t("subtitle")}</span>
          </h1>
          <CustomReactMarkdown className={styles.bio}>
            {t("homepage.researchBio")}
          </CustomReactMarkdown>
          <CustomReactMarkdown className={styles.appointments}>
            {t("homepage.appointments")}
          </CustomReactMarkdown>
          <ul className={styles.topics}>
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <div className={styles.profileLinks}>
            <a href={social.email.url}>
              <Mail size={15} aria-hidden="true" />
              {social.email.url.replace(/^mailto:/, "")}
            </a>
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              <GraduationCap size={16} aria-hidden="true" />
              Google Scholar
            </a>
            <a href={social.GitHub.url} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" />
              GitHub
            </a>
            <a href={t("phdSearch.cvHref")} target="_blank" rel="noreferrer">
              <FileText size={15} aria-hidden="true" />
              {t("phdSearch.cvLabel")}
            </a>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <Image
            src={siteConfig.avatarUrl}
            alt={t("name.full")}
            width={176}
            height={176}
            sizes="(max-width: 620px) 88px, 176px"
            className={styles.avatar}
            priority
          />
        </aside>
        <a href="#contact" className={styles.opportunity}>
          <span className={styles.opportunityDot} aria-hidden="true" />
          <span>{t("phdSearch.title")}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
      {projects.length > 0 && (
        <section id="projects">
          <SectionHeading>{t("homepage.selectedTitle")}</SectionHeading>
          <FeaturedResearch
            items={projects}
            contributionLabel={t("sections.contribution")}
            figureLabel={t("sections.viewFigure")}
          />
        </section>
      )}
      {news.length > 0 && (
        <section id="news">
          <SectionHeading>{t("sections.news.title")}</SectionHeading>
          <ul className={styles.newsFeed}>
            {news.map((item) => (
              <li key={item.title}>
                <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
                <div>
                  <strong>{item.title}</strong>
                  <CustomReactMarkdown className={styles.newsDetails}>
                    {item.content}
                  </CustomReactMarkdown>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {publications.length > 0 && (
        <section id="publications">
          <SectionHeading>{t("sections.publications.title")}</SectionHeading>
          <p className={styles.publicationIntro}>
            {t("sections.viewFullPublications")}{" "}
            <a href={social.GoogleScholar.url} target="_blank" rel="noreferrer">
              Google Scholar <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
          <div
            className={styles.metrics}
            aria-label={t("homepage.highlightsLabel")}
          >
            <span title={t("homepage.neuripsDetail")}>
              <strong>{neuripsCount}</strong> NeurIPS 2026
            </span>
            <span>
              <strong>{cvprCount}</strong> CVPR 2026
            </span>
            <span title="Evo-Depth + Evo-1">
              <strong>{totalProjectStars}</strong> {t("homepage.projectStars")}
            </span>
            <a
              href={researchImpact.citations.source}
              target="_blank"
              rel="noreferrer"
              title={t("homepage.citationIndices", {
                hIndex: researchImpact.citations.hIndex,
                i10Index: researchImpact.citations.i10Index,
              })}
            >
              <strong>{researchImpact.citations.count}</strong>{" "}
              {t("homepage.citations")}
            </a>
          </div>
          <p className={styles.metricsDate}>
            {t("homepage.metricsAsOf", { date: researchImpact.verifiedAt })}
          </p>
          <PublicationList items={publications} />
        </section>
      )}
      <section id="work">
        <SectionHeading>{t("sections.workExperience")}</SectionHeading>
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
      {education.length > 0 && (
        <section id="education">
          <SectionHeading>{t("sections.education")}</SectionHeading>
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
          <SectionHeading>{t("sections.academicServices")}</SectionHeading>
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
          <SectionHeading>{t("sections.skills")}</SectionHeading>
          <Skills skills={skills} />
        </section>
      )}
      {awards.length > 0 && (
        <section id="awards">
          <SectionHeading>{t("sections.awards")}</SectionHeading>
          <AwardsSection awards={awards} showAllText={t("showAll")} />
        </section>
      )}
      {talks.length > 0 && (
        <section id="invited-talks">
          <SectionHeading>{t("sections.invitedTalks.title")}</SectionHeading>
          <Talks talks={talks} showAllText={t("showAll")} />
        </section>
      )}
      <section id="acknowledgements">
        <SectionHeading>{t("sections.acknowledgements")}</SectionHeading>
        <CustomReactMarkdown className={styles.acknowledgements}>
          {t("acknowledgementsMarkdown")}
        </CustomReactMarkdown>
      </section>
      <section id="contact">
        <SectionHeading>{t("sections.getInTouch")}</SectionHeading>
        <div className={styles.contact}>
          <p>{t("phdSearch.description")}</p>
          <a href={social.email.url}>
            {social.email.url.replace(/^mailto:/, "")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
