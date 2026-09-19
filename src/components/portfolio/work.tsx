import { CustomReactMarkdown } from "@/components/react-markdown";

interface Work {
  company: string;
  title: string;
  href: string;
  start: string;
  end: string;
  description: string;
}

export default function Work({ work }: { work: Work[] }) {
  return (
    <div className="space-y-8">
      {work.map((item) => (
        <article
          key={item.company}
          className="border-border border-l-2 pl-5 sm:pl-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="leading-6 font-semibold">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {item.company}
              </a>
            </h3>
            <span className="text-muted-foreground shrink-0 text-sm">
              {item.start}–{item.end}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium">{item.title}</p>
          <CustomReactMarkdown className="prose prose-sm dark:prose-invert text-muted-foreground prose-p:my-2 prose-p:leading-7 prose-a:font-normal prose-a:decoration-border prose-a:underline-offset-4 hover:prose-a:decoration-current mt-3 max-w-none">
            {item.description}
          </CustomReactMarkdown>
        </article>
      ))}
    </div>
  );
}
