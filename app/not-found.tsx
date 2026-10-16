import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell section">
      <span className="label">404</span>
      <h1 className="h1" style={{ margin: "16px 0 24px" }}>Nothing down here.</h1>
      <Link className="btn btn-dark" href="/">Back to the surface</Link>
    </section>
  );
}
