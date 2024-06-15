import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="flex h-12 justify-between shadow-md items-center px-4">
        <Link href={"/"} legacyBehavior>
          <a className="text-lg font-bold">amazona</a>
        </Link>
        <div>
          <Link href="/cart" className="p-2">
            Cart
          </Link>
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
