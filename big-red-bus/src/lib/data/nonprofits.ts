export interface Nonprofit {
  id: number;
  name: string;
  mission: string;
  description: string;
  website: string;
  email: string;
  phone?: string;
  
  // Location
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    county?: string;
  };
  
  // Categorization
  categories: string[];
  serviceAreas: string[];
  targetPopulations: string[];
  
  // Operational details
  foundedYear?: number;
  staffSize?: "1-10" | "11-50" | "51-200" | "200+";
  annualBudget?: "Under $100k" | "$100k-$500k" | "$500k-$1M" | "$1M+";
  
  // Media
  logoUrl?: string;
  imageUrls?: string[];
  
  // Metadata
  isVerified: boolean;
  lastUpdated: string;
  tags: string[];
}

export const nonprofits: Nonprofit[] = [
  {
    id: 1,
    name: "Metro Mental Health Alliance",
    mission: "Providing accessible mental health services and advocacy for underserved communities.",
    description: "Founded in 2015, Metro Mental Health Alliance has served over 5,000 individuals through crisis intervention, counseling services, and community education programs. We focus on eliminating barriers to mental health care through sliding scale fees, multilingual services, and community partnerships.",
    website: "https://metromha.org",
    email: "info@metromha.org",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62701",
      county: "Sangamon"
    },
    categories: ["Mental Health", "Healthcare", "Crisis Support"],
    serviceAreas: ["Crisis Intervention", "Individual Counseling", "Group Therapy", "Community Education"],
    targetPopulations: ["Adults", "Families", "LGBTQ+", "Low Income"],
    foundedYear: 2015,
    staffSize: "11-50",
    annualBudget: "$500k-$1M",
    logoUrl: "/images/nonprofits/metro-mha.png",
    isVerified: true,
    lastUpdated: "2024-09-15",
    tags: ["mental health", "counseling", "crisis", "therapy"]
  },
  {
    id: 2,
    name: "Autism Family Support Network",
    mission: "Empowering families affected by autism through resources, support groups, and advocacy.",
    description: "Since 2010, we've been connecting families, providing educational workshops, and advocating for autism awareness in schools and workplaces. Our programs include parent support groups, sibling workshops, and transition planning for young adults with autism.",
    website: "https://autismfamilysupport.org",
    email: "contact@autismfamilysupport.org",
    phone: "(555) 987-6543",
    address: {
      street: "456 Oak Avenue",
      city: "Riverside",
      state: "California",
      zipCode: "92501",
      county: "Riverside"
    },
    categories: ["Autism", "Family Support", "Education", "Advocacy"],
    serviceAreas: ["Support Groups", "Educational Workshops", "Advocacy", "Resource Navigation"],
    targetPopulations: ["Children", "Families", "Young Adults", "Parents"],
    foundedYear: 2010,
    staffSize: "1-10",
    annualBudget: "$100k-$500k",
    logoUrl: "/images/nonprofits/autism-family.png",
    isVerified: true,
    lastUpdated: "2024-09-10",
    tags: ["autism", "family", "support", "education"]
  },
  {
    id: 3,
    name: "Youth Crisis Hotline",
    mission: "24/7 crisis intervention and support services for youth and their families.",
    description: "Operating around the clock since 2008, our trained volunteers and licensed professionals provide immediate crisis support, safety planning, and resource connections for young people in distress. We serve anyone under 25 facing mental health crises, family conflicts, or other urgent situations.",
    website: "https://youthcrisishotline.org",
    email: "help@youthcrisishotline.org",
    phone: "(555) CRISIS1",
    address: {
      street: "789 Hope Street",
      city: "Denver",
      state: "Colorado",
      zipCode: "80202",
      county: "Denver"
    },
    categories: ["Mental Health", "Youth Services", "Crisis Support"],
    serviceAreas: ["24/7 Hotline", "Crisis Intervention", "Safety Planning", "Resource Referrals"],
    targetPopulations: ["Youth", "Children", "Teens", "Young Adults"],
    foundedYear: 2008,
    staffSize: "51-200",
    annualBudget: "$1M+",
    logoUrl: "/images/nonprofits/youth-crisis.png",
    isVerified: true,
    lastUpdated: "2024-09-12",
    tags: ["crisis", "youth", "hotline", "emergency"]
  },
  {
    id: 4,
    name: "Community Wellness Center",
    mission: "Holistic wellness programs promoting mental and physical health for all community members.",
    description: "Our center offers wellness programs including mindfulness classes, nutrition education, fitness programs, and mental health first aid training. We believe in preventive care and community-based solutions to health challenges.",
    website: "https://communitywellness.org",
    email: "wellness@communitywellness.org",
    phone: "(555) 456-7890",
    address: {
      street: "321 Wellness Way",
      city: "Portland",
      state: "Oregon",
      zipCode: "97201",
      county: "Multnomah"
    },
    categories: ["Wellness", "Prevention", "Education", "Community Health"],
    serviceAreas: ["Wellness Classes", "Health Education", "Fitness Programs", "Mental Health First Aid"],
    targetPopulations: ["Adults", "Seniors", "Families", "General Public"],
    foundedYear: 2018,
    staffSize: "11-50",
    annualBudget: "$100k-$500k",
    logoUrl: "/images/nonprofits/wellness-center.png",
    isVerified: true,
    lastUpdated: "2024-09-08",
    tags: ["wellness", "prevention", "fitness", "community"]
  },
  {
    id: 5,
    name: "Bridges Recovery Services",
    mission: "Supporting individuals in recovery through peer support, housing assistance, and life skills programs.",
    description: "We provide comprehensive recovery support services including sober living assistance, job training, peer mentorship, and family reunification programs. Our approach emphasizes dignity, hope, and community-based recovery.",
    website: "https://bridgesrecovery.org",
    email: "info@bridgesrecovery.org",
    phone: "(555) 234-5678",
    address: {
      street: "654 Recovery Road",
      city: "Austin",
      state: "Texas",
      zipCode: "78701",
      county: "Travis"
    },
    categories: ["Recovery", "Housing", "Job Training", "Peer Support"],
    serviceAreas: ["Sober Living", "Job Training", "Peer Mentorship", "Family Services"],
    targetPopulations: ["Adults in Recovery", "Families", "Veterans"],
    foundedYear: 2012,
    staffSize: "11-50",
    annualBudget: "$500k-$1M",
    logoUrl: "/images/nonprofits/bridges-recovery.png",
    isVerified: true,
    lastUpdated: "2024-09-14",
    tags: ["recovery", "housing", "peer support", "addiction"]
  },
  {
    id: 6,
    name: "Safe Haven Domestic Violence Services",
    mission: "Providing shelter, advocacy, and support services for survivors of domestic violence.",
    description: "Operating a 24-hour shelter and comprehensive support services for domestic violence survivors. Our programs include emergency housing, legal advocacy, counseling, children's services, and transitional housing assistance.",
    website: "https://safehavendv.org",
    email: "support@safehavendv.org",
    phone: "(555) SHELTER",
    address: {
      street: "987 Safe Street",
      city: "Atlanta",
      state: "Georgia",
      zipCode: "30309",
      county: "Fulton"
    },
    categories: ["Domestic Violence", "Emergency Shelter", "Legal Advocacy"],
    serviceAreas: ["Emergency Shelter", "Legal Advocacy", "Counseling", "Children's Services"],
    targetPopulations: ["Women", "Children", "Families", "Survivors"],
    foundedYear: 2005,
    staffSize: "51-200",
    annualBudget: "$1M+",
    logoUrl: "/images/nonprofits/safe-haven.png",
    isVerified: true,
    lastUpdated: "2024-09-11",
    tags: ["domestic violence", "shelter", "women", "safety"]
  }
];

// Filter constants for UI
export const categories = [
  "Mental Health",
  "Autism",
  "Youth Services", 
  "Crisis Support",
  "Healthcare",
  "Family Support",
  "Education",
  "Advocacy",
  "Wellness",
  "Prevention",
  "Community Health",
  "Recovery",
  "Housing",
  "Job Training",
  "Peer Support",
  "Domestic Violence",
  "Emergency Shelter",
  "Legal Advocacy"
];

export const serviceAreas = [
  "Crisis Intervention",
  "Individual Counseling",
  "Group Therapy",
  "Community Education",
  "Support Groups",
  "Educational Workshops",
  "Resource Navigation",
  "24/7 Hotline",
  "Safety Planning",
  "Resource Referrals",
  "Wellness Classes",
  "Health Education",
  "Fitness Programs",
  "Mental Health First Aid",
  "Sober Living",
  "Job Training",
  "Peer Mentorship",
  "Family Services",
  "Emergency Shelter",
  "Legal Advocacy",
  "Children's Services"
];

export const targetPopulations = [
  "Adults",
  "Children",
  "Teens",
  "Young Adults",
  "Families",
  "LGBTQ+",
  "Low Income",
  "Parents",
  "Seniors",
  "General Public",
  "Adults in Recovery",
  "Veterans",
  "Women",
  "Survivors"
];

export const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];