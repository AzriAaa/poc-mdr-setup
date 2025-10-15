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
import { useState, useEffect } from "react";

interface CardSectionProps {
  selectedPlan: string;
  onFieldChange?: () => void;
  planConfig?: {
    midConfig: {
      cardExchangeId: string;
      cardDomainId: string;
      merchantId: string;
      password: string;
    };
    settlement: {
      settlementMode: string;
      settlementDistribute: string;
      settlementDay: string;
      selfAccountNumber: string;
      productStatus: string;
    };
    mdrPlans: Array<{
      name: string;
      condition: {
        accountType: string;
        transactionModel: string;
        transactionStatus: string;
      };
      overallMDR: {
        mdrType: string;
        mdrValue: string;
        minimum: string;
        maximum: string;
      };
      profitSharing: {
        mdrType: string;
        mdrValue: string;
        minimum: string;
        maximum: string;
      };
    }>;
  };
}

export function CardSection({ selectedPlan, onFieldChange, planConfig }: CardSectionProps) {
  const [mdrPlans, setMdrPlans] = useState<number[]>([]);

  // Populate MDR plans when selectedPlan changes
  useEffect(() => {
    if (planConfig?.mdrPlans) {
      // Create MDR plan IDs based on the config
      const planIds = planConfig.mdrPlans.map((_, index) => Date.now() + index);
      setMdrPlans(planIds);
    } else {
      setMdrPlans([]);
    }
  }, [selectedPlan]);

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
      <div key={selectedPlan}>

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
              defaultValue={planConfig?.midConfig?.cardExchangeId || ""}
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-domain-id-new" className="text-sm text-muted-foreground">
              Card Domain ID
            </Label>
            <Select defaultValue={planConfig?.midConfig?.cardDomainId || ""} onValueChange={onFieldChange}>
              <SelectTrigger id="card-domain-id-new" className="bg-background">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain1">Domain 1</SelectItem>
                <SelectItem value="domain2">Domain 2</SelectItem>
                <SelectItem value="domain-partner">Domain Partner</SelectItem>
                <SelectItem value="domain-enterprise">Domain Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchant-id-new" className="text-sm text-muted-foreground">
              Merchant ID
            </Label>
            <Input
              id="merchant-id-new"
              defaultValue={planConfig?.midConfig?.merchantId || ""}
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
              defaultValue={planConfig?.midConfig?.password || ""}
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
            <Select defaultValue={planConfig?.settlement.settlementMode || "realtime"} onValueChange={onFieldChange}>
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
            <Select defaultValue={planConfig?.settlement.settlementDistribute || "self"} onValueChange={onFieldChange}>
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
            <Select defaultValue={planConfig?.settlement.settlementDay || "t0"} onValueChange={onFieldChange}>
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
            <Select defaultValue={planConfig?.settlement.selfAccountNumber || "1234567890123456"} onValueChange={onFieldChange}>
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
            <Select defaultValue={planConfig?.settlement.productStatus || "inactive"} onValueChange={onFieldChange}>
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
        {mdrPlans.map((planId, index) => {
          const mdrPlanConfig = planConfig?.mdrPlans?.[index];
          return (
          <div key={planId} className="border-l-4 border-blue-500 pl-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-base">{mdrPlanConfig?.name || "Basic MDR Plan"}</h5>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
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
                  <Select defaultValue={mdrPlanConfig?.condition.accountType || "credit"} onValueChange={onFieldChange}>
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
                  <Select defaultValue={mdrPlanConfig?.condition.transactionModel || "local"} onValueChange={onFieldChange}>
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
                  <Select defaultValue={mdrPlanConfig?.condition.transactionStatus || "success"} onValueChange={onFieldChange}>
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
                  <Select defaultValue={mdrPlanConfig?.overallMDR.mdrType || "percentage"} onValueChange={onFieldChange}>
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
                    defaultValue={mdrPlanConfig?.overallMDR.mdrValue || "1.25"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.minimum || "10.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.maximum || "100.00"}
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
                  <Select defaultValue={mdrPlanConfig?.profitSharing.mdrType || "percentage"} onValueChange={onFieldChange}>
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
                    defaultValue={mdrPlanConfig?.profitSharing.mdrValue || "1.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.minimum || "10.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.maximum || "100.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Add MDR Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={addMdrPlan}
        >
          <span className="text-blue-500 font-medium">+ Add MDR</span>
        </Button>
      </div>
      </div>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
