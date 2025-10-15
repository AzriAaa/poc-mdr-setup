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

interface FPXSectionProps {
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

export function FPXSection({ selectedPlan, onFieldChange }: FPXSectionProps) {
  return (
    <Card className="p-6 border-primary/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with FPX title and Send for Approval checkbox */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">FPX</h3>
        <div className="flex items-center gap-2">
          <Checkbox id="send-approval" defaultChecked />
          <label htmlFor="send-approval" className="text-sm font-medium cursor-pointer">
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

      {/* Seller ID Configuration Section */}
      <div className="mt-12">
        <h4 className="text-xl font-semibold mb-6">Seller ID Configuration</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fpx-exchange-id" className="text-sm text-muted-foreground">
              FPX Exchange ID
            </Label>
            <Input
              id="fpx-exchange-id"
              value="EX000123"
              readOnly
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seller-id" className="text-sm text-muted-foreground">
              Seller ID
            </Label>
            <Input
              id="seller-id"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank" className="text-sm text-muted-foreground">
              Bank
            </Label>
            <Select defaultValue="rhb-rhbmykl" onValueChange={onFieldChange}>
              <SelectTrigger id="bank" className="bg-background">
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
            <Label htmlFor="crediting-account" className="text-sm text-muted-foreground">
              Crediting Account
            </Label>
            <Select defaultValue="acc20230901" onValueChange={onFieldChange}>
              <SelectTrigger id="crediting-account" className="bg-background">
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
      <div className="mt-12">
        <h4 className="text-xl font-semibold mb-6">Settlement</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="settlement-mode" className="text-sm text-muted-foreground">
              Settlement Mode
            </Label>
            <Select defaultValue="delayed" onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-mode" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="instant">Instant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="settlement-distribute" className="text-sm text-muted-foreground">
              Settlement Distribute
            </Label>
            <Select defaultValue="split" onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-distribute" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="self-split" className="text-sm text-muted-foreground">
              Self Split %
            </Label>
            <Input
              id="self-split"
              defaultValue="70"
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="master-split" className="text-sm text-muted-foreground">
              Master Split %
            </Label>
            <Input
              id="master-split"
              defaultValue="30"
              type="number"
              className="bg-background"
              onChange={onFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="self-account" className="text-sm text-muted-foreground">
              Self Account Number
            </Label>
            <Select defaultValue="1234567890123456" onValueChange={onFieldChange}>
              <SelectTrigger id="self-account" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234567890123456">1234567890123456</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="master-account" className="text-sm text-muted-foreground">
              Master Account Number
            </Label>
            <Input
              id="master-account"
              value="6234567890123444"
              readOnly
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settlement-day" className="text-sm text-muted-foreground">
              Settlement Day
            </Label>
            <Select defaultValue="t1" onValueChange={onFieldChange}>
              <SelectTrigger id="settlement-day" className="bg-background">
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
            <Label htmlFor="product-status" className="text-sm text-muted-foreground">
              Product Status
            </Label>
            <Select defaultValue="inactive" onValueChange={onFieldChange}>
              <SelectTrigger id="product-status" className="bg-background">
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
