import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import homeConfig from './homeConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, homeConfig],
}
