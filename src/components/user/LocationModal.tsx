// components/user/cart/LocationModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationModal({ open, onOpenChange }: LocationModalProps) {
  const router = useRouter();

  const handleRedirectToProfile = () => {
    onOpenChange(false);
    router.push("/user/profile");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">Delivery Location Required</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="pt-2 text-base">
            To complete your order and deliver your food, we need to know your location. 
            Please add your delivery address in your profile settings.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleRedirectToProfile}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Add Location
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}