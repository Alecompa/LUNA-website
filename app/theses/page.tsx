import { PageHead } from "../components/ui";
import ArchiveBrowser from "../components/archive-browser";
import { legacy } from "@/lib/site";
export const metadata = { title: "Theses" };
export default function Theses() {
  const years = legacy.pages.theses.sections.filter((s) => s.year !== "Overview");
  return (
    <>
      <PageHead crumbs={[["Publications", "/publications/"], ["Theses"]]} title="Theses" lead={`Bachelor, master and doctoral theses, ${years.at(-1)?.year}–${years[0]?.year}.`} />
      <div className="shell" style={{ paddingBottom: 112, maxWidth: 1000 }}>
        <ArchiveBrowser sections={legacy.pages.theses.sections} kind="theses" />
      </div>
    </>
  );
}
