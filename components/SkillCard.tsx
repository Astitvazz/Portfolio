import React from 'react';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
  proficiency?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, proficiency }) => {
  return (
    <div className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 text-xl group-hover:bg-gray-100 transition-colors duration-300">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {proficiency && (
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-gray-700 h-1.5 rounded-full transition-all duration-500"
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