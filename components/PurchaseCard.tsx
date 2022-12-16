import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Stripe from "stripe";

type PurchaseCardProps = {
  price: Stripe.Price;
};
const PurchaseCard = (props: PurchaseCardProps) => {
  const { price } = props;

  const router = useRouter()

  return (
    <div onClick={() => router.push(`/${price.id}`)} className="flex flex-col w-60 h-80 shadow-md border border-solid border-gray-100 cursor-pointer transition hover:opacity-60 bg-white">
      {price.product.images && (
          <Image
            src={price.product.images[0]}
            alt={price.product.name}
            width={250}
            height={240}
          />
      )}
      <div className="flex justify-between items-center px-4">
          <h1 className="text-sm text-center py-2 font-light tracking-wide uppercase">{price.product.name}</h1>
          <p className="text-sm font-bold">${price.unit_amount/100}</p>
      </div>
      {/* <button className="flex-1 uppercase text-sm w-full bg-black text-white">Add to cart</button> */}
    </div>
  );
};

export default PurchaseCard;
