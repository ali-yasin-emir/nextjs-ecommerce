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
      className="card flex justify-between w-[340px] h-[540px] bg-base-100 hover:shadow-xl max-2xl:mx-8 max-md:mx-4 border border-opacity-20 border-black hover:ease-in-out duration-300 transition-all"
    >
      <figure className="relative h-2/6">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="w-full object-cover"
        />
      </figure>
      <div className="card-body h-4/6">
        <h2 className="card-title py-4 flex flex-col items-start">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p className=" min-h-0 text-justify">{product.description.length > 150 ?
    `${product.description.substring(0, 150)}...` : product.description
  }</p>
        <PriceTag className="border-2 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 py-5 px-4 text-md font-semibold" price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
