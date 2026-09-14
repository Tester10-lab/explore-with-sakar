'use client';

import React, { createContext, useContext } from 'react';

export interface AdminContextType {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const AdminContext = createContext<AdminContextType>({
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () => {},
  closeMobileSidebar: () => {},
});

export const useAdminLayout = () => useContext(AdminContext);
