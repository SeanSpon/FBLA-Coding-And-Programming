import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/Reveal";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    // This is where you would handle form submission, e.g., send to an API endpoint
  }

  return (
    <Reveal>
      <div>
        <section className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            Have a question, a story to share, or want to get in touch? We'd love to hear from you.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">General Inquiries</h3>
              <p className="text-warm-gray">info@bigredbus.org</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Press & Media</h3>
              <p className="text-warm-gray">press@bigredbus.org</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Mailing Address</h3>
              <p className="text-warm-gray">123 Charity Lane<br />Hopeville, USA 12345</p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send Message</Button>
            </form>
          </Form>
        </div>
      </div>
    </Reveal>
  );
}
