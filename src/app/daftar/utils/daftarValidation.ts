export const sanitizeNama = (value: string) => value.replace(/[^a-zA-Z\s'.]/g, "");

export const sanitizeWa = (value: string) => value.replace(/\D/g, "");

export const isNamaValid = (value: string) => value.trim().length >= 2;

export const isEmailValid = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim());

export const isWaValid = (value: string) => /^(08|628)\d{8,12}$/.test(value);

export function evaluatePassword(password: string) {
  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9\s]/.test(password);
  const hasUpperOrNumber = /[A-Z0-9]/.test(password);

  const isPasswordValid = hasMinLength && hasLowercase && hasSpecialChar;

  let strength = { label: "", badgeBg: "" };
  if (password.length > 0) {
    if (isPasswordValid && hasUpperOrNumber && password.length >= 10) {
      strength = { label: "Kuat", badgeBg: "bg-teal-100 text-teal-800" };
    } else if (isPasswordValid) {
      strength = { label: "Sedang", badgeBg: "bg-amber-100 text-amber-800" };
    } else {
      strength = { label: "Lemah", badgeBg: "bg-red-100 text-red-700" };
    }
  }

  return { hasMinLength, hasLowercase, hasSpecialChar, isPasswordValid, strength };
}