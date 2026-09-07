---
week: 3
title: "Google Sheets Email Automation"
date: "2026-07-28"
tags: ["Google Apps Script", "API", "Workflow Automation"]
---

## What Was Done

Following discussions with Richard, I engineered a Google Apps Script to automate the dispatching of standardized emails directly from the Google Sheets environment.

## Technical Execution

- **Cross-Document Data Fetching:** Utilized `SpreadsheetApp.openById()` to bypass local sheet limitations and securely connect to an external Master ERP spreadsheet to retrieve email addresses and target data.
- **Dynamic Email Construction:** Wrote a JavaScript loop to iterate through specific rows, parse out the regional identifiers, and dynamically inject the variables into a standardized HTML email template.
- **Automated Dispatch:** Integrated the `MailApp.sendEmail()` API to programmatically batch-send the generated emails directly from the user's authenticated Google Workspace account, completely bypassing the need to open Gmail or copy-paste templates manually.

## Impact

> This eliminated the repetitive administrative burden of sending dozens of identical status emails manually. What used to take hours of copy-pasting is now handled via a single script execution.
