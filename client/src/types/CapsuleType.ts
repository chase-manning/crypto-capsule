export type Asset = {
  token: string;
  value: string;
};

type CapsuleType = {
  id: number;
  grantor: string;
  beneficiary: string;
  distributionDate: Date;
  periodType: string;
  periodCount: number;
  claimedPeriods: number;
  createdDate: Date;
  opened: boolean;
  assets: Asset[];
  usd: string;
};

export default CapsuleType;
