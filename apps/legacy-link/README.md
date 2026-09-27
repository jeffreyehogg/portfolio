# Legacy Link: Enterprise Physical Security Data Migration Middleware

**Legacy Link** is an automated Physical Access Control System (PACS) data migration and ETL middleware platform. It is engineered to sanitize, map, and transform high-consequence physical security datasets (cardholders, badge IDs, Wiegand bit formats, access clearance levels) from legacy platforms (**Lenel OnGuard**, **Open Options DNA Fusion**, **AMAG Symmetry**, **Software House C•CURE 9000**, **Brivo**) into verified **Genetec Security Center (Synergis)** schemas in under 90 seconds.

---

## 🚀 The Real-World Engineering Problem & Solution

### The Cutover Vulnerability:
When enterprise access control migrations rely on manual spreadsheet sanitization:
- **Leading Zeros Stripped**: Excel automatically coerces Wiegand Facility Code `0042` to `42`, invalidating reader bitmasks and locking employees out of turnstiles.
- **Scientific Notation Corruption**: 37-bit high-bit credentials (e.g. `4582910482`) are converted into `4.58E+09`, permanently corrupting identity records.
- **The Credential Birthday Paradox**: Merging multiple facility databases with standard 26-bit cards creates duplicate badge IDs without detection.
- **Labor Waste**: 40+ billable hours of manual `=VLOOKUP` and `=CONCATENATE` formulas crash spreadsheets and delay cutover go-lives.

### The Legacy Link Solution:
- **Deterministic Sub-90s Pipeline**: Stream raw legacy CSV exports into client-side Web Workers and PostgreSQL unstructured `JSONB` containers.
- **Visual Schema Mapping & Concatenation**: Link source attributes to Genetec target fields with custom delimiter builders and uppercase hex formatting.
- **Zero Precision Loss**: Credentials and facility codes are ingested and preserved as immutable strings.
- **1-Click Verified Export**: Generates compliant RFC 4180 CSV files tailored for Genetec Security Center Config Tool.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Runtime**: React 19
- **Authentication**: Clerk (`@clerk/nextjs` with dark theme customization)
- **Database & Storage**: Neon PostgreSQL (via `postgres.js` with global connection singleton pool)
- **ETL & Parsing**: PapaParse (Web Worker streaming)
- **Styling & System Design**: Tailwind CSS v3 (Obsidian & High-Voltage Telemetry design system)
- **Language**: TypeScript 5 (Strict Mode)

---

## ⚡ Key Interactive Features (Public & Authenticated)

1. **Interactive Live PACS Sandbox & Schema Transformer (Zero Auth Required)**:
   - Load pre-built realistic legacy dumps (**Lenel OnGuard 8.1**, **DNA Fusion v8**, **AMAG Symmetry v9.4**, **C•CURE 9000**) or drag-and-drop custom CSVs.
   - Configure direct mappings, custom delimiters, and Wiegand formatting rules.
   - Live reactive side-by-side diffing between source records and Genetec PascalCase outputs.
   - Instant client-side CSV Blob export.
2. **PACS Migration Risk, Collision & ROI Estimator**:
   - Computes cutover labor hours saved and direct financial ROI based on cardholder volume.
   - Implements the generalized **Birthday Paradox equation** for 26-bit Wiegand cards ($P = 1 - \exp(-n(n-1)/(2N))$) to warn of duplicate credential collisions.
   - Multi-factor migration complexity index (1–100) and downloadable executive assessment briefing.
3. **Interactive PACS Legacy-to-Cloud Compatibility & Schema Matrix**:
   - Filterable comparison matrix across 5 major PACS vendors detailing database topologies, Wiegand bit formats, clearance architectures, and cutover gotchas.
   - Rule inspection slide-over with raw SQL queries and transformation regular expressions.
4. **Enterprise Projects Console (Authenticated)**:
   - Asymmetric Bento telemetry dashboard with real-time health metrics.
   - Scalable PostgreSQL JSONB storage for project configuration and multi-tenant cutover jobs.

---

## 🗄️ Database Architecture

### `migrations` Table
Tracks project configurations, source systems, and declarative mapping AST rules:
```sql
CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  source_system VARCHAR(100),
  target_system VARCHAR(100) DEFAULT 'Genetec',
  mappings JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### `data_records` Table
Stores raw unstructured records and validation error metadata:
```sql
CREATE TABLE data_records (
  id SERIAL PRIMARY KEY,
  migration_id INTEGER REFERENCES migrations(id) ON DELETE CASCADE,
  raw_data JSONB NOT NULL,
  mapped_data JSONB,
  validation_errors JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📂 Project Architecture

```text
apps/legacy-link/
├── app/
│   ├── api/
│   │   ├── migrations/             # Project creation, export, map, upload
│   │   └── setup/                  # Authenticated DDL verification
│   ├── dashboard/                  # Authenticated telemetry console
│   │   ├── migration/[id]/         # Project mapping & upload workspace
│   │   ├── layout.tsx              # Obsidian dashboard layout
│   │   ├── loading.tsx             # Bento skeleton fallback
│   │   └── page.tsx                # Asymmetric bento telemetry & project table
│   ├── error.tsx                   # Root error boundary
│   ├── globals.css                 # Obsidian tokens & custom scrollbars
│   ├── icon.tsx                    # Dynamic 32x32 ImageResponse icon
│   ├── layout.tsx                  # Root layout with SEO metadata & JSON-LD
│   ├── loading.tsx                 # Root suspense loader
│   ├── not-found.tsx               # High-craft 404 page
│   ├── page.tsx                    # Elevated public product landing page
│   ├── robots.ts                   # Search crawler directives
│   └── sitemap.ts                  # Programmatic XML sitemap
├── components/
│   ├── features/                   # Self-contained feature engines
│   │   ├── pacs-showcase.tsx       # Interactive 3-tab showcase container
│   │   ├── pacs-sandbox.tsx        # Live schema transformer & client export
│   │   ├── pacs-estimator.tsx      # Risk & ROI calculator with SVG gauge
│   │   └── pacs-matrix.tsx         # Compatibility & schema comparison matrix
│   ├── concatenation-builder.tsx   # Modal delimiter and field merge builder
│   ├── csv-uploader.tsx            # PapaParse Web Worker file dropzone
│   ├── expanding-arrow.tsx         # High-craft micro-interaction arrow
│   ├── field-mapper.tsx            # Responsive attribute mapping canvas
│   ├── navbar.tsx                  # Obsidian navbar with mobile drawer
│   └── new-migration-button.tsx    # Accessible project provisioning modal
├── lib/
│   ├── db.ts                       # Cached Postgres connection pool singleton
│   ├── pacs-calculator.ts          # Cutover hours, ROI, and Birthday Paradox formulas
│   ├── pacs-matrix-data.ts         # Comprehensive PACS vendor gotchas and SQL
│   ├── pacs-presets.ts             # Curated sample dumps (Lenel, DNA Fusion, AMAG, C•CURE)
│   ├── pacs-transformer.ts         # In-memory transformation and CSV Blob export
│   ├── pacs-types.ts               # Shared TypeScript data models
│   ├── seed.ts                     # Schema initialization
│   └── utils.ts                    # Time formatting helpers
├── tailwind.config.js              # Obsidian palette, font stacks, and glow shadows
└── tsconfig.json                   # TypeScript configuration
```
