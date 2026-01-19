import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type IconType = FC<{ className?: string }>;

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  image?: string;
  cta?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon: Icon, image, cta = "Book now" }) => {
  return (
    <Card className="h-full border border-border/60 hover:shadow-[var(--elevation-1)] transition-shadow overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={`${title} service`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
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
        <Button asChild size="sm" aria-label={`Book ${title}`}>
          <Link to={`/book?service=${encodeURIComponent(title)}`}>{cta}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
