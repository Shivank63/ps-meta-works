"use client"

import { useState } from "react"
import { Send, MessageSquare, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      setName("")
      setEmail("")
      setMessage("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 transition-all duration-500">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready To
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ml-2">
              Go Viral?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can help your brand break the internet and make a lasting impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">
              Fill out the form or reach out directly through any of these channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Chat With Us</h4>
                  <p className="text-muted-foreground">We're available on WhatsApp and Messenger</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-muted-foreground">+91-8752875610</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-muted-foreground">psmetaworks@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" />
              {submitted ? "Message Sent!" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
