# GitHub Actions → AWS IAM (Amplify deploy + redirect sync)

The workflow [`.github/workflows/amplify-deploy.yml`](../.github/workflows/amplify-deploy.yml) uses repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Those credentials must belong to an IAM **user** (or role) allowed to deploy the **`sandbox`** branch and run `aws amplify update-app` for custom redirect rules.

App: **`dwlehg158oagt`** · Region: **`eu-west-3`** · Account: **`661487689347`**

---

## Required API actions

| Action | Used for |
|--------|----------|
| `amplify:CreateDeployment` | Upload zip to Amplify |
| `amplify:StartDeployment` | Start hosting job |
| `amplify:GetJob` | Optional; useful for debugging failed jobs |
| `amplify:GetApp` | Read app before update |
| `amplify:UpdateApp` | Sync [`amplify-redirects.json`](../amplify-redirects.json) on each push |

If **`UpdateApp`** is missing, deploy still succeeds but the **Sync Amplify redirect rules** step warns and redirects must be pasted manually in the Amplify Console.

---

## One-time setup (AWS Console)

You need an IAM administrator (not the CI user itself).

1. Sign in to [IAM](https://console.aws.amazon.com/iam/) (account `661487689347`).
2. Find the IAM **user** whose access key is stored in GitHub **`AWS_ACCESS_KEY_ID`**  
   (IAM → Users → open each candidate → **Security credentials** → match access key id prefix).
3. **Permissions** → **Add permissions** → **Create inline policy** → **JSON**.
4. Paste the contents of [`infra/iam/github-actions-amplify-policy.json`](../infra/iam/github-actions-amplify-policy.json).
5. Name the policy e.g. `multi-assainissement-amplify-ci` → **Create policy**.

If the user already has an inline policy for Amplify deploy, **merge** the `UpdateApp` / `GetApp` statement into that policy instead of duplicating `CreateDeployment` / `StartDeployment`.

---

## Verify

From a machine with the CI access key configured:

```bash
aws amplify update-app \
  --app-id dwlehg158oagt \
  --region eu-west-3 \
  --custom-rules file://amplify-redirects.json \
  --query "app.appId"
```

Expected: `dwlehg158oagt` and exit code `0`.

Push to **`sandbox`** and confirm the workflow step **Sync Amplify redirect rules** succeeds (no warning).

---

## Scope

The JSON policy is limited to app `dwlehg158oagt` and branch `sandbox`. If you add production branches or other Amplify apps, extend the `Resource` ARNs accordingly.
