import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";

export default function Mission() {
  return (
    <div className="space-y-12">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Our Mission</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            The Big Red Bus began with a simple idea: to create a mobile hub for
            connection and support, driving awareness for mental health and autism
            directly into our communities. The bus itself is a symbol of our
            journey—approachable, friendly, and always on the move to meet people
            where they are.
          </p>
        </section>
      </Reveal>

      {/* Timeline would go here */}

      <Reveal>
        <section>
          <h2 className="text-3xl font-heading text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How are funds distributed?</AccordionTrigger>
              <AccordionContent>
                100% of public donations, after processing fees, are passed
                directly to our vetted partner organizations. Our operational
                costs are covered by private donors and corporate sponsorships.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do you ensure transparency?</AccordionTrigger>
              <AccordionContent>
                We publish annual impact reports detailing our fundraising and
                distribution activities. We are committed to the highest
                standards of financial stewardship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can my organization partner with you?</AccordionTrigger>
              <AccordionContent>
                We are always looking for new partners who align with our mission.
                Please visit our 'Partners' page to learn more and fill out a
                nomination form.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </Reveal>
      <Reveal>
        <section>
          <SocialLinks />
        </section>
      </Reveal>
    </div>
  );
}
