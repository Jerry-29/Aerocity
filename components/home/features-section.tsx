import { Waves, ShieldCheck, Utensils, Users, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "20+ Thrilling Rides",
    description:
      "From heart-pounding slides to gentle lazy rivers, there is something for every thrill level.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description:
      "Dedicated kids zones, family rides, and activities for all ages ensure everyone has a great time.",
  },
  {
    icon: Utensils,
    title: "Delicious Food Court",
    description:
      "Enjoy a variety of cuisines at our multi-kitchen food court with vegetarian and non-veg options.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Trained lifeguards, modern safety equipment, and rigorous maintenance keep you safe.",
  },
  {
    icon: Clock,
    title: "Full Day of Fun",
    description:
      "Open from morning to evening, your ticket gives you unlimited access to all rides all day long.",
  },
  {
    icon: Sparkles,
    title: "Clean & Hygienic",
    description:
      "World-class water filtration systems and regular sanitization ensure a clean experience.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Everything You Need for a Perfect Day Out
          </h2>
          <p className="text-pretty text-muted-foreground">
            Aerocity Water Park offers a complete experience with world-class
            rides, excellent facilities, and unmatched hospitality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all hover:border-secondary/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
