'use client';

import React, { useMemo } from 'react';
import QuestionsTeacherScreen from '@pages/Competition/pages/Questions/components/QuestionsTeacherScreen';
import QuestionsStudentScreen from '@/components/pages/Competition/pages/Questions/components/QuestionsStudentScreen';
import { useUser } from '@/contexts/UserContext';
import { QuestionsProvider } from '@/components/pages/Competition/contexts/QuestionsContext/QuestionsProvider';

const Questions: React.FC = () => {
  const { user } = useUser();


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