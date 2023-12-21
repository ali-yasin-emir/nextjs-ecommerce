import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

const AddProductPage = () => {
  return (
    <div className="flex h-screen justify-center bg-gray-300">
      <div className="max-container flex w-full flex-col">
        <form
          action={addProduct}
          className="my-24 flex flex-col gap-6 rounded-lg border-2  border-red-300 bg-gradient-to-r from-pink-500 to-purple-600 p-12"
        >
          <h1 className="text-2xl font-bold text-white">Add Product Page</h1>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-lg w-full py-4 text-black"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            rows={8}
            cols={12}
            className="textarea textarea-bordered textarea-lg w-full resize-none py-4"
          />
          <input
            required
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            className="input input-bordered input-lg py-4 text-black"
          />
          <input
            required
            min={1}
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-lg py-4 text-black"
          />
          <button type="submit" className="btn btn-primary btn-block text-lg">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProductPage;
