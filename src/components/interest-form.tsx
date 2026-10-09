"use client";

import { useEffect, useId, useRef, useState } from "react";
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
      <Button
        type="button"
        variant="outline"
        className="frost-white"
        onClick={() => chooseAudience("hiring")}
      >
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
            "We could not save your interest, so nothing was stored. Your answers are still here. Please try again.",
        );
        return;
      }

      setSuccessMessage(data.message ?? "Thank you. We have saved your interest.");
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(
        "We could not save your interest, so nothing was stored. Your answers are still here. Please try again.",
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
        <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.2] text-foreground">
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

      <fieldset
        className="flex flex-col gap-3"
        disabled={busy}
        aria-invalid={errors.path ? true : undefined}
        aria-describedby={errors.path ? "path-error" : undefined}
      >
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
        <p className="text-[16px] leading-[1.2] text-foreground">
          Choose talent or hiring to see the questions for you.
        </p>
      )}

      <div>
        <Button type="submit" className="rounded-[50px]" disabled={busy}>
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
        "tile-glass flex cursor-pointer items-start gap-3 border-0 p-4 outline-none",
        checked && "tile-selected",
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
        <span className="text-[13px] leading-[1.2] text-foreground">{detail}</span>
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
        <p id={`${id}-hint`} className="text-[13px] leading-[1.2] text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-2 text-[13px] leading-[1.2] text-foreground">
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-list`;
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  function openList() {
    const current = options.findIndex((option) => option.value === value);
    setActive(current >= 0 ? current : 0);
    setOpen(true);
  }

  function choose(next: string) {
    onChange(next);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openList();
        return;
      }
      setActive((current) => {
        const next = event.key === "ArrowDown" ? current + 1 : current - 1;
        return (next + options.length) % options.length;
      });
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) openList();
      else choose(options[active]?.value ?? "");
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "field-surface nested-radius flex h-11 w-full items-center justify-between gap-2 border-0 px-3 text-left text-[16px] font-sans outline-none disabled:cursor-not-allowed disabled:opacity-50",
          value ? "" : "field-placeholder",
        )}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <Icon name="chevron-down" size={16} className="shrink-0 text-muted-foreground" />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="menu-glass nested-radius absolute z-20 mt-1 max-h-60 w-full overflow-auto p-1"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${option.value}`}
              role="option"
              aria-selected={value === option.value}
              data-active={index === active ? "true" : undefined}
              className="cursor-pointer rounded-[8px] px-3 py-2 text-[16px]"
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
