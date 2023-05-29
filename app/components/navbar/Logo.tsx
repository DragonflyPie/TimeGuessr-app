import Image from "next/image";
import WatchLogo from "../../../public/watchLogoTiny.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex">
      {/* <div className="pl-5 md:w-24"></div> */}
      {/* <Image
        src={WatchLogo}
        width={80}
        height={80}
        alt="Logo"
        className="absolute top-1 z-50 hidden md:block "
      /> */}
      <h1 className="lg pl-5 font-logo text-3xl md:text-4xl">TimeJourney</h1>
    </Link>
  );
};

export default Logo;
