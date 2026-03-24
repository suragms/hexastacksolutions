# Ahrefs Inputs Missing

The pipeline could not run because some required CSV files are missing in `docs/seo-ahrefs-inputs`.

Missing files:
- organic_keywords.csv
- top_pages.csv
- competitor_keywords.csv
- keyword_gap.csv

Expected filenames:
- organic_keywords.csv
- top_pages.csv
- competitor_keywords.csv
- keyword_gap.csv

After adding the files, run:

```bash
npm run seo:ahrefs
```
