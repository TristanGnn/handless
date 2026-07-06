import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** nom du fichier SVG dans /public/logos (sans extension) */
  name: string;
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Rend un logo SVG monochrome via CSS mask : le logo prend la couleur
 * courante du texte (currentColor), ce qui permet de le thémer librement.
 */
export function BrandLogo({ name, size = 32, className, label }: BrandLogoProps) {
  const url = `/logos/${name}.svg`;

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
