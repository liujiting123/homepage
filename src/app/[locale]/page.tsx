import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ComponentProps } from "react";

import AwardsSection from "@/components/portfolio/awards-section";
import Brief from "@/components/portfolio/brief";
import Education from "@/components/portfolio/education";
import NewsSection from "@/components/portfolio/news";
import {
  FeaturedResearch,
  PublicationList,
  type ResearchItem,
} from "@/components/portfolio/research";
import Services from "@/components/portfolio/services";
import Skills from "@/components/portfolio/skills";
import SocialLinks from "@/components/portfolio/socallinks";
import Talks from "@/components/portfolio/talks";
import Work from "@/components/portfolio/work";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { jsonldScript } from "@/lib/utils";

interface Material {
  title: string;
  date: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const personJsonLd = await generatePersonJsonLd(locale);
  const socialData = transformSocialData(t.raw("social"));
  const projects = t.raw("projects.items") as ResearchItem[];
  const publications = t.raw("publications.items") as ResearchItem[];
  const work = t.raw("work.items") as ComponentProps<typeof Work>["work"];
  const education = t.raw("education.items") as ComponentProps<
    typeof Education
  >["educations"];
  const news = t.raw("news.items") as ComponentProps<
    typeof NewsSection
  >["news"];
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
  const proseClass =
    "prose prose-base dark:prose-invert max-w-none text-muted-foreground prose-p:leading-8 prose-a:decoration-border prose-a:underline-offset-4 hover:prose-a:decoration-current prose-strong:font-semibold";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-28 pb-20 sm:gap-14 sm:px-10 sm:pt-32 lg:px-12">
      <section id="hero">
        {jsonldScript(personJsonLd)}
        <BlurFade delay={0}>
          <Brief
            name={t("name.full")}
            firstName={t("name.given")}
            surname={t("name.family")}
            initials={t("name.initials")}
            subtitle={t("subtitle")}
            description={t("headline")}
            avatarUrl={siteConfig.avatarUrl}
            locale={locale}
            className="w-full"
          />
        </BlurFade>
        <aside
          id="phd-search"
          aria-labelledby="phd-search-title"
          className="mt-7 rounded-xl border border-sky-200 bg-sky-50/70 p-5 text-sky-950 sm:p-6 dark:border-sky-900 dark:bg-sky-950/25 dark:text-sky-100"
        >
          <h2 id="phd-search-title" className="text-lg font-semibold">
            {t("phdSearch.title")}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-sky-900/85 dark:text-sky-200/90">
            {t("phdSearch.description")}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm font-medium">
            <a
              href={socialData.email.url}
              className="rounded-md bg-sky-900 px-4 py-2 text-white hover:bg-sky-800 dark:bg-sky-100 dark:text-sky-950 dark:hover:bg-white"
            >
              {t("phdSearch.contactLabel")}
            </a>
            <a
              href={t("phdSearch.cvHref")}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              {t("phdSearch.cvLabel")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        <div className="mt-6">
          <SocialLinks socials={socialData} />
        </div>
        <nav
          aria-label={t("sections.research")}
          className="border-border text-muted-foreground mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 border-b pb-6 text-sm"
        >
          {[
            ["research-interests", t("sections.researchInterests")],
            ["publications", t("sections.publications.title")],
            ["work", t("sections.workExperience")],
            ["news", t("sections.news.title")],
            ["acknowledgements", t("sections.acknowledgements")],
            ["academic-services", t("sections.academicServices")],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section id="about" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-semibold">{t("sections.about")}</h2>
        <CustomReactMarkdown className={proseClass}>
          {t("bioMarkdown")}
        </CustomReactMarkdown>
      </section>

      <section id="research-interests" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-semibold">
          {t("sections.researchInterests")}
        </h2>
        <CustomReactMarkdown className={proseClass}>
          {t("researchInterestsMarkdown")}
        </CustomReactMarkdown>
      </section>

      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-24 space-y-5">
          <h2 className="text-xl font-semibold">
            {t("sections.selectedProjects")}
          </h2>
          <FeaturedResearch
            items={projects}
            contributionLabel={t("sections.contribution")}
            figureLabel={t("sections.viewFigure")}
          />
        </section>
      )}

      {publications.length > 0 && (
        <section id="publications" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t("sections.publications.title")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("sections.viewFullPublications")}{" "}
              <a
                href={socialData.GoogleScholar.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Google Scholar
              </a>
            </p>
          </div>
          <PublicationList items={publications} />
        </section>
      )}

      {work.length > 0 && (
        <section id="work" className="scroll-mt-24 space-y-6">
          <h2 className="text-xl font-semibold">
            {t("sections.workExperience")}
          </h2>
          <Work work={work} />
        </section>
      )}

      <section id="acknowledgements" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-semibold">
          {t("sections.acknowledgements")}
        </h2>
        <CustomReactMarkdown className={proseClass}>
          {t("acknowledgementsMarkdown")}
        </CustomReactMarkdown>
      </section>

      {education.length > 0 && (
        <section id="education" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-semibold">{t("sections.education")}</h2>
          <Education educations={education} />
        </section>
      )}

      {(conferences.length > 0 ||
        journals.length > 0 ||
        teaching.length > 0) && (
        <section id="academic-services" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-semibold">
            {t("sections.academicServices")}
          </h2>
          <Services
            reviewerConferences={conferences}
            reviewerJournals={journals}
            teaching={teaching}
            reviewerConferencesLabel={t(
              "sections.teaching.reviewerConferencesLabel",
            )}
            reviewerJournalsLabel={t("sections.teaching.reviewerJournalsLabel")}
            teachingLabel={t("sections.teaching.teachingLabel")}
          />
        </section>
      )}

      {materials.length > 0 && (
        <section id="materials" className="scroll-mt-24 space-y-5">
          <h2 className="text-xl font-semibold">{t("sections.materials")}</h2>
          {materials.map((item) => (
            <article
              key={item.href}
              className="border-border flex flex-col gap-5 rounded-xl border p-5 sm:flex-row sm:items-center sm:gap-7"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 self-start"
                aria-label={`${item.title}: ${t("sections.viewCertificate")}`}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={596}
                  height={842}
                  sizes="128px"
                  className="border-border h-auto w-32 rounded border"
                />
              </a>
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs">{item.date}</p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-7">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-medium underline underline-offset-4"
                >
                  {t("sections.viewCertificate")}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      )}

      {news.length > 0 && (
        <section id="news" className="scroll-mt-24">
          <NewsSection
            news={news}
            title={t("sections.news.title")}
            showAllText={t("showAll")}
          />
        </section>
      )}
      {skills.length > 0 && (
        <section id="skills" className="space-y-4">
          <h2 className="text-xl font-semibold">{t("sections.skills")}</h2>
          <Skills skills={skills} />
        </section>
      )}
      {awards.length > 0 && (
        <section id="awards" className="space-y-4">
          <h2 className="text-xl font-semibold">{t("sections.awards")}</h2>
          <AwardsSection awards={awards} showAllText={t("showAll")} />
        </section>
      )}
      {talks.length > 0 && (
        <section id="invited-talks" className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t("sections.invitedTalks.title")}
          </h2>
          <Talks talks={talks} showAllText={t("showAll")} />
        </section>
      )}

      <section
        id="contact"
        className="border-border scroll-mt-24 space-y-3 border-t pt-8"
      >
        <h2 className="text-xl font-semibold">{t("sections.getInTouch")}</h2>
        <p className="text-muted-foreground text-sm leading-7">
          {t("sections.contactDescription")}{" "}
          <a
            href={socialData.email.url}
            className="text-foreground break-all underline underline-offset-4 select-text"
          >
            {socialData.email.url.replace(/^mailto:/, "")}
          </a>
          {locale === "zh" ? "。" : "."}
        </p>
      </section>
    </main>
  );
}
