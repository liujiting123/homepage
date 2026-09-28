/** Verified from the linked GitHub repositories and Google Scholar profile. */
export const researchImpact = {
  verifiedAt: "2026-09-29",
  citations: {
    count: 125,
    source: "https://scholar.google.com/citations?user=GVENiysAAAAJ&hl=en",
  },
  repositories: [
    { href: "https://github.com/MINT-SJTU/Evo-Depth", stars: 68 },
    { href: "https://github.com/MINT-SJTU/Evo-1", stars: 365 },
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
