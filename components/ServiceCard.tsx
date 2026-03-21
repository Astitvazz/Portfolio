import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Smartphone, Database, Globe, Zap } from 'lucide-react';




const ServiceCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white rounded-xl">
      <CardHeader className="pb-4">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
          <Icon className="w-7 h-7 text-gray-700" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard