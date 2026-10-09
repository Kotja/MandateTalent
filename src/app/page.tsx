import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { AudienceButtons, InterestForm } from "@/components/interest-form";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#how", label: "How it works" },
  { href: "#who", label: "Who it's for" },
];

const logoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/mandate-talent.png`;

export default function Home() {
  return (
    <>
      <header id="top" className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-4 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <a href="#top" data-plain aria-label="Mandate Talent, back to top">
            <Image
              src={logoSrc}
              alt="Mandate Talent"
              width={1060}
              height={345}
              priority
              unoptimized
              className="h-12 w-auto md:h-14"
            />
          </a>
          <nav aria-label="Page" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[16px]">
                {item.label}
              </a>
            ))}
            <a
              href="#register"
              className={cn(buttonVariants(), "h-11 px-4 hover:text-primary-foreground")}
            >
              Register interest
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-[1080px] px-5 py-16 sm:px-6 md:py-24">
          <p className="text-[13px] leading-5 tracking-normal text-muted-foreground">
            Melbourne launch
          </p>
          <h1 className="hero-title mt-4 max-w-[16ch]">
            Cover contracts with the dates in the open.
          </h1>
          <p className="mt-6 max-w-[42rem] text-[16px] leading-relaxed text-foreground">
            Mandate Talent is an Australian marketplace for short, defined cover
            contracts — parental leave, long sick leave, and gap cover — in office
            and knowledge-work roles. We match people who can do the work from day
            one to a contract that says when it starts, when it ends, and how the
            work is handed over.
          </p>
          <p className="mt-4 max-w-[42rem] text-[16px] leading-relaxed text-muted-foreground">
            We are opening in Melbourne. The first role families are finance ops,
            customer service, and marketing ops.
          </p>
          <div className="mt-8">
            <AudienceButtons />
          </div>
          <p className="mt-4 text-[13px] leading-5 text-muted-foreground">
            Talent joins free.
          </p>
        </section>

        <section
          id="problem"
          className="scroll-mt-28 border-t border-border"
        >
          <div className="mx-auto grid w-full max-w-[1080px] gap-8 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:py-24">
            <h2>A verified tick is a moment. Cover runs for months.</h2>
            <div className="flex flex-col gap-5">
              <p className="text-[16px] leading-relaxed">
                Parental leave, a long illness, or a gap in the team is usually a
                three to twelve month contract. You need a start, an end, and a
                person whose right to work still holds at the end — with a buffer,
                not only on the day you look them up.
              </p>
              <p className="font-heading text-[22px] leading-snug font-medium tracking-[-0.01em] text-foreground">
                Matching visa dates to the contract, not just a verified tick.
              </p>
              <p className="text-[16px] leading-relaxed">
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
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="flex flex-col gap-4 rounded-md border border-border bg-background p-6">
                <Icon name="user" size={24} className="text-primary" />
                <h3>Talent</h3>
                <p className="text-[16px] leading-relaxed">
                  You share the work you can do from the first day, your situation,
                  and the dates you are free.
                </p>
              </article>
              <article className="flex flex-col gap-4 rounded-md border border-border bg-background p-6">
                <Icon name="document" size={24} className="text-primary" />
                <h3>The contract</h3>
                <p className="text-[16px] leading-relaxed">
                  HR or a line manager posts a structured cover contract: start and
                  end, days per week, overlap days, tasks, and the systems the work
                  sits in. They see a ranked shortlist and can filter for work
                  rights that cover the whole contract, plus a buffer.
                </p>
              </article>
              <article className="flex flex-col gap-4 rounded-md border border-border bg-background p-6">
                <Icon name="arrow-join" size={24} className="text-primary" />
                <h3>Handover</h3>
                <p className="text-[16px] leading-relaxed">
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
              <article className="rounded-md border border-border bg-background p-6">
                <Icon name="users" size={24} className="text-primary" />
                <h3 className="mt-4">Talent</h3>
                <p className="mt-3 text-[16px] leading-relaxed">
                  Working-holiday and temporary-visa holders, partners of visa
                  holders, students and graduates, semi-retired professionals, and
                  people between roles.
                </p>
                <p className="mt-3 text-[16px] leading-relaxed">
                  You can do the work from day one, and you want a few months of
                  structured work.
                </p>
              </article>
              <article className="rounded-md border border-border bg-background p-6">
                <Icon name="building" size={24} className="text-primary" />
                <h3 className="mt-4">Employers</h3>
                <p className="mt-3 text-[16px] leading-relaxed">
                  HR managers and line managers at organisations of about 50 to 500
                  people. You post the cover properly, then choose from a shortlist
                  you can filter by dates.
                </p>
                <p className="mt-3 text-[16px] leading-relaxed">
                  The first role families are finance ops, customer service, and
                  marketing ops.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="register" className="scroll-mt-28 border-t border-border">
          <div className="mx-auto grid w-full max-w-[1080px] gap-8 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-24">
            <div>
              <h2>Register your interest</h2>
              <p className="mt-4 text-[16px] leading-relaxed">
                We are not taking job posts or full profiles on this page. Tell us
                whether you are talent or you are hiring, and we will write to you
                about the Melbourne launch.
              </p>
            </div>
            <div className="rounded-md border border-border bg-background p-4 sm:p-6">
              <InterestForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 px-5 py-10 sm:px-6">
          <Image
            src={logoSrc}
            alt=""
            width={1060}
            height={345}
            unoptimized
            className="h-12 w-auto self-start"
          />
          <p className="max-w-[46rem] text-[16px] leading-relaxed">
            Mandate Talent, Melbourne. Short, defined cover contracts for office
            and knowledge work.
          </p>
          <p className="max-w-[46rem] text-[13px] leading-5 text-muted-foreground">
            The employer remains responsible for checking the right to work. We
            match visa dates to the contract and keep a date-stamped record. This
            page only registers interest.
          </p>
          <p className="text-[13px] leading-5 text-muted-foreground">© 2026 Mandate Talent</p>
        </div>
      </footer>
    </>
  );
}
