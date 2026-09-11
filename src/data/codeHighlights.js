/**
 * Real excerpts from shipped repositories. Each one is copied from the
 * source it names — nothing here is written for display.
 */

export const codeHighlights = [
  {
    id: 'reconcile',
    label: 'Proof, not trust',
    lang: 'javascript',
    repo: 'customer-statement-transformer',
    file: 'code/transform.js',
    href: 'https://github.com/gauravrege/customer-statement-transformer/blob/main/code/transform.js',
    blurb:
      'Merging spreadsheets is easy. Proving nothing was lost is the hard part. Every sheet is checked against arithmetic it already contains — opening balance plus the sum of net amounts must equal the total the sheet itself prints. A dropped or double-counted row breaks the equation and fails the run, so a silent data loss cannot reach the finished file.',
    code: `function checkBalance(sheet, log) {
  const lower = sheet.headers.map((h) => h.trim().toLowerCase());
  const k = lower.indexOf(NET_AMOUNT_COL);
  if (k === -1) {
    log.warn("'" + sheet.sheet + "': no 'Net Amount' column - balance check skipped.");
    return [0, null];
  }

  let netSum = 0;
  for (const row of sheet.rows) {
    const n = k < row.length ? asNumber(row[k]) : null;
    if (n !== null) netSum += n;
  }

  if (sheet.opening === null || sheet.total === null) {
    log.warn("'" + sheet.sheet + "': Opening Bal. and/or Total row missing.");
    return [netSum, null];
  }

  const expected = sheet.opening + netSum;
  const ok = Math.abs(expected - sheet.total) <= TOLERANCE;
  if (!ok) {
    log.error("'" + sheet.sheet + "' does NOT reconcile: opening " +
      fmtMoney(sheet.opening) + " + net " + fmtMoney(netSum) + " = " +
      fmtMoney(expected) + ", but the sheet's Total says " +
      fmtMoney(sheet.total) + ". Rows may be missing.");
  }
  return [netSum, ok];
}`,
  },
  {
    id: 'xlsx',
    label: 'No dependencies',
    lang: 'javascript',
    repo: 'customer-statement-transformer',
    file: 'code/xlsx.js',
    href: 'https://github.com/gauravrege/customer-statement-transformer/blob/main/code/xlsx.js',
    blurb:
      'An .xlsx file is a ZIP of XML parts, and Node already ships zlib — so the spreadsheet writer is built from raw ZIP records rather than a library: local headers, a CRC-32 table, DOS timestamps, a central directory. The tool installs nothing and needs no network, which is what lets it run on a locked-down office machine.',
    code: `function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ -1) >>> 0;
}

function writeZip(filePath, files) {
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) |
                   (now.getSeconds() >> 1)) & 0xffff;
  const dosDate = (((now.getFullYear() - 1980) << 9) |
                   ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

  const parts = [];
  const central = [];
  let offset = 0;

  for (const f of files) {
    const data = Buffer.isBuffer(f.data) ? f.data : Buffer.from(f.data, "utf8");
    const comp = zlib.deflateRawSync(data, { level: 6 });
    const crc = crc32(data);
    // ... local header, then a central directory record per entry
  }
}`,
  },
  {
    id: 'match',
    label: 'Names that never match',
    lang: 'python',
    repo: 'invoice-match',
    file: 'match.py',
    href: 'https://github.com/gauravrege/invoice-match/blob/main/match.py',
    blurb:
      'The same invoice arrives as DL-1252606-BB08595.pdf, as _ DL1252606BB08595.pdf, and buried inside a client name with three copies of the suffix. Reducing every filename to letters and digits makes all of those the same key. The second half of the speed is refusing to walk Windows, ProgramData and node_modules — invoices do not live there, and skipping them turns a multi-minute scan into seconds.',
    code: `def norm_key(value) -> str:
    """Reduce to letters and digits, uppercased."""
    return re.sub(r"[^A-Z0-9]", "", str(value).upper())


def walk_pdfs(roots: list[str], skip_paths: set):
    """Yield (path, name, folder, size) for every PDF under the given roots."""
    skip_lower = {os.path.normcase(os.path.abspath(p)) for p in skip_paths}
    for root in roots:
        for dirpath, dirs, files in os.walk(root, topdown=True,
                                            onerror=lambda e: None):
            here = os.path.normcase(os.path.abspath(dirpath))
            if here in skip_lower:
                dirs[:] = []
                continue
            dirs[:] = [d for d in dirs
                       if d.lower() not in SKIP_DIRS and not d.startswith("$")]
            for f in files:
                if not f.lower().endswith(".pdf") or f.startswith("~$"):
                    continue
                yield os.path.join(dirpath, f), f, dirpath, 0`,
  },
];
