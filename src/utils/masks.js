export function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let out = "";
  if (digits.length > 0) out += `(${digits.slice(0, 2)}`;
  if (digits.length >= 2) out += ") ";
  if (digits.length > 2) out += digits.slice(2, 3);
  if (digits.length > 3) out += ` ${digits.slice(3, 7)}`;
  if (digits.length > 7) out += `-${digits.slice(7, 11)}`;
  return out;
}

export function formatCPF(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let out = digits.slice(0, 3);
  if (digits.length > 3) out += `.${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `.${digits.slice(6, 9)}`;
  if (digits.length > 9) out += `-${digits.slice(9, 11)}`;
  return out;
}

export function passwordStrength(value) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 3);
}
