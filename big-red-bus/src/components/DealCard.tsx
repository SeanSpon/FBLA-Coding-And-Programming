import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Copy, Check, Calendar } from "lucide-react";
import type { Deal } from "@/types/organization";
import { useClaimedDeals } from "@/hooks/useClaimedDeals";
import BotCheckDialog from "./BotCheckDialog";

type DealCardProps = {
  deal: Deal;
  organizationId: string;
};

/**
 * DealCard component - displays a single deal/coupon
 */
export default function DealCard({ deal, organizationId }: DealCardProps) {
  const { isDealClaimed, claimDeal } = useClaimedDeals();
  const [copied, setCopied] = useState(false);
  const [showBotCheck, setShowBotCheck] = useState(false);
  
  const claimed = isDealClaimed(deal.id);
  const expired = new Date(deal.expiresAt) < new Date();

  const handleCopyCode = () => {
    if (deal.code) {
      navigator.clipboard.writeText(deal.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaimDeal = () => {
    if (!claimed && !expired) {
      setShowBotCheck(true);
    }
  };

  const handleBotVerified = () => {
    claimDeal(deal.id, organizationId);
    setShowBotCheck(false);
  };

  return (
    <>
      <Card className={`${expired ? 'opacity-60' : ''} ${claimed ? 'border-red-600 border-2' : 'border-red-200 border-2'} rounded-2xl hover:shadow-lg transition-all`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-red-600" />
              <CardTitle className="text-lg text-red-600">{deal.title}</CardTitle>
            </div>
            {claimed && (
              <Badge variant="default" className="bg-red-600 text-white border-0 rounded-full">
                <Check className="h-3 w-3 mr-1" />
                Claimed
              </Badge>
            )}
            {expired && !claimed && (
              <Badge variant="secondary" className="bg-red-100 text-red-700 rounded-full">Expired</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-text-light">{deal.description}</p>

          {deal.code && (
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-red-50 rounded-full font-mono text-sm border-2 border-red-200 text-red-700">
                {deal.code}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyCode}
                aria-label="Copy code"
                className="border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-full"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-red-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          {deal.expiresAt && (
            <div className="flex items-center gap-2 text-xs text-text-light">
              <Calendar className="h-3 w-3 text-red-600" />
              <span>
                {expired ? "Expired" : "Expires"}: {new Date(deal.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}

          <Button
            onClick={handleClaimDeal}
            disabled={claimed || expired}
            className={`w-full rounded-full ${claimed || expired ? 'bg-red-200 text-red-700' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            variant={claimed ? "secondary" : "default"}
          >
            {claimed ? "Already Claimed" : expired ? "Deal Expired" : "Claim This Deal"}
          </Button>
        </CardContent>
      </Card>

      {/* Bot verification dialog */}
      <BotCheckDialog
        open={showBotCheck}
        onOpenChange={setShowBotCheck}
        onVerified={handleBotVerified}
        title="Verify to Claim Deal"
        description="Please verify you're human to claim this deal."
      />
    </>
  );
}
