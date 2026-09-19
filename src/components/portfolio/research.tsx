import Image from "next/image";

import { CustomReactMarkdown } from "@/components/react-markdown";

export interface ResearchItem {
  title: string;
  href: string;
  dates: string;
  description: string;
  authors: string;
  technologies: string[];
  links: { type: string; href: string }[];
  contribution?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

function ResearchLinks({ links }: { links: ResearchItem["links"] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="decoration-border font-medium underline underline-offset-4 hover:decoration-current"
          target="_blank"
          rel="noreferrer"
        >
          {link.type} <span aria-hidden="true">↗</span>
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
    <div className="space-y-6">
      {items.map((item) => (
        <article
          key={item.title}
          className="border-border rounded-xl border p-5 sm:p-6"
        >
          <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
            {item.image && (
              <figure className="min-w-0">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.title}: ${figureLabel}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    width={1920}
                    height={1015}
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="h-auto w-full rounded-md bg-white p-2"
                  />
                </a>
                <figcaption className="text-muted-foreground mt-3 text-xs leading-relaxed">
                  <a
                    href={item.href}
                    className="underline underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.imageCaption}
                  </a>
                </figcaption>
              </figure>
            )}
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground mb-2 flex flex-wrap gap-2 text-xs">
                  <span>{item.dates}</span>
                  {item.technologies.map((tag) => (
                    <span key={tag}>· {tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  <a
                    href={item.href}
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-7">
                {item.description}
              </p>
              <div className="border-foreground/20 border-l-2 pl-3 text-sm leading-6">
                <p className="font-medium">{contributionLabel}</p>
                <p className="text-muted-foreground">{item.contribution}</p>
              </div>
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
    <div className="divide-border divide-y">
      {items.map((item) => (
        <article
          key={item.title}
          className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[6rem_1fr] sm:gap-5"
        >
          <p className="text-muted-foreground pt-0.5 text-sm font-medium">
            {item.dates}
          </p>
          <div className="min-w-0 space-y-2">
            <h3 className="text-base leading-7 font-semibold">
              <a
                href={item.href}
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            </h3>
            <CustomReactMarkdown className="text-muted-foreground [&_strong]:text-foreground text-sm leading-6 [&_strong]:font-semibold">
              {item.authors}
            </CustomReactMarkdown>
            <p className="text-muted-foreground text-sm leading-6">
              {item.description}
            </p>
            <ResearchLinks links={item.links} />
          </div>
        </article>
      ))}
    </div>
  );
}
