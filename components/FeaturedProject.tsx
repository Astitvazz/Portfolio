import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Github, ExternalLink } from 'lucide-react';

interface Media {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

interface FeaturedProjectProps {
  title: string;
  description: string;
  techStack: string[];
  media: Media[];
  liveUrl: string;
  githubUrl: string;
}

const FeaturedProject = ({ 
  title, 
  description, 
  techStack, 
  media, 
  liveUrl, 
  githubUrl 
}: FeaturedProjectProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Project Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div>
            <div className="inline-block mb-3">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Featured Project
              </Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button asChild className="transition-transform hover:-translate-y-0.5">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline" className="transition-transform hover:-translate-y-0.5">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Right Side - Media Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-xl border shadow-lg">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%)]" />
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {media.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video bg-muted">
                      {item.type === 'video' ? (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={item.src}
                          alt={item.alt || `${title} preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            {/* Media indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {media.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-6 bg-primary' 
                      : 'w-1.5 bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedProject;
