import Link from "next/link";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { site } from "@/lib/content";

export default function NotFound() {
  return (
    <>
      <header className="case-nav wrap">
        <Link href="/" aria-label={`${site.name}, home`}>
          <Wordmark />
        </Link>
        <Link className="case-back" href="/">
          <span aria-hidden="true">←</span> Home
        </Link>
      </header>

      <main className="not-found wrap">
        <p className="case-kind">404</p>
        <h1>Page not found.</h1>
        <p className="not-found-body">
          The page you are looking for does not exist or has moved.
        </p>
        <Link className="button" href="/">
          Back to home
        </Link>
      </main>

      <Footer />
    </>
  );
}
