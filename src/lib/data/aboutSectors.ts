/** Stable order for About page sector blocks (copy lives in i18n under `about.sectors.<id>`). */
export const ABOUT_SECTOR_IDS = ['llm', 'fullstack', 'clients', 'cicd'] as const;

export type AboutSectorId = (typeof ABOUT_SECTOR_IDS)[number];
