import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Send, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import MagneticButton from "@/components/MagneticButton";

const Contact = () => {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null!);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.current) {
      emailjs
        .sendForm(
          "service_pu4r76d",
          "template_l79ktxr",
          form.current,
          { publicKey: "I97GUTKQbmp7ds75v" }
        )
        .then(
          () => {
            toast({
              title: "Message Sent! ✅",
              description: "Thank you for reaching out. I'll get back to you soon!",
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
          },
          (error) => {
            toast({
              title: "Message Failed! ❌",
              description: `Something went wrong: ${error.text}`,
              variant: "destructive",
            });
          }
        )
        .finally(() => setIsSubmitting(false));
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/lenoxTech_bro",
      username: "@lenoxTech_bro",
      color: "#e2e8f0",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      username: "LenoxTech",
      color: "#60a5fa",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:lenoxtechbro@gmail.com",
      username: "lenoxtechbro@gmail.com",
      color: "#34d399",
    },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(226,232,240,0.9)",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.875rem",
    transition: "all 0.25s ease",
  };

  return (
    <section id="contact" className="py-24 px-4" style={{ position: "relative", zIndex: 2 }}>
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span
            className="inline-block mb-4 text-xs font-inter font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(244,114,182,0.08)",
              border: "1px solid rgba(244,114,182,0.2)",
              color: "#f9a8d4",
            }}
          >
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-6xl font-syne font-black mb-4">
            <span className="gradient-text-animated">Get In Touch</span>
          </h2>
          <p
            className="text-base font-inter max-w-xl mx-auto"
            style={{ color: "rgba(148,163,184,0.65)" }}
          >
            Have a project in mind or want to collaborate? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative glow */}
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-15"
                style={{
                  background: "radial-gradient(circle, #818cf8, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <div className="flex items-center gap-3 mb-7 relative z-10">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: "linear-gradient(180deg, #818cf8, #a78bfa)" }}
                />
                <h3 className="text-lg font-syne font-bold" style={{ color: "rgba(226,232,240,0.95)" }}>
                  Send a Message
                </h3>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-inter font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    style={inputStyle}
                    className="focus:border-blue-400/50 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.1)] placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-inter font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    style={inputStyle}
                    className="focus:border-blue-400/50 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.1)] placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-inter font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    style={inputStyle}
                    className="focus:border-blue-400/50 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.1)] placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-inter font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: "none" }}
                    className="focus:border-blue-400/50 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.1)] placeholder:text-slate-600"
                  />
                </div>
                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl text-sm font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      color: "white",
                      boxShadow: "0 0 24px rgba(96,165,250,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(96,165,250,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(96,165,250,0.35)";
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </div>
          </motion.div>

          {/* Social Links + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4"
          >
            {/* Social links card */}
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: "linear-gradient(180deg, #34d399, #60a5fa)" }}
                />
                <h3 className="text-lg font-syne font-bold" style={{ color: "rgba(226,232,240,0.95)" }}>
                  Connect With Me
                </h3>
              </div>
              <div className="space-y-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.06)";
                      }}
                    >
                      <div
                        className="p-2.5 rounded-xl flex-shrink-0"
                        style={{
                          background: `${link.color}15`,
                          border: `1px solid ${link.color}25`,
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: link.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-syne font-semibold" style={{ color: "rgba(226,232,240,0.9)" }}>
                          {link.label}
                        </p>
                        <p className="text-xs font-inter" style={{ color: "rgba(148,163,184,0.6)" }}>
                          {link.username}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* CTA card */}
            <div
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(96,165,250,0.2)",
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "radial-gradient(circle at 100% 0%, rgba(96,165,250,0.4), transparent 60%)",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-lg font-syne font-bold mb-3" style={{ color: "rgba(226,232,240,0.95)" }}>
                  Let's Build Something Amazing 🚀
                </h3>
                <p className="text-sm font-inter leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                  I'm always excited to work on interesting projects and collaborate with fellow developers.
                  Whether you have a question, an idea, or just want to say hello—reach out!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;