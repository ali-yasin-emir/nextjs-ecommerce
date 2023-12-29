import FormSubmitButton from "@/components/FormSubmitButton";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions)
  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  
  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  for (let i = 0; i <= 50; i++) { // Create 50 products
    await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
      },
    });
  }


  redirect("/");
} 

const AddProductPage = async () => {

  const session = await getServerSession(authOptions)

    if(!session){
      redirect("/api/auth/signin?callbackUrl=/add-product")
    }

  return (
    <div className="max-sm:mb-36 max-sm:px-12 px-12 flex max-sm:pt-48 h-screen justify-center pt-32">
      <div className="max-container flex w-full flex-col">
        <form
          action={addProduct}
          className="flex flex-col max-sm:h-[640px] gap-6 rounded-lg bg-gradient-to-r from-emerald-700 to-blue-400 p-12"
        >
          <h1 className="text-2xl text-center font-bold text-emerald-300">Add Product Page</h1>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-lg w-full py-4 bg-slate-600 text-lime-400"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            rows={8}
            cols={8}
            className="textarea textarea-bordered textarea-md text-[16px] max-sm:rounded-3xl w-full resize-none py-4  bg-slate-600 text-lime-400"
          />
          <input
            required
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            className="input input-bordered input-lg py-4 bg-slate-600 text-lime-400"
          />
          <input
            required
            min={1}
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-lg py-4 bg-slate-600 text-lime-400"
          />
          <FormSubmitButton          
            className="btn-block"
          >
            Add Product
          </FormSubmitButton>
        </form>
      </div>
    </div>
  );
};
export default AddProductPage;
