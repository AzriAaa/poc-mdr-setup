import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MerchantPlan {
  id: string;
  name: string;
  description: string;
  supportedProducts: string[]; // Array of supported products
  category: "standard" | "partner" | "premium" | "enterprise";
}

const MERCHANT_PLANS: MerchantPlan[] = [
  // FPX Only Plans
  {
    id: "fpx-basic",
    name: "FPX Basic",
    description: "Basic FPX banking integration for startups",
    supportedProducts: ["FPX"],
    category: "standard",
  },
  {
    id: "fpx-business",
    name: "FPX Business",
    description: "Enhanced FPX features for growing businesses",
    supportedProducts: ["FPX"],
    category: "standard",
  },
  {
    id: "fpx-partner",
    name: "FPX Partner Plan",
    description: "Special FPX rates and features for strategic partners",
    supportedProducts: ["FPX"],
    category: "partner",
  },
  {
    id: "fpx-enterprise",
    name: "FPX Enterprise",
    description: "Premium FPX with dedicated support and custom rates",
    supportedProducts: ["FPX"],
    category: "enterprise",
  },

  // Card Only Plans
  {
    id: "card-starter",
    name: "Card Starter",
    description: "Essential card payment processing",
    supportedProducts: ["Card"],
    category: "standard",
  },
  {
    id: "card-professional",
    name: "Card Professional",
    description: "Advanced card processing with fraud protection",
    supportedProducts: ["Card"],
    category: "standard",
  },
  {
    id: "card-partner",
    name: "Card Partner Plan",
    description: "Exclusive card processing rates for partners",
    supportedProducts: ["Card"],
    category: "partner",
  },
  {
    id: "card-premium",
    name: "Card Premium",
    description: "Top-tier card processing with lowest MDR rates",
    supportedProducts: ["Card"],
    category: "premium",
  },

  // E Wallet Only Plans
  {
    id: "ewallet-basic",
    name: "E-Wallet Basic",
    description: "Connect with popular e-wallet providers",
    supportedProducts: ["E Wallet"],
    category: "standard",
  },
  {
    id: "ewallet-plus",
    name: "E-Wallet Plus",
    description: "Multi-wallet integration with analytics",
    supportedProducts: ["E Wallet"],
    category: "standard",
  },
  {
    id: "ewallet-partner",
    name: "E-Wallet Partner",
    description: "Special e-wallet rates for certified partners",
    supportedProducts: ["E Wallet"],
    category: "partner",
  },

  // RHB DNQR Only Plans
  {
    id: "dnqr-standard",
    name: "RHB DNQR Standard",
    description: "QR payment solution for merchants",
    supportedProducts: ["RHB DNQR"],
    category: "standard",
  },
  {
    id: "dnqr-partner",
    name: "RHB DNQR Partner",
    description: "Enhanced DNQR features for partners",
    supportedProducts: ["RHB DNQR"],
    category: "partner",
  },

  // Multi-Product Plans (FPX + Card)
  {
    id: "fpx-card-combo",
    name: "FPX + Card Combo",
    description: "Banking and card payments bundled",
    supportedProducts: ["FPX", "Card"],
    category: "standard",
  },
  {
    id: "fpx-card-business",
    name: "FPX + Card Business",
    description: "Complete payment solution for growing businesses",
    supportedProducts: ["FPX", "Card"],
    category: "standard",
  },
  {
    id: "fpx-card-partner",
    name: "FPX + Card Partner",
    description: "Strategic partner rates for bank and card payments",
    supportedProducts: ["FPX", "Card"],
    category: "partner",
  },

  // Multi-Product Plans (FPX + E Wallet)
  {
    id: "fpx-ewallet-combo",
    name: "FPX + E-Wallet Combo",
    description: "Bank transfers and e-wallet payments",
    supportedProducts: ["FPX", "E Wallet"],
    category: "standard",
  },

  // All Payment Methods
  {
    id: "omnichannel-standard",
    name: "Omnichannel Standard",
    description: "All payment methods for diverse customer base",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "standard",
  },
  {
    id: "omnichannel-partner",
    name: "Omnichannel Partner",
    description: "Full payment suite with partner privileges",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "partner",
  },
  {
    id: "omnichannel-enterprise",
    name: "Omnichannel Enterprise",
    description: "Ultimate payment solution with custom integrations",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "enterprise",
  },
];

interface MerchantPlanSelectorProps {
  selectedProducts: string[];
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
  hasFieldChanges?: boolean;
}

export function MerchantPlanSelector({
  selectedProducts,
  selectedPlan,
  onPlanChange,
  hasFieldChanges = false,
}: MerchantPlanSelectorProps) {
  const [open, setOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingPlanChange, setPendingPlanChange] = useState<string>("");

  const selectedPlanData = MERCHANT_PLANS.find((plan) => plan.id === selectedPlan);
  const isDisabled = selectedProducts.length === 0;

  // Filter plans based on selected products
  // A plan is available if its supportedProducts exactly matches the selectedProducts
  const availablePlans = MERCHANT_PLANS.filter((plan) => {
    if (selectedProducts.length === 0) return false;

    // Check if the plan supports exactly the selected products
    const planProducts = [...plan.supportedProducts].sort();
    const selected = [...selectedProducts].sort();

    return (
      planProducts.length === selected.length &&
      planProducts.every((product, index) => product === selected[index])
    );
  });

  const handlePlanSelect = (newPlan: string) => {
    // If trying to clear or change plan and there are field changes, show confirmation
    if (hasFieldChanges && selectedPlan && newPlan !== selectedPlan) {
      setPendingPlanChange(newPlan);
      setShowConfirmDialog(true);
      setOpen(false);
    } else {
      // No changes, directly update
      onPlanChange(newPlan);
      setOpen(false);
    }
  };

  const handleConfirmChange = () => {
    onPlanChange(pendingPlanChange);
    setShowConfirmDialog(false);
    setPendingPlanChange("");
  };

  const handleCancelChange = () => {
    setShowConfirmDialog(false);
    setPendingPlanChange("");
  };

  const handleClearPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasFieldChanges) {
      setPendingPlanChange("");
      setShowConfirmDialog(true);
    } else {
      onPlanChange("");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              disabled={isDisabled}
            >
              <span className={selectedPlan ? "" : "text-muted-foreground"}>
                {selectedPlan
                  ? selectedPlanData?.name
                  : isDisabled
                  ? "Please select products first"
                  : "Select a merchant plan..."}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-full p-0" align="start">
            <Command className="max-h-[70vh] overflow-hidden">
              <CommandInput placeholder="Search plans..." className="h-12" />
              <CommandEmpty className="py-6 text-center text-sm">
                {availablePlans.length === 0
                  ? "No plans available for the selected products"
                  : "No plan found."}
              </CommandEmpty>
              <CommandGroup className="max-h-[calc(70vh-4rem)] overflow-auto">
                {availablePlans.map((plan) => (
                  <CommandItem
                    key={plan.id}
                    value={plan.id}
                    onSelect={() => handlePlanSelect(plan.id)}
                    className="py-3"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0",
                        selectedPlan === plan.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">{plan.name}</span>
                        {plan.category === "partner" && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded shrink-0">
                            Partner
                          </span>
                        )}
                        {plan.category === "premium" && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded shrink-0">
                            Premium
                          </span>
                        )}
                        {plan.category === "enterprise" && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded shrink-0">
                            Enterprise
                          </span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{plan.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedPlan && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearPlan}
            disabled={isDisabled}
            title="Clear selection"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You have modified field values that differ from the selected plan.
              Changing or clearing the plan will reset all fields to their default values.
              Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChange}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
