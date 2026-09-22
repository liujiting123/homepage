import Link from "next/link";

interface Social {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  navbar?: boolean;
  content?: boolean;
  footer?: boolean;
}

export default function SocialLinks({
  socials,
  className = "text-muted-foreground hover:text-foreground",
}: {
  socials: Record<string, Social>;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {Object.values(socials)
        .filter((social) => social.content)
        .map((social) => {
          const isEmail = social.url.startsWith("mailto:");

          return (
            <Link
              key={social.name}
              href={social.url}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              className={`${className} ${isEmail ? "flex basis-full items-center justify-center gap-2 text-sm select-text sm:basis-auto" : ""}`}
            >
              <social.icon className="size-5" />
              <span className={isEmail ? "break-all" : "sr-only"}>
                {isEmail ? social.url.slice("mailto:".length) : social.name}
              </span>
            </Link>
          );
        })}
    </div>
  );
}
