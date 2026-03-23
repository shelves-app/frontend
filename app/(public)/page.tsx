import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  BarChart3,
  Star,
  List,
  BookMarked,
  Import,
  ScanBarcode,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/* ─── Data ─── */

const BACKDROP_COLORS = [
  "bg-amber-800",
  "bg-emerald-900",
  "bg-sky-900",
  "bg-rose-900",
  "bg-violet-900",
  "bg-orange-900",
  "bg-teal-900",
  "bg-pink-900",
  "bg-indigo-900",
  "bg-yellow-900",
  "bg-cyan-900",
  "bg-lime-900",
];

const COVER_COLORS = [
  "bg-amber-800/60",
  "bg-emerald-800/60",
  "bg-sky-800/60",
  "bg-rose-800/60",
  "bg-violet-800/60",
  "bg-orange-800/60",
  "bg-teal-800/60",
  "bg-pink-800/60",
];

/* ─── Sub-components ─── */

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-sm border border-border/40 bg-secondary/30 p-5">
    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-shelves-green/10 text-shelves-green">
      {icon}
    </div>
    <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
  </div>
);

const SectionHeader = ({
  label,
  href,
  linkText,
}: {
  label: string;
  href: string;
  linkText: string;
}) => (
  <div className="flex items-baseline justify-between">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {label}
    </h2>
    <Link
      href={href}
      className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-shelves-blue"
    >
      {linkText}
    </Link>
  </div>
);

const BookCoverPlaceholder = ({ index }: { index: number }) => (
  <div
    className={`${COVER_COLORS[index % COVER_COLORS.length]} group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-sm border border-white/5 shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-md`}
  >
    <div className="absolute inset-0 flex items-end p-2 opacity-0 transition-opacity group-hover:opacity-100">
      <div className="w-full rounded-sm bg-black/70 px-2 py-1">
        <div className="h-2 w-3/4 rounded bg-foreground/30" />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-foreground/20" />
      </div>
    </div>
  </div>
);

const ReviewCardPlaceholder = () => (
  <div className="border-b border-border/40 pb-4">
    <div className="flex gap-3">
      <div className="h-24 w-16 flex-shrink-0 rounded-sm bg-secondary" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 rounded bg-secondary" />
        <div className="h-2 w-1/2 rounded bg-secondary/60" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={`star-${i + 1}`}
              className={`h-3 w-3 ${i < 4 ? "fill-shelves-green text-shelves-green" : "text-secondary"}`}
            />
          ))}
        </div>
        <div className="space-y-1 pt-1">
          <div className="h-2 w-full rounded bg-secondary/30" />
          <div className="h-2 w-5/6 rounded bg-secondary/30" />
          <div className="h-2 w-2/3 rounded bg-secondary/30" />
        </div>
      </div>
    </div>
  </div>
);

const ListCardPlaceholder = () => (
  <div className="group cursor-pointer">
    {/* Stacked covers — Letterboxd-style offset */}
    <div className="relative mb-2 h-32">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`listcover-${i + 1}`}
          className={`${COVER_COLORS[i % COVER_COLORS.length]} absolute top-0 aspect-[2/3] h-full rounded-sm border border-white/10 shadow-sm`}
          style={{ left: `${i * 20}%`, zIndex: 5 - i }}
        />
      ))}
    </div>
    <div className="h-3 w-3/4 rounded bg-secondary" />
    <div className="mt-1 h-2 w-1/2 rounded bg-secondary/50" />
  </div>
);

/* ─── Page ─── */

const HomePage = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    {/* Hero — Letterboxd-style with backdrop poster grid */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="grid h-full grid-cols-6 gap-1 opacity-[0.15] sm:grid-cols-8 md:grid-cols-12">
          {BACKDROP_COLORS.map((color, i) => (
            <div key={`bg-${i + 1}`} className={`${color} aspect-[2/3]`} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" />
      </div>

      <div className="container relative z-10 flex flex-col items-center py-20 text-center md:py-28">
        <Image
          src="/logo.svg"
          alt="Shelves"
          width={72}
          height={72}
          className="mb-5"
        />
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-[2.75rem] md:leading-tight">
          Track books you&apos;ve read.
          <br />
          Save those you want to read.
          <br />
          <span className="text-shelves-green">
            Tell your friends what&apos;s good.
          </span>
        </h1>
        <Link href="/sign-up" className="mt-8">
          <Button
            size="lg"
            className="bg-shelves-green px-8 text-base font-semibold text-background hover:bg-shelves-green/90"
          >
            Get started — it&apos;s free!
          </Button>
        </Link>
      </div>
    </section>

    {/* "Shelves lets you..." — PRD core habit loop features */}
    <section className="">
      <div className="container py-12">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-shelves-green">
          Shelves lets you...
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BookMarked className="h-5 w-5" />}
            title="Keep a reading diary"
            description="Log every book with start and finish dates, ratings, format, and private notes. Your reading history becomes a permanent, personal archive."
          />
          <FeatureCard
            icon={<Star className="h-5 w-5" />}
            title="Rate and review"
            description="5-star ratings with halves. Write reviews with spoiler tags. DNF reviews are first-class content, not a stigma. No character limit."
          />
          <FeatureCard
            icon={<Users className="h-5 w-5" />}
            title="Follow readers you trust"
            description="Asymmetric following — curate a feed of people whose taste you admire. One friend's 5-star rating beats any algorithm."
          />
          <FeatureCard
            icon={<List className="h-5 w-5" />}
            title="Create and share lists"
            description="Unlimited public and private lists. Ranked or unranked. The most viral, shareable content unit on the platform."
          />
          <FeatureCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Track what you're reading"
            description="Want to Read, Currently Reading, Read — and Did Not Finish. Track progress by page or percentage. Multiple books in parallel."
          />
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="See your reading stats"
            description="Books read, pages logged, top genres, reading pace, format breakdown. Annual Year in Review — shareable and beautiful."
          />
        </div>
      </div>
    </section>

    {/* Popular this week */}
    <section className="">
      <div className="container py-12">
        <SectionHeader
          label="Popular this week"
          href="/books/popular"
          linkText="More"
        />
        <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <BookCoverPlaceholder key={`popular-${i + 1}`} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Just reviewed */}
    <section className="">
      <div className="container py-12">
        <SectionHeader
          label="Just reviewed..."
          href="/reviews/recent"
          linkText="More"
        />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReviewCardPlaceholder key={`review-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>

    {/* Popular lists */}
    <section className="">
      <div className="container py-12">
        <SectionHeader
          label="Popular lists"
          href="/lists/popular"
          linkText="More"
        />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ListCardPlaceholder key={`list-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>

    {/* Why Shelves — PRD differentiators */}
    <section className="">
      <div className="container py-12">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Built for books, not retrofitted
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<ScanBarcode className="h-5 w-5" />}
            title="Barcode scanner"
            description="Scan any book's barcode at the bookshop or your shelf. Instantly log or add to Want to Read in two taps."
          />
          <FeatureCard
            icon={<Import className="h-5 w-5" />}
            title="Goodreads import"
            description="3-click migration. Bring your books, ratings, reviews, shelves, and dates. Zero switching cost."
          />
          <FeatureCard
            icon={<Lock className="h-5 w-5" />}
            title="Private profiles"
            description="Full private mode with follow requests. Individual lists can be private even on public profiles. Your data, your rules."
          />
          <FeatureCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Series tracking"
            description="Series pages with correct reading order. See your progress — 'You've read 3 of 7.' Never lose your place."
          />
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="">
      <div className="container flex flex-col items-center py-16 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          The Letterboxd for books.
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Goodreads has 150M+ users and hasn&apos;t shipped a meaningful update
          since 2013. Shelves is what they should have built. Import your library
          and see the difference.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-shelves-green px-8 font-semibold text-background hover:bg-shelves-green/90"
            >
              Create your account
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default HomePage;
