import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { AudienceButtons, InterestForm } from "@/components/interest-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#how", label: "How it works" },
  { href: "#who", label: "Who it's for" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function BrandLogo({
  variant = "nav",
}: {
  variant?: "nav" | "footer";
}) {
  const heightClass =
    variant === "footer"
      ? "h-14 w-auto sm:h-16"
      : "h-11 w-auto"; /* match Register interest button height */

  return (
    <span className={cn("brand-logo-swap inline-flex items-center", heightClass)}>
      <img
        src={`${basePath}/brand/mt-logo-light.png`}
        alt="Mandate Talent"
        width={473}
        height={242}
        className="brand-logo brand-logo--light h-full w-auto"
        decoding="async"
      />
      <img
        src={`${basePath}/brand/mt-logo-dark.png`}
        alt=""
        width={473}
        height={242}
        className="brand-logo brand-logo--dark h-full w-auto"
        decoding="async"
        aria-hidden="true"
      />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header id="top" className="site-header sticky top-0 z-10 border-b">
        <div className="mx-auto flex min-h-16 w-full max-w-[1080px] flex-nowrap items-center gap-4 px-5 py-2 sm:px-6">
          <a
            href="#top"
            data-plain
            className="inline-flex shrink-0 items-center"
            aria-label="Mandate Talent"
          >
            <BrandLogo variant="nav" />
          </a>
          <nav
            aria-label="Page"
            className="ml-auto flex min-h-11 shrink-0 items-center gap-4 sm:gap-6"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="site-header-link inline-flex h-11 items-center text-[15px] font-medium"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#register"
              className={cn(
                buttonVariants(),
                "h-11 shrink-0 rounded-full px-5 text-[16px] text-white hover:text-white",
              )}
            >
              Register interest
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-[1080px] px-5 py-20 sm:px-6 md:py-28">
          <p className="eyebrow-amber text-[11px] leading-[1.4]">
            Melbourne launch
          </p>
          <h1 className="hero-title mt-6 max-w-[18ch]">
            Cover contracts with the dates in the open.
          </h1>
          <p className="mt-8 max-w-[42rem] text-[16px] leading-[1.5] text-muted-foreground">
            Mandate Talent is an Australian marketplace for short, defined cover
            contracts for parental leave, long sick leave, and gap cover in office
            and knowledge-work roles. We match people who can do the work from day
            one to a contract that says when it starts, when it ends, and how the
            work is handed over.
          </p>
          <div className="mt-10">
            <AudienceButtons />
          </div>
        </section>

        <section id="problem" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
            <div className="grid items-start gap-8 border-t border-border py-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10 md:py-28">
              <h2 className="max-w-[16ch]">
                A verified tick is a moment.
                <br />
                Cover runs for months.
              </h2>
              <div className="glass-piece flex flex-col gap-6 p-6 sm:p-8">
                <p className="text-[16px] leading-[1.5] text-muted-foreground">
                  Parental leave, a long illness, or a gap in the team is usually a
                  three to twelve month contract. You need a start, an end, and a
                  person whose right to work still holds at the end, with a buffer,
                  not only on the day you look them up.
                </p>
                <p className="text-[18px] leading-[1.35] font-semibold tracking-[-0.01em] text-amber-attention">
                  Matching visa dates to the contract, not just a verified tick.
                </p>
                <p className="text-[16px] leading-[1.5] text-muted-foreground">
                  The employer stays legally responsible for work-rights checks. The
                  platform reduces risk and keeps a date-stamped record of what was
                  shown when the shortlist was made.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
            <div className="border-t border-border py-20 md:py-28">
              <h2>How a cover contract moves</h2>
              <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
                <article className="lift-card flex h-auto min-w-0 flex-col gap-5 overflow-visible border-l-[3px] border-l-[var(--teal)] px-5 py-6">
                  <Icon name="user" size={22} className="icon-signal" />
                  <h3>Talent</h3>
                  <p className="overflow-visible text-[16px] leading-[1.5] text-muted-foreground">
                    You share the work you can do from the first day, your situation,
                    and the dates you are free.
                  </p>
                </article>
                <article className="lift-card accent-rail-amber flex h-auto min-w-0 flex-col gap-5 overflow-visible border-l-[3px] border-l-[var(--teal)] px-5 py-6">
                  <Icon name="document" size={22} className="icon-amber" />
                  <h3>The contract</h3>
                  <p className="overflow-visible text-[16px] leading-[1.5] text-muted-foreground">
                    HR or a line manager posts a structured cover contract: start and
                    end, days per week, overlap days, tasks, and the systems the work
                    sits in. They see a ranked shortlist and can filter for work
                    rights that cover the whole contract, plus a buffer.
                  </p>
                </article>
                <article className="lift-card flex h-auto min-w-0 flex-col gap-5 overflow-visible border-l-[3px] border-l-[var(--teal)] px-5 py-6">
                  <Icon name="arrow-join" size={22} className="icon-signal" />
                  <h3>Handover</h3>
                  <p className="overflow-visible text-[16px] leading-[1.5] text-muted-foreground">
                    Once the placement is accepted, a handover workspace opens. The
                    person stepping out and the person stepping in pass the work
                    across in one place.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="who" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
            <div className="border-t border-border py-20 md:py-28">
              <h2>Who it is for</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <article className="who-glass p-6">
                  <Icon name="users" size={22} className="icon-etch" />
                  <h3 className="mt-6">Talent</h3>
                  <p className="mt-4 text-[16px] leading-[1.5] text-muted-foreground">
                    Working-holiday and temporary-visa holders, partners of visa
                    holders, students and graduates, semi-retired professionals, and
                    people between roles.
                  </p>
                  <p className="mt-4 text-[16px] leading-[1.5] text-muted-foreground">
                    You can do the work from day one, and you want a few months of
                    structured work.
                  </p>
                </article>
                <article className="who-glass p-6">
                  <Icon name="building" size={22} className="icon-etch" />
                  <h3 className="mt-6">Employers</h3>
                  <p className="mt-4 text-[16px] leading-[1.5] text-muted-foreground">
                    HR managers and line managers at organisations of about 50 to 500
                    people. You post the cover properly, then choose from a shortlist
                    you can filter by dates.
                  </p>
                  <p className="mt-4 text-[16px] leading-[1.5] text-muted-foreground">
                    We are starting with three kinds of cover work: finance
                    operations, customer service, and marketing operations.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="fee" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
            <div className="shell-26 flex flex-wrap items-center gap-x-12 gap-y-8 border-t border-border py-20 md:py-28">
              <p
                className="fee-figure text-[144px] leading-none sm:text-[176px]"
                aria-label="12 percent"
              >
                12%
              </p>
              <div className="flex min-w-[16rem] flex-1 flex-col gap-4">
                <p className="max-w-[40rem] text-[16px] leading-[1.5] text-muted-foreground">
                  Placement fees are transparent.
                  <br />
                  Employers pay 12% of the contract when a placement is made.
                </p>
                <p className="text-[16px] leading-[1.5] text-foreground">
                  Join for free.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="register" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
            <div className="grid items-start gap-8 border-t border-border py-20 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10 md:py-28">
              <div>
                <h2>Register your interest</h2>
                <p className="mt-6 max-w-[36ch] text-[16px] leading-[1.5] text-muted-foreground">
                  We are not taking job posts or full profiles on this page. Tell us
                  whether you are talent or you are hiring, and we will write to you
                  about the Melbourne launch.
                </p>
              </div>
              <div className="form-glass p-5 sm:p-6">
                <InterestForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
          <div className="flex flex-col items-start gap-10 border-t border-border py-16 md:flex-row md:items-start md:gap-16">
            <BrandLogo variant="footer" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
              <p className="max-w-[46rem] text-[16px] leading-[1.5]">
                Mandate Talent, Melbourne. Short, defined cover contracts for office
                and knowledge work.
              </p>
              <p className="max-w-[46rem] text-[13px] leading-[1.5] text-muted-foreground">
                The employer remains responsible for checking the right to work. We
                match visa dates to the contract and keep a date-stamped record. This
                page only registers interest.
              </p>
              <p className="text-[13px] leading-[1.5] text-muted-foreground">
                © 2026 Mandate Talent
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
