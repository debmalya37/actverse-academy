"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HEARD_FROM_OPTIONS = [
  "Instagram",
  "YouTube",
  "Google Search",
  "Facebook",
  "Friend / Family",
  "Newspaper / Poster",
  "Other",
] as const;

interface ContactFormProps {
  courses: { id: string; name: string }[];
}

export function ContactForm({ courses }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    cityState: "",
    priorTraining: "",
    programme: "",
    heardFrom: "",
    goal: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-paper p-8 text-center text-paper-foreground sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cherry/10 text-cherry">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
          Enquiry Received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thank you, <span className="font-semibold text-foreground">{formData.fullName}</span>. Our admissions team will reach out to you on WhatsApp or phone shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-11"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: "",
              phone: "",
              dob: "",
              cityState: "",
              priorTraining: "",
              programme: "",
              heardFrom: "",
              goal: "",
            });
          }}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  const inputBase =
    "mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-cherry focus:outline-none focus:ring-1 focus:ring-cherry sm:text-base";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-paper p-6 text-paper-foreground sm:p-8 lg:p-10"
    >
      <p className="label-mono text-cherry">Admissions Enquiry</p>
      <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
        Tell us about yourself
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Fields marked with <span className="text-cta">*</span> are required.
      </p>

      <div className="mt-7 space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground sm:text-base">
            Full Name <span className="text-cta">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Mobile / WhatsApp + Date of Birth */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground sm:text-base">
              Mobile / WhatsApp Number <span className="text-cta">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-foreground sm:text-base">
              Date of Birth <span className="text-cta">*</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
        </div>

        {/* City and State */}
        <div>
          <label htmlFor="cityState" className="block text-sm font-medium text-foreground sm:text-base">
            City and State <span className="text-cta">*</span>
          </label>
          <input
            id="cityState"
            name="cityState"
            type="text"
            required
            placeholder="e.g. Mumbai, Maharashtra"
            value={formData.cityState}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {/* Prior Training */}
        <fieldset>
          <legend className="block text-sm font-medium text-foreground sm:text-base">
            Have you attended any acting or dance training before? <span className="text-cta">*</span>
          </legend>
          <div className="mt-2.5 flex gap-4">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors sm:text-base ${
                  formData.priorTraining === option
                    ? "border-cherry bg-cherry/10 text-cherry"
                    : "border-input bg-background text-foreground hover:border-cherry/50"
                }`}
              >
                <input
                  type="radio"
                  name="priorTraining"
                  value={option}
                  required
                  checked={formData.priorTraining === option}
                  onChange={handleChange}
                  className="accent-cherry"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Programme Selection */}
        <div>
          <label htmlFor="programme" className="block text-sm font-medium text-foreground sm:text-base">
            Which programme are you interested in? <span className="text-cta">*</span>
          </label>
          <select
            id="programme"
            name="programme"
            required
            value={formData.programme}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Not sure yet — need guidance">
              Not sure yet — need guidance
            </option>
          </select>
        </div>

        {/* How did you hear about Actverse Academy */}
        <div>
          <label htmlFor="heardFrom" className="block text-sm font-medium text-foreground sm:text-base">
            How did you hear about Actverse Academy?
          </label>
          <select
            id="heardFrom"
            name="heardFrom"
            value={formData.heardFrom}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="">Select an option</option>
            {HEARD_FROM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-foreground sm:text-base">
            What do you hope to achieve through acting training?
          </label>
          <textarea
            id="goal"
            name="goal"
            rows={4}
            placeholder="Share your goals, dreams, or any questions you have..."
            value={formData.goal}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full bg-cta text-base text-primary-foreground hover:bg-cherry lg:h-14"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Enquiry <ArrowUpRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}