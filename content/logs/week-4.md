---
week: 4
title: "Automated the InDesk Data Pipeline"
date: "2026-08-15"
tags: ["Playwright", "Node.js", "Google Sheets API", "RPA"]
---

## What I Built

With the backend dashboard and Apps Script perfectly handling the data, the last bottleneck was getting the raw data out of the company's legacy web portal. I designed and developed a complete **end-to-end Robotic Process Automation (RPA)** system using Node.js and Playwright.

## Key Accomplishments

- **Automated Login & Navigation:** Built a Playwright script that logs into the InDesk portal, navigates through complex nested menus, and handles dynamic iframe switching to reach the correct data views.
- **Payment Report Extraction:** Automated the full workflow of clicking "Get", selecting all rows via the w2ui grid API, and exporting the Payment & Receipts report to Excel.
- **Outstanding Details Report:** Extended the automation to navigate to the Outstanding Details section, fetch data, and export it — handling long server response times with smart wait strategies.
- **Google Sheets API Integration:** Integrated the Google Cloud Platform Sheets API to programmatically clear and upload fresh data into a shared Google Sheet every day.
- **Date Filtering Logic:** Built custom JavaScript logic to parse Excel files and filter thousands of rows by "Statement Due Date" — keeping only records from April 1, 2026 to the current date.

## Challenges Solved

- **White Screen Crash Recovery:** The InDesk website would occasionally freeze to a blank white screen after downloading the Payment report. I built a self-healing mechanism that detects the crash, reloads the page by clicking the Accounts tab, and retries the Outstanding Details export automatically.
- **Dynamic Iframe Handling:** All interactive elements lived inside a cross-origin iframe. Standard Playwright selectors couldn't reach them, so I implemented `frameLocator()` to switch context into the iframe.
- **Invisible Loading Overlays:** The website uses `.blockUI` overlays that block clicks. I used JavaScript `evaluate()` calls to bypass these overlays and click buttons directly.

## Impact

> Eliminated ~15 hours of manual data entry per week. The entire data pipeline—from web scraping to dashboard generation—now runs hands-free in under 5 minutes.
