import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProductSelector } from "@/components/ProductSelector";
import { MerchantPlanSelector } from "@/components/MerchantPlanSelector";
import { FPXSection } from "@/components/sections/FPXSection";
import { CardSection } from "@/components/sections/CardSection";
import { EWalletSection } from "@/components/sections/EWalletSection";
import { RHBDNQRSection } from "@/components/sections/RHBDNQRSection";

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [hasFieldChanges, setHasFieldChanges] = useState(false);

  // Reset hasFieldChanges when plan changes
  const handlePlanChange = (plan: string) => {
    setSelectedPlan(plan);
    setHasFieldChanges(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Payment Configuration</h1>
          <p className="text-muted-foreground text-lg">Configure your merchant payment methods and plans</p>
        </div>

        {/* Main Configuration Card */}
        <Card className="p-8 shadow-lg border-border">
          <div className="space-y-8">
            {/* Product Selection */}
            <div className="space-y-3">
              <Label htmlFor="product-select" className="text-base font-semibold">
                Select Product
              </Label>
              <ProductSelector 
                selectedProducts={selectedProducts}
                onProductsChange={setSelectedProducts}
              />
            </div>

            {/* Merchant Plan Selection */}
            <div className="space-y-3">
              <Label htmlFor="plan-select" className="text-base font-semibold">
                Merchant Plan
              </Label>
              <MerchantPlanSelector
                selectedProducts={selectedProducts}
                selectedPlan={selectedPlan}
                onPlanChange={handlePlanChange}
                hasFieldChanges={hasFieldChanges}
              />
            </div>
          </div>
        </Card>

        {/* Dynamic Sections Based on Product Selection */}
        <div className="space-y-6">
          {selectedProducts.includes("FPX") && (
            <FPXSection
              selectedPlan={selectedPlan}
              onFieldChange={() => setHasFieldChanges(true)}
            />
          )}

          {selectedProducts.includes("Card") && (
            <CardSection
              selectedPlan={selectedPlan}
              onFieldChange={() => setHasFieldChanges(true)}
            />
          )}

          {selectedProducts.includes("E Wallet") && (
            <EWalletSection
              selectedPlan={selectedPlan}
              onFieldChange={() => setHasFieldChanges(true)}
            />
          )}

          {selectedProducts.includes("RHB DNQR") && (
            <RHBDNQRSection
              selectedPlan={selectedPlan}
              onFieldChange={() => setHasFieldChanges(true)}
            />
          )}
        </div>

        {/* Info Badge */}
        {selectedProducts.length === 0 && (
          <div className="text-center py-8">
            <Badge variant="outline" className="text-base px-6 py-3">
              Select products above to configure payment methods
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
