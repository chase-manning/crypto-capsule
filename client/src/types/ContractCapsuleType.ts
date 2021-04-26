type ContractCapsuleType = {
  id: string;
  grantor: string;
  beneficiary: string;
  distributionDate: string;
  createdDate: string;
  opened: boolean;
  value: string;
  tokens: string[];
  amounts: string[];
};

export default ContractCapsuleType;
