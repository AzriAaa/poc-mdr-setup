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

interface EWalletSectionProps {
  selectedPlan: string;
  onFieldChange?: () => void;
  planConfig?: {
    settlement: {
      settlementMode: string;
      settlementDistribute: string;
      selfSplitPercent: string;
      masterSplitPercent: string;
      selfAccountNumber: string;
      settlementDay: string;
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

export function EWalletSection({ selectedPlan, onFieldChange, planConfig }: EWalletSectionProps) {
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
    <Accordion type="single" collapsible defaultValue="ewallet-content">
      <AccordionItem value="ewallet-content" className="border rounded-lg">
        <Card className="border-success/20 shadow-lg">
          <AccordionTrigger className="px-4 sm:px-6 hover:no-underline">
            <h3 className="text-xl sm:text-2xl font-bold">E Wallet</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
      <div key={selectedPlan}>

      {/* Wallet ID Configuration Section */}
      <div className="mb-8">
        <h4 className="text-base sm:text-lg font-semibold mb-4">Wallet ID Configuration</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ewallet-exchange-id-new" className="text-sm text-muted-foreground">
              E-Wallet Exchange ID
            </Label>
            <Input
              id="ewallet-exchange-id-new"
              defaultValue="EWEX000123"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet-id-new" className="text-sm text-muted-foreground">
              Wallet ID
            </Label>
            <Input
              id="wallet-id-new"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet-provider-new" className="text-sm text-muted-foreground">
              Wallet Provider
            </Label>
            <Select defaultValue="tng" onValueChange={onFieldChange}>
              <SelectTrigger id="wallet-provider-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tng">Touch 'n Go</SelectItem>
                <SelectItem value="grabpay">GrabPay</SelectItem>
                <SelectItem value="boost">Boost</SelectItem>
                <SelectItem value="shopeepay">ShopeePay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet-crediting-account-new" className="text-sm text-muted-foreground">
              Crediting Account
            </Label>
            <Select defaultValue="acc20230901" onValueChange={onFieldChange}>
              <SelectTrigger id="wallet-crediting-account-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acc20230901">ACC20230901</SelectItem>
                <SelectItem value="acc20230902">ACC20230902</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Settlement Section */}
      <div className="mb-8">
        <h4 className="text-base sm:text-lg font-semibold mb-4">Settlement</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ewallet-settlement-mode-new" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementMode || "delayed"} onValueChange={onFieldChange}>
              <SelectTrigger id="ewallet-settlement-mode-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="instant">Instant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-settlement-distribute-new" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDistribute || "split"} onValueChange={onFieldChange}>
              <SelectTrigger id="ewallet-settlement-distribute-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split</SelectItem>
                <SelectItem value="self">Self</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-self-split-new" className="text-sm text-muted-foreground">
              Self Split %
            </Label>
            <Input
              id="ewallet-self-split-new"
              defaultValue={planConfig?.settlement.selfSplitPercent || "70"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-master-split-new" className="text-sm text-muted-foreground">
              Master Split %
            </Label>
            <Input
              id="ewallet-master-split-new"
              defaultValue={planConfig?.settlement.masterSplitPercent || "30"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-self-account-new" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue={planConfig?.settlement.selfAccountNumber || "1234567890123456"} onValueChange={onFieldChange}>
              <SelectTrigger id="ewallet-self-account-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-master-account-new" className="text-sm text-muted-foreground">
              Master Account Number
            </Label>
            <Input
              id="ewallet-master-account-new"
              defaultValue="6234567890123444"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ewallet-settlement-day-new" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDay || "t1"} onValueChange={onFieldChange}>
              <SelectTrigger id="ewallet-settlement-day-new" className="bg-background">
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
            <Label htmlFor="ewallet-product-status-new" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue={planConfig?.settlement.productStatus || "inactive"} onValueChange={onFieldChange}>
              <SelectTrigger id="ewallet-product-status-new" className="bg-background">
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
                  <Select defaultValue={mdrPlanConfig?.condition.accountType || "personal"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction Model</Label>
                  <Select defaultValue={mdrPlanConfig?.condition.transactionModel || "p2m"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p2m">P2M</SelectItem>
                      <SelectItem value="p2p">P2P</SelectItem>
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
                    defaultValue={mdrPlanConfig?.overallMDR.mdrValue || "1.50"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.minimum || "8.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.maximum || "120.00"}
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
                    defaultValue={mdrPlanConfig?.profitSharing.mdrValue || "0.75"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.minimum || "4.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.maximum || "60.00"}
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
