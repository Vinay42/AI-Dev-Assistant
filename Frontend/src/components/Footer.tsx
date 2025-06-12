const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} AI Dev Assistant. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <a
            href="/privacy"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
