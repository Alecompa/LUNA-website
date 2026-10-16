import { localHtml } from "@/lib/paths";
export default function LegacyContent({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`prose legacy-content ${className}`}
      dangerouslySetInnerHTML={{ __html: localHtml(html) }}
    />
  );
}
