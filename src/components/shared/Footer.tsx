import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full mt-12">
      <Separator />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MediCare Hub. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
