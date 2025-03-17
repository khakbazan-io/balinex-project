"use client";
import { useCallback } from "react";
import { AnimatedCheckmark } from "../icons/animatedSuccess";
import type { SuccessModalCmProps } from "./types";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@/core/common";

export const SuccessModal: React.FC<SuccessModalCmProps> = ({
  title,
  isOpen,
  onCloseAction,
  onCloseRedirectUrl,
}) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    onCloseAction();

    if (onCloseRedirectUrl) {
      router.push(onCloseRedirectUrl);
    }
  }, [onCloseRedirectUrl, onCloseAction]);

  return (
    <Modal isOpen={isOpen} hideCloseButton>
      <div className="flex flex-col items-center justify-center py-4 gap-y-4">
        <AnimatedCheckmark size={120} />

        <h3 className="font-semibold text-foreground/60">{title}</h3>

        <div>
          <Button variant="bordered" onPress={handleClose}>
            متوجه شدم
          </Button>
        </div>
      </div>
    </Modal>
  );
};
