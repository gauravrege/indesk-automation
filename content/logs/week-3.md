---
week: 3
title: "Built Cross-Sheet ERP Integrations"
date: "2026-07-28"
tags: ["Google Apps Script", "API", "Cross-Sheet Sync"]
---

## What I Built

The dashboard needed external data that didn't live in our primary workspace. I built an integration script (`importMumbaiERPData`) to securely reach across Google Drive and pull remote ERP data into our local system.

## Key Accomplishments

- **Cross-Document Data Fetching:** Utilized `SpreadsheetApp.openById()` to bypass local sheet limitations and securely connect to an external Master ERP spreadsheet.
- **Dynamic Data Matching:** Built a search algorithm that scans the external sheet for specific regional identifiers (e.g., "Mumbai"), extracts the corresponding ERP Dues and Balances, and safely injects them into the exact right row and column on our local summary dashboard.
- **One-Click MIS Export:** Developed a `downloadMIS()` function utilizing `UrlFetchApp` and OAuth tokens to allow managers to download a clean Excel (.xlsx) copy of the Google Sheet directly to their local drive with one button click.

## Impact

> Connected isolated data silos. Managers no longer have to copy-paste between 5 different spreadsheets; the ERP data flows into the master dashboard automatically.
