/**
 * AutoDBA TypeScript data contracts.
 * Mirrored from engine/schemas.py (Single Source of Truth).
 */

export type Dialect = "tsql" | "postgres" | "mysql";
export type ColumnUsageKind = "equality" | "range" | "join" | "select" | "order" | "group";
export type EngineKind = "gemini" | "deterministic" | "preset";
export type ImpactLevel = "high" | "medium" | "low";
export type PlanFormat = "sqlserver_xml" | "postgres_json" | "mysql_json" | "unknown";
export type AgentNode =
  | "analyze"
  | "plan"
  | "rewrite_deterministic"
  | "llm_rewrite"
  | "verify"
  | "critique"
  | "finalize";
export type StepStatus = "ok" | "retry" | "failed" | "skipped";
export type Severity = "critical" | "warning" | "optimization";

export interface Diagnostic {
  rule_id: string;
  severity: Severity;
  title: string;
  message: string;
  snippet?: string | null;
  line?: number | null;
  suggestion: string;
  cost_weight: number;
}

export interface TableRef {
  name: string;
  schema_name?: string | null;
  alias?: string | null;
}

export interface ColumnUsage {
  table?: string | null;
  column: string;
  usage: ColumnUsageKind;
}

export interface AnalysisReport {
  dialect: Dialect;
  parse_ok: boolean;
  parse_error?: string | null;
  statement_count: number;
  statement_types: string[];
  tables: TableRef[];
  column_usage: ColumnUsage[];
  diagnostics: Diagnostic[];
  complexity_score: number;
  normalized_sql: string;
  duration_ms: number;
}

export interface IndexRecommendation {
  table: string;
  key_columns: string[];
  include_columns: string[];
  where_clause?: string | null;
  ddl: string;
  rationale: string;
  estimated_impact: ImpactLevel;
}

export interface PlanOperator {
  op: string;
  object?: string | null;
  estimated_rows?: number | null;
  estimated_cost?: number | null;
  cost_pct: number;
  is_bottleneck: boolean;
  warnings: string[];
}

export interface PlanSummary {
  format: PlanFormat;
  total_cost?: number | null;
  operators: PlanOperator[];
  bottlenecks: Diagnostic[];
  missing_indexes: IndexRecommendation[];
  parse_error?: string | null;
}

export interface VerificationReport {
  passed: boolean;
  parse_ok: boolean;
  tables_preserved: boolean;
  missing_tables: string[];
  statement_type_preserved: boolean;
  remaining_critical: number;
  ast_edit_counts: Record<string, number>;
  notes: string[];
}

export interface AgentStep {
  iteration: number;
  node: AgentNode;
  status: StepStatus;
  detail: string;
  duration_ms: number;
}

export interface CostEstimate {
  before_cost: number;
  after_cost: number;
  logical_reads_before: number;
  logical_reads_after: number;
}

export interface QuotaInfo {
  byok: boolean;
  limit: number;
  remaining: number;
  reset_seconds: number;
}

export interface OptimizationResult {
  original_sql: string;
  optimized_sql: string;
  dialect: Dialect;
  explanation: string;
  antipatterns_fixed: string[];
  ddl_recommendations: IndexRecommendation[];
  estimated_improvement_pct: number;
  engine: EngineKind;
  model?: string | null;
  verification: VerificationReport;
  before: AnalysisReport;
  after: AnalysisReport;
  plan?: PlanSummary | null;
  trace: AgentStep[];
  cost_model: CostEstimate;
  quota?: QuotaInfo | null;
  duration_ms: number;
}

export interface AnalyzeRequest {
  sql: string;
  dialect?: Dialect;
  plan?: string | null;
}

export interface AnalyzeResponse {
  report: AnalysisReport;
  plan?: PlanSummary | null;
  indexes: IndexRecommendation[];
}

export interface OptimizeRequest {
  sql: string;
  dialect?: Dialect;
  plan?: string | null;
  mode?: "auto" | "deterministic";
}

export interface PresetSummary {
  id: string;
  title: string;
  domain: string;
  dialect: Dialect;
  description: string;
  tags: string[];
  headline_metric: string;
}

export interface PresetDetail extends PresetSummary {
  sql: string;
  plan?: string | null;
  result: OptimizationResult;
}

export interface PresetListResponse {
  presets: PresetSummary[];
}

export interface HealthResponse {
  status: "ok";
  version: string;
  llm_configured: boolean;
  model: string;
  sqlglot_version: string;
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
  };
}
