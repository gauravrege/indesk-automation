---
week: 11
title: "Airline GST Invoice to Excel"
date: "2026-09-19"
tags: ["Node.js", "PDF Parsing", "ExcelJS", "GST Compliance"]
github: "https://github.com/gauravrege/pdf-invoice-to-excel"
---

## What Was Done

Built a Node tool that reads airline GST invoices out of a folder and writes every figure on them into one Excel workbook. Thirteen airlines are supported, in PDF and in HTML, and each one prints its invoice in a different layout. Typing a batch of these into the GST sheet by hand took an afternoon; the tool does the whole folder, over a hundred files, in under two seconds.

## Technical Execution

- **One Parser Per Airline:** Air India, Air India Express, IndiGo, Akasa, Alliance Air, Emirates, Air France, KLM, Lufthansa, Singapore Airlines, SriLankan, Malaysia Airlines and British Airways each get their own module. A file is handed to the first parser whose `matches()` recognises the issuer's legal name, so adding an airline is one new file and one line in a registry — no existing parser is touched.
- **Two Columns On One Line:** Airline invoices print the supplier down one side of the page and the customer down the other, and flattening a page into lines runs the two together. The PDF reader measures the gap — about 200 units between columns against about 1 between words — and keeps the boundary as a tab, which every parser then uses to tell the airline's GST number from the customer's.
- **Several Documents In One File:** Akasa send an invoice, a debit note and a credit note inside a single PDF, and SriLankan send invoices back to back. A parser returns a list, each document gets its own row and its own invoice number, and credit notes are routed onto their own sheet.
- **It Refuses To Guess:** Every row is checked — `taxable + non-taxable + IGST + CGST + SGST` has to equal the total printed on the invoice, or the row is flagged `CHECK TOTALS`. A field the airline simply does not print shows a dash, never a zero. Scanned invoices that hold no readable text are copied out to a separate sheet with a link to the file, for manual entry. An unreadable file produces a plain-English reason — "the Amount (in INR) column is not in this file" — not a stack trace.
- **Nothing To Install:** `src/` is bundled into a single `tool.mjs` with esbuild, so the person using it needs the folder and Node.js and nothing else. `run.bat` checks Node is there, checks the input folder exists, runs the tool and opens the output folder.
- **A Regression Test With Teeth:** Over a hundred real invoices covering all thirteen airlines are kept as a local test set, never committed. Re-parsing them has to return the same document count and the same three known exceptions every time; anything else in that list is something the change broke.

## Impact

> Thirteen airlines, thirteen invoice layouts, and a GST return that needs every figure off all of them. This reads a folder of them in seconds and, where it cannot read one, says which file and why instead of quietly writing a zero.
