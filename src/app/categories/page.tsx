import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-heading font-bold mb-8 text-center">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <Link href={`/products?category=${category.name}`} key={category.id}>
            <div className="group relative h-64 overflow-hidden rounded-2xl bg-muted border flex items-center justify-center transition-all hover:border-primary hover:shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <h2 className="text-3xl font-heading font-bold text-white z-20 group-hover:scale-110 transition-transform">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
