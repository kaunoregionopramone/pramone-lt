import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const leadership = defineType({
  name: 'leadership',
  title: 'Valdymas',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vardas ir pavardė',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Pareigos',
      type: 'string',
      // Optional
    }),
    defineField({
      name: 'role',
      title: 'Vaidmuo asociacijoje',
      type: 'string',
      options: {
        list: [
          {title: 'Prezidentas', value: 'prezidentas'},
          {title: 'Viceprezidentas', value: 'viceprezidentas'},
          {title: 'Prezidiumo narys', value: 'prezidiumoNarys'},
          {title: 'Prezidiumo garbės narys', value: 'prezidiumoGarbesNarys'},
        ],
        layout: 'radio'
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Nuotrauka',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefono numeris',
      type: 'string',
      description: 'Kontaktinis telefono numeris (pvz., +370 600 12345)',
      validation: (rule) => rule.regex(/^\+?[0-9\s\-()]+$/, {
        name: 'phone',
        invert: false,
      }).error('Neteisingas telefono numerio formatas'),
    }),
    defineField({
      name: 'email',
      title: 'El. paštas',
      type: 'string',
      description: 'Kontaktinis el. pašto adresas',
      validation: (rule) => rule.email().error('Neteisingas el. pašto formatas'),
    }),
  ],
  orderings: [
    {
      title: 'Pagal vaidmenį ir vardą',
      name: 'roleAndName',
      by: [
        {field: 'role', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      role: 'role',
      media: 'photo',
    },
    prepare({title, subtitle, role, media}) {
      const roleTitle = role === 'prezidentas'
        ? 'Prezidentas'
        : role === 'viceprezidentas'
          ? 'Viceprezidentas'
          : role === 'prezidiumoNarys'
            ? 'Prezidiumo narys'
            : 'Prezidiumo garbės narys'
      return {
        title,
        subtitle: `${roleTitle} - ${subtitle}`,
        media,
      }
    },
  },
}) 