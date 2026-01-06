import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const istorija = defineType({
  name: 'istorija',
  title: 'Istorija',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'ourHistory',
      title: 'Mūsų istorija',
      type: 'blockContent',
      description: 'Istorijos skyriaus turinys',
    }),
    defineField({
      name: 'pastPresidents',
      title: 'Buvę prezidentai',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pastPresident',
          fields: [
            defineField({
              name: 'name',
              title: 'Vardas ir pavardė',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startYear',
              title: 'Pradžios metai',
              type: 'number',
              validation: (Rule) => Rule.required().min(1930).max(new Date().getFullYear()),
            }),
            defineField({
              name: 'endYear',
              title: 'Pabaigos metai',
              type: 'number',
              description: 'Palikite tuščią, jei tai dabartinis prezidentas',
              validation: (Rule) => Rule.min(1930).max(new Date().getFullYear()),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              startYear: 'startYear',
              endYear: 'endYear',
            },
            prepare({title, startYear, endYear}) {
              const period = endYear ? `${startYear} - ${endYear}` : `${startYear} - dabartis`
              return {
                title,
                subtitle: period,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Istorija'})},
})

