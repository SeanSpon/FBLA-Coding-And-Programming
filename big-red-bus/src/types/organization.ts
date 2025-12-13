export interface Deal {
  id: string;
  title: string;
  description: string;
  code: string;
  expiresAt: string;
}

export interface Organization {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  description: string;
  fullDescription: string;
  phone: string;
  website: string;
  address: string;
  rating: number;
  reviewCount: number;
  deals: Deal[];
}

export interface Review {
  id: string;
  organizationId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
