import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Users, Briefcase, IndianRupee, AlertTriangle, Search, Ban, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "provider";
  status: "active" | "suspended";
  joinedDate: string;
}

interface ServiceEntry {
  id: string;
  name: string;
  category: string;
  price: number;
  providers: number;
  status: "active" | "inactive";
}

interface Payment {
  id: string;
  customer: string;
  provider: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "refunded";
  method: "UPI" | "Card" | "Cash";
}

interface Dispute {
  id: string;
  customer: string;
  provider: string;
  service: string;
  issue: string;
  status: "open" | "resolved" | "investigating";
  date: string;
}

const mockUsers: User[] = [
  { id: "U001", name: "Rahul Sharma", email: "rahul@email.com", role: "customer", status: "active", joinedDate: "2024-01-10" },
  { id: "U002", name: "Priya Patel", email: "priya@email.com", role: "customer", status: "active", joinedDate: "2024-01-12" },
  { id: "U003", name: "Vikram Singh", email: "vikram@email.com", role: "provider", status: "active", joinedDate: "2024-01-08" },
  { id: "U004", name: "Anita Desai", email: "anita@email.com", role: "provider", status: "suspended", joinedDate: "2024-01-05" },
];

const mockServices: ServiceEntry[] = [
  { id: "S001", name: "Pipe Repair", category: "Plumbing", price: 500, providers: 12, status: "active" },
  { id: "S002", name: "Deep Cleaning", category: "Cleaning", price: 1200, providers: 8, status: "active" },
  { id: "S003", name: "Wiring Fix", category: "Electrician", price: 600, providers: 15, status: "active" },
  { id: "S004", name: "Bridal Makeup", category: "Beauty", price: 5000, providers: 6, status: "active" },
  { id: "S005", name: "Haircut & Style", category: "Salon", price: 400, providers: 20, status: "active" },
];

const mockPayments: Payment[] = [
  { id: "P001", customer: "Rahul Sharma", provider: "Vikram Singh", amount: 800, date: "2024-01-19", status: "completed", method: "UPI" },
  { id: "P002", customer: "Priya Patel", provider: "Anita Desai", amount: 1500, date: "2024-01-18", status: "completed", method: "Card" },
  { id: "P003", customer: "Amit Kumar", provider: "Vikram Singh", amount: 600, date: "2024-01-18", status: "pending", method: "UPI" },
];

const mockDisputes: Dispute[] = [
  { id: "D001", customer: "Rahul Sharma", provider: "Vikram Singh", service: "Plumbing", issue: "Service not completed properly", status: "open", date: "2024-01-19" },
  { id: "D002", customer: "Priya Patel", provider: "Anita Desai", service: "Beauty", issue: "Provider was late by 2 hours", status: "investigating", date: "2024-01-17" },
];

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [disputes, setDisputes] = React.useState<Dispute[]>(mockDisputes);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUserAction = (userId: string, action: "suspend" | "activate") => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return { ...user, status: action === "suspend" ? "suspended" : "active" };
        }
        return user;
      })
    );
    toast({
      title: action === "suspend" ? "User Suspended" : "User Activated",
      description: `User ${userId} has been ${action === "suspend" ? "suspended" : "activated"}.`,
    });
  };

  const handleDisputeAction = (disputeId: string, action: "resolve" | "investigate") => {
    setDisputes((prev) =>
      prev.map((dispute) => {
        if (dispute.id === disputeId) {
          return { ...dispute, status: action === "resolve" ? "resolved" : "investigating" };
        }
        return dispute;
      })
    );
    toast({
      title: action === "resolve" ? "Dispute Resolved" : "Investigation Started",
      description: `Dispute ${disputeId} has been ${action === "resolve" ? "resolved" : "marked for investigation"}.`,
    });
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, services, payments, and disputes.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">{users.filter((u) => u.role === "provider").length} providers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockServices.filter((s) => s.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5" />
                {totalRevenue.toLocaleString("en-IN")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disputes.filter((d) => d.status === "open").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "provider" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.status === "active" ? (
                            <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, "suspend")}>
                              <Ban className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" onClick={() => handleUserAction(user.id, "activate")}>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Activate
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Providers</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>₹{service.price}</TableCell>
                        <TableCell>{service.providers}</TableCell>
                        <TableCell>
                          <Badge variant={service.status === "active" ? "default" : "secondary"}>
                            {service.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.provider}</TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.method}</Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "completed" ? "default" : payment.status === "pending" ? "secondary" : "destructive"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
              </CardHeader>
              <CardContent>
                {disputes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No disputes</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {disputes.map((dispute) => (
                        <TableRow key={dispute.id}>
                          <TableCell className="font-medium">{dispute.id}</TableCell>
                          <TableCell>{dispute.customer}</TableCell>
                          <TableCell>{dispute.provider}</TableCell>
                          <TableCell>{dispute.service}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{dispute.issue}</TableCell>
                          <TableCell>
                            <Badge variant={dispute.status === "open" ? "destructive" : dispute.status === "investigating" ? "secondary" : "default"}>
                              {dispute.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {dispute.status !== "resolved" && (
                                <>
                                  {dispute.status === "open" && (
                                    <Button size="sm" variant="secondary" onClick={() => handleDisputeAction(dispute.id, "investigate")}>
                                      Investigate
                                    </Button>
                                  )}
                                  <Button size="sm" onClick={() => handleDisputeAction(dispute.id, "resolve")}>
                                    Resolve
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminDashboard;
