/**
 * Stored Procedure generator for AutoDBA.
 * Generates enterprise-grade, production-ready stored procedures across T-SQL, PostgreSQL, and MySQL.
 * Pure TypeScript, zero runtime dependencies, runs 100% client-side with zero token cost.
 */

import type { Dialect } from "./types";

export interface StoredProcedureOptions {
  sql: string;
  dialect: Dialect;
  databaseName?: string;
  schemaName?: string;
  procedureName?: string;
  includeBatches?: boolean; // USE [DB]; GO
  includeAnsiSettings?: boolean; // SET ANSI_NULLS ON; GO, SET QUOTED_IDENTIFIER ON; GO
  includeErrorHandling?: boolean; // BEGIN TRY ... END TRY BEGIN CATCH THROW; END CATCH
  includeNoCount?: boolean; // SET NOCOUNT ON; SET XACT_ABORT ON;
  author?: string;
}

export interface ExtractedParam {
  name: string;
  type: string;
}

/**
 * Extracts parameter variables from SQL query (e.g. @CommunityId, @StartDate).
 * Infers SQL Server data types based on naming conventions.
 */
export function extractParams(sql: string): ExtractedParam[] {
  if (!sql) return [];
  const matches = sql.match(/@[A-Za-z0-9_]+/g) || [];
  const unique = Array.from(new Set(matches));

  return unique.map((param) => {
    const lower = param.toLowerCase();
    let type = "NVARCHAR(100)";

    if (
      lower.endsWith("id") ||
      lower.includes("id_") ||
      lower.includes("count") ||
      lower.includes("year") ||
      lower.includes("month") ||
      lower.includes("num")
    ) {
      type = "INT";
    } else if (lower.includes("date") || lower.includes("time")) {
      type = "DATETIME2";
    } else if (
      lower.includes("amount") ||
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("total") ||
      lower.includes("rate") ||
      lower.includes("balance")
    ) {
      type = "DECIMAL(18,2)";
    } else if (lower.startsWith("@is") || lower.startsWith("@has") || lower.includes("flag")) {
      type = "BIT";
    }

    return { name: param, type };
  });
}

/**
 * Attempts to infer primary table name from the query to suggest an intuitive procedure name.
 * e.g., FROM dbo.Leads -> sp_GetLeads
 */
export function inferProcedureName(sql: string, defaultName = "sp_GetData"): string {
  if (!sql) return defaultName;
  const match = sql.match(/FROM\s+(?:\[?[A-Za-z0-9_]+\]?\.)?\[?([A-Za-z0-9_]+)\]?/i);
  if (match && match[1]) {
    const cleanTbl = match[1].replace(/[^A-Za-z0-9_]/g, "");
    if (cleanTbl) {
      return `sp_Get${cleanTbl}`;
    }
  }
  return defaultName;
}

/**
 * Indents a block of text with a specific number of spaces.
 */
function indentText(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line.trim() ? pad + line : ""))
    .join("\n");
}

/**
 * Formats T-SQL parameters with aligned column widths.
 */
function formatTsqlParams(params: ExtractedParam[]): string {
  if (params.length === 0) return "";
  const maxNameLen = Math.max(...params.map((p) => p.name.length));
  const lines = params.map((p, idx) => {
    const isLast = idx === params.length - 1;
    const pad = " ".repeat(Math.max(1, maxNameLen - p.name.length + 2));
    const comma = isLast ? "" : ",";
    return `    ${p.name}${pad}${p.type} = NULL${comma}`;
  });
  return lines.join("\n");
}

/**
 * Formats PostgreSQL parameters.
 */
function formatPostgresParams(params: ExtractedParam[]): string {
  if (params.length === 0) return "";
  const lines = params.map((p, idx) => {
    const isLast = idx === params.length - 1;
    const cleanName = p.name.replace(/^@/, "p_").toLowerCase();
    let pgType = "TEXT";
    if (p.type === "INT") pgType = "INTEGER";
    else if (p.type === "DATETIME2") pgType = "TIMESTAMP";
    else if (p.type.startsWith("DECIMAL")) pgType = "NUMERIC";
    else if (p.type === "BIT") pgType = "BOOLEAN";

    const comma = isLast ? "" : ",";
    return `    ${cleanName} ${pgType} DEFAULT NULL${comma}`;
  });
  return lines.join("\n");
}

/**
 * Formats MySQL parameters.
 */
function formatMysqlParams(params: ExtractedParam[]): string {
  if (params.length === 0) return "";
  const lines = params.map((p, idx) => {
    const isLast = idx === params.length - 1;
    const cleanName = p.name.replace(/^@/, "p_");
    let myType = "VARCHAR(100)";
    if (p.type === "INT") myType = "INT";
    else if (p.type === "DATETIME2") myType = "DATETIME";
    else if (p.type.startsWith("DECIMAL")) myType = "DECIMAL(18,2)";
    else if (p.type === "BIT") myType = "TINYINT(1)";

    const comma = isLast ? "" : ",";
    return `    IN ${cleanName} ${myType}${comma}`;
  });
  return lines.join("\n");
}

/**
 * Generates a full stored procedure creation script based on the specified options.
 */
export function generateStoredProcedure(options: StoredProcedureOptions): string {
  const {
    sql,
    dialect,
    databaseName = "AppDB",
    schemaName = "dbo",
    procedureName = "sp_GetData",
    includeBatches = true,
    includeAnsiSettings = true,
    includeErrorHandling = true,
    includeNoCount = true,
    author = "AutoDBA",
  } = options;

  const dateStr = new Date().toISOString().split("T")[0];
  const cleanSql = sql.trim();
  const params = extractParams(cleanSql);

  // ---------------------------------------------------------
  // 1. T-SQL / SQL Server
  // ---------------------------------------------------------
  if (dialect === "tsql") {
    const parts: string[] = [];

    // Optional USE batch
    if (includeBatches) {
      parts.push(`USE [${databaseName}];\nGO\n`);
    }

    // Optional ANSI settings
    if (includeAnsiSettings) {
      parts.push("SET ANSI_NULLS ON;\nGO\nSET QUOTED_IDENTIFIER ON;\nGO\n");
    }

    // Documentation header
    parts.push(
      `-- =============================================\n` +
      `-- Author:      ${author}\n` +
      `-- Create Date: ${dateStr}\n` +
      `-- Description: Stored procedure for [${schemaName}].[${procedureName}]\n` +
      `-- =============================================`
    );

    // Procedure header & parameters
    const paramBlock = formatTsqlParams(params);
    let procSignature = `CREATE OR ALTER PROCEDURE [${schemaName}].[${procedureName}]`;
    if (paramBlock) {
      procSignature += `\n${paramBlock}`;
    }

    // Procedure body
    const bodyIndent = includeErrorHandling ? 8 : 4;
    const indentedSql = indentText(cleanSql, bodyIndent);

    let body = "";
    if (includeNoCount) {
      body += "    SET NOCOUNT ON;\n    SET XACT_ABORT ON;\n\n";
    }

    if (includeErrorHandling) {
      body +=
        `    BEGIN TRY\n` +
        `${indentedSql}\n` +
        `    END TRY\n` +
        `    BEGIN CATCH\n` +
        `        -- Preserve error line number, severity, and state\n` +
        `        THROW;\n` +
        `    END CATCH;`;
    } else {
      body += indentedSql;
    }

    parts.push(
      `${procSignature}\n` +
      `AS\n` +
      `BEGIN\n` +
      `${body}\n` +
      `END;\n` +
      `GO`
    );

    return parts.join("\n");
  }

  // ---------------------------------------------------------
  // 2. PostgreSQL
  // ---------------------------------------------------------
  if (dialect === "postgres") {
    const pgSchema = schemaName === "dbo" ? "public" : schemaName.toLowerCase();
    const pgProc = procedureName.toLowerCase();
    const paramBlock = formatPostgresParams(params);

    const docHeader =
      `-- =============================================\n` +
      `-- Author:      ${author}\n` +
      `-- Create Date: ${dateStr}\n` +
      `-- Description: Stored procedure for ${pgSchema}.${pgProc}\n` +
      `-- =============================================\n`;

    const sig = `CREATE OR REPLACE PROCEDURE ${pgSchema}.${pgProc}(${
      paramBlock ? `\n${paramBlock}\n` : ""
    })\nLANGUAGE plpgsql\nAS $$\nBEGIN\n${indentText(cleanSql, 4)}\nEND;\n$$;`;

    return docHeader + sig;
  }

  // ---------------------------------------------------------
  // 3. MySQL
  // ---------------------------------------------------------
  const myProc = procedureName.replace(/[^A-Za-z0-9_]/g, "");
  const myParamBlock = formatMysqlParams(params);

  const docHeader =
    `-- =============================================\n` +
    `-- Author:      ${author}\n` +
    `-- Create Date: ${dateStr}\n` +
    `-- Description: Stored procedure for ${myProc}\n` +
    `-- =============================================\n`;

  const script =
    `DELIMITER $$\n\n` +
    `DROP PROCEDURE IF EXISTS \`${myProc}\`$$\n` +
    `CREATE PROCEDURE \`${myProc}\`(${
      myParamBlock ? `\n${myParamBlock}\n` : ""
    })\n` +
    `BEGIN\n` +
    `${indentText(cleanSql, 4)}\n` +
    `END$$\n\n` +
    `DELIMITER ;`;

  return docHeader + script;
}
