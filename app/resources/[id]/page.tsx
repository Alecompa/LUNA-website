import { notFound } from "next/navigation";
import Link from "next/link";
import { legacy } from "@/lib/site";
import PageHeading from "@/app/components/page-heading";
import LegacyContent from "@/app/components/legacy-content";
const resources = ["50-kv", "400-kv", "deuterium-nature"] as const;
export const dynamicParams = false;
export function generateStaticParams() {
  return resources.map((id) => ({ id }));
}
export default async function Resource({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!resources.includes(id as (typeof resources)[number])) notFound();
  const key = id as (typeof resources)[number];
  return (
    <>
      <PageHeading
        title={
          key === "deuterium-nature"
            ? "Deuterium burning & the early Universe"
            : legacy.pages[key].title
        }
        eyebrow="LUNA ARCHIVE"
      />
      <article className="shell article-width">
        <LegacyContent html={legacy.pages[key].html} />
        <Link className="text-link mt-8" href="/about/">
          ← About LUNA
        </Link>
      </article>
    </>
  );
}
