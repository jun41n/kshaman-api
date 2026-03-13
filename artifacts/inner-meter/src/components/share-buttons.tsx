import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
}

export function ShareButtons({ title, text, url }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "링크 복사 완료!",
        description: "클립보드에 결과 링크가 복사되었습니다.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "복사 실패",
        description: "다시 시도해주세요.",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      // Fallback to copy link if Web Share API is not available
      handleCopyLink();
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button 
        onClick={handleCopyLink} 
        variant="outline" 
        className="rounded-full shadow-sm hover:border-primary hover:text-primary transition-colors"
      >
        {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <LinkIcon className="w-4 h-4 mr-2" />}
        {copied ? "복사됨" : "링크 복사"}
      </Button>

      <Button 
        onClick={shareToTwitter} 
        variant="outline" 
        className="rounded-full shadow-sm bg-[#1DA1F2]/5 hover:bg-[#1DA1F2]/10 border-[#1DA1F2]/20 text-[#1DA1F2]"
      >
        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
        트위터
      </Button>

      {/* Native Share button visible mainly on mobile */}
      <Button 
        onClick={handleNativeShare} 
        className="rounded-full shadow-md md:hidden bg-gradient-primary text-white"
      >
        <Share2 className="w-4 h-4 mr-2" />
        공유하기
      </Button>
    </div>
  );
}
