# Search Console Submission Checklist

This checklist is for the site owner account. It does not expose credentials
or attempt to submit URLs without account authorization.

## Property

- Verify the `https://mytesttype.com/` domain property.
- Confirm the non-`www` canonical host is the selected property.
- Confirm GA4 and Search Console are connected to the same Google account.

## Sitemap

Submit:

`https://mytesttype.com/sitemap.xml`

Expected active URLs:

- `https://mytesttype.com/`
- `https://mytesttype.com/gwansang/`
- `https://mytesttype.com/palm-reading/`
- `https://mytesttype.com/k-shaman/`
- Four `/guide/` URLs listed in the sitemap

## URL inspection order

Inspect the root and the four guide URLs first. Request indexing only after:

- The live URL returns `200`.
- The canonical points to the same URL.
- The visible page content matches the structured data.
- No legacy MBTI, tarot, pet, or blog content appears in the page source.

## Weekly report fields

Record clicks, impressions, CTR, average position, queries, countries, and
indexed-page status. Compare guide views with `guide_view`, `guide_cta_click`,
`test_start`, `test_complete`, `result_share`, and `support_cta_click` in GA4.
