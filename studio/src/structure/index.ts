import {FolderIcon, UsersIcon, InfoOutlineIcon, ActivityIcon, DocumentTextIcon} from '@sanity/icons'
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
      // Apie mus category
      S.listItem()
        .title('Apie mus')
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .title('Apie mus')
            .items([
              S.listItem()
                .title('Apie KKPDA')
                .child(S.document().schemaType('apieKkpda').documentId('apieKkpda')),
              S.listItem()
                .title('Istorija')
                .child(S.document().schemaType('istorija').documentId('istorija')),
              S.listItem()
                .title('Įstatai')
                .child(S.document().schemaType('istatai').documentId('istatai')),
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
              S.listItem()
                .title('Partneriai')
                .child(S.document().schemaType('partneriai').documentId('partneriai')),
            ])
        ),

      // Veikla category
      S.listItem()
        .title('Veikla')
        .icon(ActivityIcon)
        .child(
          S.list()
            .title('Veikla')
            .items([
              S.listItem()
                .title('Atstovavimas')
                .child(S.document().schemaType('atstovavimas').documentId('atstovavimas')),
              S.listItem()
                .title('Veiklos ataskaitos')
                .child(
                  S.documentTypeList('activityReport')
                    .title('Veiklos ataskaitos')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                ),
            ])
        ),

      // Nariai category
      S.listItem()
        .title('Nariai')
        .icon(UsersIcon)
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

      // Naujienos ir renginiai
      S.listItem()
        .title('Naujienos ir renginiai')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('news')
            .title('Naujienos ir renginiai')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        ),

      // Contacts singleton
      S.listItem()
        .title('Kontaktai')
        .child(S.document().schemaType('contactInfo').documentId('contactInfo')),

      // Rest of schema types
      ...S.documentTypeListItems()
        .filter((listItem: any) => {
          const id = listItem.getId();
          const manuallyAdded = [
            'apieKkpda',
            'atstovavimas',
            'contactInfo',
            'istatai',
            'membershipInfo',
            'narystesNaudos',
            'member',
            'istorija',
            'valdymasSettings',
            'leadership',
            'partneriai',
            'news',
          ];
          return !DISABLED_TYPES.includes(id) && !manuallyAdded.includes(id);
        }),
    ])
