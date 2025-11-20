import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ title, children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        {title && (
          <h2 className="text-[40px] md:text-[48px] font-semibold text-center mb-16 text-gray-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
