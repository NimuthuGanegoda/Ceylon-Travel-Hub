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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
