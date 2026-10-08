const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const nf2 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pf = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const fmtNum = (n) => nf.format(n ?? 0);
export const fmtPrice = (n) => (Number.isInteger(n) ? nf.format(n) : nf2.format(n));
export const fmtPct = (n) => `${pf.format(Math.abs(n ?? 0))}%`;

export function bnDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
