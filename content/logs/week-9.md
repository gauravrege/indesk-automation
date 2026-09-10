---
week: 9
title: "Customer Statement Transformer"
date: "2026-09-10"
tags: ["Node.js", "Zero Dependencies", "Excel Automation", "Data Reconciliation"]
github: "https://github.com/gauravrege/customer-statement-transformer"
---

## What Was Done

Built and delivered a tool that consolidates customer statement workbooks — one customer per sheet, spread across several files — into a single reconciled table, with every row tagged by the customer it belongs to. **Work that took a full day by hand now finishes in about 30 seconds**, handling **10,000+ transaction rows** and **40+ customer sheets** in one pass.

## Technical Execution

- **Zero-Dependency Excel Engine:** Rather than pulling in a library, I wrote the `.xlsx` reader and writer from scratch on top of Node's built-in `zlib` — an `.xlsx` is just a ZIP of XML parts. The tool needs no `npm install`, no internet access and no admin rights, so it runs on any locked-down office machine that has Node on it.
- **Proof, Not Just Speed:** Every sheet is checked against itself — `Opening Bal. + sum(Net Amount)` must equal the Total printed on that sheet. A dropped or double-counted row breaks the equation and fails the run in red. The tool doesn't just merge faster; it proves the merge was complete.
- **Multi-File Consolidation:** Every sheet of every input file lands in one output, not one output per input. A `Statement Period` column travels with each row, so August and September statements for the same customer can share a table and still be told apart.
- **Layout Voting:** Sheets are grouped by their column layout and the layout used by the most sheets wins, so one malformed file can't disqualify all the good ones. Mismatched sheets are skipped by name with the offending column shown.
- **Positional Independence:** The header row sits at a different position on almost every sheet, so the tool scans for the `Posting Date` marker instead of assuming a row number. The agency's own GST in each letterhead is deliberately ignored — only the customer's own GST is picked up.
- **Safe To Demo:** Ships with three fully synthetic statement workbooks so the tool can be shown to anyone without a real customer file in the room.

## Impact

> Consolidating these statements by hand meant opening every sheet, copying its rows, and retyping the customer code, name and GST onto every line — a full working day, where one mistyped code quietly corrupts the whole table. This does it in about thirty seconds and hands back arithmetic proof that not one row was lost.
