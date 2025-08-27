export interface UserResponse {
  status: string;
  message: string;
  statusCode: number;
  data: UserData;
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  kycCompleted: boolean;
  smartWalletAddress: string | null;
  email: string;
  countryCode: string;
  mobileNumber: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  country: string;
  roles: string[];
  gender: string | null;
  referal: string;
  dateOfBirth: string | null; // could also use Date | null if you'll parse it
  type: string ; // can be narrowed if there are more fixed options
  avatar: string;
  address: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  __v: number;
  isNewUser: boolean;
  isAadhaarVerified: boolean;
  isPanVerified: boolean;
  adminApprovalStatus: "Pending" | "Approved" | "Rejected" | string;
  rejectionReason: string | null;
}
