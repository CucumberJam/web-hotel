import Image from "next/image.js";
import logo from '../../../public/logo.png'
import Link from "next/link.js";

function Logo() {
  return (
    <Link href="/"
          className="flex items-center gap-4 z-10">
      <Image src={logo}
             opacity={90} width='70'
             alt="The Wild Oasis logo" />
      <span className="text-base sm:text-lg md:text-xl font-semibold text-primary-100 hover:text-accent-400 transition-colors">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
