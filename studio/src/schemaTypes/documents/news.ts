import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'Naujienos ir Renginiai',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL kelias',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const timestamp = Math.floor(Date.now() / 1000)
          return doc.title ? `${doc.title}-${timestamp}` : `naujiena-${timestamp}`
        },
        maxLength: 200,
        isUnique: () => true,
        slugify: (input: string) => {
          // Lithuanian to English letter mapping
          const lithuanianMap: Record<string, string> = {
            ą: 'a',
            č: 'c',
            ę: 'e',
            ė: 'e',
            į: 'i',
            š: 's',
            ų: 'u',
            ū: 'u',
            ž: 'z',
            Ą: 'A',
            Č: 'C',
            Ę: 'E',
            Ė: 'E',
            Į: 'I',
            Š: 'S',
            Ų: 'U',
            Ū: 'U',
            Ž: 'Z',
          }

          // Replace Lithuanian characters
          let processed = input
          Object.keys(lithuanianMap).forEach((char) => {
            processed = processed.replace(new RegExp(char, 'g'), lithuanianMap[char])
          })

          // Convert to slug format
          return processed
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipas',
      type: 'string',
      options: {
        list: [
          {title: 'Naujiena', value: 'naujiena'},
          {title: 'Renginys', value: 'renginys'},
        ],
        layout: 'radio',
      },
      initialValue: 'naujiena',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikavimo data',
      type: 'date',
      description: 'Data, kuri bus naudojama rūšiavimui ir rodymui',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Rodomas viršuje',
      type: 'boolean',
      description:
        'Pažymėkite, jei šis įrašas turėtų būti rodomas kaip pagrindinis viršuje puslapio. Tik vienas įrašas gali būti pažymėtas vienu metu.',
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (isFeatured, context) => {
          if (!isFeatured) return true

          const {document, getClient} = context
          const client = getClient({apiVersion: '2023-01-01'})

          // Get the current document ID (without 'drafts.' prefix)
          const currentId = document?._id?.replace('drafts.', '')

          // Check if there's another document with isFeatured = true
          const existingFeatured = await client.fetch(
            `*[_type == "news" && isFeatured == true && !(_id in [$draftId, $publishedId])][0]`,
            {
              draftId: `drafts.${currentId}`,
              publishedId: currentId,
            },
          )

          if (existingFeatured) {
            return 'Jau yra kitas įrašas pažymėtas kaip rodomas viršuje. Pirmiausia atžymėkite tą įrašą.'
          }

          return true
        }),
    }),
    defineField({
      name: 'content',
      title: 'Turinys',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      title: 'Pagrindinė nuotrauka',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Event-specific fields (only relevant when type is 'renginys')
    defineField({
      name: 'eventStartDate',
      title: 'Renginio pradžia',
      type: 'datetime',
      description: 'Renginio pradžios data ir laikas',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'eventEndDate',
      title: 'Renginio pabaiga',
      type: 'datetime',
      description: 'Renginio pabaigos data ir laikas',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'location',
      title: 'Vieta',
      type: 'string',
      description: 'Renginio vietos adresas (rodomas puslapyje)',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'googleMapsLocation',
      title: 'Vieta Google žemėlapiui',
      type: 'string',
      description:
        'Adresas arba vietos pavadinimas Google žemėlapiui (jei nenurodytas, bus naudojamas pagrindinis vietos laukas)',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'entrance',
      title: 'Įėjimas',
      type: 'string',
      description: 'Įėjimo informacija (pvz., "Nemokamas", "10 EUR", "Registracija privaloma")',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registracijos nuoroda',
      type: 'url',
      description: 'Nuoroda į registracijos formą ar puslapį',
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'timeSlots',
      title: 'Laiko intervalai',
      type: 'array',
      description:
        'Skirtingi laiko intervalai skirtingoms dienoms (pvz., "10:00 - 18:00 (pirmosios dvi dienos)")',
      of: [{type: 'string'}],
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'documents',
      title: 'Dokumentai ir nuotraukos',
      type: 'array',
      description: 'Atsisiųstini dokumentai ir nuotraukos',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'file',
              title: 'Failas',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              file: 'file',
            },
            prepare({title, file}) {
              return {
                title: title,
                subtitle: file?.asset ? 'Failas įkeltas' : 'Failas neįkeltas',
              }
            },
          },
        },
      ],
      hidden: ({document}) => document?.type !== 'renginys',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Papildoma informacija',
      type: 'array',
      description: 'Papildomi informacijos blokai (pvz., "Dalyviai", "Organizatoriai")',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Pavadinimas',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Aprašymas',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'items',
              title: 'Punktai',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              items: 'items',
            },
            prepare({title, items}) {
              const count = items?.length || 0
              return {
                title: title,
                subtitle: `${count} punktai(-ų)`,
              }
            },
          },
        },
      ],
      hidden: ({document}) => document?.type !== 'renginys',
    }),
  ],
  orderings: [
    {
      title: 'Pagal publikavimo datą (naujausios pirmos)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Pagal sukūrimo datą (naujausios pirmos)',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      isFeatured: 'isFeatured',
      media: 'coverImage',
    },
    prepare({title, type, isFeatured, media}) {
      const typeLabel =
        type === 'naujiena' ? 'Naujiena' : type === 'renginys' ? 'Renginys' : 'Nenurodyta'
      const featuredLabel = isFeatured ? '⭐ Viršuje' : ''

      const subtitle = featuredLabel
        ? `${typeLabel} • ${featuredLabel}`
        : typeLabel

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
