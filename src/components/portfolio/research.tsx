import { ArrowUpRight, FileText, Github, Globe2, Star } from "lucide-react";
import Image from "next/image";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { getRepositoryStars } from "@/data/research-impact";

import styles from "./research.module.css";

export interface ResearchItem {
  title: string;
  href: string;
  dates: string;
  description: string;
  authors: string;
  technologies: string[];
  links: { type: string; href?: string; icon?: string }[];
  contribution?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
}

function ResourceIcon({ icon }: { icon?: string }) {
  const Icon =
    icon === "paper"
      ? FileText
      : icon === "github"
        ? Github
        : icon === "globe"
          ? Globe2
          : ArrowUpRight;
  return <Icon aria-hidden="true" size={16} strokeWidth={1.8} />;
}

function ResearchLinks({ links }: { links: ResearchItem["links"] }) {
  return (
    <div className={styles.resourceLinks} data-reveal>
      {links.map((link) => {
        if (!link.href)
          return (
            <button
              key={link.type}
              type="button"
              disabled
              className={styles.resourceLink}
            >
              <ResourceIcon icon={link.icon} />
              <span>{link.type}</span>
            </button>
          );
        const stars = getRepositoryStars(link.href);
        return (
          <a
            key={`${link.type}-${link.href}`}
            href={link.href}
            className={styles.resourceLink}
            target="_blank"
            rel="noreferrer"
          >
            <ResourceIcon icon={link.icon} />
            <span>{link.type}</span>
            {stars !== undefined && (
              <span
                className={styles.starCount}
                aria-label={`${stars} GitHub Stars`}
                title={`${stars} GitHub Stars`}
              >
                <Star aria-hidden="true" size={14} />
                {stars}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

export function FeaturedResearch({
  items,
  contributionLabel,
  figureLabel,
}: {
  items: ResearchItem[];
  contributionLabel: string;
  figureLabel: string;
}) {
  return (
    <div className={styles.researchRoot}>
      {items.map((item) => (
        <article key={item.title} className={styles.featuredSheet}>
          <div className={styles.featuredGrid}>
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle} data-reveal>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
              <p className={styles.metadata} data-reveal>
                {item.technologies.join(" · ")}
                {!item.technologies.some((tag) => tag.includes(item.dates)) &&
                  ` · ${item.dates}`}
              </p>
              <p className={styles.featuredDescription} data-reveal>
                {item.description}
              </p>
              {item.authors && (
                <CustomReactMarkdown className={styles.authors}>
                  {item.authors}
                </CustomReactMarkdown>
              )}
              <ResearchLinks links={item.links} />
              {item.contribution && (
                <details className={styles.contribution}>
                  <summary>{contributionLabel}</summary>
                  <p>{item.contribution}</p>
                </details>
              )}
            </div>
            {item.image && (
              <figure className={styles.figure} data-reveal>
                <a
                  href={item.image}
                  className={styles.figureLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.title}: ${figureLabel}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    width={item.imageWidth || 1920}
                    height={item.imageHeight || 1014}
                    sizes="(min-width: 900px) 52vw, 100vw"
                    className={styles.figureImage}
                  />
                </a>
                {item.imageCaption && (
                  <figcaption className={styles.figureCaption}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.imageCaption}
                    </a>
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function PublicationList({ items }: { items: ResearchItem[] }) {
  return (
    <div className={`${styles.researchRoot} ${styles.publicationList}`}>
      {items.map((item) => {
        const shortTitle = item.title.split(":")[0];
        const venue =
          /^\d{4}$/.test(item.dates) && item.technologies[0]
            ? `${item.technologies[0]} ${item.dates}`
            : item.dates;
        return (
          <article key={item.title} className={styles.publication}>
            <div className={styles.publicationName} data-reveal>
              <h3>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {shortTitle}
                </a>
              </h3>
              <p className={styles.metadata}>
                {[venue, ...item.technologies.slice(1)].join(" · ")}
              </p>
            </div>
            <div className={styles.publicationBody}>
              {shortTitle !== item.title && (
                <p className={styles.fullTitle} data-reveal>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </p>
              )}
              {item.authors && (
                <div data-reveal>
                  <CustomReactMarkdown className={styles.authors}>
                    {item.authors}
                  </CustomReactMarkdown>
                </div>
              )}
              <p className={styles.publicationDescription}>
                {item.description}
              </p>
              <ResearchLinks links={item.links} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
