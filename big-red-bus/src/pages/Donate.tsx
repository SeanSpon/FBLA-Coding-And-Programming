"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Reveal } from "@/components/Reveal";

const donationSchema = z.object({
    amount: z.string(),
    donationType: z.enum(["one-time", "monthly"]),
    customAmount: z.number().optional(),
  });
  
export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState("50");

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "50",
      donationType: "one-time",
    },
  });

  function onSubmit(data: z.infer<typeof donationSchema>) {
    console.log(data);
    // This is where you would handle form submission, e.g., send to a payment gateway
  }

  const getImpactText = (value: string) => {
    switch (value) {
      case "25":
        return "$25 can provide 2 resource kits for a school classroom.";
      case "50":
        return "$50 helps us fuel the bus for a full day of community outreach.";
      case "100":
        return "$100 supports the training for a new volunteer.";
      case "250":
        return "$250 can sponsor a mental health workshop at a local school.";
      default:
        return "Your donation makes a difference.";
    }
  };

  return (
    <Reveal>
      <div className="max-w-2xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Make a Donation</h1>
          <p className="text-lg text-warm-gray">
            Your generous contribution powers our mission and supports our network of partners.
          </p>
        </section>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedAmount(value);
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                        >
                          {["25", "50", "100", "250"].map((value) => (
                            <FormItem key={value}>
                              <FormControl>
                                <RadioGroupItem value={value} id={`amount-${value}`} className="sr-only" />
                              </FormControl>
                              <Label
                                htmlFor={`amount-${value}`}
                                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${selectedAmount === value ? "border-primary" : ""}`}
                              >
                                ${value}
                              </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center text-sm text-warm-gray h-5">
                  {getImpactText(selectedAmount)}
                </div>

                <FormField
                  control={form.control}
                  name="donationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                     <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="one-time" id="one-time" />
                          </FormControl>
                          <FormLabel className="font-normal">One-Time</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="monthly" id="monthly" />
                          </FormControl>
                          <FormLabel className="font-normal">Monthly</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Custom Amount" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg">
                Donate Now
              </Button>
              <p className="text-xs text-center text-warm-gray">
                This is a mock donation form. No payment will be processed.
              </p>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
    </Reveal>
  );
}
