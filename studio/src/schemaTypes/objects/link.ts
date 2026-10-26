import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL or news reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Naujienos', value: 'news'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'news',
      title: 'Naujienos straipsnis',
      type: 'reference',
      to: [{type: 'news'}],
      hidden: ({parent}) => parent?.linkType !== 'news',
      validation: (Rule) =>
        // Custom validation to ensure news reference is provided if the link type is 'news'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'news' && !value) {
            return 'News reference is required when Link Type is News'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
