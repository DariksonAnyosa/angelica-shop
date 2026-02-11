import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeConfig',
    title: 'Home Configuration',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'End of Season Sale',
        }),
        defineField({
            name: 'heroAnnouncement',
            title: 'Announcement Details',
            type: 'string',
            initialValue: 'Beautifully crafted cashmere for every season.',
        }),
        defineField({
            name: 'heroCommonImage',
            title: 'Hero Image (Desktop)',
            type: 'image',
            description: 'Main banner image for desktop view (Horizontal - 1920x1080 recommended).',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        }),
        defineField({
            name: 'heroMobileImage',
            title: 'Hero Image (Mobile)',
            type: 'image',
            description: 'Specific image for mobile view (Vertical - 9:16 recommended). If left empty, desktop image is used.',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        }),
        defineField({
            name: 'heroButtonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Shop Now',
        }),
        defineField({
            name: 'heroLink',
            title: 'Button Link',
            type: 'string',
            initialValue: '/collection',
        }),
    ],
    preview: {
        select: {
            title: 'heroTitle',
            media: 'heroCommonImage',
        },
        prepare({ title, media }) {
            return {
                title: 'Home Configuration',
                subtitle: title,
                media: media,
            }
        },
    },
})
