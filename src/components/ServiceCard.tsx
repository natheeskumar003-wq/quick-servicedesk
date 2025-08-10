import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type IconType = FC<{ className?: string }>;

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  cta?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon: Icon, cta = "Book now" }) => {
  return (
    <Card className="h-full border border-border/60 hover:shadow-[var(--elevation-1)] transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-secondary text-secondary-foreground">
            <Icon className="w-5 h-5" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex flex-col gap-4">
        <p>{description}</p>
        <Button variant="premium" size="sm" aria-label={`Book ${title}`}>
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
