/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  token: string | null;
  userConfig: UserConfig | null;
  loggedIn: boolean | null;
}

// TODO
export interface UserConfig {
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  status: string;
  companyId: string;
  authToken: string;
  language: string;
  languageSuffix: string;
  passwordExpired: boolean;
  subscriptionType: string;
  brandsAssociated: string[];
  companyProfileView: CompanyProfileView;
  tiersAssociated: any[];
  ouModuleAttributeValueDataViews: any[];
  hasAdminGroup: boolean;
  consentSaved: boolean;
}

export interface Authority {
  authority: string;
}

export interface CompanyProfileView {
  id: string;
  name: string;
  logoUrl: string;
  verificationStatus: VerificationStatus;
  contactInfo: ContactInfo;
  address: Address;
  companyType: string;
  noOfSuppliers: number;
  noOfStyles: number;
  facility: Facility[];
  pcScore: number;
  incompleteFields: string[];
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zip: string;
  latitude: number;
  longitude: number;
}

export interface ContactInfo {
  name: string;
  email: string;
}

export interface Facility {
  id: string;
  updateTs: number;
  createTs: number;
  createdBy: string;
  lastModifiedBy: string;
  entityVersion: number;
  latestSource?: string;
  name: string;
  companyId: string;
  address: Address;
  valueProcess: string[];
  materials: string[];
  employeeCount: EmployeeCount;
  type?: string;
  status: string;
  managers: string[];
  completenessScore: number;
  noOfAssessments: number;
  certificateList: any[];
  productionCapacity?: string;
}

export interface EmployeeCount {
  men?: number;
  others?: number;
  total: number;
}

export interface VerificationStatus {
  id: number;
  value: string;
}

export interface JwtModel {
  sub: string;
  exp: number;
  iat: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
