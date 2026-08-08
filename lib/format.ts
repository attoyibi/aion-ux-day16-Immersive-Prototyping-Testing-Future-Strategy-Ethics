/**
 * Locale-independent formatting. Intl and toLocaleString are deliberately not
 * used anywhere in this app: every learner must see byte-identical output.
 */

export function groupThousands(value: number): string {
  const negative = value < 0;
  const digits = String(Math.abs(Math.trunc(value)));
  let out = "";
  for (let i = 0; i < digits.length; i += 1) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += ",";
    out += digits[i];
  }
  return negative ? `-${out}` : out;
}

export function eur(value: number): string {
  return `EUR ${groupThousands(value)}`;
}

export function signed(value: number): string {
  if (value > 0) return `+${value}`;
  return String(value);
}

export function pct(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}
