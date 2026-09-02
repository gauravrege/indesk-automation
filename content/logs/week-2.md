---
week: 2
title: "Engineered the Financial Data Processing Script"
date: "2026-07-15"
tags: ["Google Apps Script", "JavaScript", "Data Architecture"]
---

## What I Built

To power the beautiful dashboard I designed in Week 1, I wrote a massive **800+ line Google Apps Script (`updateDirectSummary`)** to act as the backend data processing engine.

## Key Accomplishments

- **Complex Data Aggregation & Two-Way Sync:** Wrote custom logic to aggregate and filter a staggering **9,090 rows** of raw data from the live Outstanding Report and collections sheets. Engineered a two-way sync mechanism to process this massive dataset and map financial metrics accurately across 14 specific regions and 4 zones without timing out.
- **Aggressive Date Parsing:** Built a robust `parseDateAggressive()` function to normalize messy date formats (Excel serial numbers, Google Sheets date objects, DD/MM/YYYY, YYYY-MM-DD) into standard JavaScript Date objects.
- **Rolling 5-Day Window:** Implemented logic to automatically calculate and bucket dues and collections into a rolling 5-day window relative to the current date.
- **Automated Formatting Engine:** Instead of relying on manual spreadsheet formatting, the script dynamically calculates background colors, font weights, and conditional formatting rules for every cell in the summary matrix using a predefined JSON palette.
- **Safe State Reset:** Handled the complexities of merged cells and column groupings by building a safe teardown and rebuild process that doesn't break the sheet structure.

## Code Highlight

I had to write an aggressive fallback date parser to handle all the weird ways Excel and Google Sheets handle dates behind the scenes:

```javascript
const parseDateAggressive = function(val) {
  // Handles actual JS Date objects
  if (Object.prototype.toString.call(val) === "[object Date]") return new Date(val);
  
  // Handles Excel serial numbers (e.g. 45123)
  if (typeof val === "number") {
    return new Date(Math.round((val - 25569) * 86400 * 1000));
  }
  
  // Handles various string formats via Regex
  // ...
};
```
