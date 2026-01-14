# KKPDA Sanity Studio

Content management studio for the KKPDA website with Lithuanian interface.

## Content Types

### Documents
- **Nariai** (Members) - Association member companies
- **Vadovybė** (Leadership) - Leadership team profiles
- **Naujienos ir Renginiai** (News & Events) - News articles and events
- **Veiklos ataskaitos** (Activity Reports) - Annual reports

### Singletons
- **Apie KKPDA** - Organization information, mission, vision
- **Istorija** - History and past presidents
- **Partneriai** - Partners and collaborators
- **Kontaktai** - Contact information
- **Narystės naudos** - Membership benefits
- **Kaip tapti nariu** - How to become a member
- **Atstovavimas** - Representation activities
- **Įstatai** - Legal documents

## Running Locally

```shell
npm run dev
```

Studio will be available at [http://localhost:3333](http://localhost:3333)

## Deploying

```shell
npx sanity deploy
```

## Notes

- News and events are sorted by **publikavimo data** (publication date) by default
- The publication date field defaults to the current date when creating new entries

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
