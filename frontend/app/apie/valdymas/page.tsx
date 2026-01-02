import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { leadershipQuery, istorijaQuery } from "@/sanity/lib/queries";
import { GovernanceStructureCard } from "@/app/components/GovernanceStructureCard";
import { LeadershipMemberCard } from "@/app/components/LeadershipMemberCard";
import PortableText from "@/app/components/PortableText";
import { Users, UsersRound, Phone, Mail } from "lucide-react";

interface LeadershipMember {
  _id: string;
  name: string;
  position: string | null;
  role: "prezidentas" | "viceprezidentas" | "prezidiumoNarys" | "prezidiumoGarbesNarys";
  photo: {
    asset: {
      url: string | null;
    } | null;
  };
  phone?: string | null;
  email?: string | null;
}

export default async function ValdymasPage() {
  const [{ data: leadershipData }, { data: istorijaData }] = await Promise.all([
    sanityFetch({ query: leadershipQuery }),
    sanityFetch({ query: istorijaQuery }),
  ]);

  const presidentMessage = istorijaData?.presidentMessage;

  // Group leadership data by role
  const president = leadershipData?.filter(
    (member: LeadershipMember) => member.role === "prezidentas"
  )[0];

  const vicePresidents = leadershipData?.filter(
    (member: LeadershipMember) => member.role === "viceprezidentas"
  );

  const presidiumMembers = leadershipData?.filter(
    (member: LeadershipMember) => member.role === "prezidiumoNarys"
  );

  const honoraryMembers = leadershipData?.filter(
    (member: LeadershipMember) => member.role === "prezidiumoGarbesNarys"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Pradžia
            </Link>
            <svg
              className="size-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <Link href="/apie/istorija" className="text-gray-500 hover:text-gray-700">
              Apie mus
            </Link>
            <svg
              className="size-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <span className="text-gray-900">Valdymas</span>
          </div>

          <h1 className="mb-6 text-5xl text-gray-900">Valdymas</h1>
          <p className="text-gray-600 max-w-3xl text-xl">
            Asociacijos valdymo struktūra ir pagrindiniai sprendimų priėmimo
            organai
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* Governance Structure Overview */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h2 className="mb-4 text-2xl text-gray-900">
            Visuotinė narių konferencija – aukščiausias valdymo organas
          </h2>
          <p className="text-gray-600 text-lg">
            Tai aukščiausias asociacijos valdymo organas. Ji nustato pagrindines veiklos kryptis, tvirtina tikslus ir uždavinius, renka Prezidiumą bei revizorių, priima sprendimus dėl įstatų keitimo, nario mokesčio ir kitų esminių klausimų. Konferencija šaukiama ne rečiau kaip kartą per dvejus metus ir yra sprendimų priėmimo vieta, kurioje formuojama visos organizacijos strateginė vizija.
          </p>
        </div>
      </section>

      {/* President Section */}
      {president && (
        <section className="max-w-7xl mx-auto px-8 pb-20">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="mb-3 text-4xl">Asociacijos prezidentas</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* President Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-3xl overflow-hidden shadow-lg max-w-md w-full">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={president.photo?.asset?.url || "/placeholder.jpg"}
                    alt={`${president.name} nuotrauka`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                </div>
              </div>
            </div>

            {/* President Quote and Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">{president.name}</h3>
                <p className="text-gray-600">{president.position}</p>
              </div>

              {presidentMessage && (
                <article className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <PortableText value={presidentMessage as any} />
                </article>
              )}

              {/* Contact Information */}
              {(president.phone || president.email) && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    {president.phone && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <Phone className="size-4 text-[#fe9a00]" />
                        </div>
                        <span>{president.phone}</span>
                      </div>
                    )}
                    {president.email && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <Mail className="size-4 text-[#fe9a00]" />
                        </div>
                        <span>{president.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Vice Presidents Section */}
      {vicePresidents && vicePresidents.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-12 max-w-4xl mx-auto">
              <GovernanceStructureCard
                title="Viceprezidentai"
                description="Viceprezidentai padeda prezidentui įgyvendinti strateginius tikslus ir kuruoja konkrečias sritis – pramonę, statybą, paslaugas, transportą, švietimą ir kitas. Jie atstovauja savo sektoriams bei teikia siūlymus Prezidiumui dėl veiklos prioritetų."
                icon={
                  <Users className="size-6 text-white" strokeWidth={2} />
                }
                variant="orange"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vicePresidents.map((member: LeadershipMember) => (
                <LeadershipMemberCard
                  key={member._id}
                  name={member.name}
                  position={member.position || ""}
                  image={member.photo?.asset?.url || "/placeholder.jpg"}
                  alt={`${member.name} nuotrauka`}
                  phone={member.phone || undefined}
                  email={member.email || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Presidium Members Section */}
      {presidiumMembers && presidiumMembers.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="mb-12 max-w-4xl mx-auto">
            <GovernanceStructureCard
              title="Prezidiumas"
              description="Tai kolegialus valdymo organas, renkamas ketverių metų laikotarpiui. Prezidiumas – tai asociacijos strateginis centras, kuriame formuojamos pagrindinės kryptys ir sprendimai."
              icon={
                <UsersRound className="size-6 text-white" strokeWidth={2} />
              }
              variant="blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {presidiumMembers.map((member: LeadershipMember) => (
              <LeadershipMemberCard
                key={member._id}
                name={member.name}
                position={member.position || ""}
                image={member.photo?.asset?.url || "/placeholder.jpg"}
                alt={`${member.name} nuotrauka`}
                phone={member.phone || undefined}
                email={member.email || undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* Honorary Presidium Members Section */}
      {honoraryMembers && honoraryMembers.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-12">
              <h2 className="text-2xl text-gray-900 mb-2">
                Prezidiumo garbės nariai
              </h2>
              <p className="text-gray-600 text-lg">
                Asmenys, įnešę ypatingą indėlį į asociacijos veiklą ir verslo
                bendruomenės plėtrą
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {honoraryMembers.map((member: LeadershipMember) => (
                <LeadershipMemberCard
                  key={member._id}
                  name={member.name}
                  position={member.position || ""}
                  image={member.photo?.asset?.url || "/placeholder.jpg"}
                  alt={`${member.name} nuotrauka`}
                  phone={member.phone || undefined}
                  email={member.email || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
