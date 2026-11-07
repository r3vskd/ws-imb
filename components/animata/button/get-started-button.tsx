"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface IGetStartedButtonProps {
  text: string;
  href?: string;
  className?: string;
}

export default function GetStartedButton({
  text = "Get started",
  href,
  className,
}: IGetStartedButtonProps) {
  const router = useRouter();

  return (
    <div className="min-h-12 w-60">
      <button
        type="button"
        onClick={href ? () => router.push(href) : undefined}
        className={cn(
          "group/start flex h-12 w-52 items-center justify-center gap-3 rounded-lg bg-[#C9B6F2] p-2 font-bold transition-colors duration-100 ease-in-out hover:bg-[#D8CBF6]",
          className,
        )}
      >
        <span
          className={cn(
            "text-[#14121A] transition-colors duration-100 ease-in-out group-hover/start:text-[#14121A]",
          )}
        >
          {text}
        </span>
        <div
          className={cn(
            "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
            "bg-[#14121A] group-hover/start:bg-[#EFE9FC]",
          )}
        >
          <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-transform duration-200 ease-in-out group-hover/start:translate-x-0">
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-[#14121A] opacity-0 group-hover/start:opacity-100",
              )}
            />
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-[#C9B6F2] opacity-100 transition-transform duration-300 ease-in-out group-hover/start:opacity-0",
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
