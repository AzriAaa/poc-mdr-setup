import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";

interface RHBDNQRSectionProps {
  selectedPlan: string;
}

const PLAN_DATA: Record<string, {
  merchantCode: string;
  terminalId: string;
  qrFee: string;
  maxTransaction: string;
}> = {
  starter: {
    merchantCode: "DNQR-RHB-STR-8901",
    terminalId: "TERM-001234",
    qrFee: "0.5%",
    maxTransaction: "RM 5,000",
  },
  professional: {
    merchantCode: "DNQR-RHB-PRO-2345",
    terminalId: "TERM-005678",
    qrFee: "0.4%",
    maxTransaction: "RM 10,000",
  },
  enterprise: {
    merchantCode: "DNQR-RHB-ENT-6789",
    terminalId: "TERM-009012",
    qrFee: "0.3%",
    maxTransaction: "RM 25,000",
  },
  premium: {
    merchantCode: "DNQR-RHB-PRM-0123",
    terminalId: "TERM-123456",
    qrFee: "0.2%",
    maxTransaction: "Unlimited",
  },
};

export function RHBDNQRSection({ selectedPlan }: RHBDNQRSectionProps) {
  const planData = selectedPlan ? PLAN_DATA[selectedPlan] : null;

  return (
    <Card className="p-6 border-destructive/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-destructive/10 rounded-lg">
          <QrCode className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">RHB DNQR Configuration</h3>
          <p className="text-sm text-muted-foreground">DuitNow QR payment settings</p>
        </div>
        <Badge variant="secondary">QR Payment</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dnqr-merchant-code">Merchant Code</Label>
          <Input
            id="dnqr-merchant-code"
            value={planData?.merchantCode || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dnqr-terminal-id">Terminal ID</Label>
          <Input
            id="dnqr-terminal-id"
            value={planData?.terminalId || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dnqr-fee">QR Transaction Fee</Label>
          <Input
            id="dnqr-fee"
            value={planData?.qrFee || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dnqr-max-transaction">Max Transaction Amount</Label>
          <Input
            id="dnqr-max-transaction"
            value={planData?.maxTransaction || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>
      </div>
    </Card>
  );
}
