---
week: 2
title: "InDesk Data Sync Script"
date: "2026-07-15"
tags: ["Google Apps Script", "JavaScript", "Data Architecture"]
---

## What Was Done

To power the Outstanding Report dashboard designed in Week 1, I wrote an 800+ line Google Apps Script (`updateDirectSummary`) to act as the backend data processing and syncing engine.

## Technical Execution

- **Complex Data Aggregation:** Wrote custom logic to loop through and filter 9,090 rows of raw data from the live Outstanding Report. Engineered a two-way sync mechanism to map financial metrics across 14 specific regions and 4 zones.
- **Aggressive Date Parsing:** Built a robust `parseDateAggressive()` JavaScript function to normalize messy date formats (Excel serial numbers, Google Sheets Date objects, strings) into standard JavaScript Date objects.
- **Rolling 5-Day Window:** Implemented algorithmic logic to calculate dues and collections into a rolling 5-day window relative to the current date.
- **Automated Formatting Engine:** The script dynamically calculates background colors, font weights, and conditional formatting rules for every cell in the summary matrix using a predefined JSON palette.

## Code Snippet

I wrote an aggressive fallback date parser to handle inconsistent formats across the Excel dumps:

```javascript
const parseDateAggressive = function(val) {
  // Handles actual JS Date objects
  if (Object.prototype.toString.call(val) === "[object Date]") return new Date(val);
  
  // Handles Excel serial numbers (e.g. 45123)
  if (typeof val === "number") {
    return new Date(Math.round((val - 25569) * 86400 * 1000));
  }
};
```
