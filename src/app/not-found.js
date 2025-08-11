import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center p-4">
      <div className="space-y-6 max-w-md">
        <div className="relative">
          <h1 className="text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-400 dark:to-amber-300">
            404
          </h1>
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-rose-600/50 to-amber-500/50 rounded-full" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          The page you are looking for might have been moved, deleted, or does
          not exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
