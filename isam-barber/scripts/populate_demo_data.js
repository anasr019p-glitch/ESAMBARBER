import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Configurazione Supabase
const supabaseUrl = 'https://vpgzwgsagywasrxcracc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3p3Z3NhZ3l3YXNyeGNyYWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzA5MjQsImV4cCI6MjA4MzcwNjkyNH0.m_WOHXH-_nqO9-9Ij3mArNGshWTqvGex88sZY6Zmnhk'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Percorsi Immagini (aggiornati in base alla tua cartella)
const pathFilorga = 'C:/Users/PC/.gemini/antigravity/brain/d86b9223-90a6-441d-abca-b411627d73e0/uploaded_image_1768506614014.png' // L'ultima immagine caricata, presumibilmente la crema
const pathShop = 'C:/Users/PC/.gemini/antigravity/brain/d86b9223-90a6-441d-abca-b411627d73e0/uploaded_image_0_1768506658301.png' // L'immagine del negozio

async function uploadAndCreate() {
    console.log('🚀 AVVIO PROCEDURA AUTOMATICA DI POPOLAMENTO DATI ...\n')

    // --- 1. PRODOTTO ---
    console.log('📦 Processo Prodotto: "Crema Filorga"...')
    try {
        if (fs.existsSync(pathFilorga)) {
            const fileBuffer = fs.readFileSync(pathFilorga)
            const fileName = `filorga-${Date.now()}.png`

            // Upload
            const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(fileName, fileBuffer, { contentType: 'image/png', upsert: true })
            if (uploadError) throw uploadError

            // Get URL
            const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName)
            console.log('   ✅ Immagine caricata:', publicUrl)

            // Insert DB
            const { error: dbError } = await supabase.from('products').insert({
                name: 'Filorga Time-Filler 5XP',
                description: 'Crema correzione rughe assoluta. Best seller.',
                price: 59.90,
                stock: 10,
                category: 'Benessere',
                image_url: publicUrl,
                is_active: true
            })
            if (dbError) throw dbError
            console.log('   ✅ Prodotto creato nel database!')

        } else {
            console.error('   ❌ File immagine Filorga non trovato nel percorso specificato.')
        }
    } catch (err) {
        console.error('   ❌ Errore Prodotto:', err.message)
    }

    console.log('\n--------------------------------------------------\n')

    // --- 2. GALLERIA ---
    console.log('🖼️ Processo Galleria: "Esterno Shop"...')
    try {
        if (fs.existsSync(pathShop)) {
            const fileBuffer = fs.readFileSync(pathShop)
            const fileName = `shop-ext-${Date.now()}.png`

            // Upload
            const { data: uploadData, error: uploadError } = await supabase.storage.from('gallery').upload(fileName, fileBuffer, { contentType: 'image/png', upsert: true })
            if (uploadError) throw uploadError

            // Get URL
            const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName)
            console.log('   ✅ Immagine caricata:', publicUrl)

            // Insert DB
            const { error: dbError } = await supabase.from('gallery').insert({
                title: 'Il nostro salone',
                media_url: publicUrl,
                media_type: 'image',
                sort_order: 1,
                is_active: true
            })
            if (dbError) throw dbError
            console.log('   ✅ Elemento Galleria creato nel database!')

        } else {
            console.error('   ❌ File immagine Shop non trovato nel percorso specificato.')
        }
    } catch (err) {
        console.error('   ❌ Errore Galleria:', err.message)
    }

    console.log('\n✨ OPERAZIONE COMPLETATA! Controlla il sito.')
}

uploadAndCreate()
