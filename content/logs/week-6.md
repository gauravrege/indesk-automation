---
week: 6
title: "PDF Scraper script"
date: "2026-09-02"
tags: ["Node.js", "PDF Parsing", "Regex", "Data Serialization"]
github: "https://github.com/gauravrege/pdfscraper"
---

## What Was Done

I built a standalone local Node.js script to solve the problem of extracting trapped, unstructured text data from within nested PDF binary files. 

## Technical Execution

- **Binary PDF Parsing:** Integrated the `pdf-parse` npm library to programmatically read raw `.pdf` files from a local directory and convert their internal binary data streams into raw, unstructured JavaScript strings.
- **Regex Pattern Matching:** Because the PDF text is completely unformatted, I engineered highly specific Regular Expressions (Regex) to scan the massive strings, locate specific anchor keywords, and slice out the exact financial data points or names we needed.
- **Data Serialization:** The script takes the extracted Regex matches and maps them into structured JavaScript objects.
- **CSV/Excel Exporting:** Used filesystem streams to automatically map those objects into a clean, formatted `.csv` file, effectively turning unusable PDFs into a structured database.
- **Executable Wrapper:** Wrapped the Node.js execution command inside a `.bat` file so that non-technical users can simply double-click an icon on their desktop to run the entire extraction pipeline instantly.

## Impact

> This script completely eliminates the need for manual data entry. Instead of a human opening hundreds of PDFs and copy-pasting numbers into Excel one by one, the script autonomously converts folders of PDFs into structured CSVs in milliseconds.
