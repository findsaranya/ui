/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  token: string | null;
  userConfig: IUserConfig | null;
  loggedIn: boolean | null;
  authenticating: boolean;
}

abstract class Password {
  constructor(private readonly _passWd: string) {}
  get password(): string {
    return btoa(this._passWd);
  }
}
abstract class Payload {
  abstract parse(): void;
}

export interface ILoginPayload {
  username: string;
  password: string;
}
export class LoginPayload extends Password implements Payload {
  constructor(
    private readonly _username: string,
    private readonly _password: string
  ) {
    super(_password);
  }
  parse(): ILoginPayload {
    return { username: this.username, password: this.password };
  }

  get username(): string {
    return this._username;
  }
}

export interface ILoginFailedResponce {
  success: boolean;
  message: string;
}

// TODO
export interface IUserConfig {
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
  verificationStatus: VerificationStatus;
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

export interface Facility {
  id: string;
  updateTs: number;
  createTs: number;
  createdBy: string;
  lastModifiedBy: string;
  entityVersion: number;
  name: string;
  companyId: string;
  type: string;
  status: string;
  completenessScore: number;
  createdCompanyId: string;
  noOfAssessments: number;
  createdCompanyName: string;
  certificateList: any[];
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
