import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type React from "react";

import { Icons } from "@/components/icons";
import AwardsSection from "@/components/portfolio/awards-section";
import Brief from "@/components/portfolio/brief";
import Contact from "@/components/portfolio/contact";
import Education from "@/components/portfolio/education";
import NewsSection from "@/components/portfolio/news";
import ProjectsSection from "@/components/portfolio/projects-section/projects-section";
import Services from "@/components/portfolio/services";
import Skills from "@/components/portfolio/skills";
import SocialLinks from "@/components/portfolio/socallinks";
import Talks from "@/components/portfolio/talks";
import Work from "@/components/portfolio/work";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { getIconComponent, jsonldScript } from "@/lib/utils";

function DraftPlaceholder({
  label,
  description,
  items,
}: {
  label: string;
  description: string;
  items: readonly string[];
}) {
  return (
    <div className="border-border bg-muted/30 rounded-lg border border-dashed p-4 text-sm">
      <p className="text-foreground font-medium">
        <span className="bg-foreground text-background mr-2 rounded px-2 py-0.5 text-xs">
          {label}
        </span>
        {description}
      </p>
      <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  // Get data from i18n
  const socialData = transformSocialData(
    t.raw("social") as Record<
      string,
      {
        name: string;
        url: string;
        icon: string;
        navbar?: boolean;
        content?: boolean;
        footer?: boolean;
      }
    >,
  );
  // Helper function to safely get array fields
  const getArrayField = <T,>(key: string): T[] => {
    try {
      const value = t.raw(key);
      if (Array.isArray(value)) {
        return value as T[];
      }
      return [];
    } catch {
      // If the key doesn't exist or any error occurs, return empty array
      return [];
    }
  };

  const skills = getArrayField<string>("skills");
  const reviewerConferences = getArrayField<string>("reviewerConferences");
  const reviewerJournals = getArrayField<string>("reviewerJournals");
  const draftLabel = t("draft.label");
  const draftDescription = t("draft.description");

  const personJsonLd = await generatePersonJsonLd(locale);

  // Helper function to safely get collections items
  const getCollectionItems = <T,>(key: string): T[] => {
    try {
      const parentKey = key.split(".")[0];
      const collection = t.raw(parentKey) as
        | { items?: T[] | undefined }
        | undefined
        | null;
      // Check if collection exists and has items property that is an array
      if (
        collection &&
        typeof collection === "object" &&
        "items" in collection &&
        Array.isArray(collection.items)
      ) {
        return collection.items as T[];
      }
      return [];
    } catch {
      // If the key doesn't exist or any error occurs, return empty array
      return [];
    }
  };

  // Get collections data and check if items are empty
  const newsItems = getCollectionItems<{
    date: string;
    title: string;
    content: string;
  }>("news.items");
  const projectsItems = getCollectionItems<{
    title: string;
    href?: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    authors: string;
    links?: Array<{ type: string; href: string; icon: string }>;
    image?: string;
    video?: string;
  }>("projects.items");
  const publicationsItems = getCollectionItems<{
    title: string;
    href?: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    authors: string;
    links?: Array<{ type: string; href: string; icon: string }>;
    image?: string;
    video?: string;
  }>("publications.items");
  const educationItems = getCollectionItems<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>("education.items");
  const workItems = getCollectionItems<{
    company: string;
    href: string;
    badges: readonly string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  }>("work.items");
  const awardsItems = getCollectionItems<{
    year: number;
    title: string;
  }>("awards.items");
  const teachingItems = getCollectionItems<{
    date: string;
    title: string;
    location: string;
  }>("teaching.items");
  const invitedTalksItems = getCollectionItems<{
    host: string;
    url: string;
    date: string;
    title: string;
    logoUrl?: string;
  }>("invitedTalks.items");

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col space-y-8 px-6 py-8 pb-24 sm:space-y-10 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      {/* Hero Section */}
      <section id="hero" className="mt-16 sm:mt-28">
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
            className="mx-auto w-full max-w-2xl space-y-8"
            locale={locale}
          />
        </BlurFade>
      </section>

      {/* Social Links Section */}
      <section id="social">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <SocialLinks socials={socialData} />
        </BlurFade>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{t("sections.about")}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
          </div>
        </BlurFade>
      </section>

      {/* News Section */}
      {newsItems && newsItems.length > 0 && (
        <section id="news">
          <NewsSection
            news={newsItems}
            delay={BLUR_FADE_DELAY * 5}
            title={t("sections.news.title")}
            showAllText={t("showAll")}
          />
        </section>
      )}

      {/* Projects Section */}
      {projectsItems && projectsItems.length > 0 && (
        <section id="projects">
          <div className="w-full space-y-12 py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  {t("sections.selectedProjects")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("sections.checkOutLatestWork")}
                </h2>
              </div>
            </div>
            <ProjectsSection
              projects={projectsItems.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
              delay={BLUR_FADE_DELAY * 3}
              mobileDisplayCount={4}
              desktopDisplayCount={3}
            />
          </div>
        </section>
      )}

      {/* Publications Section */}
      {publicationsItems && publicationsItems.length > 0 && (
        <section id="publications">
          <div className="w-full space-y-12 py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  {t("sections.research")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("sections.publications.title")}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("sections.viewFullPublications")}{" "}
                  <Link
                    href={socialData.GoogleScholar.url}
                    className="text-foreground underline hover:no-underline"
                    target="_blank"
                  >
                    {socialData.GoogleScholar.name}
                  </Link>
                </p>
              </div>
            </div>
            <ProjectsSection
              projects={publicationsItems.map((project) => ({
                ...project,
                links: project.links?.map((link) => ({
                  ...link,
                  icon: getIconComponent(link.icon),
                })),
              }))}
              delay={BLUR_FADE_DELAY * 3}
              mobileDisplayCount={6}
              desktopDisplayCount={6}
              showAllText={t("showAll")}
            />
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">{t("sections.skills")}</h2>
          {Array.isArray(skills) && skills.length > 0 ? (
            <Skills skills={skills} />
          ) : (
            <DraftPlaceholder
              label={draftLabel}
              description={draftDescription}
              items={getArrayField<string>("draft.skills")}
            />
          )}
        </div>
      </section>

      {/* Education Section */}
      {educationItems && educationItems.length > 0 && (
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold">{t("sections.education")}</h2>
            <Education educations={educationItems} />
          </div>
        </section>
      )}

      {/* Work Section */}
      {Array.isArray(workItems) && workItems.length > 0 && (
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <h2 className="text-xl font-bold">
              {t("sections.workExperience")}
            </h2>
            <Work work={workItems} />
          </div>
        </section>
      )}

      {/* Awards Section */}
      <section id="awards">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">{t("sections.awards")}</h2>
          {awardsItems && awardsItems.length > 0 ? (
          <AwardsSection awards={awardsItems} showAllText={t("showAll")} />
          ) : (
            <DraftPlaceholder
              label={draftLabel}
              description={draftDescription}
              items={getArrayField<string>("draft.awards")}
            />
          )}
        </div>
      </section>

      {/* Academic Services Section */}
      <section id="academic-services">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">
            {t("sections.academicServices")}
          </h2>
          {(reviewerConferences.length > 0 ||
            reviewerJournals.length > 0 ||
            teachingItems.length > 0) ? (
            <Services
              reviewerConferences={reviewerConferences}
              reviewerJournals={reviewerJournals}
              teaching={teachingItems}
              reviewerConferencesLabel={t(
                "sections.teaching.reviewerConferencesLabel",
              )}
              reviewerJournalsLabel={t(
                "sections.teaching.reviewerJournalsLabel",
              )}
              teachingLabel={t("sections.teaching.teachingLabel")}
            />
          ) : (
            <DraftPlaceholder
              label={draftLabel}
              description={draftDescription}
              items={getArrayField<string>("draft.academicServices")}
            />
          )}
        </div>
      </section>

      {/* Invited Talks Section */}
      <section id="invited-talks">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">
            {t("sections.invitedTalks.title")}
          </h2>
          {invitedTalksItems && invitedTalksItems.length > 0 ? (
            <Talks talks={invitedTalksItems} showAllText={t("showAll")} />
          ) : (
            <DraftPlaceholder
              label={draftLabel}
              description={draftDescription}
              items={getArrayField<string>("draft.invitedTalks")}
            />
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <Contact
            emailUrl={socialData.email.url}
            calendlyUrl={socialData.calendly?.url}
            contactLabel={t("sections.contact")}
            getInTouch={t("sections.getInTouch")}
            contactDescription={t("sections.contactDescription")}
            viaEmail={t("sections.viaEmail")}
            askQuestions={t("sections.askQuestions")}
            exploreCollaboration={t("sections.exploreCollaboration")}
            coffeeChat={t("sections.coffeeChat")}
            schedule={t("sections.schedule")}
          />
        </div>
      </section>
    </main>
  );
}
