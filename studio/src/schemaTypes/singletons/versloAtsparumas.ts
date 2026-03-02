import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const versloAtsparumas = defineType({
  name: 'versloAtsparumas',
  title: 'Verslo atsparumo vadovas',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'description',
      title: 'Aprašymas',
      type: 'blockContent',
      description: 'Pagrindinis vadovo aprašomasis tekstas.',
    }),
    defineField({
      name: 'image',
      title: 'Iliustracija',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatyvus tekstas',
          type: 'string',
          description: 'Aprašymas ekrano skaitytuvams.',
        }),
      ],
    }),
    defineField({
      name: 'file',
      title: 'Vadovo failas',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      description: 'PDF arba Word dokumentas, kurį lankytojai galės atsisiųsti.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Verslo atsparumo ir tęstinumo vadovas',
      }
    },
  },
})
