import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import BotCheckDialog from "@/components/BotCheckDialog";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [showBotCheck, setShowBotCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.message.trim().length < 10) {
      alert("Message must be at least 10 characters long");
      return;
    }

    setShowBotCheck(true);
  };

  const handleBotVerified = () => {
    // In a real app, this would send the form data to a server
    console.log("Form submitted:", formData);
    
    setSubmitted(true);
    setShowBotCheck(false);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Get in <span className="text-red-600">Touch</span>
        </h1>
        <p className="text-lg text-text-light">
          Questions about Big Red Bus or want to add your organization to our directory?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-2 border-red-200 rounded-2xl shadow-lg">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-heading font-bold mb-6 text-red-600">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-red-600">Email</h3>
                    <a 
                      href="mailto:info@bigredbus.org" 
                      className="text-text-light hover:text-red-600 transition-colors"
                    >
                      info@bigredbus.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-red-600">Phone</h3>
                    <a 
                      href="tel:+1-555-012-3456" 
                      className="text-text-light hover:text-red-600 transition-colors"
                    >
                      (555) 012-3456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-red-600">Location</h3>
                    <p className="text-text-light">
                      Louisville, KY
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg">
            <CardContent className="pt-6">
              <h3 className="font-heading font-bold text-lg mb-3 text-red-600">
                🏢 Add Your Organization
              </h3>
              <p className="text-text-light text-sm">
                Are you a nonprofit or community-focused business? We'd love to feature you in our 
                directory! Send us your organization details and we'll get back to you.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="border-2 border-red-200 rounded-2xl shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-heading font-bold mb-6 text-red-600">Quick Contact Form</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 rounded-lg">
                <p className="text-red-600 font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="border-2 border-red-200 focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="border-2 border-red-200 focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message... (minimum 10 characters)"
                  rows={5}
                  required
                  minLength={10}
                  className="border-2 border-red-200 focus:border-red-600"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
                size="lg"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Bot verification dialog */}
      <BotCheckDialog
        open={showBotCheck}
        onOpenChange={setShowBotCheck}
        onVerified={handleBotVerified}
        title="Verify to Send Message"
        description="Please verify you're human to send your message."
      />
    </div>
  );
}
