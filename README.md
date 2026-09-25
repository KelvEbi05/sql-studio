# SQL Studio — SQL Server practice

An offline teaching simulator for 12 introductory SQL Server SELECT lessons. This is not SSMS and does not connect to SQL Server. A small T-SQL adapter runs the supported syntax using a local SQLite engine.

Supported lesson syntax includes SELECT, WHERE, AND/OR, DISTINCT, LIKE, ORDER BY, GROUP BY, JOIN, subqueries, TOP (n), dbo-qualified tables, bracketed identifiers, and standalone GO separators. ISNULL, LEN and GETDATE are provided for basic practice. GETDATE uses the browser clock in UTC. Use CAST(... AS FLOAT) for decimal averages.

This is not a complete T-SQL implementation: stored procedures, variables, DDL, DML, TOP PERCENT/WITH TIES, window functions and server administration are unsupported. Type conversion, precision, collation, default aggregate behavior and error messages may differ from SQL Server. Use real SQL Server for exact behavior and advanced work. The simulator accepts only SELECT batches, uses fresh sample data per run, caps result sets at 500 rows, and stops long queries after eight seconds.

Students should first open the website online and wait for “Ready for offline use.” Query drafts and progress remain in their browser; clearing browser data removes them. Offline progress does not sync between devices.

GitHub Pages publishes the root of the main branch. The repository contains static public app files only. To preview these root files locally, run `python -m http.server 4173` in their directory. The local workspace's `dist` directory uses a vendor subdirectory; its `github-pages` directory contains the flattened publication files.

Dependency: sql.js 1.13.0; license included in LICENSE.sql.js. Documentation: https://sql.js.org/documentation/
