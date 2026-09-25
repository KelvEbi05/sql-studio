# SQL Studio

12 guided SQL exercises using a real SQLite engine (sql.js 1.13.0, vendored with its license). Static app; no backend or student account required.

Run locally: `python -m http.server 4173 --directory dist`, then open http://localhost:4173. Serve over HTTPS for production service-worker support. Deploy the entire `dist` directory together.

Students must visit online and wait for “Ready for offline use” before disconnecting. Progress and query drafts stay in that browser's local storage; clearing browser data removes them. Browser storage eviction can remove cached offline files. Query execution is read-only, runs in a worker with an eight-second timeout, and has a 500-row result cap. Each run uses a fresh sample database. Assessment compares result values and, where specified, order and column aliases; it is practice feedback, not secure exam grading.

The application intentionally has no central teacher reporting, accounts, or grade synchronization. Offline progress does not sync across devices. sql.js documentation: https://sql.js.org/documentation/
