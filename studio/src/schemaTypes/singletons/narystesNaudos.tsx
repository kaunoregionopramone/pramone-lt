import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const narystesNaudos = defineType({
  name: 'narystesNaudos',
  title: 'Narystės naudos',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'benefitsText',
      title: 'Narystės naudos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefitItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description1',
              title: 'Aprašymas 1 (nebūtina)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'description2',
              title: 'Aprašymas 2 (nebūtina)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'description3',
              title: 'Aprašymas 3 (nebūtina)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'description4',
              title: 'Aprašymas 4 (nebūtina)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              description1: 'description1',
            },
            prepare({title, description1}) {
              return {
                title: title || 'Nauda',
                subtitle: description1 ? description1.substring(0, 50) + '...' : 'Nėra aprašymo',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Narystės naudos'})},
})

