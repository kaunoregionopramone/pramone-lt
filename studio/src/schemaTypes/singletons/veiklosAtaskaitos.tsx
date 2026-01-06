import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from "@sanity/icons";

export const veiklosAtaskaitos = defineType({
  name: 'veiklosAtaskaitos',
  title: 'Veiklos ataskaitos',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'ataskaitos',
      title: 'Ataskaitos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ataskaita',
          fields: [
            defineField({
              name: 'period',
              title: 'Laikotarpis',
              type: 'string',
              description: 'Pvz.: 2023-2024',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'file',
              title: 'Failas',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx',
              },
            }),
          ],
          preview: {
            select: {
              title: 'period',
            },
            prepare({ title }) {
              return {
                title: title ? `${title} m. ataskaita` : 'Ataskaita',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Veiklos ataskaitos",
      };
    },
  },
});

