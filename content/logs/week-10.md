---
week: 10
title: "Invoice PDF Match & Audit Tool"
date: "2026-09-09"
tags: ["Python", "xlsxwriter", "File Search", "Audit Reporting"]
github: "https://github.com/gauravrege/invoice-match"
---

## What Was Done

Built a Python tool that takes a spreadsheet of invoice numbers, searches every drive on the PC for the matching invoice PDFs, and copies them into one folder along with a report of exactly what was found and what wasn't. A search that took minutes of manual hunting per invoice now runs across the whole machine in seconds.

## Technical Execution

- **Separator-Blind Matching:** File names are stripped down to letters and digits before comparing, so `AB-1234567-CD01234.pdf`, `_ AB1234567CD01234.pdf` and `CLIENT..AB1234567CD01234...copy(1).pdf` all match the same invoice number. The inconsistent naming that defeats Windows search stops mattering.
- **Targeted Drive Walk:** Every drive is scanned by default, but Windows, Program Files, `node_modules` and other system directories are skipped — invoices never live there, and walking them was the bulk of the runtime. This is what turns a multi-minute scan into a few seconds.
- **Audit Reporting:** Writes `match_report.xlsx` listing the matches, the numbers still not found, and where duplicate copies of the same invoice turned up, plus `all_files.xlsx` recording every PDF seen on the machine with a matched yes/no. A number that never appears cannot slip past unnoticed.
- **Column Auto-Detection:** Reads the invoice list from any column whose header contains "invoice", across `.xlsx` and `.xlsb` workbooks, with `--sheet` and `--column` overrides when the guess is wrong.
- **Self-Installing Launcher:** `run.bat` builds its own virtual environment and installs dependencies on first run, then translates each exit code into a plain-English outcome, so an unattended run cannot look successful when it wasn't.

## Impact

> Locating a batch of invoice PDFs by hand means searching a filename you can only half remember, one invoice at a time, and never being certain you found them all. This does the whole list at once and hands back a report proving which numbers are still missing.
