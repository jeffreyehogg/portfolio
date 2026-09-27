export interface QuestionOption {
  label: string;
  description: string;
  categoryAffinity: "food" | "labor" | "supplies";
  giftName: string;
}

export interface Question {
  id: number;
  prompt: string;
  subtitle: string;
  options: QuestionOption[];
}

export const GIFT_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "When you have free time to bless someone, where do you naturally gravitate?",
    subtitle: "Notice how God has shaped your natural inclinations and passions.",
    options: [
      {
        label: "Preparing a homecooked meal & welcoming visitors",
        description: "You love hospitality, creating warm environments, and nourishing people with food and conversation.",
        categoryAffinity: "food",
        giftName: "Hospitality & Food Care",
      },
      {
        label: "Rolling up your sleeves for physical repairs & building",
        description: "You love tangible results, carpentry, maintenance, and fixing broken things with your hands.",
        categoryAffinity: "labor",
        giftName: "Craftsmanship & Hands-On Service",
      },
      {
        label: "Organizing supplies, sorting packages, and managing logistics",
        description: "You thrive on efficiency, packing kits, distribution, and making sure resources reach families.",
        categoryAffinity: "supplies",
        giftName: "Administration & Relief Logistics",
      },
    ],
  },
  {
    id: 2,
    prompt: "Which outreach moment would bring you the greatest joy?",
    subtitle: "Every gift in the Body of Christ is essential and beautiful.",
    options: [
      {
        label: "Sitting across a table listening to an unhoused neighbor over coffee",
        description: "Relational connection, compassionate listening, and breaking bread together.",
        categoryAffinity: "food",
        giftName: "Mercy & Compassion",
      },
      {
        label: "Installing a safety wheelchair ramp so an elder can leave their home",
        description: "Removing physical barriers and providing practical dignity through craftsmanship.",
        categoryAffinity: "labor",
        giftName: "Restoration & Hands-On Help",
      },
      {
        label: "Stuffing 500 backpacks with school supplies for Title I children",
        description: "Systemic generational impact, packaging relief, and blessing children with school tools.",
        categoryAffinity: "supplies",
        giftName: "Community Care & Resource Blessing",
      },
    ],
  },
  {
    id: 3,
    prompt: "What setting makes you feel most energized and fulfilled?",
    subtitle: "God meets us right where our strengths and joy intersect.",
    options: [
      {
        label: "Kitchens, dining halls, and welcoming fellowship tables",
        description: "Bustling, warm, fragrant, and centered around gathering people.",
        categoryAffinity: "food",
        giftName: "Gathering & Hospitality",
      },
      {
        label: "Outdoors, construction sites, and workshop environments",
        description: "Active, physical, dynamic, and working with tools alongside others.",
        categoryAffinity: "labor",
        giftName: "Labor of Love & Construction",
      },
      {
        label: "Assembly lines, donation warehouses, and delivery routes",
        description: "Organized, focused, purposeful, and getting vital goods where they are needed.",
        categoryAffinity: "supplies",
        giftName: "Stewardship & Distribution",
      },
    ],
  },
];

export interface GiftProfile {
  title: string;
  scripture: string;
  category: "food" | "labor" | "supplies";
  description: string;
  actionPrompt: string;
}

export const GIFT_PROFILES: Record<string, GiftProfile> = {
  food: {
    title: "Hospitality & Table Ministry",
    scripture: "Romans 12:13 — 'Share with the Lord’s people who are in need. Practice hospitality.'",
    category: "food",
    description: "You have a shepherd's heart for warmth, table fellowship, and relational dignity. You make people feel seen, welcomed, and fed in body and spirit.",
    actionPrompt: "Explore Breakfast & Meal Outreach Teams",
  },
  labor: {
    title: "Craftsmanship & Tangible Care",
    scripture: "1 Thessalonians 4:11 — 'Make it your ambition to lead a quiet life: You should mind your own business and work with your hands...'",
    category: "labor",
    description: "You reveal the Gospel through practical physical action. When homes are repaired, cars are inspected, and safety ramps are built, God's love becomes tangible.",
    actionPrompt: "Explore Hands-on Building & Restoration Teams",
  },
  supplies: {
    title: "Stewardship & Relief Logistics",
    scripture: "1 Peter 4:10 — 'Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace...'",
    category: "supplies",
    description: "You have the discernment and heart to marshal community resources. Through backpacks, winter coats, and essential supplies, you meet crises with hope.",
    actionPrompt: "Explore Relief Logistics & Outreach Kits",
  },
};
