import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/Reveal";

export default function GetInvolved() {
  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Get Involved</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            You have the power to make a difference. Find the path that's right for you.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <Tabs defaultValue="volunteer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="fundraise">Fundraise</TabsTrigger>
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
          </TabsList>
          <TabsContent value="volunteer">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-heading">Volunteer Your Time</h3>
                <p>Join us at events, help with outreach, or lend your professional skills. Every hour helps.</p>
                <p><strong>Time commitment:</strong> Flexible, from a few hours at a single event to ongoing support.</p>
                <p><strong>Impact:</strong> Directly support our community engagement and awareness campaigns.</p>
                <form className="space-y-4">
                  <Input placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                  <Button>Sign Up to Volunteer</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fundraise">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-heading">Start a Fundraiser</h3>
                <p>Rally your friends, family, and community to support our cause. We'll provide the tools you need to succeed.</p>
                <p><strong>Time commitment:</strong> Varies based on your fundraising goals.</p>
                <p><strong>Impact:</strong> Raise critical funds that go directly to our partner organizations.</p>
                <Button>Create a Fundraising Page</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="corporate">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-heading">Corporate Sponsorship</h3>
                <p>Align your brand with a great cause. We offer a range of sponsorship opportunities with unique benefits.</p>
                <p><strong>Impact:</strong> Provide the foundational support that keeps our operations running and our bus on the road.</p>
                <Button>Contact Us About Sponsorship</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schools">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-heading">Partner With Your School</h3>
                <p>Bring our outreach programs to your school to foster a supportive environment for students.</p>
                <p><strong>Impact:</strong> Equip the next generation with knowledge and resources for mental wellness.</p>
                <Button>Learn More About School Programs</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Reveal>
    </div>
  );
}
