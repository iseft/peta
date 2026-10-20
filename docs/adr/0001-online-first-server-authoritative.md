# Online-first, server-authoritative data

The mobile app reads and writes through the API, with TanStack Query caching responses on the phone; there is no local database and no offline mode. Nearly every screen shows totals derived on the server (Available Wealth, 50/30/20 shares, Paid Status, Months Covered, currency conversion), so keeping one authoritative copy is far simpler than syncing. This deliberately departs from language-learning-app-blocker, whose offline-first SQLite sync exists only because its Gate must open instantly without a network.

## Consequences

- Recording a Transaction needs a connection; an offline queue can be added later without changing the API.
- Sign-in is required before any use; there are no anonymous on-device users.
