import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const Admin = () => {
  const { user } = useAuth()

  if (!user) {
    return <AdminLogin />
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default Admin
