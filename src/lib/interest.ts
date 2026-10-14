export const situations = [
  { value: "working-holiday", label: "Working holiday" },
  { value: "partner", label: "Partner of a visa holder" },
  { value: "student", label: "Student or graduate" },
  { value: "semi-retired", label: "Semi-retired" },
  { value: "between-roles", label: "Between roles" },
  { value: "other", label: "Other" },
] as const;

export const hiringRoles = [
  { value: "hr", label: "HR" },
  { value: "line-manager", label: "Line manager" },
] as const;

export const companySizes = [
  { value: "under-50", label: "Under 50 people" },
  { value: "50-200", label: "50-200 people" },
  { value: "200-500", label: "200-500 people" },
  { value: "over-500", label: "Over 500 people" },
] as const;

export const covers = [
  { value: "finance-ops", label: "Finance operations" },
  { value: "customer-service", label: "Customer service" },
  { value: "marketing-ops", label: "Marketing operations" },
  { value: "other", label: "Other" },
] as const;

export type Audience = "talent" | "hiring";

export type InterestPayload = {
  path?: string;
  name?: string;
  email?: string;
  city?: string;
  situation?: string;
  company?: string;
  role?: string;
  companySize?: string;
  cover?: string;
  note?: string;
};

type TalentRecord = {
  path: "talent";
  name: string;
  email: string;
  city: string;
  situation: (typeof situations)[number]["value"];
  note?: string;
};

type HiringRecord = {
  path: "hiring";
  name: string;
  email: string;
  company: string;
  role: (typeof hiringRoles)[number]["value"];
  companySize: (typeof companySizes)[number]["value"];
  cover: (typeof covers)[number]["value"];
  note?: string;
};

export type InterestRecord = TalentRecord | HiringRecord;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function labelFor<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function confirmationMessage(record: InterestRecord) {
  if (record.path === "talent") {
    const situation = labelFor(situations, record.situation).toLowerCase();
    return `Thank you, ${record.name}. We have saved your interest as talent in ${record.city} (${situation}). We will write to ${record.email} about the Melbourne launch.`;
  }

  const role = record.role === "hr" ? "HR" : "a line manager";
  const cover =
    record.cover === "other"
      ? "another kind of cover"
      : labelFor(covers, record.cover).toLowerCase();

  return `Thank you, ${record.name}. We have saved ${record.company}'s interest. You are listed as ${role}, looking for cover in ${cover}. We will write to ${record.email}.`;
}

export function validateInterest(
  input: InterestPayload,
):
  | { ok: true; record: InterestRecord }
  | { ok: false; errors: Record<string, string>; message: string } {
  const errors: Record<string, string> = {};
  const path = clean(input.path);
  const name = clean(input.name);
  const email = clean(input.email);
  const note = clean(input.note);

  if (path !== "talent" && path !== "hiring") {
    return {
      ok: false,
      errors: { path: "Choose whether you are talent or you are hiring." },
      message: "Choose whether you are talent or you are hiring.",
    };
  }

  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length > 120) {
    errors.name = "Keep your name under 120 characters.";
  }

  if (!email) {
    errors.email = "Enter an email like name@company.com.au.";
  } else if (!emailPattern.test(email) || email.length > 200) {
    errors.email = "Enter an email like name@company.com.au.";
  }

  if (note.length > 2000) {
    errors.note = "Keep the note under 2000 characters.";
  }

  if (path === "talent") {
    const city = clean(input.city);
    const situation = clean(input.situation);

    if (!city) {
      errors.city = "Enter your city.";
    } else if (city.length > 80) {
      errors.city = "Keep the city under 80 characters.";
    }

    if (!situations.some((option) => option.value === situation)) {
      errors.situation = "Choose the situation that fits you best.";
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, message: summary(errors) };
    }

    const record: TalentRecord = {
      path: "talent",
      name,
      email,
      city,
      situation: situation as TalentRecord["situation"],
    };
    if (note) record.note = note;
    return { ok: true, record };
  }

  if (path === "hiring") {
    const company = clean(input.company);
    const role = clean(input.role);
    const companySize = clean(input.companySize);
    const cover = clean(input.cover);

    if (!company) {
      errors.company = "Enter the company name.";
    } else if (company.length > 160) {
      errors.company = "Keep the company name under 160 characters.";
    }

    if (!hiringRoles.some((option) => option.value === role)) {
      errors.role = "Choose HR or line manager.";
    }

    if (!companySizes.some((option) => option.value === companySize)) {
      errors.companySize = "Choose a company size.";
    }

    if (!covers.some((option) => option.value === cover)) {
      errors.cover = "Choose the cover you need.";
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, message: summary(errors) };
    }

    const record: HiringRecord = {
      path: "hiring",
      name,
      email,
      company,
      role: role as HiringRecord["role"],
      companySize: companySize as HiringRecord["companySize"],
      cover: cover as HiringRecord["cover"],
    };
    if (note) record.note = note;
    return { ok: true, record };
  }

  return { ok: false, errors, message: summary(errors) };
}

function summary(errors: Record<string, string>) {
  const keys = Object.keys(errors);
  if (keys.length === 1 && errors.email) return errors.email;
  if (keys.length === 1 && errors.path) return errors.path;
  return "Please fix the highlighted fields. Your answers are still here.";
}
