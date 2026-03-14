import { supabase } from '../config/supabase'

export const getColloquiumsByFilter = async (subject: string, year: number, session: string, studyYear: number) => {
    const { data, error } = await supabase
        .from('colloquiums')
        .select('*')
        .eq('subject_id', subject)
        .eq('year', year)
        .eq('session', session)
        .eq('study_year', studyYear)

    if (error) {
        throw new Error(error.message)
    }
    return data
}

export const getColloquiumByDate = async (date: string) => {
    const { data, error } = await supabase
        .from('colloquiums')
        .select('*')
        .eq('date', date)
        .single()

    if (error && error.code !== 'PGRST116') {
        throw new Error(error.message)
    }
    return data
}

// Загрузка картинки в Supabase Storage
export const uploadImage = async (uri: string): Promise<string | null> => {
    try {
        const formData = new FormData()
        const fileName = `colloquium_${Date.now()}.jpg`

        // В React Native FormData принимает объект с uri, name и type для файлов
        formData.append('file', {
            uri: uri,
            name: fileName,
            type: 'image/jpeg',
        } as any)

        const { error } = await supabase.storage
            .from('kol')
            .upload(fileName, formData, {
                contentType: 'image/jpeg',
                upsert: true
            })

        if (error) throw error

        const { data } = supabase.storage.from('kol').getPublicUrl(fileName)
        return data.publicUrl
    } catch (e) {
        console.error('Upload error:', e)
        return null
    }
}

// Добавление нового коллоквиума
export const addColloquium = async (params: {
    subject_id: string
    year: number
    session: string
    study_year: number
    title: string
    description?: string
    imageUri?: string
}) => {
    let image_url: string | null = null

    if (params.imageUri) {
        image_url = await uploadImage(params.imageUri)
    }

    const { data, error } = await supabase
        .from('colloquiums')
        .insert({
            subject_id: params.subject_id,
            year: params.year,
            session: params.session,
            study_year: params.study_year,
            title: params.title,
            description: params.description || null,
            image_url,
        })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data
}