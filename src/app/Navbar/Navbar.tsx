import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "@/lib/authOptions";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-100 pt-2 shadow-md fixed z-10 w-full">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
        <Link href="/add-product" className="border btn border-black hover:bg-black hover:text-white py-2 px-4 mx-4">Add Product</Link>
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input-bordered input w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}