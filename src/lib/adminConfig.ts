// Whitelisted admin emails
export const ADMIN_EMAILS = [
  'prakashmrinal9@gmail.com',
];

export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
