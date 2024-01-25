import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  // top 100 most popular events
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);
  return {
    title: event.name,
  };
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;

  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-14">
        <Image
          src={event.imageUrl}
          alt="Event background image"
          className="object-cover blur-3xl z-0"
          fill
          quality={50}
          priority
          sizes="(max-width:1280px) 100vw,1280px"
        />
        <div className="z-1 flex flex-col gap-6 lg:gap-16 lg:flex-row relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={200}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className=" text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="white-nowrap text-xl text-white75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto w-[95vw] sm:w-full py-2 bg-blur rounded-md border-white/10 border-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionParagraph>{event.description}</SectionParagraph>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionParagraph>{event.location}</SectionParagraph>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
