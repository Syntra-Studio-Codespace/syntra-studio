"use server";

import { contactFormSchema, projectTypes } from "@/data/contact-form";
import { getPublicSiteUrl } from "@/lib/seo/site-url";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string>>;
};

export async function submitProjectInquiry(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    companyWebsite: formData.get("companyWebsite"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce<NonNullable<ContactFormState["fieldErrors"]>>(
      (errors, issue) => {
        const field = String(issue.path[0] ?? "form");
        errors[field] = issue.message;
        return errors;
      },
      {},
    );

    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  if (parsed.data.companyWebsite) {
    return {
      status: "success",
      message: "Thanks. Your inquiry has been received.",
    };
  }

  const destinationEmail = process.env.CONTACT_FORM_EMAIL;

  if (!destinationEmail) {
    return {
      status: "error",
      message:
        "The form is ready, but CONTACT_FORM_EMAIL is not configured yet. Add it before accepting live inquiries.",
    };
  }

  const projectTypeLabel =
    projectTypes.find((type) => type.value === parsed.data.projectType)?.label ??
    parsed.data.projectType;
  const siteUrl = getPublicSiteUrl();
  const payload = new URLSearchParams({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company ?? "",
    projectType: projectTypeLabel,
    budget: parsed.data.budget,
    timeline: parsed.data.timeline,
    message: parsed.data.message,
    _subject: `New Syntra.studio project inquiry - ${projectTypeLabel}`,
    _template: "table",
  });

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`,
      {
        body: payload,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: siteUrl,
          Referer: `${siteUrl}/contact`,
        },
        method: "POST",
      },
    );
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || result?.success === false) {
      return {
        status: "error",
        message:
          result?.message ??
          "The email provider did not accept the inquiry yet. FormSubmit may require activation for the destination email.",
      };
    }

    return {
      status: "success",
      message: "Thanks. Your project inquiry has been sent.",
    };
  } catch {
    return {
      status: "error",
      message: "The inquiry could not be sent right now. Please try again shortly.",
    };
  }
}
