# Payments

## What Exists

- The `/pricing` page displays accepted payment methods: Stripe, Payoneer, Wise, and Bank Transfer.
- Bank transfer details are intentionally shown as `CONTENT TO BE PROVIDED - bank account details`.
- The page states the deposit/refund policy, quote-validity period, taxes/fees note, and manual invoice flow.
- Any website tier paired with any hosting or maintenance plan receives a 10% bundle discount applied manually on the invoice.
- CTAs route visitors to `/contact`; there is no live checkout.

## Manual Process

Projects are quoted and invoiced manually. A 50% deposit is required before work begins, deposits are
non-refundable once development has commenced, and the remaining balance is due before final delivery.

## Future Automated Checkout

Automated Stripe Checkout should only be scoped after real purchasable products exist, such as future
WordPress themes. That future scope would need product records, checkout session creation, webhook
handling, fulfillment rules, refund handling, and secret management.
