import { Phone, MessageCircle, Mail } from "lucide-react";
import { PARK_INFO } from "@/lib/constants";

export default function AgentHelpPage() {
  const primaryPhone = PARK_INFO.phone[0] || "";
  const whatsappNumber = primaryPhone.replace(/\D/g, "");
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi, I need help with an agent booking.",
      )}`
    : "https://wa.me/";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Reach out to the support team if anything goes wrong.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Phone</p>
              <p className="text-xs text-muted-foreground">
                Call us for immediate help
              </p>
            </div>
          </div>
          <a
            href={`tel:${primaryPhone}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {primaryPhone || "Call Support"}
          </a>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">WhatsApp</p>
              <p className="text-xs text-muted-foreground">
                Chat with support on WhatsApp
              </p>
            </div>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <Mail className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Email</p>
            <p className="text-xs text-muted-foreground">
              For non-urgent issues
            </p>
          </div>
        </div>
        <a
          href={`mailto:${PARK_INFO.email}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {PARK_INFO.email}
        </a>
      </div>
    </div>
  );
}
