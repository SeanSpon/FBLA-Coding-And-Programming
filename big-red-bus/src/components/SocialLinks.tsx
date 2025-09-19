import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

export function SocialLinks() {
  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-4">Follow the Big Red Bus</h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Keep up with our latest stops, stories, and behind-the-scenes moments.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild>
              <a href="https://www.instagram.com/michaelarobards/?hl=en" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.tiktok.com/@brb.bigredbus" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </Button>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h3 className="text-2xl font-heading mb-4 text-center">Featured Videos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Pop-up Highlight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>On the Road with BRB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Partner Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded" />
              </CardContent>
            </Card>
          </div>
          <p className="text-xs text-warm-gray text-center mt-3">Placeholders — swap in TikTok/Instagram embeds when ready.</p>
        </section>
      </Reveal>
    </div>
  );
}

export default SocialLinks;
