import { BadgePercent, Globe2, ServerCog } from "lucide-react";
import { globalPricingNotes } from "@/data/pricing-tiers";

export function BundleDiscountCallout() {
  return (
    <section className="rounded-[1.5rem] border border-brand-cyan/25 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.14),transparent_24rem),linear-gradient(135deg,rgba(22,22,31,0.98),rgba(15,15,23,0.98))] p-6 shadow-[0_0_56px_rgba(34,211,238,0.08)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/35 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            <BadgePercent aria-hidden size={15} />
            Bundle Discount
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-brand-offwhite">
            Website tier plus maintenance gets 10% off.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
            {globalPricingNotes.bundleDiscount} The discount is applied manually on the project
            invoice, so checkout automation is not required.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <BundleStep icon={<Globe2 aria-hidden size={22} />} label="Choose any website tier" />
          <span className="hidden h-px bg-brand-cyan/35 sm:block" />
          <BundleStep
            icon={<ServerCog aria-hidden size={22} />}
            label="Pair any hosting or maintenance plan"
          />
        </div>
      </div>
    </section>
  );
}

type BundleStepProps = {
  icon: React.ReactNode;
  label: string;
};

function BundleStep({ icon, label }: BundleStepProps) {
  return (
    <div className="rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal/78 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
        {icon}
      </div>
      <p className="mt-4 font-heading text-sm font-semibold text-brand-offwhite">{label}</p>
    </div>
  );
}
