import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, FolderOpen } from 'lucide-react'
import Layout from '../components/Layout'
import { db } from '../lib/supabase'
import { format } from 'date-fns'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await db.getProjects()
      setProjects(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  // Demo projects for when database is not set up
  const demoProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
      image_url: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=E-Commerce+Platform',
      demo_url: 'https://example.com',
      github_url: 'https://github.com/satish/ecommerce',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image_url: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Task+Manager',
      demo_url: 'https://example.com',
      github_url: 'https://github.com/satish/taskmanager',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Socket.io'],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and historical data with beautiful visualizations.',
      image_url: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Weather+Dashboard',
      demo_url: 'https://example.com',
      github_url: 'https://github.com/satish/weather-dashboard',
      technologies: ['React', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
      created_at: new Date().toISOString()
    }
  ]

  const displayProjects = projects.length > 0 ? projects : demoProjects

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading projects...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
            My Projects
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one represents 
            a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">
              Error loading projects: {error}
            </p>
            <p className="text-red-600 text-sm mt-2">
              Showing demo projects instead. Set up your Supabase database to see real projects.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-secondary-200 hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              <div className="aspect-video bg-secondary-100 overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-secondary-900">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-secondary-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(new Date(project.created_at), 'MMM yyyy')}
                  </div>
                </div>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-secondary-600 hover:text-secondary-700 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {displayProjects.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No projects yet
            </h3>
            <p className="text-secondary-600">
              Projects will appear here once you add them through the admin panel.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Interested in working together?
          </h2>
          <p className="text-secondary-600 mb-8">
            I'm always open to discussing new opportunities and exciting projects.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </Layout>
  )
}

export default Projects
