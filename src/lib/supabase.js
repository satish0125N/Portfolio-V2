import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const db = {
  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getProject(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createProject(project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Contacts
  async getContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createContact(contact) {
    console.log('Attempting to create contact with data:', contact)
    
    // Ensure all required fields are present
    if (!contact.name || !contact.email || !contact.message) {
      throw new Error('Missing required fields: name, email, and message are required')
    }
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    console.log('Contact created successfully:', data)
    return data?.[0] || data
  },

  async deleteContact(id) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Site Views
  async getSiteViews() {
    const { data, error } = await supabase
      .from('site_views')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  async incrementSiteViews() {
    const { error } = await supabase
      .rpc('increment_site_views')
    
    if (error) throw error
  },

  async updateSiteViews(count) {
    const { data, error } = await supabase
      .from('site_views')
      .upsert({ id: 1, count, updated_at: new Date().toISOString() })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Authentication helper functions
export const auth = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
