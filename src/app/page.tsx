import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex flex-col pt-12">
      <div className="hero rounded-xl bg-base-200 pt-28">
        <div className="hero-content flex flex-col lg:flex-row gap-24">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={800}
            height={400}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={"/products/" + products[0].id}
              className="btn btn-primary"
            >
              CHECK IT OUT
            </Link>
          </div>
        </div>
      </div>
      <div className="my-24 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
