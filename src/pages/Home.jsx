import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import Layout from '../components/Layout'
import { db } from '../lib/supabase'

const Home = () => {
  useEffect(() => {
    // Increment site views when home page loads
    db.incrementSiteViews().catch(console.error)
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-secondary-900 mb-6">
              Hi, I'm{' '}
              <span className="text-primary-600">Satish</span>
            </h1>
            <p className="text-xl sm:text-2xl text-secondary-600 mb-8">
              Full Stack Developer & UI/UX Designer
            </p>
            <p className="text-lg text-secondary-500 mb-12 max-w-2xl mx-auto">
              I create beautiful, functional, and user-friendly digital experiences.
              Passionate about modern web technologies and clean, efficient code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
            >
              Get In Touch
              <Mail className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="https://github.com/satish"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/satish"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Technologies I Work With
            </h2>
            <p className="text-lg text-secondary-600">
              Here are some of the technologies I use to bring ideas to life
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
          >
            {[
              'React', 'JavaScript', 'TypeScript', 'Node.js', 
              'Python', 'PostgreSQL', 'MongoDB', 'Docker',
              'AWS', 'Tailwind CSS', 'Next.js', 'GraphQL'
            ].map((tech) => (
              <div
                key={tech}
                className="bg-secondary-50 rounded-lg p-4 text-center hover:bg-primary-50 transition-colors"
              >
                <span className="text-secondary-700 font-medium">{tech}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
