export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6 py-12">
        <div className="text-center space-y-2">
          <p className="text-[13px] text-gray-600 dark:text-gray-400">
            © {currentYear} Ceylon Drive Hub. All rights reserved.
          </p>
          <p className="text-[12px] text-gray-500 dark:text-gray-500">
            Media are placeholders. Replace with licensed Sri Lanka footage before production.
          </p>
        </div>
      </div>
    </footer>
  );
}
