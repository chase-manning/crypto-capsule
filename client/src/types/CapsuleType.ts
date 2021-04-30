export type Asset = {
  token: string;
  value: string;
};

type CapsuleType = {
  id: number;
  grantor: string;
  beneficiary: string;
  distributionDate: Date;
  createdDate: Date;
  opened: boolean;
  assets: Asset[];
  usd: string;
};

export default CapsuleType;
