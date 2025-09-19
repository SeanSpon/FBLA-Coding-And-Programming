"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/components/Metric";
import { impact } from "@/lib/data/impact";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Reveal } from "@/components/Reveal";

export default function Impact() {
  const yearData = impact["2024"];

  return (
    <div className="space-y-12">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Our Impact</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            Transparency and accountability are at the heart of what we do. Here's a look at the difference we've made together in 2024.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <Card>
            <CardHeader>
              <CardTitle>2024 Fundraising Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={yearData.series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#D64545" fill="#F7C8D0" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid md:grid-cols-4 gap-8">
          <Metric value={yearData.fundsRaised} label="Dollars Raised" />
          <Metric value={yearData.volunteers} label="Volunteers Engaged" />
          <Metric value={yearData.familiesSupported} label="Families Supported" />
          <Metric value={yearData.partnersCount} label="Partner Organizations" />
        </section>
      </Reveal>

      {/* Other sections like Funds Flow and Reports would go here */}
    </div>
  );
}
