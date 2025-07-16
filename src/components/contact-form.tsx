"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { trackContactFormSubmission } from "@/lib/analytics";
import { industriesData } from "@/lib/data";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, "Ime i prezime je obavezno."),
  email: z.string().email("Unesite validnu email adresu."),
  company: z.string().min(2, "Ime kompanije je obavezno."),
  phone: z.string().optional(),
  industry: z.string().min(1, "Molimo izaberite industriju."),
  message: z.string().min(10, "Poruka mora imati bar 10 karaktera."),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmitSuccess: (industry: string) => void;
}

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      industry: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    trackContactFormSubmission(data);
    console.log(data);
    toast({
      title: "✓ Uspješno Poslano!",
      description: "Vaš zahtjev je uspješno poslan. Kontaktirat ćemo vas uskoro.",
      variant: "default",
    });
    onSubmitSuccess(data.industry);
    form.reset();
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ime i Prezime</FormLabel>
                  <FormControl>
                    <Input placeholder="Npr. Petar Petrović" {...field} aria-label="Ime i Prezime" aria-required="true" />
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
                    <Input type="email" placeholder="vas.email@primjer.com" {...field} aria-label="Email" aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kompanija</FormLabel>
                  <FormControl>
                    <Input placeholder="Ime Vaše Kompanije" {...field} aria-label="Kompanija" aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon (Opciono)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+387 6..." {...field} aria-label="Telefon" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industrija</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger aria-label="Industrija" aria-required="true">
                      <SelectValue placeholder="Izaberite industriju" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industriesData.map((industry) => (
                      <SelectItem key={industry.dataAiHint} value={industry.dataAiHint}>
                        {industry.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Drugo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaši glavni izazovi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Opišite vaše trenutne operativne izazove..."
                    rows={4}
                    {...field}
                    aria-label="Vaši glavni izazovi"
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full md:w-auto">
            <Send className="mr-2" />
            Pošaljite Zahtjev
          </Button>
        </form>
      </Form>
    </div>
  );
}
