/** Dated Google Scholar metrics and verified GitHub repository star counts. */
export const researchImpact = {
  verifiedAt: "2026-10-09",
  citations: {
    count: 141,
    hIndex: 4,
    i10Index: 3,
    source: "https://scholar.google.com/citations?user=GVENiysAAAAJ&hl=en",
  },
  repositories: [
    { href: "https://github.com/MINT-SJTU/Evo-Depth", stars: 70 },
    { href: "https://github.com/MINT-SJTU/Evo-1", stars: 369 },
  ],
} as const;

export const totalProjectStars = researchImpact.repositories.reduce(
  (total, repository) => total + repository.stars,
  0,
);

export function getRepositoryStars(href: string): number | undefined {
  return researchImpact.repositories.find(
    (repository) => repository.href === href,
  )?.stars;
}
