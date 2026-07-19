"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
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
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="hidden" aria-hidden>
        <label htmlFor="companyWebsite">Company website</label>
        <input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
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

      <div className="grid gap-5 md:grid-cols-3">
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

      <div>
        <label className="font-heading text-sm font-semibold text-brand-offwhite" htmlFor="message">
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

      <div>
        <label className="flex gap-3 rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal/70 p-4 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
          <input
            className="mt-1 h-4 w-4 rounded border-[color:var(--border-on-dark)] bg-brand-charcoal text-brand-cyan focus:ring-brand-cyan"
            name="consent"
            type="checkbox"
          />
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
    <div>
      <label className="font-heading text-sm font-semibold text-brand-offwhite" htmlFor={name}>
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
    <div>
      <label className="font-heading text-sm font-semibold text-brand-offwhite" htmlFor={name}>
        {label} <span className="text-brand-cyan">*</span>
      </label>
      <select
        className={fieldClassName(Boolean(error))}
        defaultValue=""
        id={name}
        name={name}
        required
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

  return <p className="mt-2 text-sm text-brand-violet">{message}</p>;
}

function fieldClassName(hasError: boolean, extraClassName?: string) {
  return cn(
    "mt-2 min-h-12 w-full rounded-2xl border bg-brand-charcoal/72 px-4 text-base text-brand-offwhite outline-none transition placeholder:text-[color:var(--text-on-dark-secondary)] focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20",
    hasError ? "border-brand-violet" : "border-[color:var(--border-on-dark)]",
    extraClassName,
  );
}
