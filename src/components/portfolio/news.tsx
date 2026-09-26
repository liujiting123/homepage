"use client";

import { useState } from "react";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";

interface NewsItem {
  readonly date: string;
  readonly title: string;
  readonly content: string;
}

interface NewsSectionProps {
  news: readonly NewsItem[];
  delay?: number;
  title?: string;
}

function NewsItem({ item, delay }: { item: NewsItem; delay: number }) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTouchStart = () => {
    if (window.innerWidth < 640) {
      // sm breakpoint
      setIsTapped(true);
    }
  };

  const handleTouchEnd = () => {
    if (window.innerWidth < 640) {
      // Keep the effect for a bit longer
      setTimeout(() => setIsTapped(false), 200);
    }
  };

  return (
    <BlurFade key={`${item.date}-${item.title}`} delay={delay}>
      <div
        className={`hover:bg-accent/50 [&_a]:decoration-muted-foreground/50 [&:hover_a]:decoration-foreground rounded-md px-3 py-1 transition-colors [&_a]:underline ${
          isTapped ? "bg-accent/50 [&_a]:decoration-foreground" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-start gap-3">
          <time
            dateTime={item.date.replace(".", "-")}
            className="text-muted-foreground mt-0.5 w-16 shrink-0 text-xs font-medium whitespace-nowrap tabular-nums"
          >
            {item.date}
          </time>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 text-sm leading-tight font-semibold">
              <span className="[&_img]:mr-1 [&_img]:ml-1 [&_img]:inline [&_img]:align-middle [&>p]:m-0 [&>p]:inline">
                <CustomReactMarkdown>{item.title}</CustomReactMarkdown>
              </span>
            </h3>
            <div className="text-muted-foreground text-xs leading-relaxed">
              <span className="[&_img]:mr-1 [&_img]:ml-1 [&_img]:inline [&_img]:align-middle [&>p]:m-0 [&>p]:inline">
                <CustomReactMarkdown>{item.content}</CustomReactMarkdown>
              </span>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

export default function NewsSection({
  news,
  delay = 0,
  title = "Latest News",
}: NewsSectionProps) {
  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      <BlurFade delay={delay}>
        <h2 className="text-xl font-bold">{title}</h2>
      </BlurFade>
      <div className="space-y-0.5">
        {news.map((item, id) => (
          <NewsItem
            key={`${item.date}-${item.title}`}
            item={item}
            delay={delay + 0.05 + id * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
