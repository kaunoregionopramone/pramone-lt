import type { BlockContent } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";

// Regex to remove all zero-width and invisible Unicode characters used by stega
const INVISIBLE_CHARS_REGEX = /[\u200B-\u200D\u2060\u2061\u2062\u2063\u2064\uFEFF\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u2000-\u200F\u202A-\u202F\u205F-\u206F\u3000\u3164\uFE00-\uFE0F]/g;

/**
 * Aggressively cleans all invisible/stega characters from a string
 */
function cleanInvisibleChars(text: string): string {
  return stegaClean(text).replace(INVISIBLE_CHARS_REGEX, '');
}

/**
 * Extracts plain text from Portable Text content
 * Cleans stega encoding to prevent corruption when truncating
 */
export function toPlainText(blocks: BlockContent | null | undefined): string {
  if (!blocks) return "";

  const rawText = (blocks as any[])
    // Only process text blocks
    .filter((block: any) => block._type === "block")
    // Get all children text - clean each piece individually
    .map((block: any) => {
      return (block.children || [])
        .map((child: any) => cleanInvisibleChars(child.text || ""))
        .join("");
    })
    .join(" ")
    // Clean up whitespace
    .replace(/\s+/g, " ")
    .trim();

  // Final cleanup pass
  return cleanInvisibleChars(rawText);
}

/**
 * Creates an excerpt from Portable Text content
 * @param content - The Portable Text content
 * @param maxLength - Maximum length of the excerpt (default: 300)
 */
export function createExcerpt(
  content: BlockContent | null | undefined,
  maxLength: number = 300
): string {
  const plainText = toPlainText(content);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within maxLength
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

/**
 * Calculates reading time in minutes based on content
 * @param content - The Portable Text content
 * @param wordsPerMinute - Average reading speed (default: 130)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: BlockContent | null | undefined,
  wordsPerMinute: number = 130
): number {
  const plainText = toPlainText(content);
  
  // Count words (split by whitespace and filter out empty strings)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time in minutes, round up to at least 1 minute
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readingTime);
}

