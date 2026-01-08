"use client";

import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "dark"; // for different backgrounds
}

export function ShareButtons({
  title,
  description,
  className = "",
  variant = "default",
}: ShareButtonsProps) {
  const [showCopied, setShowCopied] = useState(false);

  // Get current URL (works client-side)
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description
    ? encodeURIComponent(description)
    : "";

  // Share URLs for each platform
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  // Handle native share (mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || title,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed
        // Silently handle cancellation
      }
    } else {
      // Fallback: copy to clipboard
      await copyToClipboard();
    }
  };

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // Failed to copy to clipboard - silently handle
    }
  };

  // Button styles based on variant
  const buttonBaseClass =
    variant === "dark"
      ? "size-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center transition-all"
      : "size-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center transition-all";

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "share-dialog",
      "width=600,height=600,location=no,menubar=no"
    );
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={
          variant === "dark"
            ? "text-gray-400 text-sm font-medium"
            : "text-gray-600 text-sm font-medium"
        }
      >
        Dalintis:
      </span>
      <div className="flex items-center gap-2 relative">
        {/* Facebook */}
        <button
          onClick={() => openShareWindow(facebookShareUrl)}
          className={`${buttonBaseClass} hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] group`}
          aria-label="Dalintis Facebook"
        >
          <Facebook className="size-5" />
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => openShareWindow(twitterShareUrl)}
          className={`${buttonBaseClass} hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] group`}
          aria-label="Dalintis Twitter"
        >
          <Twitter className="size-5" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => openShareWindow(linkedinShareUrl)}
          className={`${buttonBaseClass} hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] group`}
          aria-label="Dalintis LinkedIn"
        >
          <Linkedin className="size-5" />
        </button>

        {/* Native Share / Copy Link */}
        <button
          onClick={handleNativeShare}
          className={`${buttonBaseClass} hover:bg-gray-700 hover:text-white hover:border-gray-700 group relative`}
          aria-label="Dalintis arba kopijuoti nuorodą"
        >
          <Share2 className="size-5" />
          {showCopied && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
              Nukopijuota!
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

