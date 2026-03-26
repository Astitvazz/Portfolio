import React from 'react';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
  proficiency?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, proficiency }) => {
  return (
    <div className="group rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-[family:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
            {name}
          </h3>
          {proficiency && (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${proficiency}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
