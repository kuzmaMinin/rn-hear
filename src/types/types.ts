export interface IRecord {
  id: number;
  createdAt: string | Date;
  patientChoice: boolean;
  systemsChoice: boolean;
  systemsAnswer: boolean;
  comment?: string;
  preconditions: EPreconditions;
  useCase: boolean;
  mood: number;
  patientId: number;
  patient?: string | null;
}
export type PartialRecord = {
  mood: number;
  useCase?: boolean;
  preconditions?: EPreconditions;
  patientChoice?: boolean;
  comment?: string;
};

export interface IUser {
  name: string;
}

export enum EPreconditions {
  'No noise',
  'Weak Noise',
  'Medium Noise',
  'Heavy Noise',
  'Very Heavy Noise',
}
