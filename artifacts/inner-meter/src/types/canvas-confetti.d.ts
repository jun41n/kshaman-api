declare module "canvas-confetti" {
  type ConfettiOptions = Record<string, unknown> & {
    particleCount?: number;
    origin?: { x?: number; y?: number };
  };

  export default function confetti(options?: ConfettiOptions): Promise<unknown>;
}
