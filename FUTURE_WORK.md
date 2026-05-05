# Future Work

Tracked improvements and features planned for this portfolio.

---

## Content

- [ ] Add real project screenshots/images to the project tiles and deep-dive pages
- [ ] Write deep-dive case study pages for remaining projects (CREME, MusicGen, Soccer Intelligence, ASL)
- [ ] Add a "Currently Building" blurb on the homepage — one sentence about active work
- [ ] Replace placeholder GitHub/avatar image with a real photo (if desired later)
- [ ] Update LinkedIn URL and GitHub links if they change
- [ ] Add a "What I'm looking for" section to About (open to roles, collaboration, research)

## Chatbot

- [ ] Improve RAG accuracy by adding proper READMEs to each GitHub repo — the chatbot's knowledge comes from the system prompt, so richer documentation = better answers
- [ ] Add conversation memory / session persistence so context isn't lost on page refresh
- [ ] Add typing indicator animation while the model streams
- [ ] Rate-limit the chat API to prevent abuse when deployed publicly
- [ ] Consider switching to a paid Gemini tier for faster, higher-quality responses

## SEO & Discoverability

- [ ] Replace `baseURL` in `once-ui.config.ts` with the actual deployed domain
- [ ] Add custom OG image (`/public/images/og/home.jpg`) so LinkedIn/Twitter previews look polished
- [ ] Add Google Analytics or Plausible for visitor tracking
- [ ] Write 2–3 blog posts on topics like RAG pipeline design or model robustness — good for SEO and thought leadership

## Design & UX

- [ ] Test and refine dark mode appearance (currently forced to light theme)
- [ ] Add smooth scroll-to-chat button on homepage for mobile users
- [ ] Add a contact form as an alternative to the raw email link
- [ ] Review mobile layout of the Projects grid on very small screens

## Infrastructure

- [ ] Deploy to Vercel and set `GROQ_API_KEY` as an environment variable in the dashboard
- [ ] Set up a custom domain and update `baseURL`
- [ ] Add `robots.txt` and sitemap validation after deployment
- [ ] Consider edge caching for the `/api/chat` route once on a paid plan

## Stretch Goals

- [ ] Live demo embed for one project (e.g. a Hugging Face Space for the MusicGen engine)
- [ ] Testimonial or recommendation quote from a professor or colleague
- [ ] Add publications with DOI badge links and citation counts once indexed
