export interface Bundle {
  resourceType: 'Bundle';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
    tag?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  };
  identifier?: {
    system?: string;
    value?: string;
  };
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
  timestamp?: string;
  total?: number;
  link?: Array<{
    relation: string;
    url: string;
  }>;
  entry?: Array<{
    fullUrl?: string;
    resource?: any; // Could be more specific like Resource | Patient | Observation, etc.
    request?: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      url: string;
      ifNoneMatch?: string;
      ifModifiedSince?: string;
      ifMatch?: string;
      ifNoneExist?: string;
    };
    response?: {
      status: string;
      location?: string;
      etag?: string;
      lastModified?: string;
      outcome?: any; // Could be OperationOutcome or other resources
    };
    search?: {
      mode?: 'match' | 'include' | 'outcome';
      score?: number;
    };
  }>;
  signature?: {
    type: Array<{
      system?: string;
      code?: string;
    }>;
    when?: string;
    who?: {
      reference?: string;
      display?: string;
    };
    onBehalfOf?: {
      reference?: string;
      display?: string;
    };
    targetFormat?: string;
    sigFormat?: string;
    data?: string;
  };
}

