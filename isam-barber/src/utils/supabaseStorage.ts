import { supabase } from '../lib/supabase';

/**
 * Carica un file in un bucket specifico di Supabase e restituisce l'URL pubblico.
 * @param bucket Il nome del bucket (es. 'gallery', 'products')
 * @param file Il file da caricare
 * @returns L'URL pubblico del file caricato
 */
export const uploadFile = async (bucket: string, file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
};
