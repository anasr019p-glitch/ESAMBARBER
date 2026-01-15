import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vpgzwgsagywasrxcracc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3p3Z3NhZ3l3YXNyeGNyYWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzA5MjQsImV4cCI6MjA4MzcwNjkyNH0.m_WOHXH-_nqO9-9Ij3mArNGshWTqvGex88sZY6Zmnhk'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testUpload() {
    console.log('🔄 Avvio test - Tentativo 2 (PNG Simulator)...')

    // Create a minimal fake PNG buffer
    const fileName = 'test-image-' + Date.now() + '.png'
    // just some random bytes, not a real png, but enough for upload test
    const fileBody = Buffer.from('fake-image-content')

    console.log(`📂 Uploading ${fileName} to "gallery"...`)

    const { data, error } = await supabase
        .storage
        .from('gallery')
        .upload(fileName, fileBody, {
            contentType: 'image/png',
            upsert: true
        })

    if (error) {
        console.log('❌ FALLITO.')
        console.log('Messaggio:', error.message)
        console.log('Status:', error.statusCode)
    } else {
        console.log('✅ SUCCESSO! Immagine caricata.')
        console.log('   Path:', data.path)

        const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(data.path)
        console.log('   URL Pubblico:', publicUrl)
    }
}

testUpload()
