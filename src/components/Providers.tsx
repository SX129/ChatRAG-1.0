'use client'
// All client components must have the above string to define itself
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers