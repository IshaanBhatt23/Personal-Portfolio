import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Disable hover effects on touch / respect reduced-motion
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const touch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    setIsTouch(touch);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "ishaanbhatt2004@gmail.com",
      href: "mailto:ishaanbhatt2004@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 9328435711",
      href: "tel:+919328435711",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/ishaan-bhatt-110a93256",
      href: "https://linkedin.com/in/ishaan-bhatt-110a93256",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/IshaanBhatt23",
      href: "https://github.com/IshaanBhatt23",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      value: "instagram.com/ishaan79._",
      href: "https://instagram.com/ishaan79._",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Fill all fields",
        description: "Please complete the form before sending.",
        variant: "destructive",
      });
      return;
    }

    const dataToSend = {
      ...formData,
      access_key: "441920ce-4fa9-4945-9935-4040eb23904e",
      form_name: "Portfolio Contact", // helps identify the form in Web3Forms
      botcheck: "", // honeypot; should stay empty
    };

    setSending(true);
    setSent(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (result.success) {
        setSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({ title: "Message Sent!", description: "I'll reply within 3 business days." });
      } else {
        toast({
          title: "Error",
          description: result.message || "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Send error:", err);
      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (field: keyof FormState, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="contact" className="py-20 sm:py-24 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Let&apos;s <span className="animated-title">Connect</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4">
            Available for opportunities &amp; collaborations — let&apos;s chat!
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <MapPin className="w-4 h-4" />
            <span>Ahmedabad, Gujarat, India — UTC+05:30</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card relative">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot (hidden) */}
                  <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        inputMode="text"
                        enterKeyHint="next"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="tap-target"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        enterKeyHint="next"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="tap-target"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      autoComplete="on"
                      inputMode="text"
                      enterKeyHint="next"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="tap-target"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      spellCheck
                      autoCorrect="on"
                      enterKeyHint="send"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="tap-target"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-purple inline-flex items-center justify-center gap-2 tap-target"
                    disabled={sending}
                    aria-busy={sending}
                  >
                    {sending ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.36 6.36-2.83-2.83M8.47 6.47 5.64 3.64M18.36 5.64l-2.83 2.83M6.47 17.53l-2.83 2.83"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Inline success message */}
                  <div
                    role="status"
                    aria-live="polite"
                    className="min-h-0 text-sm"
                  >
                    {sent && (
                      <div className="p-3 rounded-md bg-green-100 text-green-700 mt-3">
                        ✅ Message sent! I will reach out within 3 business days.
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.12 * index, duration: 0.35 }}
                    whileHover={!isTouch && !prefersReducedMotion ? { x: 8 } : undefined}
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-accent/5 transition-all group tap-target"
                  >
                    <div className="text-accent group-hover:scale-110 transition-transform">
                      {contact.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">{contact.label}</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm truncate">{contact.value}</p>
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
