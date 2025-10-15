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

interface RHBDNQRSectionProps {
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

export function RHBDNQRSection({ selectedPlan, onFieldChange, planConfig }: RHBDNQRSectionProps) {
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
    <Accordion type="single" collapsible defaultValue="dnqr-content">
      <AccordionItem value="dnqr-content" className="border rounded-lg">
        <Card className="border-destructive/20 shadow-lg">
          <AccordionTrigger className="px-4 sm:px-6 hover:no-underline">
            <h3 className="text-xl sm:text-2xl font-bold">RHB DNQR</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
      <div key={selectedPlan}>

      {/* Merchant Code Configuration Section */}
      <div className="mb-8">
        <h4 className="text-base sm:text-lg font-semibold mb-4">Merchant Code Configuration</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dnqr-exchange-id-new" className="text-sm text-muted-foreground">
              DNQR Exchange ID
            </Label>
            <Input
              id="dnqr-exchange-id-new"
              defaultValue="DNQR000456"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchant-code-new" className="text-sm text-muted-foreground">
              Merchant Code
            </Label>
            <Input
              id="merchant-code-new"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-bank-new" className="text-sm text-muted-foreground">
              Bank
            </Label>
            <Select defaultValue="rhb-rhbmykl" onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-bank-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rhb-rhbmykl">RHB - RHBMYKL</SelectItem>
                <SelectItem value="maybank">Maybank - MBBEMYKL</SelectItem>
                <SelectItem value="cimb">CIMB - CIBBMYKL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-crediting-account-new" className="text-sm text-muted-foreground">
              Crediting Account
            </Label>
            <Select defaultValue="acc20230901" onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-crediting-account-new" className="bg-background">
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
            <Label htmlFor="dnqr-settlement-mode-new" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementMode || "delayed"} onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-settlement-mode-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="instant">Instant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-settlement-distribute-new" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDistribute || "split"} onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-settlement-distribute-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split</SelectItem>
                <SelectItem value="self">Self</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-self-split-new" className="text-sm text-muted-foreground">
              Self Split %
            </Label>
            <Input
              id="dnqr-self-split-new"
              defaultValue={planConfig?.settlement.selfSplitPercent || "70"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-master-split-new" className="text-sm text-muted-foreground">
              Master Split %
            </Label>
            <Input
              id="dnqr-master-split-new"
              defaultValue={planConfig?.settlement.masterSplitPercent || "30"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-self-account-new" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue={planConfig?.settlement.selfAccountNumber || "1234567890123456"} onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-self-account-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-master-account-new" className="text-sm text-muted-foreground">
              Master Account Number
            </Label>
            <Input
              id="dnqr-master-account-new"
              defaultValue="6234567890123444"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dnqr-settlement-day-new" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDay || "t1"} onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-settlement-day-new" className="bg-background">
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
            <Label htmlFor="dnqr-product-status-new" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue={planConfig?.settlement.productStatus || "inactive"} onValueChange={onFieldChange}>
              <SelectTrigger id="dnqr-product-status-new" className="bg-background">
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
                  <Select defaultValue={mdrPlanConfig?.condition.accountType || "merchant"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merchant">Merchant</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction Model</Label>
                  <Select defaultValue={mdrPlanConfig?.condition.transactionModel || "static"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Static QR</SelectItem>
                      <SelectItem value="dynamic">Dynamic QR</SelectItem>
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
                    defaultValue={mdrPlanConfig?.overallMDR.mdrValue || "0.80"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.minimum || "5.00"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.overallMDR.maximum || "80.00"}
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
                    defaultValue={mdrPlanConfig?.profitSharing.mdrValue || "0.40"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Minimum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.minimum || "2.50"}
                    type="number"
                    step="0.01"
                    className="bg-background"
                    onChange={onFieldChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Maximum (MYR)</Label>
                  <Input
                    defaultValue={mdrPlanConfig?.profitSharing.maximum || "40.00"}
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
