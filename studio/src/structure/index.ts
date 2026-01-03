import {FolderIcon} from '@sanity/icons'
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
      // Nariai - combined section with membership info and members
      S.listItem()
        .title('Nariai')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Nariai')
            .items([
              S.listItem()
                .title('Narystės naudos')
                .child(S.document().schemaType('narystesNaudos').documentId('narystesNaudos')),
              S.listItem()
                .title('Kaip tapti nariu')
                .child(S.document().schemaType('membershipInfo').documentId('membershipInfo')),
              S.listItem()
                .title('Narių sąrašas')
                .child(S.documentTypeList('member').title('Nariai')),
            ])
        ),
      // Istorija singleton
      S.listItem()
        .title('Istorija')
        .child(S.document().schemaType('istorija').documentId('istorija')),
      // Valdymas - combined section with settings and leadership members
      S.listItem()
        .title('Valdymas')
        .icon(FolderIcon)
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
      // Rest of schema types
      ...S.documentTypeListItems()
        .filter((listItem: any) => {
          const id = listItem.getId();
          const manuallyAdded = ['contactInfo', 'istatai', 'membershipInfo', 'narystesNaudos', 'member', 'istorija', 'valdymasSettings', 'leadership', 'partneriai', 'veikla'];
          return !DISABLED_TYPES.includes(id) && !manuallyAdded.includes(id);
        }),
    ])
