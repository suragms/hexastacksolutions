# MongoDB Atlas connection troubleshooting

If you see errors like:

- **Server selection timeout: No available servers**
- **SSL: received fatal alert: InternalError** / **tlsv1 alert internal error** (OpenSSL)

try the following.

## 1. Connection string format

**Option A – Standard URI (often fixes SSL on Windows)**  
In Atlas: Connect → Drivers → Node.js. If you see a **standard connection string** (not SRV), it lists explicit hosts and uses `mongodb://` with `?ssl=true&replicaSet=...&authSource=admin`. Use that in `DATABASE_URL` and append `&connectTimeoutMS=10000&serverSelectionTimeoutMS=10000`. Prisma and the test script support both SRV and standard URIs.

**Option B – SRV with timeouts**  
Append to your SRV URL (after `?retryWrites=true&w=majority`):

```
&connectTimeoutMS=10000&serverSelectionTimeoutMS=10000
```

Example:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&connectTimeoutMS=10000&serverSelectionTimeoutMS=10000
```

## 2. Node.js and TLS

- Use **Node.js 18 or newer** (better TLS 1.2+ support). Run `node -v`.
- On Windows, older Node/OpenSSL can cause "fatal alert: InternalError" with Atlas. Upgrading Node often fixes it.

## 3. Atlas Network Access

- In [MongoDB Atlas](https://cloud.mongodb.com) → your project → **Network Access**.
- Add your current IP, or for local dev only you can temporarily allow **0.0.0.0/0** (allow from anywhere). Restrict this in production.

## 4. Password special characters

If your Atlas user password contains `@`, `#`, `:`, `/`, or `%`, they must be [URL-encoded](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding) in the connection string:

| Character | Encoded |
|-----------|---------|
| `@`       | `%40`   |
| `#`       | `%23`   |
| `:`       | `%3A`   |
| `/`       | `%2F`   |
| `%`       | `%25`   |

## 5. Firewall / antivirus

Corporate firewalls or antivirus that inspect SSL can break the connection. Try from another network (e.g. mobile hotspot) or temporarily disable SSL inspection for `*.mongodb.net`.

## 6. Atlas status

Check [Atlas status](https://status.mongodb.com/) for incidents in your region.

---

When the database is unreachable, the app returns **503** and the frontend falls back to default content (e.g. company settings, products) so the site still loads.
