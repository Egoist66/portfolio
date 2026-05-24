export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth"
) {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function getHashFromPath(path: string): string | null {
  const hashIndex = path.indexOf("#");
  if (hashIndex === -1) return null;

  return decodeURIComponent(path.slice(hashIndex + 1));
}

export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = "smooth",
  attempts = 12,
  intervalMs = 50
) {
  const sectionId = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!sectionId) return;

  let tries = 0;

  const tryScroll = () => {
    if (scrollToSection(sectionId, behavior)) return;
    tries += 1;
    if (tries < attempts) {
      window.setTimeout(tryScroll, intervalMs);
    }
  };

  tryScroll();
}
