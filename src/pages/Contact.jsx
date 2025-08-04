import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
	Mail,
	Phone,
	MapPin,
	Send,
	Github,
	Linkedin,
	Twitter,
} from 'lucide-react';
import Layout from '../components/Layout';
import { db } from '../lib/supabase';

const Contact = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const contactData = {
				name: data.name,
				email: data.email,
				subject: data.subject || null, // Change empty string to null for optional field
				number: data.number,
				message: data.message,
				// Remove created_at as it's handled by default timestamp in the table
			};

			const result = await db.createContact(contactData);
			console.log('Contact submitted:', result);
			toast.success("Message sent successfully! I'll get back to you soon.");
			reset();
		} catch (error) {
			console.error('Error details:', error);
			toast.error('Failed to send message. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Layout>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h1 className='text-4xl sm:text-5xl font-bold text-secondary-900 mb-6'>
						Get In Touch
					</h1>
					<p className='text-xl text-secondary-600 max-w-3xl mx-auto'>
						I'm always interested in hearing about new opportunities and projects.
						Let's discuss how we can work together.
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<h2 className='text-2xl font-bold text-secondary-900 mb-8'>
							Let's start a conversation
						</h2>

						<div className='space-y-6'>
							<div className='flex items-center'>
								<div className='flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center'>
									<Mail className='w-6 h-6 text-primary-600' />
								</div>
								<div className='ml-4'>
									<h3 className='text-lg font-medium text-secondary-900'>Email</h3>
									<p className='text-secondary-600'>your.email@example.com</p>
								</div>
							</div>

							<div className='flex items-center'>
								<div className='flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center'>
									<Phone className='w-6 h-6 text-primary-600' />
								</div>
								<div className='ml-4'>
									<h3 className='text-lg font-medium text-secondary-900'>Phone</h3>
									<p className='text-secondary-600'>+91 1234567890</p>
								</div>
							</div>

							<div className='flex items-center'>
								<div className='flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center'>
									<MapPin className='w-6 h-6 text-primary-600' />
								</div>
								<div className='ml-4'>
									<h3 className='text-lg font-medium text-secondary-900'>Location</h3>
									<p className='text-secondary-600'>India</p>
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div className='mt-8'>
							<h3 className='text-lg font-medium text-secondary-900 mb-4'>
								Connect with me
							</h3>
							<div className='flex space-x-4'>
								<a
									href='https://github.com/satish'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors'>
									<Github className='w-5 h-5' />
								</a>
								<a
									href='https://linkedin.com/in/satish'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors'>
									<Linkedin className='w-5 h-5' />
								</a>
								<a
									href='https://twitter.com/satish'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors'>
									<Twitter className='w-5 h-5' />
								</a>
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='bg-white rounded-lg shadow-sm border border-secondary-200 p-8'>
						<h2 className='text-2xl font-bold text-secondary-900 mb-6'>
							Send me a message
						</h2>

						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-secondary-700 mb-2'>
									Name *
								</label>
								<input
									type='text'
									id='name'
									{...register('name', { required: 'Name is required' })}
									className='w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
									placeholder='Your name'
								/>
								{errors.name && (
									<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
								)}
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-secondary-700 mb-2'>
									Email *
								</label>
								<input
									type='email'
									id='email'
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: /^\S+@\S+$/i,
											message: 'Please enter a valid email',
										},
									})}
									className='w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
									placeholder='your.email@example.com'
								/>
								{errors.email && (
									<p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
								)}
							</div>
							<div>
								<label
									htmlFor='phone'
									className='block text-sm font-medium text-secondary-700 mb-2'>
									Phone *
								</label>
								<input
									type='phone'
									id='phone'
									{...register('number', {
										required: 'Phone is required',
									})}
									className='w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
									placeholder='+91 1234567890'
								/>
								{errors.number && (
									<p className='mt-1 text-sm text-red-600'>{errors.number.message}</p>
								)}
							</div>
							<div>
								<label
									htmlFor='subject'
									className='block text-sm font-medium text-secondary-700 mb-2'>
									Subject
								</label>
								<input
									type='text'
									id='subject'
									{...register('subject')}
									className='w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
									placeholder="What's this about?"
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-secondary-700 mb-2'>
									Message *
								</label>
								<textarea
									id='message'
									rows={6}
									{...register('message', { required: 'Message is required' })}
									className='w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
									placeholder='Tell me about your project or idea...'
								/>
								{errors.message && (
									<p className='mt-1 text-sm text-red-600'>{errors.message.message}</p>
								)}
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
								{isSubmitting ? (
									<>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
										Sending...
									</>
								) : (
									<>
										<Send className='w-4 h-4 mr-2' />
										Send Message
									</>
								)}
							</button>
						</form>
					</motion.div>
				</div>
			</div>
		</Layout>
	);
};

export default Contact;
