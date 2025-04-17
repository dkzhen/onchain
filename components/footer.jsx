import { CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 border-t">
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">
          All rights reserved by{" "}
          <a
            className=" text-blue-500 hover:underline"
            href="https://ethenanova.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ethenanova
          </a>
        </p>
      </div>
    </footer>
  );
}
