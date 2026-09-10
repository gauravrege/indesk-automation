---
week: 9
title: "Customer Statement Transformer"
date: "2026-09-09"
tags: ["Python", "openpyxl", "Excel Automation", "Data Reconciliation"]
github: "https://github.com/gauravrege/customer-statement-transformer"
---

## What Was Done

Built a Python tool that takes a customer statement workbook holding one customer per sheet and merges every sheet into a single table, tagging each transaction row with the customer it belongs to. A 7-sheet workbook of 732 transactions collapses into one pivot-ready sheet in under two seconds.

## Technical Execution

- **Header Block Parsing:** Wrote a regex-driven parser that reads each sheet's own header block to pull out the customer code, company name and GST number, then stamps them onto every transaction row as three new columns.
- **Positional Independence:** The column-header row sits at a different position on almost every sheet, so the tool scans for the `Posting Date` marker rather than assuming a fixed row — sheet 1 starts at row 8, the rest at row 15.
- **Balance Reconciliation:** Every sheet is proved against itself — `Opening Bal. + sum(Net Amount)` must equal the Total printed on that sheet. A dropped or double-counted row breaks the equation, so it cannot pass silently. Mismatches are highlighted red and fail the run.
- **Fail-Loud Design:** A sheet whose columns differ from the first is skipped with the offending column named, rather than letting values land in the wrong column. Missing customer codes still keep their rows, flagged with blank tags. Any of these exits with an error code, so an unattended run cannot look successful when it wasn't.
- **Non-Technical Packaging:** Wrapped in a `Run.bat` launcher with per-stage progress bars and a written run log, so the finance team drops a file into `input`, double-clicks, and collects the result from `output`.

## Impact

> Consolidating a multi-sheet statement by hand means copying each customer's rows and retyping their code and GST onto every line — hours of work that quietly introduces errors. This does it in seconds and mathematically proves that not one row was lost along the way.
