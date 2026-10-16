import Link from "next/link";
export default function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading shell">
      <div className="breadcrumbs">
        <Link href="/">LUNA</Link>
        <span>/</span>
        <span>{eyebrow || title}</span>
      </div>
      
      <h1>{title}</h1>
      {description && <p className="lead">{description}</p>}
      {children}
    </div>
  );
}
