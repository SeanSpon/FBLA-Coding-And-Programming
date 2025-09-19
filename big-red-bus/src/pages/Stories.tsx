import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { stories } from "@/lib/data/stories";
import { Reveal } from "@/components/Reveal";

export default function Stories() {
  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Stories from the Road</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            Real stories from our community, partners, and volunteers.
          </p>
        </section>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <Reveal key={story.id} delay={index * 0.1}>
            <Link to={`/stories/${story.id}`}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <img src={story.imageUrl} alt="" className="aspect-video object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="italic">"{story.quote}"</p>
                </CardContent>
                <CardFooter>
                  <p className="font-bold text-sm">{story.name}</p>
                </CardFooter>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
