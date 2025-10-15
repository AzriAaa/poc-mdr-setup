import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2 } from "lucide-react";

interface CardSectionProps {
  selectedPlan: string;
  onFieldChange?: () => void;
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
      accountType: "Credit Card",
      transactionModel: "Local",
      transactionStatus: "Success",
    },
    overallMDR: {
      mdrType: "Percentage",
      mdrValue: "1.25",
      minimumMaximum: "0.00/0.00",
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
      accountType: "Debit Card",
      transactionModel: "Foreign",
      transactionStatus: "Success",
    },
    overallMDR: {
      mdrType: "Percentage",
      mdrValue: "1.50",
      minimumMaximum: "0.00/0.00",
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

export function CardSection({ selectedPlan, onFieldChange }: CardSectionProps) {
  return (
    <Card className="p-6 border-accent/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Card title and Send for Approval checkbox */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Card</h3>
        <div className="flex items-center gap-2">
          <Checkbox id="card-send-approval" defaultChecked />
          <label htmlFor="card-send-approval" className="text-sm font-medium cursor-pointer">
            Send for Approval
          </label>
        </div>
      </div>

      {/* MDR Section Header */}
      <div className="flex items-center justify-between mb-6 mt-8">
        <h4 className="text-xl font-semibold">MDR</h4>
        <Button variant="outline" size="sm" className="rounded-full">
          Add MDR
        </Button>
      </div>

      {/* MDR Configurations */}
      <div className="space-y-8">
        {MDR_CONFIGS.map((config, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            {/* Condition Column */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold">Condition</h5>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <span className="text-sm font-medium">{config.condition.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transaction Model</span>
                  <span className="text-sm font-medium">{config.condition.transactionModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transaction Status</span>
                  <span className="text-sm font-medium">{config.condition.transactionStatus}</span>
                </div>
              </div>
            </Card>

            {/* Overall MDR Column */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold">Overall MDR</h5>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">MDR Type</span>
                  <span className="text-sm font-medium">{config.overallMDR.mdrType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">MDR Value</span>
                  <span className="text-sm font-medium">{config.overallMDR.mdrValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Minimum / Maximum (MYR)</span>
                  <span className="text-sm font-medium">{config.overallMDR.minimumMaximum}</span>
                </div>
              </div>
            </Card>

            {/* Profit Sharing Column */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold">Profit Sharing</h5>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
              <div className="space-y-6">
                {config.profitSharing.map((partner, pIndex) => (
                  <div key={pIndex} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Partner</span>
                      <span className="text-sm font-medium">{partner.partner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">To be Settled</span>
                      <span className="text-sm font-medium">{partner.toBeSettled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">MDR Type / Value</span>
                      <span className="text-sm font-medium">{partner.mdrTypeValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Minimum / Maximum (MYR)</span>
                      <span className="text-sm font-medium">{partner.minimumMaximum}</span>
                    </div>
                    {pIndex < config.profitSharing.length - 1 && (
                      <div className="border-t pt-4 mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* MID Configuration Section */}
      <div className="mt-12">
        <h4 className="text-xl font-semibold mb-6">MID Configuration</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="card-exchange-id" className="text-sm text-muted-foreground">
              Card Exchange ID
            </Label>
            <Input
              id="card-exchange-id"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-domain-id" className="text-sm text-muted-foreground">
              Card Domain ID
            </Label>
            <Select onValueChange={onFieldChange}>
              <SelectTrigger id="card-domain-id" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain1">Domain 1</SelectItem>
                <SelectItem value="domain2">Domain 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchant-id" className="text-sm text-muted-foreground">
              Merchant ID
            </Label>
            <Input
              id="merchant-id"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-muted-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
        </div>
      </div>

      {/* Settlement Section */}
      <div className="mt-12">
        <h4 className="text-xl font-semibold mb-6">Settlement</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="card-settlement-mode" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue="realtime" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-mode" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">RealTime</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-settlement-distribute" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue="self" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-distribute" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                <SelectItem value="split">Split</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-settlement-day" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue="t0" onValueChange={onFieldChange}>
              <SelectTrigger id="card-settlement-day" className="bg-background">
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
            <Label htmlFor="card-self-account" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue="1234567890123456" onValueChange={onFieldChange}>
              <SelectTrigger id="card-self-account" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-product-status" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue="inactive" onValueChange={onFieldChange}>
              <SelectTrigger id="card-product-status" className="bg-background">
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
    </Card>
  );
}
