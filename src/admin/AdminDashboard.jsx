import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  BarChart3,
  FolderOpen,
  Users,
  Eye,
  Plus,
  Edit,
  Trash2,
  Mail,
  Save,
  X,
} from "lucide-react";
import { db } from "../lib/supabase";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalContacts: 0,
    siteViews: 0,
    monthlyViews: 0,
  });
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    demo_url: "",
    image_url: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsData, contactsData, viewsData] = await Promise.all([
        db.getProjects(),
        db.getContacts(),
        db.getSiteViews(),
      ]);

      setProjects(projectsData || []);
      setContacts(contactsData || []);
      setStats({
        totalProjects: projectsData?.length || 0,
        totalContacts: contactsData?.length || 0,
        siteViews: viewsData?.count || 0,
        monthlyViews: viewsData?.count || 0,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddProject = async () => {
    try {
      const projectData = {
        ...newProject,
        technologies: newProject.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };
      await db.createProject(projectData);
      toast.success("Project added successfully!");
      setNewProject({
        title: "",
        description: "",
        technologies: "",
        github_url: "",
        demo_url: "",
        image_url: "",
      });
      loadData();
      setActiveView("projects");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    }
  };

  const handleUpdateProject = async (id) => {
    try {
      const projectData = {
        ...editingProject,
        technologies: editingProject.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };
      await db.updateProject(id, projectData);
      toast.success("Project updated successfully!");
      setEditingProject(null);
      loadData();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await db.deleteProject(id);
        toast.success("Project deleted successfully!");
        loadData();
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project");
      }
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await db.deleteContact(id);
        toast.success("Contact deleted successfully!");
        loadData();
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      }
    }
  };

  const renderDashboard = () => (
    <>
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
                <dd className="text-lg font-medium text-secondary-900">
                  {stats.totalProjects}
                </dd>
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
                <dd className="text-lg font-medium text-secondary-900">
                  {stats.totalContacts}
                </dd>
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
                <dd className="text-lg font-medium text-secondary-900">
                  {stats.siteViews}
                </dd>
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
                <dd className="text-lg font-medium text-secondary-900">
                  {stats.monthlyViews}
                </dd>
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
            <button
              onClick={() => setActiveView("add-project")}
              className="w-full text-left px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
            >
              <Plus className="inline w-4 h-4 mr-2" />
              Add New Project
            </button>
            <button
              onClick={() => setActiveView("projects")}
              className="w-full text-left px-4 py-2 text-sm font-medium text-secondary-700 bg-secondary-50 rounded-md hover:bg-secondary-100 transition-colors"
            >
              <FolderOpen className="inline w-4 h-4 mr-2" />
              View All Projects
            </button>
            <button
              onClick={() => setActiveView("contacts")}
              className="w-full text-left px-4 py-2 text-sm font-medium text-secondary-700 bg-secondary-50 rounded-md hover:bg-secondary-100 transition-colors"
            >
              <Mail className="inline w-4 h-4 mr-2" />
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
              Start by adding your first project or check your contact messages.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderAddProject = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
      <h3 className="text-lg font-medium text-secondary-900 mb-4">
        Add New Project
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Project title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Description
          </label>
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            rows="3"
            placeholder="Project description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) =>
              setNewProject({ ...newProject, technologies: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={newProject.github_url}
            onChange={(e) =>
              setNewProject({ ...newProject, github_url: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Demo URL
          </label>
          <input
            type="url"
            value={newProject.demo_url}
            onChange={(e) =>
              setNewProject({ ...newProject, demo_url: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://yourproject.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={newProject.image_url}
            onChange={(e) =>
              setNewProject({ ...newProject, image_url: e.target.value })
            }
            className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://image-url.com/image.jpg"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Save className="inline w-4 h-4 mr-2" />
            Add Project
          </button>
          <button
            onClick={() => setActiveView("dashboard")}
            className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors"
          >
            <X className="inline w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-secondary-900">All Projects</h3>
        <button
          onClick={() => setActiveView("add-project")}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="inline w-4 h-4 mr-2" />
          Add New
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-secondary-200 rounded-lg p-4"
          >
            {editingProject && editingProject.id === project.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  rows="3"
                />
                <input
                  type="text"
                  value={editingProject.technologies}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Technologies (comma-separated)"
                />
                <input
                  type="url"
                  value={editingProject.github_url}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      github_url: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="GitHub URL"
                />
                <input
                  type="url"
                  value={editingProject.demo_url}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      demo_url: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Demo URL"
                />
                <input
                  type="url"
                  value={editingProject.image_url}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Image URL"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateProject(project.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Save className="inline w-3 h-3 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-3 py-1 bg-secondary-600 text-white rounded text-sm hover:bg-secondary-700 transition-colors"
                  >
                    <X className="inline w-3 h-3 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium text-secondary-900">
                  {project.title}
                </h4>
                <p className="text-sm text-secondary-600 mt-1">
                  {project.description}
                </p>
                <p className="text-sm text-secondary-500 mt-2">
                  Technologies:{" "}
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : project.technologies}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      setEditingProject({
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        technologies: Array.isArray(project.technologies)
                          ? project.technologies.join(", ")
                          : project.technologies,
                        github_url: project.github_url,
                        demo_url: project.demo_url,
                        image_url: project.image_url,
                      })
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="inline w-3 h-3 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="inline w-3 h-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-secondary-500 text-center py-8">
            No projects found. Add your first project!
          </p>
        )}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
      <h3 className="text-lg font-medium text-secondary-900 mb-4">
        Contact Messages
      </h3>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border border-secondary-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-secondary-900">
                  {contact.name}
                </h4>
                <p className="text-sm text-secondary-600">{contact.email}</p>
                <p className="text-sm text-secondary-800 mt-2">
                  {contact.message}
                </p>
                <p className="text-xs text-secondary-400 mt-2">
                  {new Date(contact.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteContact(contact.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 className="inline w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-secondary-500 text-center py-8">
            No contact messages found.
          </p>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "add-project":
        return renderAddProject();
      case "projects":
        return renderProjects();
      case "contacts":
        return renderContacts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-secondary-900">
                Admin Dashboard
              </h1>
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveView("dashboard")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "dashboard"
                      ? "bg-primary-100 text-primary-700"
                      : "text-secondary-600 hover:text-secondary-900"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView("projects")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "projects"
                      ? "bg-primary-100 text-primary-700"
                      : "text-secondary-600 hover:text-secondary-900"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveView("contacts")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "contacts"
                      ? "bg-primary-100 text-primary-700"
                      : "text-secondary-600 hover:text-secondary-900"
                  }`}
                >
                  Contacts
                </button>
              </nav>
            </div>
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
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
