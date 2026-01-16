
import React from 'react';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
  proficiency?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, proficiency }) => {
  return (
    <div className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {proficiency && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${proficiency}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard