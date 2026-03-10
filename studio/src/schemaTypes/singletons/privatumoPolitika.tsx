import {defineField, defineType} from 'sanity'

export const privatumoPolitika = defineType({
  name: 'privatumoPolitika',
  title: 'Privatumo politika',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Privatumo politikos pavadinimas',
      type: 'string',
      description: 'Pvz.: "Privatumo politika"',
    }),
    defineField({
      name: 'description',
      title: 'Privatumo politikos aprašymas',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Privatumo politikos tekstas (rodomas Privatumo politikos puslapyje). Galite naudoti formatavimą, sąrašus ir pan.',
    }),
    defineField({
      name: 'file',
      title: 'Privatumo politika (PDF)',
      type: 'file',
      options: {storeOriginalFilename: true},
      description: 'Įkelkite privatumo politiką PDF formatu',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Privatumo politika'}
    },
  },
})
