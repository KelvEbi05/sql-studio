const seed = "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, city TEXT, age INTEGER, score INTEGER, course_id INTEGER);\nINSERT INTO students VALUES (1,'Ada','Lagos',21,92,1),(2,'Tunde','Abuja',24,78,2),(3,'Chiamaka','Lagos',22,85,1),(4,'Ibrahim','Kano',20,67,3),(5,'Zainab','Abuja',23,95,2),(6,'Emeka','Enugu',25,81,NULL),(7,'Funke','Ibadan',21,74,3),(8,'David','Lagos',24,88,1);\nCREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT); INSERT INTO courses VALUES (1,'Data Analytics'),(2,'Web Development'),(3,'Product Design'),(4,'Cybersecurity');";
const courses = [
  {
    "id": "beginner",
    "name": "Beginner",
    "subtitle": "Read and explore data",
    "intro": "Start here even if you have never written code. Learn what tables contain, select useful columns, filter rows, sort results, and build your first summaries.",
    "prerequisite": "No previous SQL experience needed.",
    "outcomes": [
      "Read a table and choose columns",
      "Filter with conditions, patterns and NULL",
      "Use TOP and ORDER BY together",
      "Count records and explain a result"
    ]
  },
  {
    "id": "intermediate",
    "name": "Intermediate",
    "subtitle": "Connect and summarize data",
    "intro": "Turn separate rows into useful answers. Combine tables, handle missing matches, write conditional expressions, and compare rows with subqueries.",
    "prerequisite": "Be comfortable with SELECT, WHERE, TOP and basic aggregates.",
    "outcomes": [
      "Join tables without accidental duplicates",
      "Group results and filter summaries",
      "Use CASE, ISNULL and text functions",
      "Solve questions with subqueries and EXISTS"
    ]
  },
  {
    "id": "advanced",
    "name": "Advanced",
    "subtitle": "Build analytical reports",
    "intro": "Break complex questions into clear steps. Use common table expressions, window functions, ranking and careful aggregation to build reports you can explain.",
    "prerequisite": "Complete the Intermediate level or understand joins, groups and subqueries.",
    "outcomes": [
      "Organize queries with CTEs",
      "Rank rows within groups",
      "Calculate running totals and comparisons",
      "Combine query results and validate a report"
    ]
  }
];
const lessons = [
  {
    "title": "Meet your first query",
    "short": "Your first query",
    "body": "A database stores information in <strong>tables</strong>. Each row is a record, and each column describes one part of it.<br><br><code>SELECT</code> chooses the columns you want. <code>FROM</code> tells SQL which table to read. An asterisk (<code>*</code>) means “all columns”.<br><br>These lessons use SQL Server query syntax, as you would type in SSMS. <code>dbo.students</code> and <code>students</code> both refer to our sample table.<br><br>Think of a table as a spreadsheet with named columns. A row describes one student; the id column distinguishes that student from everyone else. SQL does not promise a row order until you ask for one.",
    "example": "SELECT *\nFROM courses;",
    "task": "Show every column and every row from the students table.",
    "hint": "Start with SELECT *, then choose students after FROM.",
    "answer": "SELECT * FROM students;",
    "starter": "-- Explore the students table\nSELECT\nFROM students;",
    "id": "original-0",
    "legacy": 0,
    "steps": [
      "Read SELECT * as “return every column”.",
      "Read FROM courses as “use the courses table”.",
      "The example shows four course records; your exercise uses the students table instead."
    ],
    "pitfall": "Do not put a comma between SELECT * and FROM. Finish statements with a semicolon.",
    "minutes": 15,
    "objective": "Show every column and every row from the students table.",
    "level": "beginner",
    "position": 1
  },
  {
    "title": "Choose what matters",
    "short": "Select columns",
    "body": "You rarely need every column. List the column names you want after <code>SELECT</code>, separated by commas. The results follow the column order you choose.<br><br>Selecting only the columns you need makes a result easier to read. It also avoids relying on the physical order of all the columns in a table. The order of names after SELECT controls the order of the output columns.",
    "example": "SELECT name, city\nFROM students;",
    "task": "Return only the name and score of every student, in that column order.",
    "hint": "Replace the asterisk with name, score.",
    "answer": "SELECT name, score FROM students;",
    "id": "original-1",
    "legacy": 1,
    "steps": [
      "name is the first output column.",
      "The comma separates column names.",
      "city is the second column; FROM still chooses the table."
    ],
    "pitfall": "Separate columns with commas, not AND. AND joins conditions, not column names.",
    "minutes": 15,
    "objective": "Return only the name and score of every student, in that column order.",
    "level": "beginner",
    "position": 2
  },
  {
    "title": "Find the right rows",
    "short": "Filter with WHERE",
    "body": "Use <code>WHERE</code> to return only matching rows. Put text values in single quotes. SQL uses <code>=</code> to test equality and <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code> for comparisons.<br><br>SQL tests the WHERE condition for each row. Rows for which it is true appear in the result. A text value needs single quotes, while a column name does not. You can return columns that are different from the column used for filtering.",
    "example": "SELECT * FROM students\nWHERE city = 'Abuja';",
    "task": "Show all columns for students who live in Lagos.",
    "hint": "Use WHERE city = 'Lagos'.",
    "answer": "SELECT * FROM students WHERE city = 'Lagos';",
    "id": "original-2",
    "legacy": 2,
    "steps": [
      "FROM chooses the student records.",
      "WHERE checks whether city equals Abuja.",
      "SELECT * returns all columns for only those matching records."
    ],
    "pitfall": "Use single quotes around Lagos. Double quotes and brackets identify names, not ordinary text values.",
    "minutes": 15,
    "objective": "Show all columns for students who live in Lagos.",
    "level": "beginner",
    "position": 3
  },
  {
    "title": "Combine your conditions",
    "short": "AND & OR",
    "body": "<code>AND</code> requires both conditions to be true. <code>OR</code> requires at least one. Use parentheses when you mix them to make your intended grouping clear.<br><br>Write each condition so it makes sense on its own. SQL evaluates AND before OR; parentheses make mixed conditions easier to understand. For example, city = Lagos AND (score >= 90 OR age < 22) first groups the alternatives in parentheses.",
    "example": "SELECT * FROM students\nWHERE city = 'Abuja' AND score > 80;",
    "task": "Show all columns for Lagos students with a score of at least 90.",
    "hint": "Combine city = 'Lagos' AND score >= 90.",
    "answer": "SELECT * FROM students WHERE city = 'Lagos' AND score >= 90;",
    "id": "original-3",
    "legacy": 3,
    "steps": [
      "The first condition selects Abuja students.",
      "AND also requires a score greater than 80.",
      "Only rows satisfying both tests appear."
    ],
    "pitfall": "score > 90 excludes 90. Use >= when the question says “at least”.",
    "minutes": 15,
    "objective": "Show all columns for Lagos students with a score of at least 90.",
    "level": "beginner",
    "position": 4
  },
  {
    "id": "range",
    "title": "Choose ranges and lists",
    "short": "BETWEEN & IN",
    "body": "Use <code>BETWEEN</code> for an inclusive range: both endpoints are included. Use <code>IN</code> when a value may match any item in a list. These read more clearly than repeating many comparisons.<br><br><code>age BETWEEN 21 AND 24</code> means age >= 21 AND age <= 24. <code>city IN ('Lagos', 'Abuja')</code> means either city is acceptable. You can combine a list test with another condition using AND.<br><br>Before writing the query, identify the filter column and whether the boundary values should count. Here, age and score are numbers, so their values do not need quotes. Text values in an IN list do need quotes.",
    "example": "SELECT name, age\nFROM students\nWHERE age BETWEEN 21 AND 24;",
    "steps": [
      "Read the lower and upper boundaries: 21 and 24.",
      "BETWEEN includes both boundaries.",
      "Only name and age are returned for the matching students."
    ],
    "pitfall": "BETWEEN includes its endpoints. For an exclusive range, use > and < instead.",
    "task": "Return name and city for students living in Lagos or Abuja.",
    "answer": "SELECT name, city FROM students WHERE city IN ('Lagos', 'Abuja');",
    "hint": "Use WHERE city IN ('Lagos', 'Abuja').",
    "minutes": 20,
    "level": "beginner",
    "position": 5
  },
  {
    "title": "Put results in order",
    "short": "ORDER BY & TOP",
    "body": "<code>ORDER BY</code> sorts your results. <code>ASC</code> is ascending and <code>DESC</code> is descending. In SQL Server, put <code>TOP (n)</code> after SELECT to keep n rows. Use ORDER BY to choose which rows come first.<br><br>TOP without ORDER BY returns an unspecified selection. ORDER BY score DESC puts high scores first; ASC puts low scores first. For tied scores, add id as a second sort key when you need a repeatable result. TOP (3) chooses three rows, not three distinct score values.",
    "example": "SELECT TOP (2) name, age\nFROM dbo.students\nORDER BY age ASC;",
    "task": "Return the name and score of the top 3 students, highest score first.",
    "hint": "Start with SELECT TOP (3) name, score and sort by score DESC.",
    "answer": "SELECT TOP (3) name, score FROM students ORDER BY score DESC;",
    "ordered": true,
    "id": "original-4",
    "legacy": 4,
    "steps": [
      "TOP (2) limits the result to two rows.",
      "ORDER BY age ASC puts younger students first.",
      "Change the selected columns, sort key and TOP number for the challenge."
    ],
    "pitfall": "TOP belongs after SELECT, before the column list. SQL Server does not use LIMIT.",
    "minutes": 15,
    "objective": "Return the name and score of the top 3 students, highest score first.",
    "level": "beginner",
    "position": 6
  },
  {
    "title": "Spot the unique values",
    "short": "DISTINCT",
    "body": "<code>DISTINCT</code> removes duplicate result rows. When selecting one column, you get a list of its unique values.<br><br>DISTINCT works on the entire selected row. DISTINCT city produces one row per city. DISTINCT city, age produces one row per unique city-and-age combination. Adding another column may therefore increase the number of rows.",
    "example": "SELECT DISTINCT course_id\nFROM students;",
    "task": "List every distinct city in the students table.",
    "hint": "Place DISTINCT before city.",
    "answer": "SELECT DISTINCT city FROM students;",
    "id": "original-5",
    "legacy": 5,
    "steps": [
      "Select course_id from all student records.",
      "DISTINCT removes repeated course_id values.",
      "NULL is shown once if it appears in the selected column."
    ],
    "pitfall": "DISTINCT does not sort results. Add ORDER BY when order matters.",
    "minutes": 15,
    "objective": "List every distinct city in the students table.",
    "level": "beginner",
    "position": 7
  },
  {
    "title": "Search for a pattern",
    "short": "Patterns with LIKE",
    "body": "<code>LIKE</code> matches text patterns. <code>%</code> means any number of characters, and <code>_</code> means exactly one character. In these exercises, matching ignores case for basic English letters. On SQL Server, case sensitivity depends on the database collation.<br><br>Patterns let you find text without knowing the entire value. A% matches names starting with A; %a% matches names containing a; _da matches three-character values ending in da. Do not use = when you intend a wildcard search.",
    "example": "SELECT * FROM students\nWHERE name LIKE 'T%';",
    "task": "Return all columns for students whose name starts with A.",
    "hint": "Use name LIKE 'A%'.",
    "answer": "SELECT * FROM students WHERE name LIKE 'A%';",
    "id": "original-6",
    "legacy": 6,
    "steps": [
      "The pattern T% starts with the letter T.",
      "The percent sign accepts the remaining characters.",
      "The example finds Tunde; your challenge uses a different first letter."
    ],
    "pitfall": "The pattern needs single quotes. Without %, LIKE behaves much like an exact text comparison.",
    "minutes": 15,
    "objective": "Return all columns for students whose name starts with A.",
    "level": "beginner",
    "position": 8
  },
  {
    "id": "nulls",
    "title": "Understand missing values",
    "short": "NULL basics",
    "body": "<code>NULL</code> represents an unknown or missing value. It is not the same as 0, an empty string, or the word “NULL”. A student with no course has a NULL course_id.<br><br>Use <code>IS NULL</code> to find missing values and <code>IS NOT NULL</code> to find present ones. Ordinary comparisons with NULL do not evaluate to true, so <code>course_id = NULL</code> will not find the missing rows.<br><br>When reading a result, ask whether a blank-looking value means “unknown” or a genuine recorded value. That distinction affects counts, calculations and joins later in the course.",
    "example": "SELECT name, course_id\nFROM students\nWHERE course_id IS NULL;",
    "steps": [
      "Find rows whose course_id is missing.",
      "Return the name and missing course_id.",
      "The example identifies Emeka; your task asks for the opposite set."
    ],
    "pitfall": "Do not put quotes around NULL when checking missing values.",
    "task": "Return name and course_id for students who have a course assigned.",
    "answer": "SELECT name, course_id FROM students WHERE course_id IS NOT NULL;",
    "hint": "Use IS NOT NULL on course_id.",
    "minutes": 20,
    "level": "beginner",
    "position": 9
  },
  {
    "title": "Turn rows into insights",
    "short": "COUNT, AVG & SUM",
    "body": "Aggregate functions summarize rows. <code>COUNT(*)</code> counts rows, <code>AVG(CAST(score AS FLOAT))</code> calculates a decimal average, and <code>SUM(score)</code> adds scores. SQL Server returns an integer average for integer inputs, so cast to FLOAT when you want a decimal. Use <code>AS</code> to name the result.<br><br>COUNT(*) counts rows even when some columns contain NULL. COUNT(course_id) counts only non-NULL course IDs. SUM and AVG ignore NULL inputs. In SQL Server, AVG of an integer column returns an integer; CAST(score AS FLOAT) makes a fractional average possible.",
    "example": "SELECT AVG(CAST(score AS FLOAT)) AS average_score\nFROM students;",
    "task": "Count all students. Return one column named total_students.",
    "hint": "Use COUNT(*) AS total_students.",
    "answer": "SELECT COUNT(*) AS total_students FROM students;",
    "names": true,
    "id": "original-7",
    "legacy": 7,
    "steps": [
      "CAST changes each score into a floating-point value.",
      "AVG combines those values into one class average.",
      "AS average_score gives the output a useful column heading."
    ],
    "pitfall": "Do not select name alongside a class-wide COUNT unless you group it or use a window function.",
    "minutes": 15,
    "objective": "Count all students. Return one column named total_students.",
    "level": "beginner",
    "position": 10
  },
  {
    "title": "Make a summary per group",
    "short": "GROUP BY",
    "body": "<code>GROUP BY</code> collects rows with the same value so an aggregate can summarize each group. Select the group column alongside the aggregate.<br><br>GROUP BY produces one summary row for each group. Think of sorting records into city buckets, then counting each bucket. Every selected expression must either identify the group or aggregate the values inside it. WHERE filters individual rows before grouping.",
    "example": "SELECT course_id, COUNT(*) AS total\nFROM students\nGROUP BY course_id;",
    "task": "Return city and COUNT(*) AS total for each city.",
    "hint": "Group by city and count the rows in each group.",
    "answer": "SELECT city, COUNT(*) AS total FROM students GROUP BY city;",
    "names": true,
    "id": "original-8",
    "legacy": 8,
    "steps": [
      "GROUP BY course_id creates a group for each course ID, including NULL.",
      "COUNT(*) counts the students in each group.",
      "AS total names the count; your challenge groups by city instead."
    ],
    "pitfall": "Selecting name in a city summary is ambiguous: a city can contain several student names.",
    "minutes": 15,
    "objective": "Return city and COUNT(*) AS total for each city.",
    "level": "intermediate",
    "position": 1
  },
  {
    "id": "having",
    "title": "Filter a grouped summary",
    "short": "HAVING",
    "body": "<code>WHERE</code> filters source rows; <code>HAVING</code> filters groups after aggregation. If a question asks for cities with several students, first form the city groups and then test the group count.<br><br>The logical sequence is FROM, WHERE, GROUP BY, HAVING, SELECT, then ORDER BY. You do not need every clause, but understanding the order explains why an aggregate does not belong in WHERE.<br><br>Use the full aggregate expression in HAVING. In SQL Server, an alias created in SELECT is not generally available to HAVING. A city with exactly two students should remain when the condition is COUNT(*) >= 2.",
    "example": "SELECT city, COUNT(*) AS total\nFROM students\nGROUP BY city\nHAVING COUNT(*) > 1;",
    "steps": [
      "Build one group for each city.",
      "Count students inside each group.",
      "Keep groups with more than one student."
    ],
    "pitfall": "WHERE COUNT(*) > 1 is invalid. Group conditions belong in HAVING.",
    "task": "Return city and COUNT(*) AS total for cities with at least 2 students, sorted by city.",
    "answer": "SELECT city, COUNT(*) AS total FROM students GROUP BY city HAVING COUNT(*) >= 2 ORDER BY city;",
    "hint": "Use GROUP BY city, HAVING COUNT(*) >= 2, then ORDER BY city.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "intermediate",
    "position": 2
  },
  {
    "title": "Bring two tables together",
    "short": "INNER JOIN",
    "body": "<code>JOIN</code> connects related tables. The <code>ON</code> condition describes how rows match. Here, a student’s <code>course_id</code> matches a course’s <code>id</code>. INNER JOIN leaves out students without a matching course.<br><br>A join matches rows using a relationship, not their display order. Student course_id points to course id. Table aliases such as s and c make longer queries easier to read. If the matching column is not unique, one student can produce several result rows; always understand the relationship.",
    "example": "SELECT students.name, courses.title\nFROM students\nJOIN courses ON students.course_id = courses.id;",
    "task": "Return student name and course title for every student with a matching course.",
    "hint": "Use the JOIN example above. The result has 7 rows.",
    "answer": "SELECT students.name, courses.title FROM students JOIN courses ON students.course_id = courses.id;",
    "id": "original-9",
    "legacy": 9,
    "steps": [
      "Start with the student records.",
      "Match each student course_id to a course id using ON.",
      "Choose the student name and the matching course title. Emeka has no match and is excluded."
    ],
    "pitfall": "Forgetting ON can create every possible pair of rows. That is usually not the report you intended.",
    "minutes": 15,
    "objective": "Return student name and course title for every student with a matching course.",
    "level": "intermediate",
    "position": 3
  },
  {
    "title": "Keep the missing matches",
    "short": "LEFT JOIN & NULL",
    "body": "<code>LEFT JOIN</code> keeps every row from the left table, even without a match. Missing values appear as <code>NULL</code>. Test missing values with <code>IS NULL</code>, not <code>= NULL</code>.<br><br>A missing course is different from a zero or an empty string. NULL means the value is unknown or absent. LEFT JOIN keeps the left-hand records and supplies NULL for missing right-hand values. A WHERE condition on the right table can accidentally remove those unmatched rows.",
    "example": "SELECT students.name, courses.title\nFROM students\nLEFT JOIN courses ON students.course_id = courses.id;",
    "task": "Return only the names of students who have no course assigned.",
    "hint": "Filter students using WHERE course_id IS NULL.",
    "answer": "SELECT name FROM students WHERE course_id IS NULL;",
    "id": "original-10",
    "legacy": 10,
    "steps": [
      "Keep all student records on the left.",
      "Bring in a course title where the ID matches.",
      "Emeka remains in the result with a NULL course title."
    ],
    "pitfall": "Use IS NULL, not = NULL. An ordinary equality comparison cannot test whether a value is missing.",
    "minutes": 15,
    "objective": "Return only the names of students who have no course assigned.",
    "level": "intermediate",
    "position": 4
  },
  {
    "id": "replace-null",
    "title": "Choose a display fallback",
    "short": "ISNULL & COALESCE",
    "body": "<code>ISNULL(value, replacement)</code> returns the replacement when the first value is NULL. Otherwise it returns the original value. <code>COALESCE(a, b, c)</code> returns the first non-NULL argument.<br><br>A fallback can make a report readable, but it does not fill in the stored database value. A zero course ID in a result can stand for “unassigned” only if the report defines that convention.<br><br>Real SQL Server has type-conversion rules for these functions. Keep compatible types together: use a number as the replacement for a numeric column. This simulator teaches the common cases, not every type-conversion detail.",
    "example": "SELECT name, ISNULL(course_id, 0) AS assigned_course\nFROM students;",
    "steps": [
      "Read the student course_id.",
      "Replace NULL with the number 0 in the output.",
      "Leave assigned course IDs unchanged."
    ],
    "pitfall": "Replacing NULL in SELECT does not make WHERE course_id = 0 find the original NULL row.",
    "task": "Return name and ISNULL(course_id, 0) AS course_id for every student.",
    "answer": "SELECT name, ISNULL(course_id, 0) AS course_id FROM students;",
    "hint": "Apply ISNULL to course_id and give the expression the alias course_id.",
    "minutes": 20,
    "names": true,
    "level": "intermediate",
    "position": 5
  },
  {
    "id": "case",
    "title": "Give rows a category",
    "short": "CASE expressions",
    "body": "<code>CASE</code> returns a value based on conditions. A searched CASE uses WHEN condition THEN value pairs, followed by an optional ELSE and a required END. It is an expression, so it can appear in SELECT and be given an alias.<br><br>Conditions are checked from top to bottom. The first true condition wins. If none match and ELSE is absent, CASE returns NULL. Put narrower or higher-threshold conditions before broader ones.<br><br>This is useful for reporting categories without changing stored records. A score label is calculated for the result; the students table stays unchanged.",
    "example": "SELECT name,\n  CASE WHEN score >= 80 THEN 'Pass'\n       ELSE 'Review' END AS result\nFROM students;",
    "steps": [
      "Check each score against 80.",
      "Return Pass when the condition is true; otherwise return Review.",
      "Name the calculated output result."
    ],
    "pitfall": "Do not forget END. Use single quotes around text labels.",
    "task": "Return name and a column named band: High for scores of at least 90, otherwise Standard.",
    "answer": "SELECT name, CASE WHEN score >= 90 THEN 'High' ELSE 'Standard' END AS band FROM students;",
    "hint": "Use CASE WHEN score >= 90 THEN 'High' ELSE 'Standard' END AS band.",
    "minutes": 20,
    "names": true,
    "level": "intermediate",
    "position": 6
  },
  {
    "id": "text-functions",
    "title": "Clean and measure text",
    "short": "Text functions",
    "body": "<code>UPPER</code> and <code>LOWER</code> change letter case in the returned result. <code>LEN</code> counts characters, excluding trailing spaces in SQL Server. These functions can help produce consistent labels and inspect data quality.<br><br>Functions can be nested, but start with one transformation at a time. Give each calculated column an alias so the result remains readable. A transformation in SELECT does not modify the original name.<br><br>For this exercise we use simple English names. Unicode character counting and comparisons can depend on SQL Server collation, so advanced text processing should be checked on the real server.",
    "example": "SELECT name, LEN(name) AS name_length\nFROM students;",
    "steps": [
      "Read each name.",
      "LEN calculates its length without trailing spaces.",
      "AS name_length gives the calculated column a clear heading."
    ],
    "pitfall": "LEN ignores trailing spaces. Do not confuse character count with storage size.",
    "task": "Return UPPER(name) AS student_name and LEN(name) AS name_length for all students.",
    "answer": "SELECT UPPER(name) AS student_name, LEN(name) AS name_length FROM students;",
    "hint": "Use two expressions separated by a comma, with the requested aliases.",
    "minutes": 20,
    "names": true,
    "level": "intermediate",
    "position": 7
  },
  {
    "title": "A query inside a query",
    "short": "Subqueries",
    "body": "A subquery is a query inside another query. Parentheses let you use its result in a comparison. It helps answer questions such as “Who scored above the class average?”<br><br>A scalar subquery supplies one value to an outer query. The inner AVG calculates the reference value, and the outer WHERE compares each student against it. Write and run the inner query by itself first when debugging. More than one returned value is not valid for a scalar comparison in SQL Server.",
    "example": "SELECT name FROM students\nWHERE age > (SELECT AVG(CAST(age AS FLOAT)) FROM students);",
    "task": "Return name and score for students scoring above the average score, highest score first.",
    "hint": "Compare score to (SELECT AVG(CAST(score AS FLOAT)) FROM students), then ORDER BY score DESC.",
    "answer": "SELECT name, score FROM students WHERE score > (SELECT AVG(CAST(score AS FLOAT)) FROM students) ORDER BY score DESC;",
    "ordered": true,
    "id": "original-11",
    "legacy": 11,
    "steps": [
      "The inner query finds the average age as a decimal.",
      "The outer query compares each age to that value.",
      "Your challenge compares scores and then sorts the matching students from highest to lowest."
    ],
    "pitfall": "Use > for strictly above average. >= includes students whose score equals the average.",
    "minutes": 15,
    "objective": "Return name and score for students scoring above the average score, highest score first.",
    "level": "intermediate",
    "position": 8
  },
  {
    "id": "exists",
    "title": "Ask whether a match exists",
    "short": "EXISTS",
    "body": "<code>EXISTS</code> tests whether a subquery returns at least one row. It is useful when you want to keep an outer row based on a related record, without copying columns from the related table.<br><br>A correlated subquery refers to the current outer row. Here, s.course_id = c.id asks whether this particular course has a student. The SELECT 1 inside EXISTS is conventional; the existence of a row matters, not that selected value.<br><br>Unlike a join, EXISTS does not duplicate the course if several students match. That makes it useful for yes-or-no relationship questions.",
    "example": "SELECT c.title\nFROM courses AS c\nWHERE EXISTS (\n  SELECT 1 FROM students AS s\n  WHERE s.course_id = c.id\n);",
    "steps": [
      "Consider one course at a time.",
      "Look for any student with that course ID.",
      "Keep the course if at least one match exists."
    ],
    "pitfall": "Without the correlation condition, one student anywhere could make every course qualify.",
    "task": "Return titles of courses that have at least one student scoring 90 or above.",
    "answer": "SELECT c.title FROM courses c WHERE EXISTS (SELECT 1 FROM students s WHERE s.course_id = c.id AND s.score >= 90);",
    "hint": "Put both the course match and s.score >= 90 inside EXISTS.",
    "minutes": 20,
    "level": "intermediate",
    "position": 9
  },
  {
    "id": "join-summary",
    "title": "Count students per course",
    "short": "Join then aggregate",
    "body": "A report often needs descriptive names from one table and counts from another. Start from courses so that courses with no students can remain, then LEFT JOIN students and group by the course identity.<br><br>Count <code>students.id</code>, not COUNT(*). An unmatched course still has a left-hand row after the join, so COUNT(*) would misleadingly report one. COUNT(students.id) ignores the NULL supplied by an unmatched join.<br><br>Group by both course id and title. The id distinguishes courses even if two happen to have the same title. This avoids merging unrelated courses with identical names.",
    "example": "SELECT c.title, COUNT(s.id) AS total\nFROM courses AS c\nLEFT JOIN students AS s ON s.course_id = c.id\nGROUP BY c.id, c.title;",
    "steps": [
      "Keep each course, even when it has no students.",
      "Match student records using the course ID.",
      "Count non-NULL student IDs inside each course group."
    ],
    "pitfall": "COUNT(*) counts an unmatched left-side row. Count the right-side student ID instead.",
    "task": "Return course title and COUNT(s.id) AS total for every course, sorted by course title.",
    "answer": "SELECT c.title, COUNT(s.id) AS total FROM courses AS c LEFT JOIN students AS s ON s.course_id = c.id GROUP BY c.id, c.title ORDER BY c.title;",
    "hint": "Start from courses c, LEFT JOIN students s, and count s.id.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "intermediate",
    "position": 10
  },
  {
    "id": "derived",
    "title": "Query a calculated table",
    "short": "Derived tables",
    "body": "A derived table is a SELECT query placed in the FROM clause. Its output behaves like a temporary input for the outer query. In SQL Server, give that derived table an alias.<br><br>This is useful when a calculation needs another step. For example, first calculate the average for each city, then filter those averages in the outer query. The inner SELECT must expose every column the outer query needs.<br><br>A derived table lasts only for this statement. It does not create a stored table. Use meaningful output aliases so the outer query is easy to understand.",
    "example": "SELECT summary.city, summary.average_score\nFROM (\n  SELECT city, AVG(CAST(score AS FLOAT)) AS average_score\n  FROM students GROUP BY city\n) AS summary\nWHERE summary.average_score >= 80;",
    "steps": [
      "The inner query produces one average per city.",
      "summary names that intermediate result.",
      "The outer WHERE filters its calculated average_score column."
    ],
    "pitfall": "Do not reference an inner table alias from outside the derived table. Only its output columns are visible.",
    "task": "Return city and average_score for cities averaging at least 85, sorted by city.",
    "answer": "SELECT summary.city, summary.average_score FROM (SELECT city, AVG(CAST(score AS FLOAT)) AS average_score FROM students GROUP BY city) AS summary WHERE summary.average_score >= 85 ORDER BY city;",
    "hint": "Build the city averages first; filter average_score >= 85 in an outer query.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 1
  },
  {
    "id": "cte",
    "title": "Name the steps of a query",
    "short": "Common table expressions",
    "body": "A common table expression (CTE) gives a name to a query result for the statement immediately after it. Begin with <code>WITH name AS (...)</code>, then read from that name.<br><br>A CTE helps separate the steps of a problem. Write the inner query first and verify its output, then use the named result in the outer query. It is not automatically a stored table, a saved view, or a performance improvement.<br><br>When another statement precedes WITH in SQL Server, terminate that statement with a semicolon. Each CTE name and column alias should explain what its rows represent.<br><br>For multiple stages, define further CTEs after a comma in the same WITH clause. Later CTEs can refer to earlier ones.",
    "example": "WITH strong_students AS (\n  SELECT name, score FROM students WHERE score >= 85\n)\nSELECT name, score FROM strong_students;",
    "steps": [
      "Create a named result containing scores of at least 85.",
      "The outer SELECT reads that result.",
      "The CTE is available only to this statement."
    ],
    "pitfall": "A CTE must be followed by a statement that uses it. It cannot be run alone.",
    "task": "Use a CTE named strong_students to return name and score for scores at least 85, highest score first.",
    "answer": "WITH strong_students AS (SELECT name, score FROM students WHERE score >= 85) SELECT name, score FROM strong_students ORDER BY score DESC;",
    "hint": "Place the filter in WITH strong_students AS (...), then select and order the CTE result.",
    "minutes": 20,
    "ordered": true,
    "level": "advanced",
    "position": 2
  },
  {
    "id": "row-number",
    "title": "Number rows inside a group",
    "short": "ROW_NUMBER",
    "body": "Window functions calculate values across related rows while keeping the detail rows. <code>ROW_NUMBER() OVER (...)</code> assigns a sequential number. <code>PARTITION BY</code> restarts the numbering for each group.<br><br>The ORDER BY inside OVER defines the numbering order. It does not guarantee the display order of the final result; use an outer ORDER BY for that. Add a unique tie-breaker, such as id, for repeatable row numbering.<br><br>This differs from GROUP BY: a grouped report collapses many students into one city row, while a window function keeps one row per student.",
    "example": "SELECT name, city, score,\n ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC, id) AS position\nFROM students;",
    "steps": [
      "Partition the students by city.",
      "Number each city from highest score to lowest, using id for ties.",
      "Keep the original name, city and score beside the new position."
    ],
    "pitfall": "Without a tie-breaker, tied rows can receive different row numbers on different runs.",
    "task": "Return name, city, score and position using the example, sorted by city then position.",
    "answer": "SELECT name, city, score, ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC, id) AS position FROM students ORDER BY city, position;",
    "hint": "Use ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC, id), then order the final result.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 3
  },
  {
    "id": "ranking",
    "title": "Understand ranking ties",
    "short": "RANK & DENSE_RANK",
    "body": "<code>RANK</code> gives tied values the same rank and then skips numbers. <code>DENSE_RANK</code> also shares ranks for ties but does not leave gaps. <code>ROW_NUMBER</code> always gives each row a different number.<br><br>Imagine scores 95, 95, and 90: RANK gives 1, 1, 3; DENSE_RANK gives 1, 1, 2. Choose based on whether the report means row positions or distinct score bands.<br><br>Do not add a unique id to the window ordering when you want equal scores to share a rank. Add it to the outer ordering only if you need a stable display order among ties.",
    "example": "SELECT name, age,\n DENSE_RANK() OVER (ORDER BY age DESC) AS age_rank\nFROM students;",
    "steps": [
      "Order age values from oldest to youngest.",
      "Give equal ages the same rank.",
      "Use consecutive ranks for each distinct age."
    ],
    "pitfall": "Including id inside DENSE_RANK ordering breaks the ties you intended to preserve.",
    "task": "Return name, age and age_rank using DENSE_RANK for ages descending; display by age descending then name.",
    "answer": "SELECT name, age, DENSE_RANK() OVER (ORDER BY age DESC) AS age_rank FROM students ORDER BY age DESC, name;",
    "hint": "Keep only age DESC inside OVER; sort the display by age DESC, name.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 4
  },
  {
    "id": "running",
    "title": "Calculate a running total",
    "short": "Window frames",
    "body": "A windowed SUM can calculate a cumulative total while preserving each row. The window frame defines exactly which rows participate in the calculation for the current row.<br><br><code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> means start at the first ordered row and end at this row. Specify a unique ordering so that the cumulative sequence is unambiguous.<br><br>Running totals are useful for balances and cumulative activity. Here we use scores ordered by student id to demonstrate the mechanics. This is an illustrative running total, not a meaningful measure of academic progress over time.",
    "example": "SELECT id, name, score,\n SUM(score) OVER (ORDER BY id\n ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_score\nFROM students\nORDER BY id;",
    "steps": [
      "Order records by id.",
      "For each record, sum from the first row through the current row.",
      "Display each original score alongside the cumulative value."
    ],
    "pitfall": "Do not rely on an implicit window frame when ties could change which rows are included.",
    "task": "Return id, name, score and running_score using the worked example, in id order.",
    "answer": "SELECT id, name, score, SUM(score) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_score FROM students ORDER BY id;",
    "hint": "Use SUM(score) OVER with the explicit ROWS frame.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 5
  },
  {
    "id": "lag",
    "title": "Compare neighboring rows",
    "short": "LAG & LEAD",
    "body": "<code>LAG(column)</code> returns a value from an earlier row in the window order. <code>LEAD(column)</code> looks forward instead. Without a prior row, LAG returns NULL unless a default is supplied.<br><br>The ordering determines what “previous” means. ORDER BY id means the preceding student ID, not the previous day or previous exam. In time-based reports, choose a date and a tie-breaker that match the question.<br><br>Keep NULL at the first row if there really is no previous record. Replacing it with zero can create a misleading first difference.",
    "example": "SELECT id, name, score,\n LAG(score) OVER (ORDER BY id) AS previous_score\nFROM students ORDER BY id;",
    "steps": [
      "Arrange students by id.",
      "Read the score from the preceding row.",
      "The first row has no predecessor, so its previous_score is NULL."
    ],
    "pitfall": "The order inside OVER defines the comparison. The physical table order does not.",
    "task": "Return id, name, score and previous_score using LAG(score) in id order.",
    "answer": "SELECT id, name, score, LAG(score) OVER (ORDER BY id) AS previous_score FROM students ORDER BY id;",
    "hint": "Use LAG(score) OVER (ORDER BY id) AS previous_score.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 6
  },
  {
    "id": "top-per-group",
    "title": "Find the best row per group",
    "short": "Top per group",
    "body": "TOP (1) returns one row from the whole result, not one per city. To find one winner per city, first number rows within each city, then keep position 1 in an outer query.<br><br>A CTE makes the two stages explicit. SQL Server does not allow filtering a window result directly in the same SELECT’s WHERE clause, because the window expression is evaluated later.<br><br>Choose a tie policy. ROW_NUMBER with id as a tie-breaker returns exactly one winner. RANK could return multiple tied winners. For this challenge, return one student for each city.",
    "example": "WITH ranked AS (\n SELECT name, city, score,\n ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC, id) AS position\n FROM students\n)\nSELECT name, city, score FROM ranked\nWHERE position = 1 ORDER BY city;",
    "steps": [
      "Rank students separately in each city.",
      "Choose one deterministic first row per city.",
      "Filter position = 1 in the outer SELECT."
    ],
    "pitfall": "WHERE ROW_NUMBER() ... = 1 in the same query is not the correct SQL Server pattern.",
    "task": "Return name, city and score for the highest-scoring student in each city, sorted by city.",
    "answer": "WITH ranked AS (SELECT name, city, score, ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC, id) AS position FROM students) SELECT name, city, score FROM ranked WHERE position = 1 ORDER BY city;",
    "hint": "Use the ranked CTE and filter position = 1 outside it.",
    "minutes": 20,
    "ordered": true,
    "level": "advanced",
    "position": 7
  },
  {
    "id": "conditional-aggregate",
    "title": "Count categories side by side",
    "short": "Conditional aggregation",
    "body": "A CASE expression inside SUM can count rows matching a condition. Return 1 for a matching row and 0 otherwise, then add those values within each group.<br><br>This produces several measures in one grouped report without separate queries for every category. The grouping columns define the report’s grain. If the report is one row per city, avoid accidentally grouping by individual student names.<br><br>Write the threshold once and check the boundary carefully. “At least 85” includes a score of 85. Use ELSE 0 to make the non-matching contribution explicit.",
    "example": "SELECT city, COUNT(*) AS total,\n SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) AS strong_students\nFROM students GROUP BY city;",
    "steps": [
      "Count every student per city.",
      "Convert each score test to 1 or 0.",
      "Sum those flags to count qualifying students in that city."
    ],
    "pitfall": "COUNT(CASE ... ELSE 0 END) counts zeros too, because they are non-NULL. Use SUM for 1/0 flags.",
    "task": "Return city, total and strong_students for scores >= 85, sorted by city.",
    "answer": "SELECT city, COUNT(*) AS total, SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) AS strong_students FROM students GROUP BY city ORDER BY city;",
    "hint": "SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) counts the qualifying students.",
    "minutes": 20,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 8
  },
  {
    "id": "sets",
    "title": "Combine compatible results",
    "short": "UNION & UNION ALL",
    "body": "<code>UNION</code> stacks compatible result sets and removes duplicate rows. <code>UNION ALL</code> stacks them while keeping duplicates. This differs from a JOIN, which places matching columns beside one another.<br><br>Each SELECT must return the same number of columns in corresponding positions with compatible types. Output column names come from the first SELECT. Put the final ORDER BY after the combined query.<br><br>Choose UNION ALL when duplicates are meaningful or known to be impossible. Use UNION when you deliberately need a distinct combined set. Removing duplicates can hide mistakes, so understand where they came from.",
    "example": "SELECT city FROM students WHERE score >= 90\nUNION\nSELECT city FROM students WHERE age >= 24\nORDER BY city;",
    "steps": [
      "Get cities of students scoring at least 90.",
      "Add cities of students aged at least 24.",
      "Remove repeated cities and sort the combined list."
    ],
    "pitfall": "UNION combines rows; JOIN combines related columns. They solve different problems.",
    "task": "Return the distinct cities of students scoring >= 90 or aged >= 24 using UNION, sorted by city.",
    "answer": "SELECT city FROM students WHERE score >= 90 UNION SELECT city FROM students WHERE age >= 24 ORDER BY city;",
    "hint": "Use two one-column SELECT statements with UNION between them.",
    "minutes": 20,
    "ordered": true,
    "level": "advanced",
    "position": 9
  },
  {
    "id": "capstone",
    "title": "Build a course performance report",
    "short": "Advanced capstone",
    "body": "A reliable report starts with a clear question and grain. Here the grain is one row per course, including courses with no students. We want enrolment, high-score counts and a decimal average.<br><br>First aggregate the students by course_id. Then join that summary to the courses table so every course is retained. Replace a missing count with zero, but leave a missing average as NULL: no students is not the same as an average score of zero.<br><br>Validate the output. There should be four course rows. Student counts sum to seven because Emeka is unassigned. Cybersecurity should have total 0, strong_students 0 and average_score NULL. These checks help catch join mistakes that a syntactically valid query can still contain.",
    "example": "WITH performance AS (\n SELECT course_id, COUNT(*) AS total,\n SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) AS strong_students,\n AVG(CAST(score AS FLOAT)) AS average_score\n FROM students GROUP BY course_id\n)\nSELECT c.title, ISNULL(p.total, 0) AS total,\n ISNULL(p.strong_students, 0) AS strong_students, p.average_score\nFROM courses c LEFT JOIN performance p ON p.course_id = c.id\nORDER BY c.title;",
    "steps": [
      "Summarize enrolment, high scores and decimal averages by course ID.",
      "LEFT JOIN that summary to all courses.",
      "Use zero for absent counts and retain NULL for an absent average."
    ],
    "pitfall": "Averages cannot always be averaged again safely. When combining groups, use their totals and counts or return to the original rows.",
    "task": "Build the report in the example: title, total, strong_students and average_score for every course, sorted by title.",
    "answer": "WITH performance AS (SELECT course_id, COUNT(*) AS total, SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) AS strong_students, AVG(CAST(score AS FLOAT)) AS average_score FROM students GROUP BY course_id) SELECT c.title, ISNULL(p.total, 0) AS total, ISNULL(p.strong_students, 0) AS strong_students, p.average_score FROM courses c LEFT JOIN performance p ON p.course_id = c.id ORDER BY c.title;",
    "hint": "Build the performance CTE first, then LEFT JOIN from courses and replace only missing counts.",
    "minutes": 35,
    "ordered": true,
    "names": true,
    "level": "advanced",
    "position": 10
  }
];
if(typeof module !== "undefined") module.exports={seed,courses,lessons};
