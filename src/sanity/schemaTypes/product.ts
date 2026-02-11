import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price (PEN)',
            type: 'number',
            description: 'Price in Soles',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            description: 'Brief description for product cards.',
        }),
        defineField({
            name: 'story',
            title: 'The Story',
            type: 'text',
            rows: 5,
            description: 'Longer editorial story about the product.',
        }),
        defineField({
            name: 'isSoldOut',
            title: 'Sold Out',
            type: 'boolean',
            initialValue: false,
            description: 'Mark as sold out (disables purchase button).',
        }),
        defineField({
            name: 'images',
            title: 'Gallery',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true
                },
                fields: [
                    {
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text',
                    }
                ]
            }],
            description: 'Recommended: Vertical images (3:4 ratio, e.g., 1080x1350px). Square or horizontal images will break the layout.',
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'XS', value: 'XS' },
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'One Size', value: 'One Size' },
                ],
            },
            validation: (rule) => rule.min(1),
        }),
        defineField({
            name: 'colors',
            title: 'Colors (Hex Codes)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Example: #000000, #FF0000. Displayed as swatches.',
        }),
        defineField({
            name: 'stock',
            title: 'Stock Quantity',
            type: 'number',
            initialValue: 0,
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Dresses', value: 'dresses' },
                    { title: 'Tops', value: 'tops' },
                    { title: 'Bottoms', value: 'bottoms' },
                    { title: 'Sets', value: 'sets' },
                    { title: 'Accessories', value: 'accessories' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'relatedProducts',
            title: 'Pairs Well With',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            description: 'Select products to display in the "Pairs well with" section.',
        }),
    ],
})
