import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

interface EWalletSectionProps {
  selectedPlan: string;
}

const PLAN_DATA: Record<string, {
  walletId: string;
  integrationKey: string;
  transactionFee: string;
  supportedWallets: string;
}> = {
  starter: {
    walletId: "EWLT-STR-2345",
    integrationKey: "ewallet_key_starter_integration",
    transactionFee: "2.0%",
    supportedWallets: "Touch 'n Go, GrabPay",
  },
  professional: {
    walletId: "EWLT-PRO-6789",
    integrationKey: "ewallet_key_professional_integration",
    transactionFee: "1.7%",
    supportedWallets: "Touch 'n Go, GrabPay, Boost",
  },
  enterprise: {
    walletId: "EWLT-ENT-9012",
    integrationKey: "ewallet_key_enterprise_integration",
    transactionFee: "1.4%",
    supportedWallets: "Touch 'n Go, GrabPay, Boost, ShopeePay",
  },
  premium: {
    walletId: "EWLT-PRM-3456",
    integrationKey: "ewallet_key_premium_integration",
    transactionFee: "1.2%",
    supportedWallets: "All major e-wallets",
  },
};

export function EWalletSection({ selectedPlan }: EWalletSectionProps) {
  const planData = selectedPlan ? PLAN_DATA[selectedPlan] : null;

  return (
    <Card className="p-6 border-success/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-success/10 rounded-lg">
          <Wallet className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">E-Wallet Configuration</h3>
          <p className="text-sm text-muted-foreground">Digital wallet integrations</p>
        </div>
        <Badge variant="secondary">Touch 'n Go / GrabPay</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ewallet-id">E-Wallet ID</Label>
          <Input
            id="ewallet-id"
            value={planData?.walletId || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ewallet-integration-key">Integration Key</Label>
          <Input
            id="ewallet-integration-key"
            type="password"
            value={planData?.integrationKey || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ewallet-fee">Transaction Fee</Label>
          <Input
            id="ewallet-fee"
            value={planData?.transactionFee || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ewallet-supported">Supported Wallets</Label>
          <Input
            id="ewallet-supported"
            value={planData?.supportedWallets || ""}
            placeholder="Select a plan to populate"
            readOnly
            className="bg-secondary/50"
          />
        </div>
      </div>
    </Card>
  );
}
