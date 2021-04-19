export type Asset = {
  token: string;
  value: number;
};

type CapsuleType = {
  id: number;
  grantor: string;
  beneficiary: string;
  distributionDate: Date;
  createdDate: Date;
  opened: boolean;
  assets: Asset[];
};

export default CapsuleType;
