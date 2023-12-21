
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product - Flowmazon"
};

const AddProductPage = () => {
  return (
<div className="bg-gray-300 h-screen flex justify-center">
    <div className="w-full max-container flex flex-col">
      <form className="flex flex-col border-2 bg-gradient-to-r from-pink-500 to-purple-600  my-24 p-12 border-red-300 gap-6 rounded-lg">
      <h1 className="text-2xl font-bold text-white">Add Product Page</h1>
      <input required type="text" placeholder="Name" className="text-black py-4 input input-lg input-bordered w-full"  />
      <textarea required name="description" placeholder="Description" rows={8} cols={12} className="py-4 w-full textarea textarea-lg textarea-bordered resize-none"/>
      <input required type="url" placeholder="Image URL" className="text-black py-4 input input-bordered input-lg"/>
      <input required min={1} type="number" placeholder='Price' className="text-black py-4 input input-bordered input-lg"/>
      <button type="submit" className="text-lg btn btn-primary btn-block">Add Product</button>
      </form>
      </div>
    </div>
  )
}
export default AddProductPage

