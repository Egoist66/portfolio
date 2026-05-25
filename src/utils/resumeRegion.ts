const BELARUS_ALIASES = ["belarus", "беларусь", "by", "blr"];
const RUSSIA_ALIASES = ["russia", "россия", "ru", "rus"];

function normalizeCountry(value: string): string {
  return value.trim().toLowerCase();
}

function matchesCountry(value: string, aliases: string[]): boolean {
  const normalized = normalizeCountry(value);
  return aliases.some(
    (alias) => normalized === alias || normalized.includes(alias)
  );
}

export function hasBelarusRussiaWorkPermit(workPermit: string[]): boolean {
  const hasBelarus = workPermit.some((permit) =>
    matchesCountry(permit, BELARUS_ALIASES)
  );
  const hasRussia = workPermit.some((permit) =>
    matchesCountry(permit, RUSSIA_ALIASES)
  );

  return hasBelarus && hasRussia;
}
