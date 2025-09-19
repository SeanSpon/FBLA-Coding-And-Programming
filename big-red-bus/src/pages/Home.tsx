import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LogoBus } from "@/components/LogoBus";
import { HeartHandshake, Lightbulb, Users } from "lucide-react";
import { partners } from "@/lib/data/partners";
import { stories } from "@/lib/data/stories";
import { Metric } from "@/components/Metric";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-heading font-bold">
              Help Us Keep the Big Red Bus Rolling for Mental Health & Autism Support.
            </h1>
            <p className="text-lg text-warm-gray">
              We partner with trusted nonprofits to raise awareness, gather support, and build connections for stronger, healthier communities.
            </p>
            <div className="space-x-4">
              <Button size="lg">Donate</Button>
              <Button size="lg" variant="outline">Meet Our Partners</Button>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div>
            <LogoBus className="w-full h-auto" />
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* Mission Snapshot */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-8">Our Mission in Action</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Lightbulb className="h-12 w-12 mx-auto text-primary-red" />
                <CardTitle>Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Driving conversations and reducing stigma around mental health and autism.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <HeartHandshake className="h-12 w-12 mx-auto text-primary-red" />
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gathering donations and resources for our incredible partner organizations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary-red" />
                <CardTitle>Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Building a community of volunteers, advocates, and supporters.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Reveal>

  <SectionDivider />

      {/* Featured Partners */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-8">Our Featured Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <img
                key={partner.id}
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
          <Button variant="link" className="mt-8">
            See all partners
          </Button>
        </section>
      </Reveal>

      <SectionDivider />

      {/* Impact Highlights */}
      <Reveal>
        <section>
          <div className="grid md:grid-cols-4 gap-8">
            <Metric value={125000} label="Dollars Raised" />
            <Metric value={350} label="Volunteers" />
            <Metric value={800} label="Families Supported" />
            <Metric value={15} label="Partner Orgs" />
          </div>
        </section>
      </Reveal>

      <SectionDivider />

      {/* Programs Preview */}
      <Reveal>
        <section>
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-heading mb-4">Our Programs</h2>
              <p className="text-warm-gray mb-8">
                From community pop-ups to school assemblies, we're bringing resources and conversations to where they're needed most.
              </p>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The Big Red Bus makes stops at local fairs, markets, and community centers.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>School Outreach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We partner with schools to provide age-appropriate mental health resources.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              {/* Placeholder for an illustration */}
              <div className="bg-sage rounded-lg aspect-square"></div>
            </div>
          </div>
        </section>
      </Reveal>

      <SectionDivider />

      {/* About FBLA/Trinity */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-4">Project FBLA Coding & Programming</h2>
          <p className="text-warm-gray max-w-3xl mx-auto">
            This site was designed and implemented by the Trinity High School FBLA Coding & Programming team as part of the FBLA competition. We focus on building practical, community-centered technology that supports awareness and access to resources.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">About FBLA</h3>
              <p className="text-warm-gray">Future Business Leaders of America empowers students through leadership, technical skills, and career readiness—coding included.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trinity High School</h3>
              <p className="text-warm-gray">Our team collaborates across design, frontend development, and research to deliver accessible, useful solutions for real needs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What We Do</h3>
              <p className="text-warm-gray">We plan, prototype, and ship—using modern tools like React, TypeScript, and Tailwind—to create polished, responsive experiences.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Stories Carousel */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-8">Stories from the Road</h2>
          <Carousel>
            <CarouselContent>
              {stories.map((story) => (
                <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <p className="mb-4">"{story.quote}"</p>
                      <p className="font-bold">{story.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </Reveal>

      {/* Call to Action Banner */}
      <section className="bg-cream py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-heading mb-4">Every Mile Matters</h2>
          <p className="text-warm-gray mb-8">
            Your contribution helps us keep the bus running and supports our vital network of partners.
          </p>
          <div className="space-x-4">
            <Button size="lg">Donate Now</Button>
            <Button size="lg" variant="outline">Get Involved</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
