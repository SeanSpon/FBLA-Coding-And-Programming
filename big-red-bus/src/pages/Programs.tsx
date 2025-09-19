import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/SectionDivider";

export default function Programs() {
  return (
    <div className="space-y-16">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Our Programs</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            We're actively working in the community to provide support, resources, and education.
          </p>
        </section>
      </Reveal>

      <SectionDivider />

      {/* Community Events */}
      <Reveal>
        <section className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div className="bg-blush rounded-lg aspect-square"></div>
          <div>
            <h2 className="text-3xl font-heading mb-4">Community Events</h2>
            <p className="text-warm-gray mb-6">
              The Big Red Bus is a mobile beacon of hope, popping up at local fairs, farmers' markets, and community gatherings.
            </p>
            <Card>
              <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
              <CardContent>
                <p>We set up a welcoming space with information, resources from our partners, and friendly volunteers to chat with.</p>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader><CardTitle>Who it serves</CardTitle></CardHeader>
              <CardContent>
                <p>Everyone! We aim to meet people where they are, providing a low-barrier entry point to mental health and autism resources.</p>
              </CardContent>
            </Card>
            <Button className="mt-6">Find an Event</Button>
          </div>
        </section>
      </Reveal>

      <SectionDivider />

      {/* School Outreach */}
      <Reveal>
        <section className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div className="order-last md:order-first">
            <h2 className="text-3xl font-heading mb-4">School Outreach</h2>
            <p className="text-warm-gray mb-6">
              We partner with schools to bring age-appropriate mental health and autism awareness education to students and faculty.
            </p>
            <Card>
              <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
              <CardContent>
                <p>We offer assemblies, classroom workshops, and resource packages for educators, all designed to be engaging and informative.</p>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader><CardTitle>Who it serves</CardTitle></CardHeader>
              <CardContent>
                <p>Students (K-12), teachers, and school administrators.</p>
              </CardContent>
            </Card>
            <Button className="mt-6">Bring Us to Your School</Button>
          </div>
          <div className="bg-sky rounded-lg aspect-square order-first md:order-last"></div>
        </section>
      </Reveal>

      <SectionDivider />

      {/* Resource Hub */}
      <Reveal>
        <section className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div className="bg-sage rounded-lg aspect-square"></div>
          <div>
            <h2 className="text-3xl font-heading mb-4">Resource Hub</h2>
            <p className="text-warm-gray mb-6">
              Our online hub is a curated collection of articles, guides, and links to our trusted partner organizations.
            </p>
            <Card>
              <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
              <CardContent>
                <p>We consolidate and categorize resources to make it easy for individuals and families to find the help they need.</p>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader><CardTitle>Who it serves</CardTitle></CardHeader>
              <CardContent>
                <p>Anyone seeking information about mental health, autism, and available support services.</p>
              </CardContent>
            </Card>
            <Button className="mt-6">Explore the Hub</Button>
          </div>
        </section>
      </Reveal>

      <SectionDivider />

      <Reveal>
        <section className="text-center">
          <h2 className="text-2xl font-heading mb-3">About Our Team</h2>
          <p className="text-warm-gray max-w-3xl mx-auto">
            Built by Trinity High School's FBLA Coding & Programming team, this programs portal showcases our commitment to community impact through technology.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
