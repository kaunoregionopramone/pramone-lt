import { sanityFetch } from "@/sanity/lib/live";
import {
  newsQuery,
  membersCountQuery,
  apieKkpdaQuery,
  partnersQuery,
  narystesNaudosQuery,
  contactInfoQuery,
} from "@/sanity/lib/queries";
import { NewsCarousel } from "./components/NewsCarousel";
import { PartnersSlider } from "./components/PartnersSlider";
import { OrganizationFacts } from "./components/OrganizationFacts";
import { MemberBenefits } from "./components/MemberBenefits";
import { MembershipCTA } from "./components/MembershipCTA";
import { createExcerpt } from "@/lib/portableTextUtils";
import { urlForImage } from "@/sanity/lib/utils";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "Sau",
    "Vas",
    "Kov",
    "Bal",
    "Geg",
    "Bir",
    "Lie",
    "Rug",
    "Rgs",
    "Spa",
    "Lap",
    "Grd",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} • ${day} • ${year}`;
}

function formatCategory(type: string) {
  const categoryMap: { [key: string]: string } = {
    naujiena: "Naujiena",
    renginys: "Renginys",
  };
  return categoryMap[type] || "Naujiena";
}

// Revalidate the page every 60 seconds to ensure members count and other data is up to date
export const revalidate = 60;

export default async function Page() {
  const [
    { data: newsData },
    { data: membersCount },
    { data: apieKkpdaData },
    { data: partners },
    { data: narystesNaudos },
    { data: contactInfo },
  ] = await Promise.all([
    sanityFetch({ query: newsQuery }),
    sanityFetch({ query: membersCountQuery }),
    sanityFetch({ query: apieKkpdaQuery }),
    sanityFetch({ query: partnersQuery }),
    sanityFetch({ query: narystesNaudosQuery }),
    sanityFetch({ query: contactInfoQuery }),
  ]);

  const metuPatirtisAprasymas = apieKkpdaData?.metuPatirtisAprasymas;
  const asociacijosNariaiAprasymas = apieKkpdaData?.asociacijosNariaiAprasymas;
  const misija = apieKkpdaData?.misija || '';
  const vizija = apieKkpdaData?.vizija || '';

  // Calculate full years of activity since 1989-12-22
  const now = new Date();
  const foundingYear = 1989;
  const yearsOfActivity = now.getFullYear() - foundingYear;

  // Transform news data to match expected format
  const news =
    newsData?.slice(0, 5).map((item: any) => ({
      date: formatDate(item.publishedAt || item._createdAt),
      title: item.title,
      category: formatCategory(item.type),
      excerpt: createExcerpt(item.content),
      image:
        (urlForImage(item.coverImage)
          ?.width(1600)
          .height(900)
          .fit("crop")
          .url() as string) || "",
      alt: `${item.title} nuotrauka`,
      slug: item.slug?.current || "",
      type: item.type,
    })) || [];

  // Get partners with logos for the slider
  const partnersWithLogos = (partners?.cooperate || [])
    .filter((partner: any) => partner.logo)
    .map((partner: any) => ({
      _key: partner._key,
      title: partner.title,
      logo: partner.logo,
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero News Carousel */}
      <NewsCarousel news={news} />

      {/* Partners Slider */}
      <PartnersSlider partners={partnersWithLogos} />

      {/* Organization Facts / Stats */}
      <OrganizationFacts
        yearsOfActivity={yearsOfActivity}
        membersCount={membersCount || 0}
        metuPatirtisAprasymas={metuPatirtisAprasymas ?? undefined}
        asociacijosNariaiAprasymas={asociacijosNariaiAprasymas ?? undefined}
        misija={misija ?? undefined}
        vizija={vizija ?? undefined}
      />

      {/* Member Benefits */}
      <MemberBenefits benefits={narystesNaudos?.benefitsText ?? undefined} />

      {/* Membership CTA */}
      <MembershipCTA
        membersCount={membersCount || 0}
        yearsOfActivity={yearsOfActivity}
        apyvarta={apieKkpdaData?.apyvarta ?? undefined}
        contactInfo={contactInfo}
      />
    </div>
  );
}
