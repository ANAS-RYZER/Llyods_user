export interface PaginationTypes {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export const defaultPagination = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  hasMore: false,
};
export const JWT_TOKEN = process.env.NEXT_PUBLIC_JWT_TOKEN || "";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Property Types

export interface IProperty {
  _id: string;
  class: string;
  category: string;
  stage: string;
  style: string;
  currency: string;
  isBookmarked: boolean;
  instrumentType: string;
  name: string;
  about: string;
  totalNumberOfSfts: number;
  pricePerSft: number;
  basePropertyValue: number;
  totalPropertyValueAfterFees: number;
  investmentPerformance: InvestmentPerformance;
  rentalInformation: IRentalInformation;
  escrowInformation: EscrowInformation;
  legalAdivisory: LegalAdvisory;
  assetManagementCompany: Company;
  brokerage: Company;
  loanInformation: LoanInformation;
  tokenInformation: TokenInformation;
  media: Media;
  hostedBy: HostedBy;
  city: string;
  country: string;
  landmark: string;
  state: string;
  bookmarkedByMe: boolean;
  bookmarks: number;
  faqs: FAQ[];
  tenants: Tenant[];
  amenities: Amenity[];
  expenses: Expense[];
  features: Feature[];
  fees: Fees;
  riskFactors: RiskFactor[];
  riskDisclosures: RiskDisclosure[];
  termsAndConditions: TermAndCondition[];
  exitOpportunities: ExitOpportunity[];
  additionalTaxes: AdditionalTax[];
  nearByLocations: NearByLocation[];
  documents: IDocument[];
  createdAt: string;
  updatedAt: string;
  longitude: number;
  latitude: number;
  dueDiligence: dueDiligence;
  totalFundsRaised: number;
  lastTransaction: {
    tokensBooked: number;
    avatar: string;
    tokenSymbol: string;
  };
  investors:  InvestorList[];
}

export interface InvestorList {
  investorId: string;
  avatar: string;
  
  email: string;

}
interface InvestmentPerformance {
  targetCapitalAppreciation: number;
  lockInPeriodType: string;
  lockInPeriodValue: number;
  grossTargetIRR: number;
  netTargetIRR: number;
  grossInvestmentMultiplier: number;
  netInvestmentMultiplier: number;
  estimatedSalePriceAsPerLockInPeriod: number;
  capitalGains: number;
  capitalGainsTax: number;
  estimatedReturnsAsPerLockInPeriod: number;
  netRentalYield: number;
  grossRentalYield: number;
  irr: number;
  moic: number;
}

export interface IRentalInformation {
  rentPerSft: number;
  vacancyRate: number;
  grossMonthlyRent: number;
  netMonthlyRent: number;
  grossAnnualRent: number;
  netAnnualRent: number;
  expenses: {
    monthlyExpenses: number;
    annualExpenses: number;
  };
  netCashFlow: number;
}

interface EscrowInformation {
  country: string;
  state: string;
  escrowBank: string;
  escrowAgent: string;
}

interface LegalAdvisory {
  name: string;
  documentURL: string;
}

interface Company {
  name: string;
  documentURL: string;
}

interface LoanInformation {
  hasAssetPossesLoan: boolean;
  currentLoanAmount: number;
  totalNumberOfYears: number;
  totalLoanAmount: number;
  numberOfEMIsYetToPay: number;
  interestRate: number;
  pendingLoanAmount: number;
  bankName: string;
  brankBranch: string;
}

export interface TokenInformation {
  tokenSupply: number;
  minimumTokensToBuy: number;
  tokenPrice: number;
  tokenSymbol: string;
  availableTokensToBuy: number;
  maximumTokensToBuy: number;
  blockchainProjectAddress?: string;
  blockchainEscrowAddress?: string;
  blockchainOrderManagerAddress?: string;
  blockchainDaoAddress?: string;
}

interface Media {
  imageURL: string;
  videoURL: string;
  gallery: string[];
  pitchDeckURL?: string;
}

interface HostedBy {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logoURL: string;
  whatsappNumber?: string;
  totalProjects: number;
  onGoingProjects: number;
  primeLocation?: string;
  issuerProfileDescription?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IDocument {
  _id: string;
  name: string;
  description: string;
  type: "asset-document";
  format: string | null;
  document: {
    name: string;
    url: string;
  };
  isProtected: boolean;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface Tenant {
  _id: string;
  name: string;
  rentPerSft: number;
  sftsAllocated: number;
  annualRentEscalation: number;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "pending";
  type: string;
  lockInPeriod: number;
  leasePeriod: number;
  securityDeposit: number;
  interestOnSecurityDeposit: number;
  agreement: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Amenity {
  _id: string;
  name: string;
  description: string;
  image: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Expense {
  _id: string;
  expenseName: string;
  isPercentage: boolean;
  value: number;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Feature {
  _id: string;
  name: string;
  description: string;
  image: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Fee {
  _id: string;
  assetId: string;
  type: string;
  name: string;
  value: number;
  isPercentage: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Fees {
  registration: Fee[];
  legal: Fee[];
  platform: Fee[];
  brokerage: Fee[];
  insurance : Fee[];
  reserve : Fee[];
}

export interface RiskFactor {
  _id: string;
  name: string;
  description: string;
  __v?: number;
}

interface RiskDisclosure {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface TermAndCondition {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ExitOpportunity {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface AdditionalTax {
  _id: string;
  name: string;
  value: number;
  __v?: number;
}

interface NearByLocation {
  _id: string;
  name: string;
  distanceInKm: number;
  travelTime?: number;
  address: string;
  locationType: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface dueDiligence {
  legal: {
    _id: string;
    name: string;
    logoUrl: string;
    location: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }[];
  structure: {
    _id: string;
    name: string;
    logoUrl: string;
    location: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }[];
  valuation: {
    _id: string;
    name: string;
    logoUrl: string;
    location: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }[];
}

export interface IOrder {
  _id: string;
  currentStatus?: string;
  tokensBooked: number;
  bookingEOIAmount: number | null;
  totalOrderValue: number;
  paymentType: "full-payment" | string;
  hasFullPaymentDone: boolean;
  orderStatus: string;
  totalFeePaid: number;
  breakup: {
    name: string;
    value: number;
    percentage: number;
    isPercentage: boolean;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  asset: {
    _id: string;
    class: string;
    category: string;
    stage: string;
    style: string;
    currency: string;
    instrumentType: string;
    name: string;
    about: string;
    hasGlobalFeePercentagesSynced: boolean;
    hasGlobalFAQsSynced: boolean;
    hasGlobalRiskFactorsSynced: boolean;
    hasGlobalRiskDisclosuresSynced: boolean;
    hasGlobalAdditionalTaxesSynced: boolean;
    hasGlobalExitOpportunitiesSynced: boolean;
    totalNumberOfSfts: number;
    pricePerSft: number;
    basePropertyValue: number;
    totalPropertyValueAfterFees: number;
    investmentPerformance: {
      targetCapitalAppreciation: number;
      lockInPeriodType: string;
      lockInPeriodValue: number;
      grossTargetIRR: number;
      netTargetIRR: number;
      grossInvestmentMultiplier: number;
      netInvestmentMultiplier: number;
      estimatedSalePriceAsPerLockInPeriod: number;
      capitalGains: number;
      capitalGainsTax: number;
      estimatedReturnsAsPerLockInPeriod: number;
    };
    rentalInformation: {
      rentPerSft: number;
      vacancyRate: number;
      grossMonthlyRent: number;
      netMonthlyRent: number;
      grossAnnualRent: number;
      netAnnualRent: number;
      expenses: {
        monthlyExpenses: number;
        annualExpenses: number;
      };
      netCashFlow: number;
    };
    escrowInformation: {
      country: string;
      state: string;
      escrowBank: string;
      escrowAgent: string;
    };
    legalAdivisory: {
      name: string;
      documentURL: string;
    };
    assetManagementCompany: {
      name: string;
      documentURL: string;
    };
    brokerage: {
      name: string;
      documentURL: string;
    };
    loanInformation: {
      hasAssetPossesLoan: boolean;
      currentLoanAmount: number;
      totalNumberOfYears: number;
      totalLoanAmount: number;
      numberOfEMIsYetToPay: number;
      interestRate: number;
      pendingLoanAmount: number;
      bankName: string;
      brankBranch: string;
    };
    tokenInformation: {
      tokenSupply: number;
      minimumTokensToBuy: number;
      maximumTokensToBuy: number;
      availableTokensToBuy: number;
      tokenPrice: number;
    };
    media: {
      imageURL: string;
      videoURL: string;
      gallery: string[];
      pitchDeckURL: string;
    };
    hostedBy: {
      name: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      logoURL: string;
      whatsappNumber: string;
      totalProjects: number;
      onGoingProjects: number;
      primeLocation: string;
      issuerProfileDescription: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    city: string;
    country: string;
    landmark: string;
    state: string;
    latitude: number;
    longitude: number;
    companyId: string;
  };
  investor: {
    _id: string;
    kycCompleted: boolean;
    email: string;
    countryCode: string | null;
    mobileNumber: string | null;
    isEmailVerified: boolean;
    isMobileNumVerified: boolean;
    country: string | null;
    roles: string[];
    avatar: string;
    created_at: string;
    updated_at: string;
    __v: number;
    fullName: string;
  };
}

export interface BreakupItem {
  name: string;
  value: number;
  percentage: number;
  isPercentage: boolean;
  _id: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  status: string;
  isCompleted: boolean;
  comingOrder: number;
  completedAt: string | null;
  dueDate: string | null;
  _id: string;
}

export interface Asset {
  _id: string;
  name: string;
  // Add other asset properties as needed
}

export interface Investor {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  // Add other investor properties as needed
}

export interface Order {
  _id: string;
  tokensBooked: number;
  totalOrderValue: number;
  paymentType: string;
  hasFullPaymentDone: boolean;
  currentStatus: string;
  totalFeePaid: number;
  tracking: TrackingStep[];
  breakup: BreakupItem[];
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  investor: Investor;
}

export type TrackingUIState = "completed" | "active" | "inactive";

export interface TrackingStepWithUIState extends TrackingStep {
  uiState: TrackingUIState;
}



// Common signature details for Investor/Admin
export interface ISignatureDetails {
  submitterId: string | null;
  slug: string | null;
  sentAt: string | null;
  openedAt?: string | null;   // optional because ryzerAdminDetails does not have startedAt
  startedAt?: string | null;  // only present in investorDetails
  completedAt: string | null;
  declinedAt: string | null;
}

// Document Template embedded inside
export interface IDocumentTemplate {
  _id: string;
  assetId: string;
  templateName: string;
  templateType: string;
  provider: string;
  providerTemplateId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Main signature tracking object
export interface IInvestorDocumentSignature {
  _id: string;
  assetId: string;
  investorId: string;
  documentTemplateId: IDocumentTemplate;
  investorDetails: ISignatureDetails;
  ryzerAdminDetails: ISignatureDetails;
  hasSent: boolean;
  sentAt: string | null;
  submissionId: string | null;
  submissionDocumentURL: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare global {
  interface Window {
    Veriff: any;
  }
}

export interface RentalDistribution {
  month: string; // ISO date string
  rentalIncome: number;
  _id: string;
}

export interface AssetDetails {
  name: string;
  image: string;
  location: string;
}

export interface Asset {
  assetId: string;
  assetDetails: AssetDetails;
  investedAmount: number;
  tokens: number;
  tokenPrice: number;
  investedDate: string; // ISO date string
  rentalDistributions: RentalDistribution[];
  latestValue: number;
  moic: number;
  _id: string;
}

export interface Portfolio {
  _id: string;
  userId: string;
  totalValue: number;
  holdings: number;
  cashFlows: number;
  totalInvestment: number;
  assets: Asset[];
}

export interface Summary {
  uniqueAssets: number;
  totalOrders: number;
  totalInvestment: number;
  totalTokens: number;
  totalCurrentValue: number;
}

export interface PortfolioResponse {
  portfolio: Portfolio;
  summary: Summary;

  userId: string;
  totalValue: number;
  holdings: number;
  cashFlows: number;
  totalInvestment: number;
}




export interface Metrics {
  totalInvestment: number;
  holdings: number;
  cashFlows: number;
  totalValue: number;
  allTimeReturns: number;
  holdingsReturn: number;
  cashFlowReturn: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
}

export interface Summary {
  uniqueAssets: number;
  totalOrders: number;
  totalInvestment: number;
  totalTokens: number;
  totalCurrentValue: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
}

export interface CashFlowAsset {
  assetId: string;
  monthlyCashFlow: number;
  annualCashFlow: number;
  ownershipPercentage: number;
}

export interface CashFlowBreakdown {
  assets: CashFlowAsset[];
}

export interface PortfolioCashFlowResponse {
  metrics: Metrics;
  summary: Summary;
  cashFlowBreakdown: CashFlowBreakdown;
}
