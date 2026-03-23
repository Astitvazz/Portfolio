"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Linkedin, Mail, Instagram, Twitter, Send, MapPin, Phone } from 'lucide-react';
import { apiUrl } from '@/lib/api';

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Reset status
    setSubmitStatus('idle');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Astitvazz', icon: Github, color: 'hover:text-gray-900' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/astitva-sharma-012b4b252/', icon: Linkedin, color: 'hover:text-blue-600' },
    { name: 'Twitter', url: 'https://x.com/astitvazz', icon: Twitter, color: 'hover:text-sky-500' },
    { name: 'Instagram', url: 'https://instagram.com/yourusername', icon: Instagram, color: 'hover:text-pink-600' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'astitvasharma58@gmail.com', href: 'mailto:astitvasharma58@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 8077842469', href: 'tel:+918077842469' },
    { icon: MapPin, label: 'Location', value: 'New Delhi, India', href: null },
  ];

  return (
    <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out. I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <p className="text-sm font-medium">✓ Message sent successfully! I'll get back to you soon.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <p className="text-sm font-medium">✗ {errorMessage || 'Failed to send message. Please try again later.'}</p>
                    </div>
                  )}
                  
                  <Button onClick={handleSubmit} className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 text-muted-foreground">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-sm hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
                <CardDescription>
                  Follow me on social media for updates and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24-48 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
