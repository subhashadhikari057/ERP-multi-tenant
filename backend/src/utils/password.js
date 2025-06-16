import bcrypt from 'bcrypt';

// ── Password policy: ≥8 chars & any 3 of [upper, lower, digit, symbol] ─────────
export const isPasswordStrong = (pw = '') => {
  if (pw.length < 8) return false;
  const rules = [
    /[A-Z]/,      // upper
    /[a-z]/,      // lower
    /\d/,         // digit
    /[!@#$%^&*._-]/ // symbol
  ];
  return rules.filter((r) => r.test(pw)).length >= 3;
};

export const hashPassword = async (pw) => bcrypt.hash(pw, 10);
export const comparePassword = async (pw, hash) => bcrypt.compare(pw, hash);
