'use client';

import React, { useMemo, useEffect } from 'react';
import QuestionsTeacherScreen from '@pages/Competition/pages/Questions/components/QuestionsTeacherScreen';
import QuestionsStudentScreen from '@/components/pages/Competition/pages/Questions/components/QuestionsStudentScreen';
import { useUser } from '@/contexts/UserContext';
import { QuestionsProvider } from '@/components/pages/Competition/contexts/QuestionsContext/QuestionsProvider';
import { useCompetitionHub } from '@/contexts/CompetitionHubContext';

const Questions: React.FC = () => {
  const { user } = useUser();
  const { requestQuestions, isConnected } = useCompetitionHub();

  // Request questions when the page loads and connection is ready
  useEffect(() => {
    if (isConnected) {
      requestQuestions();
    }
  }, [isConnected, requestQuestions]);

  const QuestionsPageToRender = useMemo(() => {
    if(user == null) return null;

    if(user.role == "Student") {
        return <QuestionsStudentScreen />;
    }

    return <QuestionsTeacherScreen />;
  }, [user])

  return (
      <QuestionsProvider>
        {QuestionsPageToRender}
      </QuestionsProvider>
  );
};

export default Questions;