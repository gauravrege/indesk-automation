---
week: 1
title: "Designed the Regional Financial Canvas Dashboard"
date: "2026-07-06"
tags: ["UI/UX", "Google Sheets", "Dashboard Design"]
---

## What I Built

I kicked off my internship by completely redesigning the company's financial tracking system. Management needed a way to process massive datasets—including a massive 9,000+ row **Outstanding Report**—in real time. 

I built the **Regional Financial Canvas**, a highly interactive, adaptive dashboard that acts as a **two-way live sheet**. This means it doesn't just display static data; it continuously reads from our live raw data feeds and writes synced updates back to the Google Sheets backend, tracking Collections versus Dues across 14 regions and 4 geographical zones.

![Regional Financial Canvas Dashboard](/dashboard.png)

## Key Accomplishments

- **Adaptive UI Design:** Engineered a beautiful "Break-Scale Optimized" interface directly within Google Sheets, abandoning the standard grid look for floating cards, pill badges, and clean typography.
- **Top-Level KPI Cards:** Designed dynamic summary cards to highlight:
  - **Total Collections:** Automatically sums collections with dynamic date ranges (e.g., "1-20 Aug").
  - **Outstanding Dues:** Segregates dues before a certain month and rolls them over effectively.
  - **Net Balance & Collection Coverage:** Real-time percentage tracking (e.g., 233.0% of total dues collected).
- **Zonal Navigation:** Built filtering mechanisms to easily switch between East, North, South, and West regions.

## Impact

> Transformed raw, unreadable data dumps into a modern, startup-grade financial dashboard, giving management instant, actionable insights into multi-million dollar cash flows.
