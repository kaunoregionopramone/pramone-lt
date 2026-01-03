import { defineQuery } from "next-sanity";

export const leadershipQuery = defineQuery(`
  *[_type == "leadership"] | order(role asc, name asc) {
    _id,
    name,
    position,
    role,
    "photo": photo{
      asset->{
        _id,
        url
      }
    },
    phone,
    email
  }
`);

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    type,
    isFeatured,
    content,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt
  }
`);

export const allNewsQuery = defineQuery(`
  *[_type == "news"] | order(isFeatured desc, publishedAt desc) {
    _id,
    title,
    slug,
    type,
    isFeatured,
    content,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    eventStartDate,
    eventEndDate,
    organizers,
    location,
    googleMapsLocation
  }
`);

export const recentNewsQuery = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    type,
    publishedAt
  }
`);

export const singleNewsQuery = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    content,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    eventStartDate,
    eventEndDate,
    organizers,
    location,
    googleMapsLocation,
    entrance,
    registrationUrl,
    timeSlots,
    program,
    "documents": documents[]{
      title,
      "file": file.asset->{
        _id,
        url,
        originalFilename,
        size
      }
    },
    additionalInfo
  }
`);

export const istorijaQuery = defineQuery(`
  *[_id == "istorija"][0] {
    ourHistory,
    "services": services[] {
      _key,
      title,
      description
    },
    "pastPresidents": pastPresidents[] {
      _key,
      name,
      startYear,
      endYear
    }
  }
`);

export const valdymasSettingsQuery = defineQuery(`
  *[_id == "valdymasSettings"][0] {
    presidentMessage
  }
`);

// Backwards compatibility alias
export const pastPresidentsQuery = istorijaQuery;

export const membersCountQuery = defineQuery(`
  count(*[_type == "member"])
`);

export const membersQuery = defineQuery(`
  *[_type == "member"] | order(lower(company) asc) {
    _id,
    company,
    "logo": logo{
      asset->{
        _id,
        url
      }
    }
  }
`);

export const strategicDirectionsQuery = defineQuery(`
  *[_id == "veikla"][0] {
    misija,
    vizija,
    "strategicDirections": strategicDirections[] {
      _key,
      title
    }
  }
`);

export const partnersQuery = defineQuery(`
  *[_id == "partneriai"][0] {
    "cooperate": partnersCooperate[] {
      _key,
      title,
      "logo": logo.asset->url,
      extra
    },
    "agreements": partnersAgreements[] {
      _key,
      title,
      "logo": logo.asset->url,
      extra
    }
  }
`);

export const contactInfoQuery = defineQuery(`
  *[_type == "contactInfo"][0] {
    address,
    phone,
    email,
    googleAddress
  }
`);

export const legalDocumentsQuery = defineQuery(`
  *[_type == "istatai"][0] {
    "statutesUrl": statutesFile.asset->url,
    "statutesName": statutesFile.asset->originalFilename,
    "ethicsUrl": ethicsFile.asset->url,
    "ethicsName": ethicsFile.asset->originalFilename
  }
`);

export const activityReportsQuery = defineQuery(`
  *[_id == "veikla"][0] {
    "reports": ataskaitos[] {
      _key,
      period,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    }
  }
`);

export const eventsListQuery = defineQuery(`
  *[_type == "event" &&
    (!defined($from) || $from == null || coalesce(startAt, dateTime(date)) >= dateTime($from)) &&
    (!defined($to) || $to == null || coalesce(startAt, dateTime(date)) <= dateTime($to))
  ] | order(coalesce(startAt, dateTime(date)) desc) {
    _id,
    title,
    slug,
    date,
    startAt,
    endAt,
    time,
    location,
    organizers,
    excerpt,
    "plainContent": pt::text(content),
    "cover": images[0]{ asset->{ _id, url } }
  }
`);

export const singleEventQuery = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    startAt,
    endAt,
    time,
    location,
    locationLat,
    locationLng,
    organizers,
    excerpt,
    content,
    images[]{ asset->{ _id, url } }
  }
`);

export const membershipInfoQuery = defineQuery(`
  *[_id == "membershipInfo"][0] {
    whyJoinText,
    benefitsText[] {
      _key,
      title,
      description1,
      description2,
      description3,
      description4
    },
    requiredDocuments[] {
      _key,
      title,
      description,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    }
  }
`);

// Removed unused queries for pages, posts, and people since those document types are no longer needed
