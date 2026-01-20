# FullStackForce
## React website built with Next.js
Portfolio website for a software development team.

## Getting Started

Clone the repo:

```bash
git clone https://github.com/stankevm/FullStackForce
cd fullstackforce
```

Install dependencies:

```bash
yarn install
```


Run the dev server:

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000).

## What Was Used

- **Next.js 15** with **React 19** and **TypeScript**
- **Tailwind CSS** for styling
- **Three.js** for 3d animations
- **Framer Motion** for animations
- **OGL** for some particles and aurora components 
- **Resend** for sending emails from the contact form

## Project Structure

```
app/
├── api/send-email/    → API route for contact form
├── components/        → All the React components
│   ├── Aurora.tsx
│   ├── CodeTypingAnimation.tsx
│   ├── FlipCard.tsx
│   ├── Particles.tsx
│   ├── RocketLaunchAnimation.tsx
│   ├── ServiceCard.tsx
│   ├── TeamCard.tsx
│   └── ...
├── globals.css
├── layout.tsx
└── page.tsx

public/                → Images and static assets
```

## Scripts

- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn start` — run production build
- `yarn lint` — check for lint errors

## Notes

If you want the contact form to really work, you'll need to sign up at [resend.com](https://resend.com/) and get an API key. It's free for low volume.

## Deployment

The website was deployed on Vercel 
[https://fullstackforce.dev/](https://fullstackforce.dev/)
