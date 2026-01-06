import {defineField, defineType} from 'sanity'

export const legalDocuments = defineType({
  name: 'istatai',
  title: 'Įstatai',
  type: 'document',
  fields: [
    // Introduction Section
    defineField({
      name: 'introTitle',
      title: 'Įžangos pavadinimas',
      type: 'string',
      description: 'Pvz.: "Teisinė ir etinė struktūra"',
    }),
    defineField({
      name: 'introText',
      title: 'Įžangos tekstas',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Aprašomasis tekstas apie asociacijos teisinę struktūrą',
    }),
    defineField({
      name: 'introImage',
      title: 'Įžangos nuotrauka',
      type: 'image',
      options: {hotspot: true},
      description: 'Nuotrauka šalia įžangos teksto',
    }),
    defineField({
      name: 'statutesFile',
      title: 'KKPDA įstatai (PDF)',
      type: 'file',
      options: {storeOriginalFilename: true},
      description: 'Įkelkite naujausią įstatų redakciją PDF formatu',
    }),

    // Ethics Section
    defineField({
      name: 'ethicsTitle',
      title: 'Etikos sekcijos pavadinimas',
      type: 'string',
      description: 'Pvz.: "Vertybės ir principai"',
    }),
    defineField({
      name: 'ethicsDescription',
      title: 'Etikos sekcijos aprašymas',
      type: 'text',
      rows: 3,
      description: 'Trumpas etikos kodekso aprašymas',
    }),
    defineField({
      name: 'ethicsValuesIntro',
      title: 'Vertybių įžanga',
      type: 'text',
      rows: 2,
      description: 'Tekstas prieš vertybių sąrašą',
    }),
    defineField({
      name: 'ethicsValues',
      title: 'Etikos vertybės',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ethicsValue',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {
                title: title || 'Vertybė',
              }
            },
          },
        },
      ],
      description: 'Etikos vertybių sąrašas',
    }),
    defineField({
      name: 'ethicsNotes',
      title: 'Etikos pastabos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ethicsNote',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekstas',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isItalic',
              title: 'Kursyvas',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'text'},
            prepare({title}) {
              return {title: title?.substring(0, 50) + '...' || 'Pastaba'}
            },
          },
        },
      ],
      description: 'Papildomos pastabos po vertybių sąrašo',
    }),
    defineField({
      name: 'ethicsFile',
      title: 'Etikos kodeksas (PDF)',
      type: 'file',
      options: {storeOriginalFilename: true},
      description: 'Įkelkite etikos kodeksą PDF formatu',
    }),

    // Privacy Policy Section
    defineField({
      name: 'privacyTitle',
      title: 'Privatumo politikos pavadinimas',
      type: 'string',
      description: 'Pvz.: "Privatumo politika"',
    }),
    defineField({
      name: 'privacyDescription',
      title: 'Privatumo politikos aprašymas',
      type: 'text',
      rows: 3,
      description: 'Trumpas privatumo politikos aprašymas',
    }),
    defineField({
      name: 'privacyFile',
      title: 'Privatumo politika (PDF)',
      type: 'file',
      options: {storeOriginalFilename: true},
      description: 'Įkelkite privatumo politiką PDF formatu',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Įstatai'}
    },
  },
})
