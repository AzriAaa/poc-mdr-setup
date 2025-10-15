import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PRODUCTS = ["FPX", "Card", "E Wallet", "RHB DNQR"];

interface ProductSelectorProps {
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

export function ProductSelector({ selectedProducts, onProductsChange }: ProductSelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleProduct = (product: string) => {
    const newProducts = selectedProducts.includes(product)
      ? selectedProducts.filter((p) => p !== product)
      : [...selectedProducts, product];
    onProductsChange(newProducts);
  };

  const removeProduct = (product: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onProductsChange(selectedProducts.filter((p) => p !== product));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between min-h-[3rem] h-auto py-2"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedProducts.length === 0 ? (
              <span className="text-muted-foreground">Select products...</span>
            ) : (
              selectedProducts.map((product) => (
                <Badge
                  key={product}
                  variant="secondary"
                  className="gap-1 px-2 py-1"
                >
                  {product}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={(e) => removeProduct(product, e)}
                  />
                </Badge>
              ))
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandEmpty>No product found.</CommandEmpty>
          <CommandGroup>
            {PRODUCTS.map((product) => (
              <CommandItem
                key={product}
                value={product}
                onSelect={() => toggleProduct(product)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedProducts.includes(product) ? "opacity-100" : "opacity-0"
                  )}
                />
                {product}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
