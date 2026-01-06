import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { leadershipQuery, valdymasSettingsQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import { Phone, Mail } from "lucide-react";

interface LeadershipMember {
  _id: string;
  name: string;
  position: string | null;
  role:
    | "prezidentas"
    | "viceprezidentas"
    | "prezidiumoNarys"
    | "prezidiumoGarbesNarys";
  photo: {
    asset: {
      url: string | null;
    } | null;
  };
  phone?: string | null;
  email?: string | null;
}

export default async function ValdymasPage() {
  const [{ data: leadershipData }, { data: valdymasSettings }] =
    await Promise.all([
      sanityFetch({ query: leadershipQuery }),
      sanityFetch({ query: valdymasSettingsQuery }),
    ]);

  const presidentMessage = valdymasSettings?.presidentMessage;

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
      {/* Hero Section */}
      <div
        className="relative overflow-hidden h-[289px] border-b border-gray-200/50"
        style={{
          backgroundImage:
            "linear-gradient(170.147deg, rgb(249, 250, 251) 0%, rgba(239, 246, 255, 0.3) 50%, rgb(249, 250, 251) 100%)",
        }}
      >
        {/* Decorative blur elements */}
        <div
          className="absolute blur-3xl filter right-0 rounded-full size-96 top-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(243, 244, 246, 0.2) 100%)",
          }}
        />
        <div
          className="absolute blur-2xl filter left-1/3 rounded-full size-72 top-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(229, 231, 235, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <div className="absolute border-2 border-blue-200/30 right-24 rounded-full size-24 top-40 pointer-events-none" />
        <div className="absolute border-2 border-gray-200/40 right-1/4 rounded-2xl size-32 top-1/2 rotate-12 pointer-events-none" />
        <div className="absolute bg-gray-300/10 left-1/2 rounded-lg size-16 top-8 rotate-45 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-12 pt-12 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Pradžia
            </Link>
            <svg
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33334"
              />
            </svg>
            <Link href="/apie/istorija" className="hover:text-gray-700">
              Apie mus
            </Link>
            <svg
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33334"
              />
            </svg>
            <span className="text-gray-900">Valdymas</span>
          </div>

          {/* Page Title */}
          <h1 className="text-7xl text-gray-900">Valdymas</h1>
        </div>
      </div>

      {/* Governance Overview */}
      <section className="max-w-7xl mx-auto px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl text-gray-900 mb-6">
            Visuotinė narių konferencija
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-6" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Aukščiausias valdymo organas, šaukiamas ne rečiau kaip kartą per
            dvejus metus. Konferencija nustato pagrindinius asociacijos tikslus
            ir uždavinius, renka ir atšaukia asociacijos Prezidiumą, vertina
            Prezidiumo veiklos rezultatus bei priima strateginius sprendimus dėl
            asociacijos ateities.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* President Section */}
      {president && (
        <section
          className="py-24"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(249, 250, 251, 0.5), white)",
          }}
        >
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">
                Asociacijos prezidentas
              </h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Prezidentas vadovauja asociacijai, atstovauja jai santykiuose su
                valdžios institucijomis, verslo organizacijomis ir visuomene
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* President Image */}
              <div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={president.photo?.asset?.url || "/placeholder.jpg"}
                      alt={`${president.name} nuotrauka`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </div>
              </div>

              {/* President Info */}
              <div className="flex flex-col">
                <div className="mb-8">
                  <h3 className="text-3xl text-gray-900 mb-2">
                    {president.name}
                  </h3>
                  <p className="text-gray-500">{president.position}</p>
                </div>

                {presidentMessage && (
                  <div className="space-y-6 text-gray-600 leading-relaxed mb-auto prose prose-lg max-w-none prose-p:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-gray-800 prose-blockquote:pl-4 prose-blockquote:italic">
                    <PortableText value={presidentMessage as any} />
                  </div>
                )}

                {/* Contact */}
                {(president.phone || president.email) && (
                  <div className="space-y-3 mt-8 pt-8 border-t border-gray-200">
                    {president.phone && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="size-5 text-gray-800" />
                        <span>{president.phone}</span>
                      </div>
                    )}
                    {president.email && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="size-5 text-gray-800" />
                        <span>{president.email}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Vice Presidents Section */}
      {vicePresidents && vicePresidents.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">Viceprezidentai</h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Viceprezidentai vykdo Prezidiumo ir Prezidento apibrėžtas
                veiklos funkcijas, padeda prezidentui vadovauti asociacijai ir
                atstovauja strateginėms veiklos kryptims – pramonės plėtrai,
                mokslui bei inovacijoms, socialinei partnerystei.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {vicePresidents.map((member: LeadershipMember) => (
                <div
                  key={member._id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <div className="relative size-full">
                      <Image
                        src={member.photo?.asset?.url || "/placeholder.jpg"}
                        alt={`${member.name} nuotrauka`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-gray-500 mb-6 text-sm">
                      {member.position}
                    </p>
                    <div className="space-y-2 text-sm">
                      {member.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="size-4 text-gray-800" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="size-4 text-gray-800" />
                          <span>{member.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Presidium Members Section */}
      {presidiumMembers && presidiumMembers.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">
                Prezidiumas – kolegialus valdymo organas
              </h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-4xl mx-auto">
                Prezidiumas renkamas visuotinėje narių konferencijoje 4 metams.
                Jis priima strateginius veiklos sprendimus, susijusius su
                asociacijos nuostatoms ir tikslais, tarp asociacijos narių
                konferencijų svarsto ir tvirtina asociacijos metinę finansinę
                atskaitomybę, priima bei šalina asociacijos narius, skiria ir
                atleidžia asociacijos administracijos vadovą ir vyriausiąjį
                finansininką, tvirtina administracijos etatūs, vadovo darbo
                reglamentą, priima sprendimus dėl nario mokesčio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {presidiumMembers.map((member: LeadershipMember) => (
                <div
                  key={member._id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <div className="relative size-full">
                      <Image
                        src={member.photo?.asset?.url || "/placeholder.jpg"}
                        alt={`${member.name} nuotrauka`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 300px"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-gray-500 mb-4 text-xs">
                      {member.position}
                    </p>
                    <div className="space-y-2 text-xs">
                      {member.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="size-3.5 text-gray-800" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="size-3.5 text-gray-800" />
                          <span>{member.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Honorary Members Section */}
      {honoraryMembers && honoraryMembers.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">
                Prezidiumo garbės nariai
              </h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Asmenys, įnešę ypatingą indėlį į asociacijos veiklą ir verslo
                bendruomenės plėtrą.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {honoraryMembers.map((member: LeadershipMember) => (
                <div
                  key={member._id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <div className="relative size-full">
                      <Image
                        src={member.photo?.asset?.url || "/placeholder.jpg"}
                        alt={`${member.name} nuotrauka`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 300px"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-gray-500 mb-4 text-xs">
                      {member.position}
                    </p>
                    <div className="space-y-2 text-xs">
                      {member.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="size-3.5 text-gray-800" />
                          <span>{member.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
