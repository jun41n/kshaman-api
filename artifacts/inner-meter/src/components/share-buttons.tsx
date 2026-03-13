import { useState } from "react";
import { Check, Link as LinkIcon, Share2 } from "lucide-react";
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
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({ variant: "destructive", title: "복사 실패", description: "다시 시도해주세요." });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "width=600,height=500"
    );
  };

  const shareToThreads = () => {
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + shareUrl)}`,
      "_blank",
      "width=600,height=600"
    );
  };

  const shareToPinterest = () => {
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(text)}`,
      "_blank",
      "width=750,height=550"
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main share row */}
      <div className="flex flex-wrap gap-3 justify-center">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-1.5 group"
          title="링크 복사"
        >
          <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-200">
            {copied
              ? <Check className="w-5 h-5 text-green-500" />
              : <LinkIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />}
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            {copied ? "복사됨!" : "링크 복사"}
          </span>
        </button>

        {/* X / Twitter */}
        <button
          onClick={shareToTwitter}
          className="flex flex-col items-center gap-1.5 group"
          title="X(트위터)에 공유"
        >
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">X</span>
        </button>

        {/* Facebook */}
        <button
          onClick={shareToFacebook}
          className="flex flex-col items-center gap-1.5 group"
          title="페이스북에 공유"
        >
          <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">페이스북</span>
        </button>

        {/* Threads */}
        <button
          onClick={shareToThreads}
          className="flex flex-col items-center gap-1.5 group"
          title="스레드에 공유"
        >
          <div className="w-12 h-12 rounded-full bg-[#101010] flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 192 192">
              <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.643 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96.03l-.001.883.001.883c.223 28.715 6.881 51.545 19.787 67.95 14.504 18.437 36.094 27.885 64.199 28.08h.113c24.811-.17 42.352-6.676 57.005-21.319 19.13-19.119 18.524-42.763 12.014-57.336-4.657-10.862-13.51-19.784-24.582-25.183z" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">스레드</span>
        </button>

        {/* Pinterest */}
        <button
          onClick={shareToPinterest}
          className="flex flex-col items-center gap-1.5 group"
          title="핀터레스트에 공유"
        >
          <div className="w-12 h-12 rounded-full bg-[#E60023] flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">핀터레스트</span>
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center gap-1.5 group"
            title="공유하기"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:opacity-80 transition-opacity">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">더 보기</span>
          </button>
        )}
      </div>

      {/* Share text preview */}
      <div className="bg-muted/50 border border-border rounded-2xl px-5 py-3 text-sm text-muted-foreground max-w-sm text-center italic">
        "{text}"
      </div>

      {/* Full copy link button */}
      <Button
        onClick={handleCopyLink}
        variant="outline"
        size="sm"
        className="rounded-full border-dashed text-xs"
      >
        {copied ? <Check className="w-3 h-3 mr-1.5 text-green-500" /> : <LinkIcon className="w-3 h-3 mr-1.5" />}
        {copied ? "링크 복사됨!" : "결과 링크 복사하기"}
      </Button>
    </div>
  );
}
