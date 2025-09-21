# Law Project - Next.js starter

This is a minimal Next.js starter for a Thai-language service site (บริการรับตรวจ).

What I created:

- Home page with Hero and links to Services and Credits
- Services page: interactive quantity selector and simple price calculation, collects Email and phone
- Credits page: grid gallery linking back to services
- Responsive CSS for mobile/tablet/desktop

Quick start

1. Install deps

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm start
```

Deploy (GitHub + Vercel)

1. Create a new GitHub repository (or reuse an existing one) then push the project:

```bash
git init
git add .
git commit -m "Initial commit - law_project"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

2. Import to Vercel:

- Go to https://vercel.com and import the GitHub repository.
- Vercel detects Next.js automatically. Default build command: `npm run build`.
- Set any environment variables (for example, API keys) in the Vercel project settings if you add email or payment integrations later.

Local API / testing

- A simple placeholder API is available at `/api/order` which accepts POST JSON with the order summary. It currently validates minimal fields and returns a JSON response.
- To test locally while the dev server is running:

```bash
curl -X POST http://localhost:3000/api/order \
    -H "Content-Type: application/json" \
    -d '{"email":"you@example.com","phone":"0812345678","items":[{"id":"deposit","qty":1}]}'
```

Notes

- The API currently only logs the order server-side and returns success — integrate an email provider (SendGrid, Mailgun) or database for production.
- Add real images and asset hosting for the Credits gallery. Consider using Vercel's Image Optimization or a CDN.

Tailwind note

- I removed Tailwind `@apply` usage from `styles/globals.css` to avoid build errors. If you want to use Tailwind properly, re-install and enable it by:

  1. Installing packages:

     ```bash
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```

  2. Add the Tailwind directives to `styles/globals.css`:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

  3. Configure `tailwind.config.js` content paths to include `pages` and `components`.

Next steps / improvements

- Add real images to the `credits` page
- Implement server-side email/send and payment integration
- Add form validation and accessibility improvements

# law\_-detective

## Deployment

This repository can be deployed to Vercel. Two options:

1. Connect the GitHub repository to Vercel (recommended):

   - Go to vercel.com, import project from GitHub, select this repository.
   - Configure build settings (Next.js detected automatically).

2. CI deploy via GitHub Actions:
   - Add the following repository secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
   - Push to `main` branch; the workflow `.github/workflows/deploy-vercel.yml` will run and call the Vercel CLI.
