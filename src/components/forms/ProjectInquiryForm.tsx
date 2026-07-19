"use client";

import { useActionState } from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { submitProjectInquiry, type ContactFormState } from "@/app/contact/actions";
import { budgetRanges, projectTypes, timelineOptions } from "@/data/contact-form";
import { cn } from "@/lib/utils/cn";

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

export function ProjectInquiryForm() {
  const [state, formAction] = useActionState(submitProjectInquiry, initialContactFormState);

  return (
    <form action={formAction} className="grid gap-6" noValidate>
      <div className="hidden" aria-hidden>
        <label htmlFor="companyWebsite">Company website</label>
        <input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField error={state.fieldErrors?.name} label="Name" name="name" required />
        <FormField
          autoComplete="email"
          error={state.fieldErrors?.email}
          label="Email"
          name="email"
          required
          type="email"
        />
      </div>

      <FormField
        autoComplete="organization"
        error={state.fieldErrors?.company}
        label="Company / organization"
        name="company"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SelectField
          error={state.fieldErrors?.projectType}
          label="Project type"
          name="projectType"
          options={projectTypes}
        />
        <SelectField
          error={state.fieldErrors?.budget}
          label="Estimated budget"
          name="budget"
          options={budgetRanges.map((range) => ({ label: range, value: range }))}
        />
        <SelectField
          error={state.fieldErrors?.timeline}
          label="Timeline"
          name="timeline"
          options={timelineOptions.map((timeline) => ({ label: timeline, value: timeline }))}
        />
      </div>

      <div className="grid gap-2.5">
        <label className={labelClassName} htmlFor="message">
          Project details <span className="text-brand-cyan">*</span>
        </label>
        <textarea
          className={fieldClassName(Boolean(state.fieldErrors?.message), "min-h-40 resize-y py-3")}
          id="message"
          name="message"
          placeholder="Tell me what you want to build, who it is for, and what success should look like."
          required
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      <div className="grid gap-2.5">
        <label className="group flex cursor-pointer gap-3 rounded-2xl border border-white/10 bg-brand-charcoal/80 p-4 text-sm leading-6 text-[color:var(--text-on-dark-secondary)] shadow-[inset_0_1px_0_rgba(247,247,251,0.04)] transition hover:border-brand-cyan/35 hover:bg-[#12121b]">
          <span className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              className="peer h-5 w-5 appearance-none rounded-md border border-white/[0.14] bg-[#0b0b12] shadow-[inset_0_1px_0_rgba(247,247,251,0.05)] transition checked:border-brand-cyan checked:bg-brand-cyan hover:border-brand-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
              name="consent"
              type="checkbox"
            />
            <Check
              aria-hidden
              className="pointer-events-none absolute text-brand-charcoal opacity-0 transition peer-checked:opacity-100"
              size={14}
              strokeWidth={3}
            />
          </span>
          <span>I agree to be contacted by Syntra.studio about this inquiry.</span>
        </label>
        <FieldError message={state.fieldErrors?.consent} />
      </div>

      {state.message ? <FormStatusMessage state={state} /> : null}

      <SubmitButton />
    </form>
  );
}

type FormFieldProps = {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
};

function FormField({
  autoComplete,
  error,
  label,
  name,
  required = false,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <label className={labelClassName} htmlFor={name}>
        {label} {required ? <span className="text-brand-cyan">*</span> : null}
      </label>
      <input
        autoComplete={autoComplete}
        className={fieldClassName(Boolean(error))}
        id={name}
        name={name}
        required={required}
        type={type}
      />
      <FieldError message={error} />
    </div>
  );
}

type SelectFieldProps = {
  error?: string;
  label: string;
  name: string;
  options: ReadonlyArray<{
    label: string;
    value: string;
  }>;
};

function SelectField({ error, label, name, options }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <label className={labelClassName} htmlFor={name}>
        {label} <span className="text-brand-cyan">*</span>
      </label>
      <div className="relative">
        <select
          className={fieldClassName(
            Boolean(error),
            "appearance-none pr-11 invalid:text-[color:var(--text-on-dark-secondary)]",
          )}
          defaultValue=""
          id={name}
          name={name}
          required
        >
          <option
            className="bg-brand-charcoal text-[color:var(--text-on-dark-secondary)]"
            value=""
            disabled
          >
            Select one
          </option>
          {options.map((option) => (
            <option
              className="bg-brand-charcoal text-brand-offwhite"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-cyan"
          size={18}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full border border-brand-cyan bg-brand-cyan px-6 font-heading text-base font-semibold text-brand-charcoal shadow-[0_0_28px_rgba(34,211,238,0.2)] transition hover:shadow-[0_0_36px_rgba(34,211,238,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:pointer-events-none disabled:opacity-60 sm:w-fit"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <LoaderCircle aria-hidden className="animate-spin" size={18} />
          Sending inquiry
        </>
      ) : (
        <>
          Send inquiry
          <ArrowRight aria-hidden size={18} />
        </>
      )}
    </button>
  );
}

function FormStatusMessage({ state }: { state: ContactFormState }) {
  return (
    <p
      className={cn(
        "rounded-2xl border p-4 text-sm leading-6",
        state.status === "success"
          ? "border-brand-cyan/40 bg-brand-cyan/10 text-brand-offwhite"
          : "border-brand-violet/45 bg-brand-violet/10 text-brand-offwhite",
      )}
      role="status"
    >
      {state.message}
    </p>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-brand-violet">{message}</p>;
}

const labelClassName =
  "font-heading text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-brand-offwhite/85";

function fieldClassName(hasError: boolean, extraClassName?: string) {
  return cn(
    "min-h-[3.25rem] w-full rounded-2xl border bg-[rgba(15,15,23,0.82)] px-4 text-[0.95rem] text-brand-offwhite shadow-[inset_0_1px_0_rgba(247,247,251,0.045)] outline-none transition-[background,border-color,box-shadow,color] placeholder:text-[color:var(--text-on-dark-secondary)] hover:border-brand-cyan/30 hover:bg-[#12121b] focus:border-brand-cyan focus:bg-[#11111a] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(247,247,251,0.06)]",
    hasError
      ? "border-brand-violet/80 bg-brand-violet/5 focus:border-brand-violet focus:shadow-[0_0_0_3px_rgba(139,92,246,0.14),inset_0_1px_0_rgba(247,247,251,0.05)]"
      : "border-white/10",
    extraClassName,
  );
}
