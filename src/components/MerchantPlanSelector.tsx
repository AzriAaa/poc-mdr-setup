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
}

const MERCHANT_PLANS: MerchantPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses just getting started",
  },
  {
    id: "professional",
    name: "Professional Plan",
    description: "Advanced features for growing businesses",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "Full suite for large-scale operations",
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Maximum features with priority support",
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
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search plans..." />
              <CommandEmpty>No plan found.</CommandEmpty>
              <CommandGroup>
                {MERCHANT_PLANS.map((plan) => (
                  <CommandItem
                    key={plan.id}
                    value={plan.id}
                    onSelect={() => handlePlanSelect(plan.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPlan === plan.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.name}</span>
                      <span className="text-sm text-muted-foreground">{plan.description}</span>
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
