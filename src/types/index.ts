// User types
export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication types
export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

// Content types
export interface Content {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  ownerNumber: string;
  intervalHours: number;
  endValidationDate: string;
  interestIds: string[];
  type: "REEL";
  mediaUrls: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentFormData {
  title: string;
  description: string;
  ownerName: string;
  ownerNumber: string;
  intervalHours: number;
  endValidationDate: string;
  interestIds: string[];
  type: "REEL";
  mediaUrls?: string[];
}

// Interest types
export interface Interest {
  id: string;
  name: string;
  targetedGender?: "MALE" | "FEMALE" | null;
  minAge: number;
  maxAge: number;
  isActive?: boolean;
}

// Reward types
export interface RewardCategory {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  categoryId: string;
  isActive: boolean;
  category?: RewardCategory;
}

export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  user: {
    id: string;
    username: string;
    phoneNumber: string;
  };
  reward: Reward;
}

// App settings
export type Theme = "light" | "dark" | "system";
export type Language = "ar" | "en";

export interface AppSettings {
  theme: Theme;
  language: Language;
}
