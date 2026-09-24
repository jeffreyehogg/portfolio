# Legacy Link: Security Data Migration Utility

**Legacy Link** is a middleware application designed to sanitize, map, and migrate physical security data (badges, access levels, cardholders) from legacy systems (Lenel, DNA Fusion, AMAG) into modern cloud platforms like Genetec.

## 🚀 The Problem & Solution

- **Problem:** Migrating thousands of badge numbers and identity records from disparate legacy databases is error-prone. Manual "data cleaning" in Excel can take days and often leads to corruption or invalid formats.
- **Solution:** A web-based tool that ingests raw CSV exports, provides a drag-and-drop mapping interface to standardize fields to the target schema, and exports a clean, validated CSV ready for import.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** Vercel Postgres (using `postgres.js` driver)
- **Authentication:** Clerk
- **Styling:** Tailwind CSS
- **CSV Parsing:** PapaParse

## ⚡ Key Features (MVP Status)

1.  **Authentication:** Secure sign-up/sign-in via Clerk.
2.  **Project Management:** Create distinct migration projects (e.g., "HQ Upgrade - DNA Fusion").
3.  **Universal Ingestion:** Upload raw CSV files of any structure. Data is stored as unstructured `JSONB` in Postgres, allowing for maximum flexibility.
4.  **Field Mapping:** Visual interface to map "Source Columns" (from CSV) to "Target Fields" (Genetec Schema: `FirstName`, `LastName`, `BadgeID`, etc.).
5.  **Transformation Engine:** Dynamic export engine that applies mapping rules to raw data and generates a clean, standardized CSV.

## 🗄️ Database Schema

### `migrations` Table

Tracks the high-level project details and configuration.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `user_id` | VARCHAR | Clerk User ID (Owner) |
| `name` | VARCHAR | Project Name (e.g., "Dallas Office") |
| `status` | VARCHAR | `draft`, `uploaded`, `mapped` |
| `source_system` | VARCHAR | Origin (Lenel, DNA Fusion, etc.) |
| `target_system` | VARCHAR | Destination (Default: Genetec) |
| `mappings` | JSONB | Key-value pairs of `{ TargetField: SourceColumn }` |

### `data_records` Table

Stores the actual row-by-row data from the legacy system.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `migration_id` | INT | Foreign Key to `migrations` |
| `raw_data` | JSONB | The complete, unedited row from the CSV |
| `mapped_data` | JSONB | (Future) The transformed version |
| `validation_errors`| JSONB | (Future) Array of error messages for this row |

## 📂 Project Structure

```text
/app
  /api                  # Backend API Routes
    /migrations
      /route.ts         # POST: Create new project
      /[id]
        /upload         # POST: Bulk insert CSV data
        /map            # POST: Save column mappings
        /export         # GET: Download transformed CSV
  /dashboard            # Protected App Area
    /page.tsx           # Project List
    /migration/[id]     # Single Project View (Upload/Map/Preview)
  /page.tsx             # Landing Page (Public)
/components
  /csv-uploader.tsx     # Client-side CSV parser & validator
  /field-mapper.tsx     # Mapping UI (Source -> Target)
  /new-migration-button # Modal for creating projects
/lib
  /seed.ts              # Database schema definition
```
