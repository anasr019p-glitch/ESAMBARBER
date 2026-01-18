import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load env
const envPath = path.resolve('.env')
const envContent = fs.readFileSync(envPath, 'utf8')
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) process.env[key.trim()] = value.trim()
})

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function verifySystem() {
    console.log('🚀 STARING FINAL SYSTEM VERIFICATION\n')
    let errors = []

    // 1. CHECK SETTINGS
    console.log('1️⃣ Checking Settings configuration...')
    const { data: settings, error: settingsError } = await supabase.from('settings').select('*')
    if (settingsError) errors.push(`Settings Error: ${settingsError.message}`)
    else if (settings.length !== 1) errors.push(`Settings Table Warning: Found ${settings.length} rows (expected 1).`)
    else console.log('   ✅ Settings configured correctly.')

    // 2. CHECK PRODUCTS & COLUMNS
    console.log('\n2️⃣ Checking Products Database...')
    const { data: products, error: prodError } = await supabase.from('products').select('*').limit(5)
    if (prodError) {
        errors.push(`Products Error: ${prodError.message}`)
    } else {
        if (products.length === 0) console.log('   ⚠️ No products found (Test manually if this is intended).')
        else {
            const sample = products[0]
            const requiredCols = ['stock', 'discount', 'category', 'is_active', 'image_url']
            const missing = requiredCols.filter(c => sample[c] === undefined)
            if (missing.length > 0) errors.push(`Products Schema Error: Missing columns ${missing.join(', ')}`)
            else console.log(`   ✅ Products schema correct. Found ${products.length} sample products.`)
        }
    }

    // 3. CHECK STORAGE PUBLIC ACCESS
    console.log('\n3️⃣ Checking Storage Public Access...')
    const buckets = ['products', 'gallery', 'staff']
    for (const b of buckets) {
        const { data } = supabase.storage.from(b).getPublicUrl('test.png')
        // checking if we can access the bucket is harder without uploading, but we can assume if previous steps worked it's fine.
        // We will just try to list files to see if we have permission (anon key usually has public read)
        const { data: listData, error: listError } = await supabase.storage.from(b).list()
        if (listError) errors.push(`Storage Error (${b}): ${listError.message}`)
        else console.log(`   ✅ Bucket '${b}' accessible.`)
    }

    // SUMMARY
    console.log('\n=============================================')
    if (errors.length > 0) {
        console.error('❌ VERIFICATION FAILED WITH ERRORS:')
        errors.forEach(e => console.error(`   - ${e}`))
        process.exit(1)
    } else {
        console.log('✅ SYSTEM VERIFIED. ALL CHECKS PASSED.')
        console.log('   Ready for deployment.')
    }
}

verifySystem()
