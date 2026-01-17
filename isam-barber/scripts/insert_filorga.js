import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve('.env')
const envContent = fs.readFileSync(envPath, 'utf8')
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
        process.env[key.trim()] = value.trim()
    }
})

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function insertFilorga() {
    console.log('🧴 Inserting Filorga Product...')

    const imagePath = path.resolve('public/filorga.png')
    if (!fs.existsSync(imagePath)) {
        console.error('❌ Image not found at:', imagePath)
        process.exit(1)
    }

    const fileBuffer = fs.readFileSync(imagePath)
    const fileName = `filorga_${Date.now()}.png`

    // 1. Upload Image
    console.log('   Uploading image...')
    const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, fileBuffer, {
            contentType: 'image/png',
            upsert: true
        })

    if (uploadError) {
        console.error('❌ Upload failed:', uploadError.message)
        process.exit(1)
    }

    const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

    console.log('   ✅ Image uploaded:', urlData.publicUrl)

    // 2. Insert Product
    console.log('   Creating database record...')
    const { data: product, error: dbError } = await supabase
        .from('products')
        .insert([{
            name: 'Filorga Time-Filler 5XP',
            description: 'Crème correction tous types de rides / Correction cream - all types of wrinkles',
            price: 65.00, // Estimated price
            stock: 50,
            category: 'Face Care',
            image_url: urlData.publicUrl,
            discount: 0,
            is_active: true
        }])
        .select()

    if (dbError) {
        console.error('❌ Database insert failed:', dbError.message)
        process.exit(1)
    }

    console.log('✅ Product inserted successfully!')
    console.log('   ID:', product[0].id)
    console.log('   Name:', product[0].name)
}

insertFilorga()
