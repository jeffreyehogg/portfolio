import { MatrixRow } from './pacs-types'

export const PACS_MATRIX_DATA: MatrixRow[] = [
  {
    attributeKey: 'arch',
    label: 'Database & Middleware Topology',
    category: 'identity',
    systems: {
      lenel: {
        value: 'On-Premises MS SQL Server',
        notes: 'Direct T-SQL query on EMP, BADGE, and MMR_EV tables.',
        gotcha: 'Requires staging table read locks; schema changes across minor versions 7.6 to 8.2.',
        transformRegex: 'SELECT EMPID, FIRSTNAME, LASTNAME FROM EMP WITH (NOLOCK)',
      },
      ccure: {
        value: 'On-Premises MS SQL (Victor / C•CURE)',
        notes: 'Multi-tiered Personnel partitions and GUID-based primary keys.',
        gotcha: 'Personnel records are separated from AccessCredentials; joined via Foreign PersonnelGUID.',
        transformRegex: 'SELECT PersonnelID, CH_First_Name, CH_Last_Name FROM Personnel',
      },
      amag: {
        value: 'Multi-Node SQL Cluster (Symmetry)',
        notes: 'Legacy schema with separate Forename and Surname fields.',
        gotcha: 'Temporary badges use negative card numbers that throw exceptions in standard int parsers.',
        transformRegex: 'SELECT CardHolder_ID, Forename, Surname FROM CardHolder',
      },
      dna_fusion: {
        value: 'Windows PACS Service & SQL Database',
        notes: 'InternalNumber identifier with composite text card types.',
        gotcha: 'Badge numbers exported as strings with leading zeros that Excel truncates automatically.',
        transformRegex: 'SELECT InternalNumber, FirstName, LastName, BadgeNumber FROM Personnel',
      },
      brivo: {
        value: 'Cloud REST API (Brivo OnAir / Access)',
        notes: 'JSON payload with paginated user and credential objects.',
        gotcha: 'Rate limited to 10 req/sec; large tenant exports require streaming pagination.',
        transformRegex: 'GET /v1/api/users?pageSize=100',
      },
      genetec: {
        value: 'Unified Hybrid Cloud / Synergis Cloud Link',
        notes: 'Strict PascalCase CSV import specification parsed via Config Tool.',
        transformRegex: 'CardholderID, FirstName, LastName, BadgeID, Status',
      },
    },
  },
  {
    attributeKey: 'wiegand',
    label: 'Wiegand Bit Format & Credential Handling',
    category: 'credential',
    systems: {
      lenel: {
        value: 'Discrete FACILITY_CODE + CARDNUM',
        notes: 'Stores facility code and card number in separate integer columns.',
        gotcha: 'Leading zeros on facility codes (e.g., 042) must be preserved in Genetec tuple format.',
        transformRegex: '${FACILITY_CODE}:${CARDNUM}',
      },
      ccure: {
        value: 'Hexadecimal Bitmask or Decimal Card',
        notes: 'Credentials can be raw decimal or 37-bit hex depending on reader configuration.',
        gotcha: 'Hex characters must be normalized to uppercase to avoid reader rejection.',
        transformRegex: 'CARD_NUM.toUpperCase()',
      },
      amag: {
        value: 'CardNumber + FacilityCode + PIN',
        notes: 'Facility code is mapped per company or badge partition.',
        gotcha: 'PIN codes are stored in the same table; must not be leaked into public BadgeID field.',
        transformRegex: 'FacilityCode + ":" + CardNumber',
      },
      dna_fusion: {
        value: 'CardType Descriptor (HID_H10301)',
        notes: 'CardType column indicates 26-bit vs 37-bit encoding.',
        gotcha: 'High-bit credentials (37-bit) overflow 32-bit signed integers.',
        transformRegex: 'BadgeNumber.trim()',
      },
      brivo: {
        value: 'Credential ID Object with CSN / Wiegand',
        notes: 'Supports mobile smart credentials and physical prox cards.',
        gotcha: 'DESFire EV2 cards export as 14-character hex card serial numbers (CSN).',
        transformRegex: 'credentials[0].reference_id',
      },
      genetec: {
        value: 'Genetec Synergis Standard Credential Format',
        notes: 'Accepts discrete FacilityCode:CardNumber or formatted decimal string.',
        transformRegex: 'FacilityCode:BadgeID',
      },
    },
  },
  {
    attributeKey: 'access',
    label: 'Access Groups & Clearance Grouping',
    category: 'access',
    systems: {
      lenel: {
        value: 'Semicolon Delimited ACCESS_LEVEL_ID',
        notes: 'Relational table flattened into string list in standard reports.',
        gotcha: 'Over 10 access levels per cardholder overflows legacy text limits.',
        transformRegex: 'ACCESS_LEVEL_ID.split(";").join(", ")',
      },
      ccure: {
        value: 'Hierarchical Clearance Partitions',
        notes: 'Nested partitions inherit door permissions from parent nodes.',
        gotcha: 'Flattening clearances without resolving parent partitions drops door clearances.',
        transformRegex: 'Clearances.split(",").map(c => c.trim())',
      },
      amag: {
        value: 'ClearanceGroup Strings',
        notes: 'Single primary clearance with secondary reader overrides.',
        gotcha: 'Terminated employees retain historic clearance strings in legacy database.',
        transformRegex: 'ClearanceGroup',
      },
      dna_fusion: {
        value: 'Pipe-Delimited AccessLevelList',
        notes: 'Formatted as Level1|Level2|Level3.',
        gotcha: 'Pipe characters crash basic CSV parsers if quotes are omitted.',
        transformRegex: 'AccessLevelList.split("|").join(", ")',
      },
      brivo: {
        value: 'Group ID Array [101, 102, 103]',
        notes: 'REST JSON array of integer group identifiers.',
        gotcha: 'Requires lookup table to translate numeric IDs to human-readable clearance names.',
        transformRegex: 'groups.map(g => g.name).join(", ")',
      },
      genetec: {
        value: 'Comma-Separated CardholderGroup List',
        notes: 'Config Tool creates new groups on-the-fly or maps to existing partitions.',
        transformRegex: 'Group1, Group2, Group3',
      },
    },
  },
  {
    attributeKey: 'status',
    label: 'Cardholder Lifecycle & Provisioning Status',
    category: 'temporal',
    systems: {
      lenel: {
        value: 'BADGE_STATUS (1=Active, 0=Inactive)',
        notes: 'Integer binary flag.',
        gotcha: 'Card status 0 can also mean "Lost" or "Suspended" in audit logs.',
        transformRegex: 'BADGE_STATUS === "1" ? "Active" : "Inactive"',
      },
      ccure: {
        value: 'Card_Status (ACTIVE, DISABLED, LOST)',
        notes: 'String enum.',
        gotcha: 'DISABLED status must map to Inactive; LOST requires revocation.',
        transformRegex: 'Card_Status === "ACTIVE" ? "Active" : "Inactive"',
      },
      amag: {
        value: 'CardStatus (0=Active, 1=Lost, 2=Term)',
        notes: 'Integer tri-state flag.',
        gotcha: 'Status 2 (Terminated) must be purged or marked Inactive to revoke reader access.',
        transformRegex: 'CardStatus === "0" ? "Active" : "Inactive"',
      },
      dna_fusion: {
        value: 'ActiveState (True / False)',
        notes: 'Boolean string representation.',
        gotcha: 'Case sensitivity in exports ("true" vs "True" vs "TRUE").',
        transformRegex: 'ActiveState.toLowerCase() === "true" ? "Active" : "Inactive"',
      },
      brivo: {
        value: 'active: boolean property',
        notes: 'Strict JSON boolean.',
        gotcha: 'Suspended users have active: false but retain access assignments.',
        transformRegex: 'user.active ? "Active" : "Inactive"',
      },
      genetec: {
        value: 'Genetec Status ENUM (Active / Inactive)',
        notes: 'Strict PascalCase enum enforced by Synergis.',
        transformRegex: '"Active" | "Inactive"',
      },
    },
  },
]
