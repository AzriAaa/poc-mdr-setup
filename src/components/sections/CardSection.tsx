import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CardSectionProps {
  selectedPlan: string;
  onFieldChange?: () => void;
}

export function CardSection({ selectedPlan, onFieldChange }: CardSectionProps) {
  const [mdrPlans, setMdrPlans] = useState<number[]>([]);

  const addMdrPlan = () => {
    setMdrPlans([...mdrPlans, Date.now()]);
    onFieldChange?.();
  };

  const removeMdrPlan = (id: number) => {
    setMdrPlans(mdrPlans.filter(planId => planId !== id));
    onFieldChange?.();
  };

  return (
    <Accordion type="single" collapsible defaultValue="card-content">
      <AccordionItem value="card-content" className="border rounded-lg">
        <Card className="border-accent/20 shadow-lg">
          <AccordionTrigger className="px-4 sm:px-6 hover:no-underline">
            <h3 className="text-xl sm:text-2xl font-bold">Card</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">

      {/* MID Configuration Section */}
      <div className="mb-8">
        <h4 className="text-base sm:text-lg font-semibold mb-4">MID Configuration</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-exchange-id-new" className="text-sm text-muted-foreground">
              Card Exchange ID
            </Label>
            <Input
              id="card-exchange-id-new"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-domain-id-new" className="text-sm text-muted-foreground">
              Card Domain ID
            </Label>
            <Select onValueChange={onFieldChange}>
              <SelectTrigger id="card-domain-id-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain1">Domain 1</SelectItem>
                <SelectItem value="domain2">Domain 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchant-id-new" className="text-sm text-muted-foreground">
              Merchant ID
            </Label>
            <Input
              id="merchant-id-new"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-new" className="text-sm text-muted-foreground">
              Password
            </Label>
            <Input
              id="password-new"
              type="password"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
        </div>
      </div>

      {/* Settlement Section */}
      <div className="mb-8">
        <h4 className="text-base sm:text-lg font-semibold mb-4">Settlement</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-settlement-mode-new" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue="realtime" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-mode-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">RealTime</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-settlement-distribute-new" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue="self" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-distribute-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                <SelectItem value="split">Split</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-settlement-day-new" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue="t0" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-day-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t0">T+0</SelectItem>
                <SelectItem value="t1">T+1</SelectItem>
                <SelectItem value="t2">T+2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-self-account-new" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue="1234567890123456" onValueChange={onFieldChange}>
              <SelectTrigger id="card-self-account-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-product-status-new" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue="inactive" onValueChange={onFieldChange}>
              <SelectTrigger id="card-product-status-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* MDR Plans Section */}
      <div className="space-y-6">
        {mdrPlans.map((planId) => (
          <div key={planId} className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-base">Basic MDR Plan</h5>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive"
                onClick={() => removeMdrPlan(planId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <h6 className="font-medium text-sm mb-3">Condition</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Account Type</Label>
                  <Select defaultValue="credit" onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction Model</Label>
                  <Select defaultValue="local" onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="foreign">Foreign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction Status</Label>
                  <Select defaultValue="success" onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Overall MDR */}
            <div className="mb-6">
              <h6 className="font-medium text-sm mb-3">Overall MDR</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">MDR Type</Label>
                  <Select defaultValue="percentage" onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">MDR Value (%)</Label>
                  <Input
                    defaultValue="1.25"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue="10.00"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue="100.00"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>

            {/* Profit Sharing */}
            <div className="mb-4">
              <h6 className="font-medium text-sm mb-3">Profit Sharing</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">MDR Type</Label>
                  <Select defaultValue="percentage" onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">MDR Value (%)</Label>
                  <Input
                    defaultValue="1.00"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue="10.00"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue="100.00"
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add MDR Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full border-dashed border-2"
          onClick={addMdrPlan}
        >
          <span className="text-blue-500">+ Add MDR</span>
        </Button>
      </div>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
