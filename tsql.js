// A deliberately small, offline T-SQL teaching adapter, not a SQL Server engine.
function tsqlTokens(sql) {
  const tokens = [];
  const pattern = /\s+|--[^\r\n]*|\/\*[\s\S]*?\*\/|N?'(?:''|[^'])*'|\[(?:\]\]|[^\]])*\]|"(?:""|[^"])*"|[A-Za-z_][A-Za-z_0-9]*|\d+(?:\.\d+)?|>=|<=|<>|!=|!<|!>|./giy;
  let match;
  while ((match = pattern.exec(sql))) {
    const text = match[0];
    if (/^\s|^--|^\/\*/.test(text)) continue;
    tokens.push({text, word: /^[A-Za-z_][A-Za-z_0-9]*$/.test(text) ? text.toUpperCase() : '', start: match.index, end: pattern.lastIndex});
  }
  return tokens;
}
function translateTsql(sql) {
  const tokens = tsqlTokens(sql);
  if (!tokens.length) throw Error('Write a SELECT query first.');
  // Only a standalone GO line is a batch separator. Strings/comments remain intact.
  for (const t of tokens) {
    if (t.word === 'GO') {
      const begin = sql.lastIndexOf('\n', t.start - 1) + 1;
      const end = sql.indexOf('\n', t.end);
      const line = sql.slice(begin, end < 0 ? sql.length : end);
      if (!/^\s*GO\s*(?:--[^\r\n]*)?\r?$/i.test(line)) throw Error('Use GO on its own line, without a repeat count.');
      t.text = ';'; t.word = '';
    }
  }
  const statements = []; let batch = [];
  for (const token of tokens) {
    if (token.text === ';') { if (batch.length) statements.push(batch); batch = []; }
    else batch.push(token);
  }
  if (batch.length) statements.push(batch);
  if (!statements.length) throw Error('Write a SELECT query first.');
  return statements.map(translateStatement).join(';\n');
}
function translateStatement(tokens) {
  if (tokens[0].word !== 'SELECT') throw Error('This offline simulator supports SELECT exercises only. USE, CREATE, INSERT, UPDATE, procedures and server administration require SQL Server.');
  const blocked = new Set(['LIMIT','IFNULL','PRAGMA','ATTACH','DETACH','INTO','PERCENT','TIES','OFFSET','FETCH','COLLATE','OVER']);
  for (const t of tokens) {
    if (blocked.has(t.word)) throw Error(t.word === 'LIMIT' ? 'Use SQL Server syntax: SELECT TOP (3) ... ORDER BY ...; LIMIT is not T-SQL.' : `${t.text} is not supported in this offline practice simulator.`);
    if (t.text === '`' || t.text === '@' || t.text === '|') throw Error('Use the supported T-SQL lesson syntax. Variables, backticks and || are not supported.');
  }
  function transform(items) {
    const output = []; let top = null; let seenSelect = false;
    for (let i = 0; i < items.length; i++) {
      const t = items[i];
      if (t.word === 'SELECT') {
        if (seenSelect) throw Error('Separate queries with a semicolon or GO.');
        seenSelect = true; output.push('SELECT');
        if (['DISTINCT','ALL'].includes(items[i+1]?.word)) output.push(items[++i].text);
        if (items[i+1]?.word === 'TOP') {
          i += 2;
          const paren = items[i]?.text === '(';
          if (paren) i++;
          if (!/^\d+$/.test(items[i]?.text || '')) throw Error('Use TOP with a non-negative whole number, such as TOP (3).');
          top = Number(items[i].text);
          if (!Number.isSafeInteger(top)) throw Error('TOP value is too large.');
          if (paren && items[++i]?.text !== ')') throw Error('Close the TOP number with a parenthesis: TOP (3).');
        }
      } else if (t.text === '(') {
        let end = i+1, depth = 1;
        for (; end < items.length; end++) { if(items[end].text==='(') depth++; if(items[end].text===')' && --depth===0) break; }
        if (depth) throw Error('Missing closing parenthesis.');
        output.push('(', ...transform(items.slice(i+1,end)), ')'); i = end;
      } else if (t.text === ')') throw Error('Unexpected closing parenthesis.');
      else if (t.word === 'TOP') throw Error('Place TOP immediately after SELECT (or SELECT DISTINCT).');
      else if (['UNION','EXCEPT','INTERSECT'].includes(t.word)) throw Error('Set operators are not included in this offline simulator.');
      else if ((t.word === 'DBO' || t.text.toUpperCase() === '[DBO]') && items[i+1]?.text === '.') i++;
      else if (t.word === 'ISNULL' && items[i+1]?.text === '(') output.push('IFNULL');
      else if (t.word === 'LEN' && items[i+1]?.text === '(') output.push('TSQL_LEN');
      else if (t.word === 'GETDATE' && items[i+1]?.text === '(') output.push('TSQL_GETDATE');
      else if (/^N'/i.test(t.text)) output.push(t.text.slice(1));
      else output.push(t.text);
    }
    if (top !== null) output.push('LIMIT', String(top));
    return output;
  }
  return transform(tokens).join(' ');
}
if (typeof module !== 'undefined') module.exports = {translateTsql, tsqlTokens};
