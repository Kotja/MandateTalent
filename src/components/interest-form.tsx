"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon, type IconName } from "@/components/icon";
import {
  companySizes,
  covers,
  hiringRoles,
  situations,
  validateInterest,
  type Audience,
  type InterestPayload,
} from "@/lib/interest";
import { cn } from "@/lib/utils";

const PATH_EVENT = "mandate-path";

function chooseAudience(path: Audience) {
  window.dispatchEvent(new CustomEvent<Audience>(PATH_EVENT, { detail: path }));
  const form = document.getElementById("register");
  form?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    document.getElementById(path === "talent" ? "path-talent" : "path-hiring")?.focus();
  }, 300);
}

export function AudienceButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button type="button" onClick={() => chooseAudience("talent")}>
        {"I'm talent"}
      </Button>
      <Button type="button" variant="outline" onClick={() => chooseAudience("hiring")}>
        {"I'm hiring"}
      </Button>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const baseId = useId();
  const [path, setPath] = useState<Audience | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Melbourne");
  const [situation, setSituation] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [cover, setCover] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const onPath = (event: Event) => {
      const detail = (event as CustomEvent<Audience>).detail;
      if (detail !== "talent" && detail !== "hiring") return;
      setPath(detail);
      setErrors({});
      setFormError("");
      setStatus((current) => (current === "success" ? "idle" : current));
    };
    window.addEventListener(PATH_EVENT, onPath);
    return () => window.removeEventListener(PATH_EVENT, onPath);
  }, []);

  function reset() {
    setPath("");
    setName("");
    setEmail("");
    setCity("Melbourne");
    setSituation("");
    setCompany("");
    setRole("");
    setCompanySize("");
    setCover("");
    setNote("");
    setErrors({});
    setFormError("");
    setSuccessMessage("");
    setStatus("idle");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const payload: InterestPayload = {
      path,
      name,
      email,
      city,
      situation,
      company,
      role,
      companySize,
      cover,
      note,
    };
    const checked = validateInterest(payload);
    if (!checked.ok) {
      setStatus("error");
      setErrors(checked.errors);
      setFormError(checked.message);
      const first = Object.keys(checked.errors)[0];
      if (first === "path") {
        document.getElementById("path-talent")?.focus();
      } else if (first) {
        document.getElementById(`${baseId}-${first}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      } | null;

      if (!response.ok || data?.ok !== true) {
        setStatus("error");
        setErrors(data?.errors ?? {});
        setFormError(
          data?.message ??
            "We could not save your interest, so nothing was stored. Your answers are still here — please try again.",
        );
        return;
      }

      setSuccessMessage(data.message ?? "Thank you. We have saved your interest.");
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(
        "We could not save your interest, so nothing was stored. Your answers are still here — please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-border bg-background p-6"
      >
        <Icon name="check" size={24} className="text-primary" />
        <h3 className="mt-4">Interest saved</h3>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-foreground">
          {successMessage}
        </p>
        <Button type="button" className="mt-6" onClick={reset}>
          Register someone else
        </Button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {status === "error" && formError ? (
        <div
          role="alert"
          className="rounded-md border border-accent bg-background px-4 py-3 text-[16px] text-foreground"
        >
          {formError}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-3" disabled={busy}>
        <legend className="mb-1 text-[16px] text-foreground">
          Which describes you?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <PathCard
            id="path-talent"
            name="path"
            value="talent"
            checked={path === "talent"}
            onChange={() => {
              setPath("talent");
              setErrors((current) => {
                const next = { ...current };
                delete next.path;
                return next;
              });
            }}
            title="I'm talent"
            detail="I want a few months of cover work"
            icon="user"
          />
          <PathCard
            id="path-hiring"
            name="path"
            value="hiring"
            checked={path === "hiring"}
            onChange={() => {
              setPath("hiring");
              setErrors((current) => {
                const next = { ...current };
                delete next.path;
                return next;
              });
            }}
            title="I'm hiring"
            detail="HR or a line manager"
            icon="briefcase"
          />
        </div>
        {errors.path ? <FieldError id="path-error">{errors.path}</FieldError> : null}
      </fieldset>

      {path ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${baseId}-name`}
            label="Name"
            error={errors.name}
            className="sm:col-span-1"
          >
            <Input
              id={`${baseId}-name`}
              name="name"
              autoComplete="name"
              value={name}
              disabled={busy}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>

          <Field
            id={`${baseId}-email`}
            label={path === "hiring" ? "Work email" : "Email"}
            error={errors.email}
          >
            <Input
              id={`${baseId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              disabled={busy}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>

          {path === "talent" ? (
            <>
              <Field id={`${baseId}-city`} label="City" error={errors.city} hint="Melbourne is where we are opening.">
                <Input
                  id={`${baseId}-city`}
                  name="city"
                  autoComplete="address-level2"
                  value={city}
                  disabled={busy}
                  aria-invalid={errors.city ? true : undefined}
                  aria-describedby={
                    errors.city ? `${baseId}-city-error` : `${baseId}-city-hint`
                  }
                  onChange={(event) => setCity(event.target.value)}
                />
              </Field>
              <Field
                id={`${baseId}-situation`}
                label="Your situation"
                error={errors.situation}
              >
                <Select
                  id={`${baseId}-situation`}
                  name="situation"
                  value={situation}
                  disabled={busy}
                  invalid={Boolean(errors.situation)}
                  describedBy={errors.situation ? `${baseId}-situation-error` : undefined}
                  placeholder="Select a situation"
                  options={situations}
                  onChange={setSituation}
                />
              </Field>
            </>
          ) : (
            <>
              <Field id={`${baseId}-company`} label="Company" error={errors.company}>
                <Input
                  id={`${baseId}-company`}
                  name="company"
                  autoComplete="organization"
                  value={company}
                  disabled={busy}
                  aria-invalid={errors.company ? true : undefined}
                  aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </Field>
              <Field id={`${baseId}-role`} label="Your role" error={errors.role}>
                <Select
                  id={`${baseId}-role`}
                  name="role"
                  value={role}
                  disabled={busy}
                  invalid={Boolean(errors.role)}
                  describedBy={errors.role ? `${baseId}-role-error` : undefined}
                  placeholder="Select your role"
                  options={hiringRoles}
                  onChange={setRole}
                />
              </Field>
              <Field
                id={`${baseId}-companySize`}
                label="Company size"
                error={errors.companySize}
                hint="We are opening first with teams of about 50 to 500 people. Other sizes can still register."
              >
                <Select
                  id={`${baseId}-companySize`}
                  name="companySize"
                  value={companySize}
                  disabled={busy}
                  invalid={Boolean(errors.companySize)}
                  describedBy={
                    errors.companySize
                      ? `${baseId}-companySize-error`
                      : `${baseId}-companySize-hint`
                  }
                  placeholder="Select a size"
                  options={companySizes}
                  onChange={setCompanySize}
                />
              </Field>
              <Field id={`${baseId}-cover`} label="Cover you need" error={errors.cover}>
                <Select
                  id={`${baseId}-cover`}
                  name="cover"
                  value={cover}
                  disabled={busy}
                  invalid={Boolean(errors.cover)}
                  describedBy={errors.cover ? `${baseId}-cover-error` : undefined}
                  placeholder="Select a role family"
                  options={covers}
                  onChange={setCover}
                />
              </Field>
            </>
          )}

          <Field
            id={`${baseId}-note`}
            label="Note, optional"
            error={errors.note}
            className="sm:col-span-2"
          >
            <Textarea
              id={`${baseId}-note`}
              name="note"
              value={note}
              disabled={busy}
              aria-invalid={errors.note ? true : undefined}
              aria-describedby={errors.note ? `${baseId}-note-error` : undefined}
              onChange={(event) => setNote(event.target.value)}
            />
          </Field>
        </div>
      ) : (
        <p className="text-[16px] text-muted-foreground">
          Choose talent or hiring to see the questions for you.
        </p>
      )}

      <div>
        <Button type="submit" disabled={busy}>
          {busy ? "Sending your interest…" : "Register interest"}
        </Button>
      </div>
    </form>
  );
}

function PathCard({
  id,
  name,
  value,
  checked,
  onChange,
  title,
  detail,
  icon,
}: {
  id: string;
  name: string;
  value: Audience;
  checked: boolean;
  onChange: () => void;
  title: string;
  detail: string;
  icon: IconName;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-md border bg-background p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
        checked ? "border-primary" : "border-border",
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <Icon name={icon} size={24} className="mt-0.5 shrink-0 text-primary" />
      <span className="flex flex-col gap-1">
        <span className="text-[16px] text-foreground">{title}</span>
        <span className="text-[13px] leading-5 text-muted-foreground">{detail}</span>
      </span>
      {checked ? (
        <Icon name="check" size={20} className="ml-auto text-primary" />
      ) : null}
    </label>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-[13px] leading-5 text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-2 text-[13px] leading-5 text-foreground">
      <Icon name="info-circle" size={16} className="mt-0.5 shrink-0 text-accent" />
      <span>{children}</span>
    </p>
  );
}

function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  invalid,
  describedBy,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-11 w-full appearance-none rounded-md border bg-background px-3 pr-10 text-[16px] font-sans outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          invalid ? "border-accent" : "border-border",
          value ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
