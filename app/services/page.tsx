import React from 'react'
import { Code, Palette, Smartphone, Database, Globe, Zap } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
function page() {
    const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive and scalable web applications with modern technologies and best practices."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that enhance user experience."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications for iOS and Android devices."
  },
  {
    icon: Database,
    title: "Backend Solutions",
    description: "Architecting robust server-side systems with efficient database management."
  },
  {
    icon: Globe,
    title: "API Integration",
    description: "Seamlessly connecting third-party services and APIs to enhance functionality."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Improving application speed and efficiency for better user satisfaction."
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering high-quality solutions tailored to your needs with expertise and dedication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
