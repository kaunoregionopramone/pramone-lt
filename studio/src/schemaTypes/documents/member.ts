import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const member = defineType({
  name: 'member',
  title: 'Nariai',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Įmonė',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logotipas',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'company',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
