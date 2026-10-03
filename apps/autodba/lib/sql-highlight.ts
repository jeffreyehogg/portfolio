/**
 * Lightweight, zero-runtime-dependency SQL syntax tokenizer for high-craft dark mode rendering.
 * Avoids heavy Monaco/Prism bundles to keep LCP and bundle size optimal.
 */

import React from "react";

const KEYWORDS = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "INNER",
  "LEFT",
  "RIGHT",
  "FULL",
  "CROSS",
  "JOIN",
  "ON",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "AS",
  "GROUP",
  "BY",
  "ORDER",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "TOP",
  "UNION",
  "ALL",
  "DISTINCT",
  "WITH",
  "NOLOCK",
  "EXISTS",
  "BETWEEN",
  "LIKE",
  "ILIKE",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "OVER",
  "PARTITION",
  "ROWS",
  "PRECEDING",
  "UNBOUNDED",
  "INSERT",
  "UPDATE",
  "DELETE",
  "CREATE",
  "ALTER",
  "DROP",
  "TABLE",
  "INDEX",
  "NONCLUSTERED",
  "CLUSTERED",
  "INCLUDE",
  "ASC",
  "DESC",
]);

const FUNCTIONS = new Set([
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "YEAR",
  "MONTH",
  "DAY",
  "DATEPART",
  "CONVERT",
  "CAST",
  "SUBSTRING",
  "UPPER",
  "LOWER",
  "TRIM",
  "LTRIM",
  "RTRIM",
  "ISNULL",
  "COALESCE",
  "IFNULL",
  "DATE_TRUNC",
  "DATE",
  "DATEADD",
  "DATEDIFF",
  "RAND",
  "RANDOM",
  "NEWID",
]);

const TOKEN_REGEX =
  /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:''|[^'])*'|"(?:""|[^"])*"|\[[^\]]+\]|@[A-Za-z0-9_]+|#[A-Za-z0-9_]+|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*|::[A-Za-z0-9_]+|[(),;.]|[!=<>+\-*/%]+|\s+)/g;

export interface TokenSpan {
  text: string;
  className: string;
}

export function tokenizeSql(sql: string): TokenSpan[] {
  if (!sql) return [];
  const spans: TokenSpan[] = [];
  const matches = sql.match(TOKEN_REGEX) || [sql];

  for (const m of matches) {
    if (/^\s+$/.test(m)) {
      spans.push({ text: m, className: "" });
    } else if (m.startsWith("--") || m.startsWith("/*")) {
      spans.push({ text: m, className: "text-slate-500 italic" });
    } else if (m.startsWith("'") || m.startsWith('"')) {
      spans.push({ text: m, className: "text-emerald-400" });
    } else if (m.startsWith("[") && m.endsWith("]")) {
      spans.push({ text: m, className: "text-cyan-300 font-medium" });
    } else if (m.startsWith("@") || m.startsWith("#")) {
      spans.push({ text: m, className: "text-amber-300 font-medium" });
    } else if (/^\d+(?:\.\d+)?$/.test(m)) {
      spans.push({ text: m, className: "text-amber-400" });
    } else if (m.startsWith("::")) {
      spans.push({ text: m, className: "text-purple-400" });
    } else {
      const upper = m.toUpperCase();
      if (KEYWORDS.has(upper)) {
        spans.push({ text: m, className: "text-indigo-400 font-semibold" });
      } else if (FUNCTIONS.has(upper)) {
        spans.push({ text: m, className: "text-cyan-400 font-medium" });
      } else if (/^[(),;.]$/.test(m)) {
        spans.push({ text: m, className: "text-slate-400" });
      } else if (/^[!=<>+\-*/%]+$/.test(m)) {
        spans.push({ text: m, className: "text-rose-400" });
      } else {
        spans.push({ text: m, className: "text-slate-200" });
      }
    }
  }

  return spans;
}
