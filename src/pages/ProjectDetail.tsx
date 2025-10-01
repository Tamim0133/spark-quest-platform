import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Heart, Share2, User, Check } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import projectTech from "@/assets/project-tech.jpg";

const ProjectDetail = () => {
  const { id } = useParams();
  const [pledgeAmount, setPledgeAmount] = useState("");

  // Mock project data
  const project = {
    id: id || "1",
    title: "Revolutionary Smart Watch with Health Monitoring",
    creator: "TechInnovate",
    creatorAvatar: "T",
    image: projectTech,
    fundingGoal: 50000,
    fundingCurrent: 42350,
    backers: 847,
    daysLeft: 12,
    category: "Technology",
    description: `We're creating the next generation of smartwatches with advanced health monitoring capabilities. Our device combines cutting-edge technology with elegant design to help you track your health metrics in real-time.

Key Features:
• Advanced heart rate monitoring with AI-powered analytics
• Blood oxygen level tracking
• Sleep quality analysis with personalized recommendations
• Water resistance up to 50m
• 7-day battery life
• Premium materials and craftsmanship

Our team has over 20 years of combined experience in hardware design and health technology. We've already completed the prototype phase and are ready for manufacturing with your support.`,
    story: `The idea for this smartwatch came from our founder's personal experience. After a health scare, they realized the importance of continuous health monitoring. Existing solutions were either too expensive or lacked accuracy.

We spent two years researching and developing a solution that's both affordable and reliable. We partnered with leading health researchers and engineers to create something truly special.

Your support will help us:
• Complete final manufacturing tooling
• Produce the first batch of 5,000 units
• Establish quality control systems
• Build a customer support team`,
    rewards: [
      {
        amount: 50,
        title: "Early Bird Special",
        description: "Get 40% off the retail price. Limited to first 100 backers.",
        delivery: "March 2025",
        backers: 100,
        available: 0,
      },
      {
        amount: 99,
        title: "Super Early Bird",
        description: "Get 30% off the retail price. Includes premium strap.",
        delivery: "March 2025",
        backers: 250,
        available: 150,
      },
      {
        amount: 129,
        title: "Standard Package",
        description: "One smartwatch with standard accessories.",
        delivery: "April 2025",
        backers: 400,
        available: 600,
      },
      {
        amount: 249,
        title: "Duo Pack",
        description: "Two smartwatches for you and a friend. Save 20%.",
        delivery: "April 2025",
        backers: 97,
        available: 103,
      },
    ],
  };

  const fundingPercentage = Math.min((project.fundingCurrent / project.fundingGoal) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in">
              <img src={project.image} alt={project.title} className="w-full h-auto" />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="story" className="mt-6">
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {project.story}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h3 className="font-semibold mb-2">When will the product ship?</h3>
                    <p className="text-muted-foreground">
                      We're targeting March-April 2025 for delivery, depending on your reward tier.
                    </p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <h3 className="font-semibold mb-2">What's included in the package?</h3>
                    <p className="text-muted-foreground">
                      Each smartwatch comes with a charging cable, user manual, and one standard strap.
                    </p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
                    <p className="text-muted-foreground">
                      Yes! We ship worldwide. International shipping costs will be calculated at checkout.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="updates" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Update #3 - Manufacturing Milestone</CardTitle>
                      <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Great news! We've finalized our manufacturing partner and completed the first
                        production samples. Quality looks amazing!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Stats */}
            <Card className="sticky top-24 animate-scale-in">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    ${project.fundingCurrent.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    pledged of ${project.fundingGoal.toLocaleString()} goal
                  </div>
                  <Progress value={fundingPercentage} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">{Math.round(fundingPercentage)}% funded</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{project.backers}</span>
                    <span className="text-sm text-muted-foreground">backers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold">{project.daysLeft}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">days to go</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Enter pledge amount"
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    className="text-lg"
                  />
                  <Button className="w-full bg-accent hover:bg-accent-hover" size="lg">
                    Back this project
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {project.creatorAvatar}
                  </div>
                  <div>
                    <div className="font-semibold">{project.creator}</div>
                    <div className="text-sm text-muted-foreground">12 projects created</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Rewards */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl">Rewards</h3>
              {project.rewards.map((reward, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-smooth">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">${reward.amount}</span>
                      {reward.available === 0 && (
                        <span className="text-xs text-destructive font-semibold">SOLD OUT</span>
                      )}
                    </div>
                    <h4 className="font-semibold">{reward.title}</h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                    <div className="pt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Estimated delivery: {reward.delivery}
                      </div>
                      <div className="text-muted-foreground">
                        {reward.backers} backers
                        {reward.available > 0 && ` • ${reward.available} left`}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={reward.available === 0}
                    >
                      {reward.available === 0 ? "Sold Out" : "Select Reward"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
