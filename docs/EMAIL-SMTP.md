# Company email — SES SMTP (outbound)

Inbound mail to `@multi-assainissement.com` is handled by **Amazon SES** (receive) and forwarded to personal Gmail.

Outbound mail (you → clients) uses **SES SMTP** in **eu-west-1**.

## AWS side (configured)

- IAM user: `multi-assainissement-ses-smtp` (SES send via API/SMTP)
- SMTP auth tested successfully (STARTTLS on port 587)
- SMTP host: `email-smtp.eu-west-1.amazonaws.com`
- Port: **587** (STARTTLS)
- From address: `contact@multi-assainissement.com`

Credentials are stored locally (not in git):

`C:\Users\amine\Documents\aws-private\multi-assainissement-ses-smtp.txt`

## Gmail — send as the company (one-time)

1. Open Gmail → **Settings** → **See all settings** → **Accounts and Import**
2. **Send mail as** → **Add another email address**
3. Name: `Multi-Assainissement`, email: `contact@multi-assainissement.com`
4. **Treat as an alias** (optional)
5. **Send through**: SMTP server `email-smtp.eu-west-1.amazonaws.com`, port **587**, TLS
6. Username / password: from the private file above (`SMTP_USERNAME` / `SMTP_PASSWORD`)
7. Gmail sends a verification to `contact@…` → arrives in your Gmail via forwarding → click the link or enter the code

## Production access

SES must be out of **sandbox** to email arbitrary clients. After AWS approves your request, sending to any address works with the same SMTP settings.

Check status: [SES account dashboard (eu-west-1)](https://eu-west-1.console.aws.amazon.com/ses/home?region=eu-west-1#/account)

## Reply to customers

For messages **received** at `@multi-assainissement.com`, use **Reply** in Gmail; **Reply-To** is set to the customer.
