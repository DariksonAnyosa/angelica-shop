import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// Configuración de la conexión
export const client = createClient({
    projectId: 'rsufo2x4',      // Tu ID real de Sanity
    dataset: 'production',      // El set de datos
    apiVersion: '2024-01-01',   // Versión de la API
    useCdn: false,               // true = Rápido (caché), false = Datos frescos al instante
})

// Ayudante para extraer las URLs de las imágenes
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}
