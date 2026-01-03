import {UsersIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Contacts singleton
      S.listItem()
        .title('Kontaktai')
        .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
      // Legal Documents singleton
      S.listItem()
        .title('Įstatai')
        .child(S.document().schemaType('istatai').documentId('istatai')),
      // Membership Info singleton
      S.listItem()
        .title('Narystė – Kaip tapti nariu')
        .child(S.document().schemaType('membershipInfo').documentId('membershipInfo')),
      // Istorija singleton
      S.listItem()
        .title('Istorija')
        .child(S.document().schemaType('istorija').documentId('istorija')),
      // Valdymas - combined section with settings and leadership members
      S.listItem()
        .title('Valdymas')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Valdymas')
            .items([
              S.listItem()
                .title('Nustatymai')
                .child(S.document().schemaType('valdymasSettings').documentId('valdymasSettings')),
              S.listItem()
                .title('Nariai')
                .child(S.documentTypeList('leadership').title('Valdymo nariai')),
            ])
        ),
      // Partneriai singleton
      S.listItem()
        .title('Partneriai')
        .child(S.document().schemaType('partneriai').documentId('partneriai')),
      // Veikla singleton
      S.listItem()
        .title('Veikla')
        .child(S.document().schemaType('veikla').documentId('veikla')),
      // Rest of types excluding disabled ones and the explicitly added singletons
      ...S.documentTypeListItems()
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()) && listItem.getId() !== 'contact' && listItem.getId() !== 'contactsSettings' && listItem.getId() !== 'contactsPage' && listItem.getId() !== 'contactInfo' && listItem.getId() !== 'istatai' && listItem.getId() !== 'membershipInfo' && listItem.getId() !== 'istorija' && listItem.getId() !== 'valdymasSettings' && listItem.getId() !== 'leadership' && listItem.getId() !== 'pastPresident' && listItem.getId() !== 'partneriai' && listItem.getId() !== 'veikla' && listItem.getId() !== 'activityReport' && listItem.getId() !== 'strategicDirection'),
    ])
