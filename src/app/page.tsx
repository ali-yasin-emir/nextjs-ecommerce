import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: {
    page: string;
  };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page); // same with Number(page)
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? 0 : heroItemCount),
  });

  return (
    <div className="flex flex-col items-center pb-20 max-sm:pt-48 pt-36 gap-20">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex flex-col gap-20 max-sm:gap-12 max-sm:px-14 max-sm:pt-8 lg:flex-row">
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
              <p className="py-6 text-justify">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                CHECK IT OUT
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* my-24 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-6 */}
      <div className="flex flex-wrap gap-12 justify-around">
        {(currentPage === 1 ? products : products.slice(1)).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
