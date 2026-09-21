---
week: 12
title: "PDF Invoice Renamer"
date: "2026-09-21"
tags: ["Node.js", "Client-Side Processing", "pdf.js", "Vercel"]
github: "https://github.com/gauravrege/pdf-invoice-renamer"
demo: "https://pdf-invoice-renamer-omega.vercel.app"
---

## What Was Done

Built a tool that reads the invoice number printed inside a PDF and names the file after it. Invoices arrive called B881HG_U.pdf or 3QMYP5_11_08_2025.pdf, almost never the number anyone filing them actually needs, and renaming a folder of them by hand means opening every one. It runs two ways: a folder at a time on the desk, or as a web page where the reading happens inside the browser tab and nothing is uploaded at all.

## Technical Execution

- **Two Readers, Tried In Order:** The thirteen airline parsers from week 11 go first — for those layouts they know exactly where the number sits, even where flattening the page has split the heading across three lines. Everything else falls to a general reader that works down a list of headings (`Invoice No`, `Bill No`, `Credit Note No`, `Tax Invoice :`) and takes the value beside or below it. One tool that only needs a single field, built on top of one that needed eleven.
- **Failing Softer Than The Tool It Came From:** A parser that recognises the airline but cannot read its amounts table no longer sinks the file. The invoice number is nearly always still printed where it always was, so the general reader gets a turn at it — which is how a British Airways page that the Excel tool cannot fully parse still gets its name.
- **A Heading Alone Is Not Enough:** `Tax Invoice` is a title across the top of almost every invoice as well as a label beside its number, so bare headings are only trusted when the page puts a colon after them. Beyond that, a candidate is thrown out if it is a date, a GSTIN, a PAN, a bare amount or the first word of the next field — every one of those a case that came out of a real file.
- **Nothing Is Uploaded:** The web version is a static page with no server and no API behind it. `pdf.js` reads the invoices in a worker thread in the tab, and the zip and the Excel report are built there too. These are live invoices with client names and GST numbers on them, and the repository is public, so the files never leaving the machine is the design rather than a feature.
- **One Set Of Rules For Both:** The browser imports straight out of the desktop tool's source — no second copy of a parser, no duplicated tuning constants. The parts that touch the file system sit in thin wrappers the browser skips, so changing how a number is found changes both versions at once.
- **Windows Will Not Take Every Number:** `CR33/2509/00583` holds slashes, and a backslash left in a name is read as a folder separator, so the copy would land somewhere else entirely. Those become dashes, trailing dots and spaces are trimmed because Windows drops them silently and would quietly turn two numbers into one file, and the report always shows the number as printed beside the name used.
- **Two Files, One Number:** The second file claiming a name gets `(2)`, and both are flagged for a look. Nothing is ever overwritten, and every run writes into its own timestamped folder — so running it twice, which is exactly what someone does when unsure it worked, cannot cost them the first run.
- **Measured Against Files That Already Knew The Answer:** A folder of 330 retail invoices that had been named by invoice number already made a ready-made test: read them, compare against the file name. 316 read, **316 correct, none wrong**. The 14 it declined are blank templates with no number printed on them anywhere. On the airline set it read 136 of 141, the five misses being four covering e-mails and an e-ticket — documents that are not invoices and have no number to find.

## Impact

> Filing an invoice means knowing its number, and the file name almost never carries it. This reads the number off the page and puts it where it can be seen — and where it genuinely cannot read one, it leaves the file alone and says which one and why, because a wrongly named invoice is worse than an unnamed one.
