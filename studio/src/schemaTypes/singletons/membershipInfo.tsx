import {defineField, defineType} from 'sanity'

export const membershipInfo = defineType({
  name: 'membershipInfo',
  title: 'Narystė – Kaip tapti nariu',
  type: 'document',
  fields: [
    defineField({
      name: 'whyJoinText',
      title: 'Kodėl verta tapti KKPDA nariu? – tekstas',
      type: 'blockContent',
    }),

    defineField({
      name: 'requiredDocuments',
      title: 'Kokie dokumentai reikalingi? – dokumentų sąrašas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'documentItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Aprašymas (nebūtina)',
              type: 'text',
            }),
            defineField({
              name: 'file',
              title: 'Failas',
              type: 'file',
              options: {storeOriginalFilename: true},
            }),
            defineField({
              name: 'buttonText',
              title: 'Mygtuko tekstas (nebūtina)',
              type: 'string',
              description: 'Pavyzdžiui: "Jūsų dokumentas" arba "Atsisiųsti". Jei neužpildyta, bus rodoma "Jūsų dokumentas"',
            }),
          ],
          preview: {
            select: {title: 'title', file: 'file.asset->originalFilename'},
            prepare({title, file}) {
              return {title: title || 'Dokumentas', subtitle: file || 'Failas'}
            },
          },
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Narystė – Kaip tapti nariu'})},
})


