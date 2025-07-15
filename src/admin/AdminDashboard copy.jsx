import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, BarChart3, FolderOpen, Users, Eye } from "lucide-react";

const AdminDashboard = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-secondary-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FolderOpen className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary-500 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-lg font-medium text-secondary-900">0</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary-500 truncate">
                    Total Contacts
                  </dt>
                  <dd className="text-lg font-medium text-secondary-900">0</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary-500 truncate">
                    Site Views
                  </dt>
                  <dd className="text-lg font-medium text-secondary-900">0</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary-500 truncate">
                    This Month
                  </dt>
                  <dd className="text-lg font-medium text-secondary-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-medium text-secondary-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors">
                Add New Project
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-secondary-700 bg-secondary-50 rounded-md hover:bg-secondary-100 transition-colors">
                View All Projects
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-secondary-700 bg-secondary-50 rounded-md hover:bg-secondary-100 transition-colors">
                Manage Contacts
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-medium text-secondary-900 mb-4">
              Recent Activity
            </h3>
            <div className="text-sm text-secondary-500">
              <p>No recent activity to display.</p>
              <p className="mt-2">
                Start by adding your first project or check your contact
                messages.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            🚀 Getting Started
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              Welcome to your portfolio admin dashboard! Here's how to get
              started:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Set up your Supabase database with the required tables</li>
              <li>Configure your environment variables</li>
              <li>Add your first project</li>
              <li>Customize your portfolio content</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
