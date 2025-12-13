import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BotCheck from "./BotCheck";

type BotCheckDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
  title?: string;
  description?: string;
};

/**
 * BotCheckDialog - Wrapper component that shows BotCheck in a modal dialog
 */
export default function BotCheckDialog({
  open,
  onOpenChange,
  onVerified,
  title = "Verification Required",
  description = "Please verify you're human to continue.",
}: BotCheckDialogProps) {
  const handleVerify = () => {
    onVerified();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <BotCheck onVerify={handleVerify} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

