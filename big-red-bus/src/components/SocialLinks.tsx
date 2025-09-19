import { Reveal } from "@/components/Reveal";


export function SocialLinks() {
  return (
    <div className="space-y-12">
      <Reveal>
        <section className="text-center">
          <h2 className="text-3xl font-heading mb-4">Follow the Big Red Bus</h2>
          <p className="text-warm-gray max-w-2xl mx-auto mb-8">
            See our latest updates, events, and stories on TikTok.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <h3 className="font-semibold mb-2">TikTok</h3>
              <iframe
                src="https://www.tiktok.com/embed/@brb.bigredbus"
                title="TikTok"
                className="w-full max-w-xs aspect-[1/1.3] border rounded"
                allow="encrypted-media"
                frameBorder={0}
                scrolling="no"
                loading="lazy"
              />
              <a
                href="https://www.tiktok.com/@brb.bigredbus"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-primary underline text-sm"
              >
                @brb.bigredbus
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

export default SocialLinks;
