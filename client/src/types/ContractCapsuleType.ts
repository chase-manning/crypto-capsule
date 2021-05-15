type ContractCapsuleType = {
  id: string;
  grantor: string;
  beneficiary: string;
  distributionDate: string;
  periodSize: string;
  periodCount: string;
  claimedPeriods: string;
  createdDate: string;
  opened: boolean;
  value: string;
  tokens: string[];
  amounts: string[];
};

export default ContractCapsuleType;
