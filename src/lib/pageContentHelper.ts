import { PageContent } from '@/types/cms';

export function getPageHeroOverrides(
  page: PageContent | null | undefined,
  defaults: { badge?: string; title: string; subtitle?: string }
) {
  const heroSec = page?.sections?.find((s) => s.type === 'hero' || s.id?.includes('hero'));
  const heroContent = heroSec?.content || {};
  return {
    badge: heroContent.badge || defaults.badge,
    title: heroContent.title || defaults.title,
    subtitle: heroContent.subtitle || defaults.subtitle,
    visible: heroSec ? heroSec.visible !== false : true,
  };
}

export function isSectionVisible(
  page: PageContent | null | undefined,
  ...identifiers: string[]
): boolean {
  if (!page?.sections) return true;
  for (const id of identifiers) {
    const sec = page.sections.find((s) => s.id === id || s.type === id);
    if (sec && sec.visible === false) {
      return false;
    }
  }
  return true;
}
