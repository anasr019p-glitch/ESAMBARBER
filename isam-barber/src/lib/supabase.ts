import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vpgzwgsagywasrxcracc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3p3Z3NhZ3l3YXNyeGNyYWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzA5MjQsImV4cCI6MjA4MzcwNjkyNH0.m_WOHXH-_nqO9-9Ij3mArNGshWTqvGex88sZY6Zmnhk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Service {
  id: string
  name: string
  description: string | null
  price: number
  category: string | null
  is_active: boolean
  sort_order: number
}

export interface Booking {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  service_id: string
  location: string
  booking_date: string
  booking_time: string
  status: string
  notes: string | null
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string | null
  media_url: string
  media_type: string
  is_active: boolean
  sort_order: number
}

export interface Staff {
  id: string
  name: string
  role: string
  avatar_url: string | null
  is_active: boolean
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  discount: number
  image_url: string | null
  category: string | null
  is_active: boolean
}

export interface Order {
  id: string
  customer_name: string
  total_amount: number
  status: string
  created_at: string
}

export interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  status: string
  created_at: string
}

export interface Settings {
  id: string
  is_shop_open: boolean
  announcement: string | null
}
