export interface Question {
  id: number;
  title: string;
  question: string;
  askedBy: string;
  askedAt: string;
  status: 'pending' | 'answered';
  answer?: string;
  answeredAt?: string;
  language?: string;
}