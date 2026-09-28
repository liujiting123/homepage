import { ArrowUpRight, FileText, Github, Globe2 } from "lucide-react";
import Image from "next/image";

import { CustomReactMarkdown } from "@/components/react-markdown";

import styles from "./research.module.css";

export interface ResearchItem {
  title: string;
  href: string;
  dates: string;
  description: string;
  authors: string;
  technologies: string[];
  links: { type: string; href: string; icon?: string }[];
  contribution?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

function ResourceIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case "paper":
      return <FileText aria-hidden="true" size={15} strokeWidth={1.8} />;
    case "github":
      return <Github aria-hidden="true" size={15} strokeWidth={1.8} />;
    case "globe":
      return <Globe2 aria-hidden="true" size={15} strokeWidth={1.8} />;
    default:
      return <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />;
  }
}

function ResearchLinks({ links }: { links: ResearchItem["links"] }) {
  return (
    <div className={styles.resourceLinks}>
      {links.map((link) => (
        <a
          key={`${link.type}-${link.href}`}
          href={link.href}
          className={`${styles.resourceLink} ${
            link.icon === "paper"
              ? styles.paperLink
              : link.icon === "github"
                ? styles.codeLink
                : link.icon === "globe"
                  ? styles.projectLink
                  : ""
          }`}
          target="_blank"
          rel="noreferrer"
        >
          <ResourceIcon icon={link.icon} />
          <span>{link.type}</span>
        </a>
      ))}
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
        <article key={item.title} className={styles.featuredCard}>
          <div
            className={
              item.image ? styles.featuredGrid : styles.featuredGridNoImage
            }
          >
            {item.image && (
              <figure className={styles.figure}>
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
                    width={1920}
                    height={1014}
                    sizes="(min-width: 800px) 48vw, (min-width: 640px) 80vw, 100vw"
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
            <div className={styles.featuredContent}>
              <div className={styles.featuredHeader}>
                <div className={styles.badges}>
                  {item.technologies.map((tag, index) => (
                    <span
                      key={tag}
                      className={
                        index === 0 ? styles.venueBadge : styles.roleBadge
                      }
                    >
                      {tag}
                    </span>
                  ))}
                  {!item.technologies.some((tag) =>
                    tag.includes(item.dates),
                  ) && (
                    <span className={styles.featuredDate}>{item.dates}</span>
                  )}
                </div>
                <h3 className={styles.featuredTitle}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </h3>
                {item.authors && (
                  <CustomReactMarkdown className={styles.authors}>
                    {item.authors}
                  </CustomReactMarkdown>
                )}
              </div>
              <p className={styles.featuredDescription}>{item.description}</p>
              {item.contribution && (
                <p className={styles.contribution}>
                  <strong className={styles.contributionLabel}>
                    {contributionLabel}:{" "}
                  </strong>
                  {item.contribution}
                </p>
              )}
              <ResearchLinks links={item.links} />
            </div>
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
        const venue =
          /^\d{4}$/.test(item.dates) && item.technologies[0]
            ? `${item.technologies[0]} ${item.dates}`
            : item.dates;
        const roles = item.technologies.slice(1);

        return (
          <article key={item.title} className={styles.publication}>
            <div className={styles.publicationBody}>
              <h3 className={styles.publicationTitle}>
                <span className={styles.publicationVenue}>{venue}</span>
                {roles.map((tag) => (
                  <span key={tag} className={styles.roleBadge}>
                    {tag}
                  </span>
                ))}
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
              {item.authors && (
                <CustomReactMarkdown className={styles.authors}>
                  {item.authors}
                </CustomReactMarkdown>
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
