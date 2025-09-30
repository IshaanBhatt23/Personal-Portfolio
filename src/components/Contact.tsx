import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, Instagram, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", subject: "", message: "" });

  // sending state for disabling UI and showing animation
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "ishaanbhatt2004@gmail.com", href: "mailto:ishaanbhatt2004@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 9328435711", href: "tel:+919328435711" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/ishaan-bhatt-110a93256", href: "https://linkedin.com/in/ishaan-bhatt-110a93256" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/IshaanBhatt23", href: "https://github.com/IshaanBhatt23" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", value: "instagram.com/ishaan79._", href: "https://instagram.com/ishaan79._" }
  ];

  // Paper plane animation variants
  const planeVariants = {
    idle: { x: 0, y: 0, rotate: 0, opacity: 1 },
    fly: {
      x: [0, 60, 160, 420],
      y: [0, -8, -60, -180],
      rotate: [0, -10, -30, -55],
      opacity: [1, 1, 0.9, 0],
      transition: { duration: 1.1, ease: "easeInOut" },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: ensure form isn't blank (you already have required on inputs, this is extra guard)
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ title: "Fill all fields", description: "Please complete the form before sending.", variant: "destructive" });
      return;
    }

    const dataToSend = { ...formData, access_key: "441920ce-4fa9-4945-9935-4040eb23904e" };

    // Notify user and disable UI
    toast({ title: "Sending Message...", description: "Please wait." });
    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dataToSend)
      });
      const result = await response.json();

      if (result.success) {
        // Show success toast
        toast({ title: "Message Sent!", description: "Thanks! I'll get back to you within 3 business days." });

        // Trigger plane animation + small inline success feedback
        setSent(true);

        // Wait for the plane animation to complete, then reset states & form
        setTimeout(() => {
          setSent(false);
          setSending(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1400);
      } else {
        setSending(false);
        toast({ title: "Error", description: result.message || "An error occurred.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Send error:", err);
      setSending(false);
      toast({ title: "Error", description: "An error occurred while sending the message.", variant: "destructive" });
    }
  };

  const handleInputChange = (field: keyof FormState, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="animated-title">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Available for opportunities & collaborations — let's chat!
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Ahmedabad, Gujarat, India — UTC+05:30</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card relative overflow-visible">
              <CardHeader>
                <CardTitle className="text-2xl">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={e => handleInputChange("subject", e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} value={formData.message} onChange={e => handleInputChange("message", e.target.value)} required />
                  </div>

                  <div className="relative flex items-center justify-between mt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-accent to-purple inline-flex items-center justify-center gap-2"
                      disabled={sending}
                      aria-disabled={sending}
                      aria-live="polite"
                    >
                      {sending ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.36 6.36-2.83-2.83M8.47 6.47 5.64 3.64M18.36 5.64l-2.83 2.83M6.47 17.53l-2.83 2.83" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" /> Send Message
                        </>
                      )}
                    </Button>

                    {/* Paper plane animation container - absolute to the right so it doesn't disrupt layout */}
                    <div className="w-32 h-16 pointer-events-none relative ml-4 hidden md:block">
                      <AnimatePresence>
                        {sent && (
                          <motion.div
                            initial="idle"
                            animate="fly"
                            variants={planeVariants}
                            className="absolute left-0 top-4"
                            key="plane"
                          >
                            {/* Paper plane SVG */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-10 h-10 drop-shadow-lg"
                              aria-hidden
                            >
                              <path
                                d="M2.03 11.03c-.2.82.28 1.67 1.07 1.97l15 6.33c.64.27 1.36-.13 1.45-.81.09-.68-.45-1.28-1.13-1.28l-4.72.07c-.19 0-.37-.07-.51-.2L6.9 10.3a.75.75 0 0 1 .02-1.22L18.1 1.3c.26-.18.58-.23.88-.14.3.09.55.31.67.6.12.29.09.61-.08.88l-6.2 9.9c-.2.32-.57.52-.97.52h-4.2"
                                fill="currentColor"
                                className="text-slate-900 dark:text-white"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Inline success message (in addition to toast) */}
                  <div aria-live="polite" className="min-h-[1.2rem]">
                    {sent && <p className="text-sm text-green-600 mt-2">Message sent!</p>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * index }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/5 transition-all group"
                  >
                    <div className="text-accent group-hover:scale-110 transition-transform">{contact.icon}</div>
                    <div>
                      <h4 className="font-semibold">{contact.label}</h4>
                      <p className="text-muted-foreground text-sm">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;