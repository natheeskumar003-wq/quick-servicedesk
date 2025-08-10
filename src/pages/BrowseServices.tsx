import ServiceCard from "@/components/ServiceCard";
import { Wrench, Sparkles, Lightbulb, Fan } from "lucide-react";

const services = [
  {
    title: "Plumbing",
    description: "Fix leaks, unclog drains, install fixtures.",
    icon: Wrench,
  },
  {
    title: "Cleaning",
    description: "Home and office cleaning on your schedule.",
    icon: Sparkles,
  },
  {
    title: "Electrician",
    description: "Lighting, wiring, appliance installs.",
    icon: Lightbulb,
  },
  {
    title: "HVAC",
    description: "AC service, heating, ventilation checks.",
    icon: Fan,
  },
];

const BrowseServices = () => {
  return (
    <main className="min-h-screen container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Browse Services</h1>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </section>
    </main>
  );
};

export default BrowseServices;
