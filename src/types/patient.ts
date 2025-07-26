// Interface for FHIR Identifier
interface Identifier {
    use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
    type?: {
      coding: Array<{ system: string; code: string; display: string }>;
      text: string;
    };
    system?: string;
    value?: string;
    period?: { start: string; end: string };
    assigner?: { display: string };
  }
  
  // Interface for FHIR Human Name
  interface HumanName {
    use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: { start: string; end: string };
  }
  
  // Interface for FHIR Address
  interface Address {
    use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
    type?: 'postal' | 'physical' | 'both';
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: { start: string; end: string };
  }
  
  // Interface for FHIR Contact Point (e.g., phone, email)
  interface ContactPoint {
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
    rank?: number;
    period?: { start: string; end: string };
  }
  
  // Interface for FHIR Patient Contact
  interface PatientContact {
    relationship?: Array<{ coding: Array<{ system: string; code: string; display: string }> }>;
    name?: HumanName;
    telecom?: ContactPoint[];
    address?: Address;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    organization?: { display: string };
    period?: { start: string; end: string };
  }
  
  // Interface for FHIR Communication
  interface Communication {
    language: {
      coding: Array<{ system: string; code: string; display: string }>;
      text?: string;
    };
    preferred?: boolean;
  }
  
  // Interface for FHIR Patient Resource
  export interface Patient {
    resourceType: 'Patient';
    id?: string;
    identifier?: Identifier[];
    active?: boolean;
    name?: HumanName[];
    telecom?: ContactPoint[];
    gender?: 'male' | 'female' | 'other' | 'unknown';
    birthDate?: string;
    deceasedBoolean?: boolean;
    deceasedDateTime?: string;
    address?: Address[];
    maritalStatus?: {
      coding: Array<{ system: string; code: string; display: string }>;
      text?: string;
    };
    multipleBirthBoolean?: boolean;
    multipleBirthInteger?: number;
    photo?: Array<{ url: string }>;
    contact?: PatientContact[];
    communication?: Communication[];
    generalPractitioner?: Array<{ display: string }>;
    managingOrganization?: { display: string };
    link?: Array<{ other: { display: string }; type: 'replaced-by' | 'replaces' | 'refer' | 'seealso' }>;
  }
  