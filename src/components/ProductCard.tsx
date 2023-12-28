import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/products/" + product.id}
      className="card bg-base-100 hover:shadow-xl max-2xl:mx-8 max-md:mx-4 border border-opacity-20 border-black hover:ease-in-out duration-300 transition-all"
    >
      <figure className="">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title px-2">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p className="px-2 text-justify">{product.description}</p>
        <PriceTag className="border-2 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 py-5 px-4 text-md font-semibold" price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
