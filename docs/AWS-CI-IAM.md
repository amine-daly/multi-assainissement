# GitHub Actions → AWS IAM

CI user: **`multi-assainissement-amplify-deploy`**  
GitHub secrets `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` must be this user’s access key (not `amine-admin`).

Account **`661487689347`** · Amplify app **`dwlehg158oagt`** · region **`eu-west-3`**

---

## Full AWS access (AdministratorAccess)

Use this if you want the CI user to call **any** AWS API (same power as a root-style admin in the account).

**Sign in as `amine-admin`** (or another IAM admin), then:

1. Open [IAM → Users → multi-assainissement-amplify-deploy](https://us-east-1.console.aws.amazon.com/iam/home#/users/details/multi-assainissement-amplify-deploy?section=permissions).
2. **Permissions** tab → **Add permissions** → **Attach policies directly**.
3. Search **`AdministratorAccess`** (AWS managed policy).
4. Check it → **Next** → **Add permissions**.

Policy ARN (reference): `arn:aws:iam::aws:policy/AdministratorAccess`

**Security:** Anyone who gets the GitHub Actions secrets can create/delete resources across the whole account (EC2, S3, IAM, …). Only do this if you accept that risk for this repo.

---

## Smaller option (Amplify only — recommended for production CI)

If you only need deploy + redirect sync for this site:

1. IAM → **`multi-assainissement-amplify-deploy`** → inline policy **`AmplifyDeployMultiAssainissement`** → **Edit** → **JSON**.
2. Replace with [`infra/iam/AmplifyDeployMultiAssainissement.json`](../infra/iam/AmplifyDeployMultiAssainissement.json) (`amplify:*` on app `dwlehg158oagt` only).

---

## Verify after IAM change

```bash
aws amplify update-app \
  --app-id dwlehg158oagt \
  --region eu-west-3 \
  --custom-rules file://amplify-redirects.json \
  --query app.appId --output text
```

Expected: `dwlehg158oagt`.

Re-run [GitHub Actions → Amplify Deploy](https://github.com/amine-daly/multi-assainissement/actions/workflows/amplify-deploy.yml) — **Sync Amplify redirect rules** should succeed.

---

## Roles

| User | Use for |
|------|---------|
| **`amine-admin`** | Browser / local CLI when you manage IAM |
| **`multi-assainissement-amplify-deploy`** | GitHub Actions deploy only |

Do not put **`amine-admin`** access keys in GitHub.
