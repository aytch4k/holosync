export interface StorageHistory {
  date: string;
  used: number;
  total: number;
}

export interface StorageBreakdown {
  [key: string]: number;
}

export interface StorageQuota {
  total: number;
  used: number;
  available: number;
}