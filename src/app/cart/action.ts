"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const setProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);
    
  if(quantity === 0){
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: { id: articleInCart.id },
      });
    } 
  } else {
    if(articleInCart){
      await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity: quantity },
      });
    } else{
      // its almost same with function in
      // products > [id] > actions.ts but quantity is different
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId, // it can be also productId, its same thing
          quantity,
        }
      })
    }
  }

  revalidatePath("/cart");

 }
