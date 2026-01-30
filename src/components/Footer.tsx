import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/bus-system" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Bus Finder</Link></li>
              <li><Link href="/vehicles" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Vehicles</Link></li>
              <li><Link href="/book" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><Link href="/tours" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Tours</Link></li>
              <li><Link href="/tours#popular" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Popular Routes</Link></li>
              <li><Link href="/tours#sri-lanka" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Explore Sri Lanka</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/terms" className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center space-y-2 border-t border-gray-200/50 dark:border-white/10 pt-8">
          <p className="text-[13px] text-gray-600 dark:text-gray-400">
            © {currentYear} Ceylon Drive Hub. {t('copyright')}
          </p>
          <p className="text-[12px] text-gray-500 dark:text-gray-500">
            {t('mediaDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
