export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Ceylon Drive Hub. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Media are placeholders. Replace with licensed Sri Lanka footage before production.
          </p>
        </div>
      </div>
    </footer>
  );
}
