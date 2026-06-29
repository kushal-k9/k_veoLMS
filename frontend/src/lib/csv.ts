// Minimal client-side CSV export (no dependency). Quotes fields safely and
// triggers a browser download.
function escapeCell(value: string): string {
  const v = value ?? "";
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(","));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
