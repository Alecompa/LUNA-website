import { PageHead } from "../components/ui";
import LegacyContent from "../components/legacy-content";
import { legacy } from "@/lib/site";
export const metadata = { title: "Work with us" };
export default function WorkWithUs() {
  return (
    <>
      <PageHead crumbs={[["Collaboration", "/collaboration/"], ["Work with us"]]} title="Work with us" lead="Thesis projects, PhD studentships and postdoctoral fellowships. Check the linked institutions for current calls." />
      <div className="shell" style={{ paddingBottom: 112 }}>
        <LegacyContent html={legacy.pages["work-with-us"].html} />
      </div>
    </>
  );
}
