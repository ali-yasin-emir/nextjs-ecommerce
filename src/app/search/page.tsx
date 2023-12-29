import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"

interface searchPageProps{
    searchParams: { query: string }
}

        export const generateMetadata = ({searchParams: {query}}: searchPageProps): Metadata => {
            return {
                title: `Search ${query} - Flowmazon`
            }
        }

        const SeachPage = async ({searchParams: {query}}: searchPageProps) => {
                
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive"} },
                    { description: { contains: query, mode: "insensitive"} }
                ]
            },
            orderBy: { id: "desc"}
        })
        
        if (products.length === 0){
            return <div className="h-screen pt-96">
                <h1 className="text-6xl flex text-center leading-snug items-center justify-center whitespace-nowrap">
                    404
                    <br/>NOT FOUND</h1>
            </div>
        }
        // max-sm:items-center
        return (
        <div className="pt-48 pb-24 flex flex-wrap justify-around gap-12">
            {products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
    )
    }

    export default SeachPage