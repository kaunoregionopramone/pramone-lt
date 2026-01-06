import { defineField, defineType } from 'sanity';
import { UsersIcon } from "@sanity/icons";

export const atstovavimas = defineType({
  name: 'atstovavimas',
  title: 'Atstovavimas',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'nationalActivities',
      title: 'Nacionalinės atstovavimo sritys',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'nationalActivity',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
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
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'regionalActivities',
      title: 'Regioninės atstovavimo sritys',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'regionalActivity',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
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
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Atstovavimas",
      };
    },
  },
});

