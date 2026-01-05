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

    // Kas gali tapti nariu section
    defineField({
      name: 'whoCanJoinTitle',
      title: 'Kas gali tapti nariu – antraštė',
      type: 'string',
      description: 'Pvz.: "Kas gali tapti nariu"',
    }),
    defineField({
      name: 'whoCanJoinText',
      title: 'Kas gali tapti nariu – tekstas',
      type: 'text',
      rows: 4,
      description: 'Aprašymas kas gali tapti KKPDA nariu',
    }),
    defineField({
      name: 'whoCanJoinHighlights',
      title: 'Kas gali tapti nariu – papildomi punktai',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlightItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Antraštė',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Aprašymas',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'title'},
          },
        },
      ],
      description: 'Papildomi punktai, pvz.: "Aktyvi bendruomenė", "Prezidiumas tvirtina"',
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

    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA sekcijos antraštė',
      type: 'string',
      description: 'Pvz.: "Narystė – bendruomenė, ne formalumas"',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA sekcijos tekstas',
      type: 'blockContent',
      description: 'Tekstas prie CTA sekcijos (palaikomas formatavimas)',
    }),
  ],
  preview: {prepare: () => ({title: 'Narystė – Kaip tapti nariu'})},
})


