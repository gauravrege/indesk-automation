---
week: 5
title: "Internship Tracker Next.js Website"
date: "2026-09-02"
tags: ["Next.js", "Tailwind CSS", "Framer Motion", "CI/CD"]
github: "https://github.com/gauravrege/indesk-automation"
demo: "https://app.netlify.com/projects/interntrackin/overview"
---

## What Was Done

I completely scrapped the initial dark-mode template of the Internship Tracker and rebuilt the UI from scratch using Next.js 14. The goal was to create a highly readable, interactive, and beautifully designed digital logbook to track my internship progress and showcase my engineering projects.

## Technical Execution

- **Component Refactoring:** Broke down the monolithic `page.js` into modular React components (`Hero.js`, `ImpactDashboard.js`, `TechStack.js`, `TaskMonitor.js`, and `Footer.js`).
- **Glassmorphic UI Implementation:** Replaced the dark theme with a premium, light "Lucid" aesthetic (off-white `#f5f4f2` backgrounds). I utilized Tailwind CSS `backdrop-blur` utilities and translucent borders to create floating, glassmorphic cards and "Bento Box" grids.
- **Interactive Markdown Slider:** Engineered a custom `Timeline.js` component. It uses Node.js `fs` and `gray-matter` at build-time to parse local Markdown files (`content/logs/`), converts them to HTML, and passes them to the frontend. The UI uses Framer Motion (`AnimatePresence`) to smoothly slide horizontally between weeks.
- **Dynamic Task Monitor:** Replaced the static Code Highlight section with a live Kanban-style Task Monitor board to clearly track what I am working on right now (InDesk Dashboard, Email Automations, etc.).
- **Netlify CI/CD Pipeline:** Configured a continuous deployment pipeline so that every time I run `git push` from my terminal, Netlify automatically intercepts the webhook, builds the Next.js static payload, and deploys it to the live Edge network.

## Impact

> The tracker is now a production-grade web application. It acts as a centralized, living portfolio that automatically updates itself via CI/CD whenever I log a new engineering milestone locally.
