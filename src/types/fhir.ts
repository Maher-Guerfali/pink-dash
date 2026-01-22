export interface HumanName {
  use?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
}

export interface Address {
  use?: string;
  type?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Patient {
  resourceType: "Patient";
  id: string;
  active?: boolean;
  name?: HumanName[];
  telecom?: any[]; // Simplified
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  address?: Address[];
}

export interface BundleEntry<T> {
  fullUrl?: string;
  resource: T;
  search?: {
    mode: "match" | "include" | "outcome";
  };
}

export interface Bundle<T> {
  resourceType: "Bundle";
  type: string;
  total?: number;
  entry?: BundleEntry<T>[];
  link?: {
    relation: string;
    url: string;
  }[];
}
