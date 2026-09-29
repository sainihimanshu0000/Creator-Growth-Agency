import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/cinematic/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
