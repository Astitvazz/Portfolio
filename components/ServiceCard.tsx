import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Smartphone, Database, Globe, Zap } from 'lucide-react';




const ServiceCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-gray-300 bg-white">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard