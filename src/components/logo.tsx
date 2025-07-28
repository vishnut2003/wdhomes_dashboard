import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={logo}
        className="dark:hidden"
        alt="WD Homes logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={darkLogo}
        className="hidden dark:block"
        alt="WD Homes logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
