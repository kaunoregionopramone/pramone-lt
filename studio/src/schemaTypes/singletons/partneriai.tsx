import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const partneriai = defineType({
  name: 'partneriai',
  title: 'Partneriai',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'partnersCooperate',
      title: 'Mes bendradarbiaujame su',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partner',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'extra',
              title: 'Papildoma informacija (pvz., data)',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Logotipas (nebūtina)',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'extra',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'partnersAgreements',
      title: 'Pasirašytos bendradarbiavimo sutartys',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'agreement',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'extra',
              title: 'Papildoma informacija (pvz., data)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'extra',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Partneriai'}),
  },
})

