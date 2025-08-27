export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  returns: string;
  totalShares: string;
  lockIn: string;
  investors: number;
  progress: number;
  rating: number;
  imageUrl: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  data: Project[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export type ProjectCardProps = {
  project: Project;
};

export type ProjectsListingProps = {
  initialData?: ProjectResponse;
}; 

export interface UserProfile {
  _id: string;
  fullName: string;
  kycCompleted: boolean;
  email: string;
  countryCode: string;
  mobileNumber: string;
  isEmailVerified: boolean;
  isMobileNumVerified: boolean;
  country: string;
  roles: ("guest" | "investor")[]; // extend union if there are more roles
  gender: "male" | "female" | "other" | undefined;
  referal: string;
  dateOfBirth: string; // ISO date string
  type: "individual" | "organization" | undefined;
  avatar: string;
  address:  {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  } | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  __v: number;
  smartWalletAddress: string;
}