export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatFullDateTime(date: Date): string {
  return `${formatFullDate(date)} • ${formatTime(date)}`;
}

export function isValidDate(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const [dayStr, monthStr, yearStr] = value.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > 2100) return false;

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isNotPastDate(value: string): boolean {
  const [dayStr, monthStr, yearStr] = value.split('/');
  const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
}
