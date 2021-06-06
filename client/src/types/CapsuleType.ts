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
  empty: boolean;
  assets: Asset[];
  addingAssetsAllowed: boolean;
};

export default CapsuleType;
