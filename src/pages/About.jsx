import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Database, Globe } from 'lucide-react'
import Layout from '../components/Layout'

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      technologies: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js']
    },
    {
      category: 'Backend',
      icon: Database,
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express', 'FastAPI']
    },
    {
      category: 'Design',
      icon: Palette,
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX Design', 'Responsive Design']
    },
    {
      category: 'Tools & Cloud',
      icon: Globe,
      technologies: ['Git', 'Docker', 'AWS', 'Vercel', 'Supabase', 'Firebase']
    }
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with a love for creating 
            beautiful, functional, and user-friendly digital experiences.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              My Journey
            </h2>
            <div className="space-y-4 text-secondary-600">
              <p>
                Hello! I'm Satish, a full-stack developer based in India. 
                I enjoy creating things that live on the internet, whether 
                that be websites, applications, or anything in between.
              </p>
              <p>
                My interest in web development started back in 2020 when I 
                decided to try editing custom themes — turns out hacking 
                together a custom website taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working 
                at various companies, building products for consumers and 
                businesses alike. I specialize in building exceptional digital 
                experiences.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Quick Facts
            </h3>
            <ul className="space-y-2 text-secondary-600">
              <li>🎓 Computer Science Background</li>
              <li>💼 3+ Years of Experience</li>
              <li>🌍 Based in India</li>
              <li>☕ Coffee Enthusiast</li>
              <li>🎯 Always Learning New Technologies</li>
            </ul>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="bg-white rounded-lg p-6 shadow-sm border border-secondary-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="w-6 h-6 text-primary-600 mr-3" />
                  <h3 className="font-semibold text-secondary-900">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Experience
          </h2>
          <div className="space-y-8">
            {/* Add your actual experience here */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-secondary-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Full Stack Developer
                  </h3>
                  <p className="text-primary-600">Company Name</p>
                </div>
                <span className="text-secondary-500">2022 - Present</span>
              </div>
              <p className="text-secondary-600">
                Developed and maintained web applications using React, Node.js, and PostgreSQL. 
                Collaborated with cross-functional teams to deliver high-quality products.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-secondary-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Frontend Developer
                  </h3>
                  <p className="text-primary-600">Another Company</p>
                </div>
                <span className="text-secondary-500">2021 - 2022</span>
              </div>
              <p className="text-secondary-600">
                Built responsive web applications and implemented modern UI/UX designs. 
                Worked with React, JavaScript, and various CSS frameworks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default About
