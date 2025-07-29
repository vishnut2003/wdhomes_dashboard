import SettingsPage from '@/app/pages/settings'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Account Settings",
};

const MyAccountPage = () => {
  return <SettingsPage/>
}

export default MyAccountPage