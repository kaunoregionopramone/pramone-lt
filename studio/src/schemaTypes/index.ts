import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import { member } from './documents/member'
import { leadership } from './documents/leadership'
import { news } from './documents/news'
import { activityReport } from './documents/activityReport'
import { contactInfo } from './singletons/contactInfo'
import { legalDocuments } from './singletons/legalDocuments'
import { membershipInfo } from './singletons/membershipInfo'
import { narystesNaudos } from './singletons/narystesNaudos'
import { istorija } from './singletons/istorija'
import { partneriai } from './singletons/partneriai'
import { valdymas } from './singletons/valdymas'
import { atstovavimas } from './singletons/atstovavimas'
import apieKkpda from './singletons/apieKkpda'
// Removed contactsSettings singleton, pastPresident document, partner document (replaced by partneriai singleton), veiklosAtaskaitos singleton (replaced by activityReport document), and strategicDirection document (replaced by veikla singleton)

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  apieKkpda,
  atstovavimas,
  contactInfo,
  legalDocuments,
  membershipInfo,
  narystesNaudos,
  istorija,
  partneriai,
  valdymas,
  // Documents
  member,
  leadership,
  news,
  activityReport,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
