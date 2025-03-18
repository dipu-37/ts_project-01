

export type TUser = {
  id: string;
  email: string;
  password : string;
  needsPasswordChange : boolean;
  passwordChangedAt?:Date;
  role: 'student'|'faculty'|'admin'|'superAdmin';
  status: 'in-progress'|'blocks';
  isDeleted: boolean;
};

