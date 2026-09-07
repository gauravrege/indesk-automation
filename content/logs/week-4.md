---
week: 4
title: "Playwright InDesk RPA Bot"
date: "2026-08-31"
tags: ["Playwright", "Node.js", "Google Sheets API", "RPA"]
github: "https://github.com/gauravrege/indesk-rpa-pipeline"
---

## What Was Done

I engineered a fully autonomous Robotic Process Automation (RPA) script (`indesk_automation.js`) to completely eliminate the manual daily process of logging into the InDesk portal, downloading reports, and updating Google Sheets.

## Technical Execution

- **iFrame Traversal & DOM Scraping:** Used Playwright in Node.js to autonomously navigate to `mis.indesk.in`. Wrote custom locators to traverse deeply nested iFrames and explicitly wait for legacy `.blockUI` loading overlays to disappear before executing clicks.
- **Automated Excel Downloads:** The bot automatically triggers the "Export To Excel" functionality for both the **Outstanding Details** and **Payment details** reports, saving the raw `.xlsx` binaries directly to the local filesystem.
- **Local Data Parsing & Filtering:** Leveraged the `xlsx` Node library to read the raw Excel buffers. I wrote custom logic to parse the "Statement Due date" column (handling both Excel serial date numbers and raw strings) and strictly filtered out any records outside the range of **April 1, 2026 to Current Date**.
- **Google Sheets API Syncing:** Authenticated a headless Google Cloud Service Account using local `credentials.json` keys. The script dynamically clears the old data in the target Google Sheet and executes a `values.update` REST payload to inject the fresh, filtered arrays into the respective tabs.
- **Native OS Alerts:** Wrapped the final success state in a Child Process execution that triggers a native Windows PowerShell `MessageBox` pop-up, alerting the team that the sync is complete without needing to check the terminal.

## Impact

> This script entirely replaced a highly tedious, error-prone manual daily workflow. What previously took 15+ minutes of human navigation, Excel filtering, and copy-pasting is now executed flawlessly in the background with zero human intervention.
