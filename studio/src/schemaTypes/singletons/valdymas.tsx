import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const valdymas = defineType({
  name: 'valdymasSettings',
  title: 'Valdymas – Nustatymai',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'presidentMessage',
      title: 'Prezidento žodis',
      type: 'blockContent',
      description: 'Prezidento citata arba žinutė, rodoma valdymo puslapyje',
    }),
  ],
  preview: {prepare: () => ({title: 'Valdymas – Nustatymai'})},
})

