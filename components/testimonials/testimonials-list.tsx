"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

export function TestimonialsList({ testimonials }: TestimonialsListProps) {
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setFormName("");
    setFormRating(5);
    setFormContent("");
  };

  // Calculate average rating
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Stats Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 rounded-xl border bg-card p-6 sm:gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">
              {avgRating.toFixed(1)}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(avgRating)
                      ? "fill-accent text-accent"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Avg Rating</span>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">
              {testimonials.length}
            </span>
            <span className="text-xs text-muted-foreground">Total Reviews</span>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">
              {testimonials.filter((t) => t.rating === 5).length}
            </span>
            <span className="text-xs text-muted-foreground">5-Star Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Visited {testimonial.visitDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <h3 className="mb-2 text-xl font-semibold text-card-foreground">
              Share Your Experience
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Visited Aerocity? We would love to hear about your experience!
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 rounded-lg bg-secondary/10 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Star className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p className="text-lg font-semibold text-card-foreground">
                  Thank you for your review!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your review will appear once approved by our team.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-medium text-primary hover:underline"
                >
                  Submit another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="review-name"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-card-foreground">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormRating(i + 1)}
                        className="p-0.5"
                        aria-label={`Rate ${i + 1} stars`}
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            i < formRating
                              ? "fill-accent text-accent"
                              : "text-muted hover:text-accent/50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="review-content"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review-content"
                    required
                    rows={4}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="resize-none rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  <Send className="h-4 w-4" />
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
