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
import { CheckCircle2, XCircle, Clock, IndianRupee, Briefcase, TrendingUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type JobStatus = "pending" | "accepted" | "completed" | "rejected";

interface Job {
  id: string;
  service: string;
  customer: string;
  date: string;
  time: string;
  address: string;
  amount: number;
  status: JobStatus;
}

const mockJobs: Job[] = [
  { id: "J001", service: "Plumbing", customer: "Rahul Sharma", date: "2024-01-20", time: "10:00 AM", address: "123 MG Road, Bangalore", amount: 800, status: "pending" },
  { id: "J002", service: "Cleaning", customer: "Priya Patel", date: "2024-01-20", time: "2:00 PM", address: "456 Koramangala, Bangalore", amount: 1200, status: "pending" },
  { id: "J003", service: "Electrician", customer: "Amit Kumar", date: "2024-01-19", time: "11:00 AM", address: "789 Indiranagar, Bangalore", amount: 600, status: "accepted" },
  { id: "J004", service: "Beauty", customer: "Sneha Reddy", date: "2024-01-18", time: "4:00 PM", address: "321 HSR Layout, Bangalore", amount: 1500, status: "completed" },
  { id: "J005", service: "Salon", customer: "Kavitha Nair", date: "2024-01-17", time: "3:00 PM", address: "654 Whitefield, Bangalore", amount: 900, status: "completed" },
];

const ProviderDashboard: React.FC = () => {
  const [jobs, setJobs] = React.useState<Job[]>(mockJobs);

  const handleAction = (jobId: string, action: "accept" | "reject" | "complete") => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const newStatus: JobStatus = action === "accept" ? "accepted" : action === "reject" ? "rejected" : "completed";
          return { ...job, status: newStatus };
        }
        return job;
      })
    );
    toast({
      title: action === "accept" ? "Job Accepted" : action === "reject" ? "Job Rejected" : "Job Completed",
      description: `Job ${jobId} has been ${action === "accept" ? "accepted" : action === "reject" ? "rejected" : "marked complete"}.`,
    });
  };

  const pendingJobs = jobs.filter((j) => j.status === "pending");
  const activeJobs = jobs.filter((j) => j.status === "accepted");
  const completedJobs = jobs.filter((j) => j.status === "completed");
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.amount, 0);

  const statusBadge = (status: JobStatus) => {
    const variants: Record<JobStatus, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      accepted: { variant: "default", label: "In Progress" },
      completed: { variant: "outline", label: "Completed" },
      rejected: { variant: "destructive", label: "Rejected" },
    };
    return <Badge variant={variants[status].variant}>{variants[status].label}</Badge>;
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Provider Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your jobs, track earnings, and update service status.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingJobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedJobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5" />
                {totalEarnings.toLocaleString("en-IN")}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="pending">Pending ({pendingJobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Job Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingJobs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending jobs</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.service}</TableCell>
                          <TableCell>{job.customer}</TableCell>
                          <TableCell>{job.date} at {job.time}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{job.address}</TableCell>
                          <TableCell>₹{job.amount}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleAction(job.id, "accept")}>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleAction(job.id, "reject")}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
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

          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {activeJobs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No active jobs</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.service}</TableCell>
                          <TableCell>{job.customer}</TableCell>
                          <TableCell>{job.date} at {job.time}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{job.address}</TableCell>
                          <TableCell>{statusBadge(job.status)}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleAction(job.id, "complete")}>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Mark Complete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Job History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.filter((j) => j.status === "completed" || j.status === "rejected").map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.service}</TableCell>
                        <TableCell>{job.customer}</TableCell>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>₹{job.amount}</TableCell>
                        <TableCell>{statusBadge(job.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProviderDashboard;
