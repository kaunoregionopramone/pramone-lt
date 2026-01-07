import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const activityReport = defineType({
  name: 'activityReport',
  title: 'Veiklos ataskaita',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'period',
      title: 'Laikotarpis',
      type: 'string',
      description: 'Pvz.: 2024–2025 arba 2024',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Failas',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Naujausios viršuje',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'period',
      file: 'file.asset.originalFilename',
    },
    prepare({ title, file }) {
      return {
        title: title ? `${title} m. ataskaita` : 'Ataskaita',
        subtitle: file || undefined,
      }
    },
  },
})


