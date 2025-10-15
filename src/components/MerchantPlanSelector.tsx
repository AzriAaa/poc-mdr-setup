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
  fpxConfig?: {
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
  cardConfig?: {
    midConfig: {
      cardExchangeId: string;
      cardDomainId: string;
      merchantId: string;
      password: string;
    };
    settlement: {
      settlementMode: string;
      settlementDistribute: string;
      settlementDay: string;
      selfAccountNumber: string;
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
  ewalletConfig?: {
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
  dnqrConfig?: {
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

export const MERCHANT_PLANS: MerchantPlan[] = [
  // FPX Only Plans
  {
    id: "fpx-basic",
    name: "FPX Basic",
    description: "Basic FPX banking integration for startups",
    supportedProducts: ["FPX"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.20",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.60",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "15.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.00",
            minimum: "7.50",
            maximum: "75.00",
          },
        },
      ],
    },
  },
  {
    id: "fpx-business",
    name: "FPX Business",
    description: "Enhanced FPX features for growing businesses",
    supportedProducts: ["FPX"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "9.00",
            maximum: "95.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.45",
            minimum: "4.50",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.15",
            minimum: "11.50",
            maximum: "115.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.55",
            minimum: "5.50",
            maximum: "55.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.80",
            minimum: "14.00",
            maximum: "140.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.90",
            minimum: "7.00",
            maximum: "70.00",
          },
        },
      ],
    },
  },
  {
    id: "fpx-partner",
    name: "FPX Partner Plan",
    description: "Special FPX rates and features for strategic partners",
    supportedProducts: ["FPX"],
    category: "partner",
    fpxConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "80",
        masterSplitPercent: "20",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.80",
            minimum: "8.00",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "4.00",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "9.50",
            maximum: "95.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
      ],
    },
  },
  {
    id: "fpx-enterprise",
    name: "FPX Enterprise",
    description: "Premium FPX with dedicated support and custom rates",
    supportedProducts: ["FPX"],
    category: "enterprise",
    fpxConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "85",
        masterSplitPercent: "15",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "6.50",
            maximum: "65.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.35",
            minimum: "3.50",
            maximum: "35.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "7.50",
            maximum: "75.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "4.00",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.20",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.60",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
      ],
    },
  },

  // Card Only Plans
  {
    id: "card-starter",
    name: "Card Starter",
    description: "Essential card payment processing",
    supportedProducts: ["Card"],
    category: "standard",
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-STR-4567",
        cardDomainId: "domain1",
        merchantId: "MID-STARTER-123456",
        password: "",
      },
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "full",
        settlementDay: "t2",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.50",
            minimum: "15.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.25",
            minimum: "7.50",
            maximum: "100.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.20",
            minimum: "12.00",
            maximum: "180.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.10",
            minimum: "6.00",
            maximum: "90.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "5.00",
            minimum: "20.00",
            maximum: "250.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "125.00",
          },
        },
      ],
    },
  },
  {
    id: "card-professional",
    name: "Card Professional",
    description: "Advanced card processing with fraud protection",
    supportedProducts: ["Card"],
    category: "standard",
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-PRO-7890",
        cardDomainId: "domain1",
        merchantId: "MID-PROFESSIONAL-234567",
        password: "",
      },
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "full",
        settlementDay: "t1",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.30",
            minimum: "14.00",
            maximum: "190.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.15",
            minimum: "7.00",
            maximum: "95.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.00",
            minimum: "11.00",
            maximum: "170.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "5.50",
            maximum: "85.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "4.50",
            minimum: "18.00",
            maximum: "230.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.25",
            minimum: "9.00",
            maximum: "115.00",
          },
        },
      ],
    },
  },
  {
    id: "card-partner",
    name: "Card Partner Plan",
    description: "Exclusive card processing rates for partners",
    supportedProducts: ["Card"],
    category: "partner",
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-PTR-2345",
        cardDomainId: "domain-partner",
        merchantId: "MID-PARTNER-345678",
        password: "",
      },
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "full",
        settlementDay: "t0",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.00",
            minimum: "12.00",
            maximum: "170.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "6.00",
            maximum: "85.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.80",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.90",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "4.00",
            minimum: "16.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "8.00",
            maximum: "100.00",
          },
        },
      ],
    },
  },
  {
    id: "card-premium",
    name: "Card Premium",
    description: "Top-tier card processing with lowest MDR rates",
    supportedProducts: ["Card"],
    category: "premium",
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-PRM-8901",
        cardDomainId: "domain2",
        merchantId: "MID-PREMIUM-456789",
        password: "",
      },
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "full",
        settlementDay: "t0",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.70",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.85",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.50",
            minimum: "8.00",
            maximum: "130.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.00",
            maximum: "65.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "3.50",
            minimum: "14.00",
            maximum: "180.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.75",
            minimum: "7.00",
            maximum: "90.00",
          },
        },
      ],
    },
  },

  // E Wallet Only Plans
  {
    id: "ewallet-basic",
    name: "E-Wallet Basic",
    description: "Connect with popular e-wallet providers",
    supportedProducts: ["E Wallet"],
    category: "standard",
    ewalletConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "65",
        masterSplitPercent: "35",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.50",
            minimum: "8.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.70",
            minimum: "9.00",
            maximum: "130.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.85",
            minimum: "4.50",
            maximum: "65.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.25",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
      ],
    },
  },
  {
    id: "ewallet-plus",
    name: "E-Wallet Plus",
    description: "Multi-wallet integration with analytics",
    supportedProducts: ["E Wallet"],
    category: "standard",
    ewalletConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.35",
            minimum: "7.50",
            maximum: "110.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "3.75",
            maximum: "55.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.55",
            minimum: "8.50",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.25",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.20",
            minimum: "9.00",
            maximum: "140.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.10",
            minimum: "4.50",
            maximum: "70.00",
          },
        },
      ],
    },
  },
  {
    id: "ewallet-partner",
    name: "E-Wallet Partner",
    description: "Special e-wallet rates for certified partners",
    supportedProducts: ["E Wallet"],
    category: "partner",
    ewalletConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.10",
            minimum: "6.00",
            maximum: "90.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.55",
            minimum: "3.00",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.25",
            minimum: "7.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "3.50",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.80",
            minimum: "8.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.90",
            minimum: "4.00",
            maximum: "60.00",
          },
        },
      ],
    },
  },

  // RHB DNQR Only Plans
  {
    id: "dnqr-standard",
    name: "RHB DNQR Standard",
    description: "QR payment solution for merchants",
    supportedProducts: ["RHB DNQR"],
    category: "standard",
    dnqrConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.80",
            minimum: "5.00",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "2.50",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "dynamic",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "6.00",
            maximum: "90.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.45",
            minimum: "3.00",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "7.50",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "3.75",
            maximum: "50.00",
          },
        },
      ],
    },
  },
  {
    id: "dnqr-partner",
    name: "RHB DNQR Partner",
    description: "Enhanced DNQR features for partners",
    supportedProducts: ["RHB DNQR"],
    category: "partner",
    dnqrConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "4.00",
            maximum: "70.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.35",
            minimum: "2.00",
            maximum: "35.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "dynamic",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "5.00",
            maximum: "75.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "2.50",
            maximum: "37.50",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.20",
            minimum: "6.00",
            maximum: "85.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.60",
            minimum: "3.00",
            maximum: "42.50",
          },
        },
      ],
    },
  },

  // Multi-Product Plans (FPX + Card)
  {
    id: "fpx-card-combo",
    name: "FPX + Card Combo",
    description: "Banking and card payments bundled",
    supportedProducts: ["FPX", "Card"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.20",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.60",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "15.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.00",
            minimum: "7.50",
            maximum: "75.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-CMB-1234",
        cardDomainId: "domain1",
        merchantId: "MID-COMBO-567890",
        password: "",
      },
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "full",
        settlementDay: "t2",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.50",
            minimum: "15.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.25",
            minimum: "7.50",
            maximum: "100.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.20",
            minimum: "12.00",
            maximum: "180.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.10",
            minimum: "6.00",
            maximum: "90.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "5.00",
            minimum: "20.00",
            maximum: "250.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "125.00",
          },
        },
      ],
    },
  },
  {
    id: "fpx-card-business",
    name: "FPX + Card Business",
    description: "Complete payment solution for growing businesses",
    supportedProducts: ["FPX", "Card"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "9.00",
            maximum: "95.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.45",
            minimum: "4.50",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.15",
            minimum: "11.50",
            maximum: "115.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.55",
            minimum: "5.50",
            maximum: "55.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.80",
            minimum: "14.00",
            maximum: "140.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.90",
            minimum: "7.00",
            maximum: "70.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-BUS-5678",
        cardDomainId: "domain1",
        merchantId: "MID-BUSINESS-678901",
        password: "",
      },
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "full",
        settlementDay: "t1",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.30",
            minimum: "14.00",
            maximum: "190.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.15",
            minimum: "7.00",
            maximum: "95.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.00",
            minimum: "11.00",
            maximum: "170.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "5.50",
            maximum: "85.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "4.50",
            minimum: "18.00",
            maximum: "230.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.25",
            minimum: "9.00",
            maximum: "115.00",
          },
        },
      ],
    },
  },
  {
    id: "fpx-card-partner",
    name: "FPX + Card Partner",
    description: "Strategic partner rates for bank and card payments",
    supportedProducts: ["FPX", "Card"],
    category: "partner",
    fpxConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "80",
        masterSplitPercent: "20",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.80",
            minimum: "8.00",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "4.00",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "9.50",
            maximum: "95.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-FPTR-3456",
        cardDomainId: "domain-partner",
        merchantId: "MID-FPX-PARTNER-789012",
        password: "",
      },
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "full",
        settlementDay: "t0",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.00",
            minimum: "12.00",
            maximum: "170.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "6.00",
            maximum: "85.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.80",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.90",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "4.00",
            minimum: "16.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "8.00",
            maximum: "100.00",
          },
        },
      ],
    },
  },

  // Multi-Product Plans (FPX + E Wallet)
  {
    id: "fpx-ewallet-combo",
    name: "FPX + E-Wallet Combo",
    description: "Bank transfers and e-wallet payments",
    supportedProducts: ["FPX", "E Wallet"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.20",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.60",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "15.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.00",
            minimum: "7.50",
            maximum: "75.00",
          },
        },
      ],
    },
    ewalletConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.50",
            minimum: "8.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.70",
            minimum: "9.00",
            maximum: "130.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.85",
            minimum: "4.50",
            maximum: "65.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.25",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
      ],
    },
  },

  // All Payment Methods
  {
    id: "omnichannel-standard",
    name: "Omnichannel Standard",
    description: "All payment methods for diverse customer base",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "standard",
    fpxConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.20",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.60",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "15.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.00",
            minimum: "7.50",
            maximum: "75.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-OMNI-6789",
        cardDomainId: "domain1",
        merchantId: "MID-OMNI-STD-890123",
        password: "",
      },
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "full",
        settlementDay: "t2",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.50",
            minimum: "15.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.25",
            minimum: "7.50",
            maximum: "100.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.20",
            minimum: "12.00",
            maximum: "180.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.10",
            minimum: "6.00",
            maximum: "90.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "5.00",
            minimum: "20.00",
            maximum: "250.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "125.00",
          },
        },
      ],
    },
    ewalletConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.50",
            minimum: "8.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.00",
            maximum: "60.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.70",
            minimum: "9.00",
            maximum: "130.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.85",
            minimum: "4.50",
            maximum: "65.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "2.50",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.25",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
      ],
    },
    dnqrConfig: {
      settlement: {
        settlementMode: "delayed",
        settlementDistribute: "split",
        selfSplitPercent: "70",
        masterSplitPercent: "30",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t1",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.80",
            minimum: "5.00",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "2.50",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "dynamic",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "6.00",
            maximum: "90.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.45",
            minimum: "3.00",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "7.50",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "3.75",
            maximum: "50.00",
          },
        },
      ],
    },
  },
  {
    id: "omnichannel-partner",
    name: "Omnichannel Partner",
    description: "Full payment suite with partner privileges",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "partner",
    fpxConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "80",
        masterSplitPercent: "20",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.80",
            minimum: "8.00",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "4.00",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "9.50",
            maximum: "95.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "12.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "6.00",
            maximum: "60.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-OPTR-7890",
        cardDomainId: "domain-partner",
        merchantId: "MID-OMNI-PTR-901234",
        password: "",
      },
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "full",
        settlementDay: "t0",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "2.00",
            minimum: "12.00",
            maximum: "170.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "1.00",
            minimum: "6.00",
            maximum: "85.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.80",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.90",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "4.00",
            minimum: "16.00",
            maximum: "200.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "2.00",
            minimum: "8.00",
            maximum: "100.00",
          },
        },
      ],
    },
    ewalletConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.10",
            minimum: "6.00",
            maximum: "90.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.55",
            minimum: "3.00",
            maximum: "45.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.25",
            minimum: "7.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "3.50",
            maximum: "50.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.80",
            minimum: "8.00",
            maximum: "120.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.90",
            minimum: "4.00",
            maximum: "60.00",
          },
        },
      ],
    },
    dnqrConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "75",
        masterSplitPercent: "25",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "4.00",
            maximum: "70.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.35",
            minimum: "2.00",
            maximum: "35.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "dynamic",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "5.00",
            maximum: "75.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "2.50",
            maximum: "37.50",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.20",
            minimum: "6.00",
            maximum: "85.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.60",
            minimum: "3.00",
            maximum: "42.50",
          },
        },
      ],
    },
  },
  {
    id: "omnichannel-enterprise",
    name: "Omnichannel Enterprise",
    description: "Ultimate payment solution with custom integrations",
    supportedProducts: ["FPX", "Card", "E Wallet", "RHB DNQR"],
    category: "enterprise",
    fpxConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "85",
        masterSplitPercent: "15",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.65",
            minimum: "6.50",
            maximum: "65.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.35",
            minimum: "3.50",
            maximum: "35.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "cca",
            transactionModel: "b2b1",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "7.50",
            maximum: "75.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.40",
            minimum: "4.00",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "casa",
            transactionModel: "b2c",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.20",
            minimum: "10.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.60",
            minimum: "5.00",
            maximum: "50.00",
          },
        },
      ],
    },
    cardConfig: {
      midConfig: {
        cardExchangeId: "CEX-ENT-9012",
        cardDomainId: "domain-enterprise",
        merchantId: "MID-ENTERPRISE-012345",
        password: "",
      },
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "full",
        settlementDay: "t0",
        selfAccountNumber: "1234567890123456",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.70",
            minimum: "10.00",
            maximum: "150.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.85",
            minimum: "5.00",
            maximum: "75.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "merchant",
            transactionModel: "pos",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.50",
            minimum: "8.00",
            maximum: "130.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.75",
            minimum: "4.00",
            maximum: "65.00",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "online",
            transactionStatus: "chargeback",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "3.50",
            minimum: "14.00",
            maximum: "180.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "1.75",
            minimum: "7.00",
            maximum: "90.00",
          },
        },
      ],
    },
    ewalletConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "80",
        masterSplitPercent: "20",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "personal",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.95",
            minimum: "5.50",
            maximum: "80.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "2.75",
            maximum: "40.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "p2m",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "1.05",
            minimum: "6.00",
            maximum: "85.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.55",
            minimum: "3.00",
            maximum: "42.50",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "personal",
            transactionModel: "p2p",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.50",
            minimum: "7.00",
            maximum: "100.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.75",
            minimum: "3.50",
            maximum: "50.00",
          },
        },
      ],
    },
    dnqrConfig: {
      settlement: {
        settlementMode: "instant",
        settlementDistribute: "split",
        selfSplitPercent: "80",
        masterSplitPercent: "20",
        selfAccountNumber: "1234567890123456",
        settlementDay: "t0",
        productStatus: "active",
      },
      mdrPlans: [
        {
          name: "Basic MDR Plan",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.50",
            minimum: "3.50",
            maximum: "60.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.28",
            minimum: "1.75",
            maximum: "30.00",
          },
        },
        {
          name: "Plan 1",
          condition: {
            accountType: "business",
            transactionModel: "dynamic",
            transactionStatus: "success",
          },
          overallMDR: {
            mdrType: "percentage",
            mdrValue: "0.60",
            minimum: "4.00",
            maximum: "65.00",
          },
          profitSharing: {
            mdrType: "percentage",
            mdrValue: "0.32",
            minimum: "2.00",
            maximum: "32.50",
          },
        },
        {
          name: "Plan 2",
          condition: {
            accountType: "merchant",
            transactionModel: "static",
            transactionStatus: "failed",
          },
          overallMDR: {
            mdrType: "fixed",
            mdrValue: "1.00",
            minimum: "5.50",
            maximum: "75.00",
          },
          profitSharing: {
            mdrType: "fixed",
            mdrValue: "0.50",
            minimum: "2.75",
            maximum: "37.50",
          },
        },
      ],
    },
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
