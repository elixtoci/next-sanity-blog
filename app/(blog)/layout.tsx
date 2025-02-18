import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";

import { Inter } from "next/font/google";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-black text-white`}>
      <body className="bg-black text-white">
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <main>{children}</main>
          <footer className="bg-black border-t border-gray-700">
  <div className="container mx-auto px-5 py-16 text-center text-white">
    <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
      Exploring Digital Frontiers 
    </h3>
    <p className="mt-4 text-lg text-gray-400">
      A futuristic space by{" "}
      <a
        href="https://www.linkedin.com/in/elix-toci-590174303/"
        className="font-semibold text-pink-400 hover:underline"
      >
        Elix Tesla
      </a>
      , blending technology, creativity, and the future.
    </p>
    <div className="mt-6 flex justify-center space-x-6">
      <a
        href="https://www.linkedin.com/in/elix-toci-590174303/"
        className="text-gray-400 hover:text-pink-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="mailto:comtacttoci@gmail.com"
        className="text-gray-400 hover:text-pink-400"
      >
        Contact
      </a>
    </div>
  </div>
</footer>

        </section>
        {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      </body>
    </html>
  );
}
