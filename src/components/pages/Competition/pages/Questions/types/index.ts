/**
 * Question interface aligned with SignalR QuestionResponse.
 * Used in the local Competition context.
 */
export interface Question {
  id: number;
  competitionId: number;
  exerciseId?: number | null;
  userId: string;
  userName: string; // User's name for display
  userEmail: string; // User's email
  content: string; // Question text/content
  questionType: number;
  answerId?: number | null;
  answer?: {
    id: number;
    content: string;
    userId: string;
    userName: string;
    userEmail: string;
  } | null;
  askedAt?: string; // ISO 8601 DateTime
  language?: string; // For backward compatibility with UI
  
  // Legacy fields for backward compatibility (can be computed)
  title?: string;
  question?: string;
  askedBy?: string;
  status?: 'pending' | 'answered';
  answeredAt?: string;
}