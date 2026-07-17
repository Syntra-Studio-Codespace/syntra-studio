import { CreditCard, Landmark, ReceiptText, WalletCards } from "lucide-react";
import { paymentMethods } from "@/data/payment-methods";
import { globalPricingNotes } from "@/data/pricing-tiers";

const icons = [CreditCard, WalletCards, ReceiptText, Landmark];

export function PaymentMethods() {
  return (
    <section className="rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            Payments
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-brand-offwhite">
            Information-first invoicing, not checkout.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
            Payments are handled per project through invoices. Automated checkout is intentionally
            not built yet because there are no theme products to sell.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {paymentMethods.map((method, index) => {
            const Icon = icons[index] ?? CreditCard;

            return (
              <article
                className="rounded-card border border-[color:var(--border-on-dark)] bg-brand-charcoal p-5"
                key={method.name}
              >
                <Icon aria-hidden className="text-brand-cyan" size={22} />
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-offwhite">
                  {method.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                  {method.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-4 border-t border-[color:var(--border-on-dark)] pt-6 text-sm leading-6 text-[color:var(--text-on-dark-secondary)] md:grid-cols-3">
        <p>{globalPricingNotes.depositPolicy}</p>
        <p>{globalPricingNotes.quoteValidity}</p>
        <p>{globalPricingNotes.taxNote}</p>
      </div>
    </section>
  );
}
