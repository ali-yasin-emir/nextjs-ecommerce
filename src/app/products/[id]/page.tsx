import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

  const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();
    return product;
  });

  export const generateMetadata = async ({
    params: { id },
  }: ProductPageProps): Promise<Metadata> => {
    const product = await getProduct(id);
    return {
      title: product.name + " | Flowmazon",
      description: product.description,
      openGraph: {
        images: [{ url: product.imageUrl }],
      },
    };
  }

  const ProductPage = async ({ params: { id } }: ProductPageProps) => {

  const product = await getProduct(id);

  return (
    <div className="flex h-screen flex-col gap-12 max-lg:p-12 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="w-1/2 rounded-lg lg:w-[500px]"
        priority
      />
      <div className="">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
