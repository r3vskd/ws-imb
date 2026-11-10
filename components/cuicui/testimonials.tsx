"use client";

import { UserRound } from "lucide-react";

import { BlurIn } from "@/components/eldoraui/blur-in-text";
import { DragToSlide } from "@/components/ui/drag-to-slide";

const AVATAR_COLORS = ["#c9b6f2", "#f2c9b6", "#b9e2c8", "#b9d3f2"];

export interface CuicuiTestimonial {
  content: string;
  author: string;
}

export function Testimonials({
  title,
  subtitle,
  testimonials,
}: {
  title: string;
  subtitle: string;
  testimonials: CuicuiTestimonial[];
}) {
  return (
    <div className="p-4 w-full">
      <div className="w-full overflow-hidden rounded-2xl grid grid-cols-1 bg-transparent p-8 dark:bg-neutral-900">
        <BlurIn>
          <h2 className="font-medium text-neutral-950 text-xl dark:text-neutral-50">
            {title}
          </h2>
        </BlurIn>
        <p className="text-neutral-600 text-sm dark:text-neutral-500">{subtitle}</p>

        <div className="-mx-8 mt-8 overflow-hidden">
          <DragToSlide ariaLabel="Arrastra para deslizar los testimonios" orientation="horizontal">
            <div className="testimonials-marquee">
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  className="flex"
                  aria-hidden={setIndex === 1 ? true : undefined}
                >
                  {testimonials.map((testimonial, index) => (
                    <article
                      key={testimonial.content}
                      className="mr-4 flex h-60 w-[calc(100vw-2.5rem)] max-w-[24rem] shrink-0 flex-col justify-between rounded-lg border border-border bg-transparent p-4 dark:border-0 dark:bg-neutral-800"
                    >
                      <div
                        className="flex size-7 items-center justify-center rounded-full"
                        style={{
                          backgroundColor:
                            AVATAR_COLORS[index % AVATAR_COLORS.length],
                        }}
                      >
                        <UserRound
                          className="size-4 text-[#14121a]"
                          aria-hidden
                        />
                      </div>
                      <p className="font-medium text-neutral-600 leading-5 tracking-tight dark:text-neutral-400">
                        {testimonial.content}
                      </p>
                      <p className="text-neutral-500 text-xs dark:text-neutral-500">
                        {testimonial.author}
                      </p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </DragToSlide>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
