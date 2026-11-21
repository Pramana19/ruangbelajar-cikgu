"use client";

import PasswordInput from "../../../components/PasswordInput";
import { evaluatePassword } from "../utils/daftarValidation";

interface PasswordStrengthBoxProps {
  password: string;
  onChange: (val: string) => void;
}

export default function PasswordStrengthBox({ password, onChange }: PasswordStrengthBoxProps) {
  const { hasMinLength, hasLowercase, hasSpecialChar, strength } = evaluatePassword(password);

  const rules = [
    {
      met: hasMinLength,
      text: "Minimal 8 karakter",
      hint: password.length > 0 && !hasMinLength ? ` (kurang ${8 - password.length} lagi)` : "",
    },
    { met: hasLowercase, text: "Minimal 1 huruf kecil (a-z)", hint: "" },
    { met: hasSpecialChar, text: "Minimal 1 simbol khusus (! @ # ? $ %)", hint: "" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-medium text-slate-700">Buat Kata Sandi</label>
        {password.length > 0 && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${strength.badgeBg}`}>
            Keamanan: {strength.label}
          </span>
        )}
      </div>

      <PasswordInput value={password} onChange={onChange} />

      <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
        <p className="text-[11px] font-semibold text-slate-700 mb-1">Syarat Kata Sandi:</p>
        <ul className="space-y-1 text-[11px]">
          {rules.map((rule) => (
            <li key={rule.text} className={`flex items-center ${rule.met ? "text-teal-700 font-medium" : "text-slate-500"}`}>
              <svg className={`w-3.5 h-3.5 me-1.5 shrink-0 ${rule.met ? "text-teal-600" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>
                {rule.text}
                {rule.hint && <span className="text-amber-600 font-semibold">{rule.hint}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}