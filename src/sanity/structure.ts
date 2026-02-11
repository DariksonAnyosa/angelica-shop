import type { StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Contenido')
        .items([
            // Singleton for Home Config
            S.listItem()
                .title('Configuración Home')
                .child(
                    S.document()
                        .schemaType('homeConfig')
                        .documentId('homeConfig')
                ),
            // Regular document types
            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) => item.getId() !== 'homeConfig'
            ),
        ])
