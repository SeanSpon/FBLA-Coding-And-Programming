import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/data/events";
import { Reveal } from "@/components/Reveal";

export default function Events() {
  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            Join us at an event to learn more, get involved, and support our mission.
          </p>
        </section>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <Reveal key={event.id} delay={index * 0.1}>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{event.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">View on Map</Button>
                <Button>RSVP</Button>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
