import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partners, partnerTags } from "@/lib/data/partners";
import { Reveal } from "@/components/Reveal";

export default function Partners() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredPartners = filter
    ? partners.filter((p) => p.tags.includes(filter))
    : partners;

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Our Partners</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            We are proud to collaborate with a diverse group of organizations dedicated to making a difference.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">Nominate a Partner</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nominate a Partner</DialogTitle>
                <DialogDescription>
                  Know an organization that would be a great fit? Let us know!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="website" className="text-right">
                    Website
                  </Label>
                  <Input id="website" className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Submit Nomination</Button>
            </DialogContent>
          </Dialog>
        </section>
      </Reveal>

      <Reveal>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant={!filter ? "default" : "secondary"} onClick={() => setFilter(null)}>All</Button>
        {partnerTags.map((tag) => (
          <Button key={tag} variant={filter === tag ? "default" : "secondary"} onClick={() => setFilter(tag)}>
            {tag}
          </Button>
        ))}
      </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPartners.map((partner, index) => (
          <Reveal key={partner.id} delay={index * 0.1}>
            <Card>
              <CardHeader>
                <img src={partner.logoUrl} alt={partner.name} className="h-12 w-auto mb-4" />
                <CardTitle>{partner.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-warm-gray mb-4">{partner.mission}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Visit Site</Button>
                  <Button size="sm">Donate via Us</Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
