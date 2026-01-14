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
            name: 'images',
            title: 'Gallery',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true // Enables image cropping
                }
            }],
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
                ],
            },
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
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
    ],
})
