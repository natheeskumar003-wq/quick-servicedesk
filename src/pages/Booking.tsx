import * as React from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Clock, CreditCard, Smartphone } from "lucide-react";

const Booking: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const service = params.get("service") || "Service";

  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [upiId, setUpiId] = React.useState<string>("");
  const [showUpiForm, setShowUpiForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = `Book ${service} | QuickServe`;
    const id = "canonical-link";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, [service]);

  const timeSlots = React.useMemo(() => {
    const slots: string[] = ["ASAP"];
    const start = 8; // 8 AM
    const end = 20; // 8 PM
    for (let h = start; h <= end; h++) {
      const hour = new Date(2000, 0, 1, h, 0);
      const half = new Date(2000, 0, 1, h, 30);
      slots.push(format(hour, "h:00 a"));
      if (h !== end) slots.push(format(half, "h:30 a"));
    }
    return slots;
  }, []);

  function handleConfirm() {
    if (!date || !time || !address) {
      toast({
        title: "Missing details",
        description: "Please select a date, time, and enter your address.",
      });
      return;
    }
    toast({
      title: "Booking created",
      description: `${service} on ${format(date, "PPP")} at ${time}. We'll notify you when a provider confirms.`,
    });
  }

  function handlePayOnline() {
    setShowUpiForm(true);
  }

  function handleUpiPayment() {
    if (!upiId || !upiId.includes("@")) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (e.g., name@upi)",
      });
      return;
    }
    if (!date || !time || !address) {
      toast({
        title: "Missing details",
        description: "Please complete booking details before payment.",
      });
      return;
    }
    toast({
      title: "Payment Initiated",
      description: `UPI payment request sent to ${upiId}. Complete payment in your UPI app.`,
    });
    setShowUpiForm(false);
  }

  return (
    <main className="container mx-auto min-h-screen py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Book {service}</h1>
        <p className="text-muted-foreground mt-1">
          Choose a convenient date and time, add your address, and confirm.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-5">
        <article className="md:col-span-3 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="service">Service</Label>
              <Input id="service" value={service} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal", 
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{t}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street, city, ZIP"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                placeholder="Any special instructions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleConfirm}>Confirm booking</Button>
            <Button variant="outline" onClick={handlePayOnline}>
              <Smartphone className="h-4 w-4 mr-1" />
              Pay via UPI
            </Button>
          </div>

          {showUpiForm && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  UPI Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    placeholder="yourname@upi, phone@paytm, etc."
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your UPI ID to receive a payment request
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpiPayment}>
                    <CreditCard className="h-4 w-4 mr-1" />
                    Pay ₹500
                  </Button>
                  <Button variant="ghost" onClick={() => setShowUpiForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </article>

        <aside className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Service</span><span className="text-foreground">{service}</span></div>
              <div className="flex justify-between"><span>Date</span><span className="text-foreground">{date ? format(date, "PPP") : "Not selected"}</span></div>
              <div className="flex justify-between"><span>Time</span><span className="text-foreground">{time || "Not selected"}</span></div>
              <div className="flex justify-between"><span>Address</span><span className="text-foreground">{address || "Not provided"}</span></div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
};

export default Booking;
