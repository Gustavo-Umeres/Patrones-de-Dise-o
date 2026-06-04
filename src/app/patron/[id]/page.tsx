import { notFound } from "next/navigation";
import { PATTERNS } from "@/data/patterns";
import PatternDetailClient from "@/components/PatternDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PATTERNS.map((pattern) => ({
    id: pattern.id,
  }));
}

export default async function PatternPage({ params }: PageProps) {
  const { id } = await params;
  const pattern = PATTERNS.find((p) => p.id === id);

  if (!pattern) {
    notFound();
  }

  return <PatternDetailClient pattern={pattern} />;
}
