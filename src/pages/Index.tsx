import { Link } from "react-router-dom";
import heroImage from "@/assets/quickserve-hero.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 flex items-center justify-between">
        <a href="/" className="font-semibold text-lg">QuickServe</a>
        <nav className="flex items-center gap-4">
          <Link to="/browse" className="underline-offset-4 hover:underline">Services</Link>
          <Link to="/provider" className="underline-offset-4 hover:underline">Providers</Link>
          <Link to="/admin" className="underline-offset-4 hover:underline">Admin</Link>
          <Link to="/login" className="underline-offset-4 hover:underline">Login</Link>
          <Button asChild variant="hero" className="">
            <Link to="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main>
        <section className="container mx-auto grid md:grid-cols-2 gap-10 items-center py-10">
          <article>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Book trusted home services in minutes
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Plumbing, cleaning, electrical and more. Real-time tracking, secure payments, and verified providers.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild variant="hero">
                <Link to="/browse">
                  Explore Services
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/provider">Become a provider</Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              Seamless on web and mobile with real-time updates.
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'QuickServe',
              url: '/',
              sameAs: [],
              description: 'Book trusted home services with real-time tracking and secure payments.'
            })}} />
          </article>
          <aside className="relative">
            <div className="pointer-events-none absolute -inset-10 blur-3xl opacity-40" aria-hidden>
              <div className="w-full h-full rounded-full bg-[image:var(--gradient-primary)]" />
            </div>
            <img
              src={heroImage}
              alt="QuickServe home services booking app hero"
              className="w-full h-auto rounded-lg shadow-[var(--elevation-2)] relative"
              loading="lazy"
            />
          </aside>
        </section>

        <section className="container mx-auto py-8">
          <h2 className="sr-only">Popular Services</h2>
        </section>
      </main>
      <footer className="container mx-auto py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} QuickServe. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
