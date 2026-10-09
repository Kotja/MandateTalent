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

function BrandLogo() {
  const frame = {
    height: 48,
    width: "auto",
    maxWidth: "none",
    objectFit: "contain" as const,
  };
  return (
    <span className="inline-flex w-fit max-w-none shrink-0 self-start">
      <img
        src={`${basePath}/brand/mandate-talent.png`}
        alt="Mandate Talent"
        width={148}
        height={48}
        className="block h-12 w-auto max-h-12 max-w-none shrink-0 object-contain dark:hidden"
        style={frame}
      />
      <img
        src={`${basePath}/brand/mandate-talent-inverse.png`}
        alt="Mandate Talent"
        width={148}
        height={48}
        className="hidden h-12 w-auto max-h-12 max-w-none shrink-0 object-contain dark:block"
        style={frame}
      />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header id="top" className="site-header sticky top-0 z-10 border-b">
        <div className="mx-auto flex h-16 w-full max-w-[1080px] flex-nowrap items-center gap-4 px-5 sm:px-6">
          <a href="#top" data-plain className="inline-flex shrink-0 items-center">
            <BrandLogo />
          </a>
          <nav aria-label="Page" className="ml-auto flex min-h-11 shrink-0 items-center gap-4 sm:gap-6">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="inline-flex h-11 items-center text-[16px]">
                {item.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#register"
              className={cn(buttonVariants(), "h-11 rounded-[50px] border-0 px-4")}
              style={{
                borderWidth: 0,
                borderStyle: "none",
                borderColor: "transparent",
                boxShadow: "none",
              }}
            >
              Register interest
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-[1080px] px-5 py-16 sm:px-6 md:py-24">
          <p className="text-[13px] leading-[1.2] tracking-normal text-muted-foreground">
            Melbourne launch
          </p>
          <h1 className="hero-title mt-4 max-w-[16ch]">
            Cover contracts with the dates in the open.
          </h1>
          <p className="mt-6 max-w-[42rem] text-[16px] leading-[1.2] text-foreground">
            Mandate Talent is an Australian marketplace for short, defined cover
            contracts — parental leave, long sick leave, and gap cover — in office
            and knowledge-work roles. We match people who can do the work from day
            one to a contract that says when it starts, when it ends, and how the
            work is handed over.
          </p>
          <p className="mt-4 max-w-[42rem] text-[16px] leading-[1.2] text-muted-foreground">
            We are opening in Melbourne. We are starting with three kinds of
            cover work: finance operations, customer service, and marketing
            operations.
          </p>
          <div className="mt-8">
            <AudienceButtons />
          </div>
        </section>

        <section
          id="problem"
          className="scroll-mt-28 border-t border-border"
        >
          <div className="mx-auto grid w-full max-w-[1080px] gap-8 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:py-24">
            <h2>
              A verified tick is a moment.
              <br />
              Cover runs for months.
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[16px] leading-[1.2]">
                Parental leave, a long illness, or a gap in the team is usually a
                three to twelve month contract. You need a start, an end, and a
                person whose right to work still holds at the end — with a buffer,
                not only on the day you look them up.
              </p>
              <p className="font-heading text-[22px] leading-[1.12] font-medium tracking-[-0.01em] text-foreground">
                Matching visa dates to the contract, not just a verified tick.
              </p>
              <p className="text-[16px] leading-[1.2]">
                The employer stays legally responsible for work-rights checks. The
                platform reduces risk and keeps a date-stamped record of what was
                shown when the shortlist was made.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-28 border-t border-border">
          <div className="mx-auto w-full max-w-[1080px] px-5 py-16 sm:px-6 md:py-24">
            <h2>How a cover contract moves</h2>
            <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              <article className="flex h-auto min-w-0 flex-col gap-4 overflow-visible border-0 border-t-[3px] border-solid border-t-[#EA580B] bg-background px-6 pt-6 pb-10 lift-card">
                <Icon name="user" size={24} className="text-[#EA580B]" style={{ color: "#EA580B" }} />
                <h3>Talent</h3>
                <p className="overflow-visible text-[16px] leading-[1.2]">
                  You share the work you can do from the first day, your situation,
                  and the dates you are free.
                </p>
              </article>
              <article className="flex h-auto min-w-0 flex-col gap-4 overflow-visible border-0 border-t-[3px] border-solid border-t-[#EA580B] bg-background px-6 pt-6 pb-10 lift-card">
                <Icon name="document" size={24} className="text-[#EA580B]" style={{ color: "#EA580B" }} />
                <h3>The contract</h3>
                <p className="overflow-visible text-[16px] leading-[1.2]">
                  HR or a line manager posts a structured cover contract: start and
                  end, days per week, overlap days, tasks, and the systems the work
                  sits in. They see a ranked shortlist and can filter for work
                  rights that cover the whole contract, plus a buffer.
                </p>
              </article>
              <article className="flex h-auto min-w-0 flex-col gap-4 overflow-visible border-0 border-t-[3px] border-solid border-t-[#EA580B] bg-background px-6 pt-6 pb-10 lift-card">
                <Icon name="arrow-join" size={24} className="text-[#EA580B]" style={{ color: "#EA580B" }} />
                <h3>Handover</h3>
                <p className="overflow-visible text-[16px] leading-[1.2]">
                  Once the placement is accepted, a handover workspace opens. The
                  person stepping out and the person stepping in pass the work
                  across in one place.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="who" className="scroll-mt-28 border-t border-border">
          <div className="mx-auto w-full max-w-[1080px] px-5 py-16 sm:px-6 md:py-24">
            <h2>Who it is for</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="who-glass border-0 p-6">
                <Icon name="users" size={24} className="icon-etch" />
                <h3 className="mt-4">Talent</h3>
                <p className="mt-3 text-[16px] leading-[1.2]">
                  Working-holiday and temporary-visa holders, partners of visa
                  holders, students and graduates, semi-retired professionals, and
                  people between roles.
                </p>
                <p className="mt-3 text-[16px] leading-[1.2]">
                  You can do the work from day one, and you want a few months of
                  structured work.
                </p>
              </article>
              <article className="who-glass border-0 p-6">
                <Icon name="building" size={24} className="icon-etch" />
                <h3 className="mt-4">Employers</h3>
                <p className="mt-3 text-[16px] leading-[1.2]">
                  HR managers and line managers at organisations of about 50 to 500
                  people. You post the cover properly, then choose from a shortlist
                  you can filter by dates.
                </p>
                <p className="mt-3 text-[16px] leading-[1.2]">
                  We are starting with three kinds of cover work: finance
                  operations, customer service, and marketing operations.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="fee" className="scroll-mt-28 border-t border-border">
          <div className="shell-26 mx-auto flex w-full max-w-[1080px] flex-wrap items-center gap-x-10 gap-y-6 px-5 py-16 sm:px-6 md:py-24">
            <p className="font-heading text-[144px] leading-none font-semibold tracking-[-0.01em] text-primary md:text-[180px]">
              12%
            </p>
            <div className="flex min-w-[16rem] flex-1 flex-col gap-3">
              <p className="max-w-[40rem] text-[16px] leading-[1.2] text-muted-foreground">
                Placement fees are transparent.
                <br />
                Employers pay 12% of the contract when a placement is made.
              </p>
              <p className="text-[16px] leading-[1.2] text-foreground">Join for free.</p>
            </div>
          </div>
        </section>

        <section id="register" className="scroll-mt-28 border-t border-border">
          <div className="mx-auto grid w-full max-w-[1080px] gap-8 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-24">
            <div>
              <h2>Register your interest</h2>
              <p className="mt-4 text-[16px] leading-[1.2]">
                We are not taking job posts or full profiles on this page. Tell us
                whether you are talent or you are hiring, and we will write to you
                about the Melbourne launch.
              </p>
            </div>
            <div
              className="form-glass border-0 p-4 sm:p-6"
            >
              <InterestForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 px-5 py-10 sm:px-6">
          <BrandLogo />
          <p className="max-w-[46rem] text-[16px] leading-[1.2]">
            Mandate Talent, Melbourne. Short, defined cover contracts for office
            and knowledge work.
          </p>
          <p className="max-w-[46rem] text-[13px] leading-[1.2] text-muted-foreground">
            The employer remains responsible for checking the right to work. We
            match visa dates to the contract and keep a date-stamped record. This
            page only registers interest.
          </p>
          <p
            className="overflow-visible text-[13px] leading-[1.2] text-muted-foreground"
            style={{ fontVariantLigatures: "none", letterSpacing: "0.01em" }}
          >
            © 2026 Mandate Talent
          </p>
        </div>
      </footer>
    </>
  );
}
