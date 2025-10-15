import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface FPXSectionProps {
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

interface MDRConfig {
  condition: {
    accountType: string;
    transactionModel: string;
    transactionStatus: string;
  };
  overallMDR: {
    mdrType: string;
    mdrValue: string;
    minimumMaximum: string;
  };
  profitSharing: Array<{
    partner: string;
    toBeSettled: string;
    mdrTypeValue: string;
    minimumMaximum: string;
  }>;
}

const MDR_CONFIGS: MDRConfig[] = [
  {
    condition: {
      accountType: "CASA",
      transactionModel: "B2C",
      transactionStatus: "Success",
    },
    overallMDR: {
      mdrType: "Percentage",
      mdrValue: "1.00",
      minimumMaximum: "2.00 / 5.00",
    },
    profitSharing: [
      {
        partner: "IKEY Edutech",
        toBeSettled: "No",
        mdrTypeValue: "Percentage/0.20",
        minimumMaximum: "0.00/0.00",
      },
      {
        partner: "RinggitPay",
        toBeSettled: "No",
        mdrTypeValue: "Percentage/0.30",
        minimumMaximum: "0.00/0.00",
      },
    ],
  },
  {
    condition: {
      accountType: "CCA",
      transactionModel: "B2B1",
      transactionStatus: "Success",
    },
    overallMDR: {
      mdrType: "Percentage",
      mdrValue: "1.00",
      minimumMaximum: "2.00 / 5.00",
    },
    profitSharing: [
      {
        partner: "IKEY Edutech",
        toBeSettled: "No",
        mdrTypeValue: "Percentage/0.20",
        minimumMaximum: "0.00/0.00",
      },
      {
        partner: "RinggitPay",
        toBeSettled: "No",
        mdrTypeValue: "Percentage/0.30",
        minimumMaximum: "0.00/0.00",
      },
    ],
  },
];

export function FPXSection({ selectedPlan, onFieldChange, planConfig }: FPXSectionProps) {
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
    <Accordion type="single" collapsible defaultValue="fpx-content">
      <AccordionItem value="fpx-content" className="border rounded-lg">
        <Card className="border-primary/20 shadow-lg">
          <AccordionTrigger className="px-4 sm:px-6 hover:no-underline">
            <h3 className="text-xl sm:text-2xl font-bold">FPX</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
      <div key={selectedPlan}>
      {/* Seller ID Configuration Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base sm:text-lg font-semibold">Seller ID Configuration</h4>
          <Badge variant="default">Existing Seller ID</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fpx-exchange-id-new" className="text-sm text-muted-foreground">
              FPX Exchange ID
            </Label>
            <Input
              id="fpx-exchange-id-new"
              defaultValue="EX000123"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seller-id-new" className="text-sm text-muted-foreground">
              Seller ID
            </Label>
            <Input
              id="seller-id-new"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank-new" className="text-sm text-muted-foreground">
              Bank
            </Label>
            <Select defaultValue="rhb-rhbmykl" onValueChange={onFieldChange}>
              <SelectTrigger id="bank-new" className="bg-background">
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
            <Label htmlFor="crediting-account-new" className="text-sm text-muted-foreground">
              Crediting Account
            </Label>
            <Select defaultValue="acc20230901" onValueChange={onFieldChange}>
              <SelectTrigger id="crediting-account-new" className="bg-background">
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
            <Label htmlFor="settlement-mode-new" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementMode || "delayed"} onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-mode-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="instant">Instant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="settlement-distribute-new" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDistribute || "split"} onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-distribute-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split</SelectItem>
                <SelectItem value="self">Self</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="self-split-new" className="text-sm text-muted-foreground">
              Self Split %
            </Label>
            <Input
              id="self-split-new"
              defaultValue={planConfig?.settlement.selfSplitPercent || "70"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="master-split-new" className="text-sm text-muted-foreground">
              Master Split %
            </Label>
            <Input
              id="master-split-new"
              defaultValue={planConfig?.settlement.masterSplitPercent || "30"}
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="self-account-new" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue={planConfig?.settlement.selfAccountNumber || "1234567890123456"} onValueChange={onFieldChange}>
              <SelectTrigger id="self-account-new" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="master-account-new" className="text-sm text-muted-foreground">
              Master Account Number
            </Label>
            <Input
              id="master-account-new"
              defaultValue="6234567890123444"
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settlement-day-new" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue={planConfig?.settlement.settlementDay || "t1"} onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-day-new" className="bg-background">
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
            <Label htmlFor="product-status-new" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue={planConfig?.settlement.productStatus || "inactive"} onValueChange={onFieldChange}>
              <SelectTrigger id="product-status-new" className="bg-background">
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
          <div
            key={planId}
            className="border-l-4 border-blue-500 pl-4 animate-in fade-in slide-in-from-left-4 duration-300"
          >
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
                  <Select defaultValue={mdrPlanConfig?.condition.accountType || "casa"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">CASA, CCA</SelectItem>
                      <SelectItem value="cca">CCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction Model</Label>
                  <Select defaultValue={mdrPlanConfig?.condition.transactionModel || "b2c"} onValueChange={onFieldChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2c">B2C, B2B1</SelectItem>
                      <SelectItem value="b2b1">B2B1</SelectItem>
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
                    defaultValue={mdrPlanConfig?.overallMDR.mdrValue || "1.00"}
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
