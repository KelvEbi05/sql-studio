# SQL Studio — SQL Server practice

An offline teaching simulator for 30 SQL Server querying lessons across Beginner, Intermediate and Advanced (10 per level). This is not SSMS and does not connect to SQL Server. A small T-SQL adapter runs the supported syntax using a local SQLite engine.

Supported lesson syntax includes SELECT, WHERE, AND/OR, DISTINCT, LIKE, ORDER BY, GROUP BY, JOIN, subqueries, TOP (n), dbo-qualified tables, bracketed identifiers, and standalone GO separators. CTEs, ranking, running totals, LAG, conditional aggregation and UNION are covered at the Advanced level. ISNULL, LEN and GETDATE are provided for basic practice. GETDATE uses the browser clock in UTC. Use CAST(... AS FLOAT) for decimal averages.

This is not a complete T-SQL implementation: stored procedures, variables, DDL, DML, TOP PERCENT/WITH TIES, server administration are unsupported. Type conversion, precision, collation, default aggregate behavior and error messages may differ from SQL Server. Use real SQL Server for exact behavior and advanced work. The simulator accepts only SELECT batches, uses fresh sample data per run, caps result sets at 500 rows, and stops long queries after eight seconds.

Students should first open the website online and wait for “Ready for offline use.” Query drafts and progress remain in their browser; clearing browser data removes them. Offline progress does not sync between devices.

GitHub Pages publishes the root of the main branch. The repository contains static public app files only. To preview these root files locally, run `python -m http.server 4173` in their directory. The local workspace's `dist` directory uses a vendor subdirectory; its `github-pages` directory contains the flattened publication files.

Dependency: sql.js 1.13.0; license included in LICENSE.sql.js. Documentation: https://sql.js.org/documentation/


## Assessment and certificate payment
The 45-minute exam contains 12 practical questions, with an 80% pass mark. A student's name and explicit agreement are required before local camera/microphone checks. Desktop fullscreen is required to start. Tab hiding, focus loss, fullscreen exits, reload/resume and device interruptions are warning events, never automatic cheating decisions. Media streams are local only and stop on submission or leaving the exam. No recording or remote invigilation is implemented.

Answers, deadline, results and event logs are saved in browser storage. Reports can be downloaded as JSON for manual review. The browser is student-controlled: grades, deadlines, event logs and expected answers are not secure against modification. No claims of anti-AI enforcement or secure proctoring are made. Browser monitoring cannot detect another device.

The app discloses a US$5 certificate fee before the exam. Certificates are NOT issued automatically or unlocked by a local payment flag. Payment collection and paid certificate issuance are intentionally disabled until a real merchant checkout, server-side payment verification, and certificate issuing backend are configured. No payment is taken by this build.

Testing: run `node test-tsql.cjs` and `node test-exam.cjs` from the parent source project. Device and fullscreen behavior in the exam test uses mocks; real permissions and hardware still require a manual browser check.
