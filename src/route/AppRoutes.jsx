import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import { HomePage } from '../features/home/ui/pages/HomePage';

export const AppRoutes = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};
