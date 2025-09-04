export type Domain = {
  id: string;
  slug: string;
  name: string;
  tld: string;
  priceUsd: number;
  category: string;
  style: string[];
  syllables: number;
  length: number;
  paymentPlanAvailable: boolean;
  popularityScore: number; // 0-100
};

export const sampleDomains: Domain[] = [
  {
    id: "1",
    slug: "brandly-io",
    name: "brandly",
    tld: ".io",
    priceUsd: 4800,
    category: "Marketing",
    style: ["Short", "Punchy"],
    syllables: 2,
    length: 7,
    paymentPlanAvailable: true,
    popularityScore: 86,
  },
  {
    id: "2",
    slug: "flowbank-com",
    name: "flowbank",
    tld: ".com",
    priceUsd: 12000,
    category: "Fintech",
    style: ["Trustworthy", "Descriptive"],
    syllables: 2,
    length: 8,
    paymentPlanAvailable: false,
    popularityScore: 72,
  },
  {
    id: "3",
    slug: "zupra-com",
    name: "zupra",
    tld: ".com",
    priceUsd: 7900,
    category: "Consumer",
    style: ["Short", "Invented"],
    syllables: 2,
    length: 5,
    paymentPlanAvailable: true,
    popularityScore: 64,
  },
];


