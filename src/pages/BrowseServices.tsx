import ServiceCard from "@/components/ServiceCard";
import { Wrench, Sparkles, Lightbulb, Fan, Brush, Scissors } from "lucide-react";

import plumbingImg from "@/assets/service-plumbing.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import electricianImg from "@/assets/service-electrician.jpg";
import beautyImg from "@/assets/service-beauty.jpg";
import salonImg from "@/assets/service-salon.jpg";

const services = [
  {
    title: "Plumbing",
    description: "Fix leaks, unclog drains, install fixtures.",
    icon: Wrench,
    image: plumbingImg,
  },
  {
    title: "Cleaning",
    description: "Home and office cleaning on your schedule.",
    icon: Sparkles,
    image: cleaningImg,
  },
  {
    title: "Electrician",
    description: "Lighting, wiring, appliance installs.",
    icon: Lightbulb,
    image: electricianImg,
  },
  {
    title: "HVAC",
    description: "AC service, heating, ventilation checks.",
    icon: Fan,
  },
  {
    title: "Beauty",
    description: "At-home beauty services: makeup, skincare, more.",
    icon: Brush,
    image: beautyImg,
  },
  {
    title: "Salon",
    description: "Haircuts, styling, grooming at your convenience.",
    icon: Scissors,
    image: salonImg,
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
