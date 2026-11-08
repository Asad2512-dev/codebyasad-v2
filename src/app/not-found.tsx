import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid-paper flex min-h-[80svh] items-center pt-24">
      <div className="container-x">
        <p className="t-label">404</p>
        <h1 className="t-display mt-4">This page isn&apos;t part of the build.</h1>
        <div className="mt-8 flex flex-wrap gap-3"><Button href="/">Home</Button><Button href="/work/" variant="secondary">Work</Button></div>
      </div>
    </section>
  );
}
