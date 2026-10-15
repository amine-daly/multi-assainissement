# GitHub Actions → AWS IAM (Amplify deploy + redirect sync)

CI user: **`multi-assainissement-amplify-deploy`**  
GitHub secrets: `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (must be this user’s access key).

App: **`dwlehg158oagt`** · Region: **`eu-west-3`** · Account: **`661487689347`**

Workflow: [`.github/workflows/amplify-deploy.yml`](../.github/workflows/amplify-deploy.yml)

---

## Recommended: full Amplify access on this app only

Safest way to “give CI everything it needs” without account-wide admin:

1. Sign in as **`amine-admin`** (or any IAM admin).
2. IAM → Users → **`multi-assainissement-amplify-deploy`** → **Permissions**.
3. Open inline policy **`AmplifyDeployMultiAssainissement`** → **Edit** → **JSON**.
4. **Replace** the whole document with [`infra/iam/AmplifyDeployMultiAssainissement.json`](../infra/iam/AmplifyDeployMultiAssainissement.json)  
   (`amplify:*` on app `dwlehg158oagt` and all its branches/resources).
5. **Save changes**.

This covers deploy, **`UpdateApp`** (redirect sync), and any future Amplify API calls for this app.

Minimal alternative (only deploy + redirects): [`infra/iam/github-actions-amplify-policy.json`](../infra/iam/github-actions-amplify-policy.json).

---

## Optional: account administrator (not recommended for CI)

Only if you explicitly want this user to manage **all** AWS services:

1. Same user → **Permissions** → **Add permissions** → **Attach policies directly**.
2. Search **`AdministratorAccess`** (AWS managed) → attach.

**Risk:** anyone with the GitHub secret can control the entire account. Prefer the **`amplify:*`** app-scoped policy above.

---

## Verify

With the CI access key configured locally:

```bash
aws amplify update-app \
  --app-id dwlehg158oagt \
  --region eu-west-3 \
  --custom-rules file://amplify-redirects.json \
  --query "app.appId"
```

Expected: `dwlehg158oagt`, exit code `0`.

Then re-run the failed GitHub Actions workflow or push to **`sandbox`** — step **Sync Amplify redirect rules** should pass.

---

## Do not use `amine-admin` keys in GitHub

Use **`amine-admin`** only in the browser/CLI for IAM changes. Keep CI on **`multi-assainissement-amplify-deploy`** with scoped policies.
