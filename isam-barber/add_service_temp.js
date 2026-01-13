import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vpgzwgsagywasrxcracc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3p3Z3NhZ3l3YXNyeGNyYWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzA5MjQsImV4cCI6MjA4MzcwNjkyNH0.m_WOHXH-_nqO9-9Ij3mArNGshWTqvGex88sZY6Zmnhk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addService() {
    console.log('Adding "Servizio a Domicilio"...');
    const { data, error } = await supabase
        .from('services')
        .insert([
            {
                name: 'Servizio a Domicilio',
                description: 'Il comfort del nostro salone direttamente a casa tua. Taglio e styling professionale.',
                price: 50.00,
                category: 'combo',
                is_active: true,
                sort_order: 99
            }
        ])
        .select();

    if (error) {
        console.error('Error adding service:', error);
    } else {
        console.log('Service added successfully:', data);
    }
}

addService();
