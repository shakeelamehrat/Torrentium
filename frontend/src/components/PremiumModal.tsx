import { useState } from "react";
import { X, Check, Crown, Shield, Network, Settings, Bell, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal = ({ isOpen, onClose }: PremiumModalProps) => {
  if (!isOpen) return null;

  const features = [
    {
      category: "Network Access",
      free: { text: "Limited personal torrent networks", icon: Network },
      premium: { text: "Higher cap on nodes and networks", icon: Network }
    },
    {
      category: "User Experience", 
      free: { text: "Targeted ads based on usage patterns", icon: Star },
      premium: { text: "Ad-free experience", icon: Star }
    },
    {
      category: "Customization",
      free: { text: "Basic network security", icon: Shield },
      premium: { text: "Plugin system access & custom trust thresholds", icon: Settings }
    },
    {
      category: "Performance",
      free: { text: "Trust-based peer selection", icon: Zap },
      premium: { text: "Priority peer discovery & swarm formation", icon: Zap }
    },
    {
      category: "Control",
      free: { text: "Basic seeding behavior", icon: Bell },
      premium: { text: "Custom seeding, rerouting & notifications", icon: Bell }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
                <p className="text-muted-foreground">
                  Unlock advanced features and enhanced network capabilities
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-muted/50 rounded-lg p-6 border">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-2">$0</div>
              <p className="text-sm text-muted-foreground">Forever free</p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.free.icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span className="text-sm">{feature.free.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/50 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <div className="text-3xl font-bold mb-2">$9.99</div>
              <p className="text-sm text-muted-foreground">Per month</p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-primary" />
                  <span className="text-sm">{feature.premium.text}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="p-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{feature.category}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-muted-foreground text-xs">Limited</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};