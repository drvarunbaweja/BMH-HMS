# Drug Library CSV Files

Place drug CSV files here. Run `node scripts/import-drugs-from-csv.mjs` to upload all of them to Firebase.

## Expected CSV columns (header row required)

| Column | Required | Notes |
|---|---|---|
| Trade Name / Brand | Yes | Brand/trade name of the drug |
| Generic Name / Salt | Yes | Generic/INN name |
| Type / Form | No | e.g. Eye Drop, Tablet, Ointment, Injection, Syrup, Cream, Gel |
| Department | No | Ophthalmology, OBG, Neuropsychiatry, Skin — leave blank for All |
| Frequency | No | BD, OD, TID, QID, PRN — defaults to BD |
| Duration | No | 1 Week, 2 Weeks, 1 Month — defaults to 1 Week |
| Company | No | Manufacturer name |

## Notes
- First row must be the header row
- Column names are matched by keyword, not exact text
- Existing drugs in Firebase are preserved; CSV adds/updates (newer timestamp wins)
- Run once per CSV upload; re-running is safe (deduplicates by trade+generic+dept)
