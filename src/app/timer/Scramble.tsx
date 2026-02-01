"use client";

export default function Scramble({ text }: { text: string }) {
  return (
    <div className="text-center text-xl md:text-2xl max-w-4xl font-mono tracking-wide">
      {text}
    </div>
  );
}
