import Link from "next/link"
import { Star, SlidersHorizontal, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">All Products</h1>
          <p className="text-muted-foreground mt-1">Showing {products.length} results</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="md:hidden w-full flex justify-between">
            Filters <SlidersHorizontal className="ml-2 h-4 w-4" />
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <Button variant="outline" className="min-w-[140px] justify-between">
              Newest <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="space-y-8 sticky top-24">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Categories</h3>
              <div className="space-y-3">
                {['All', 'Electronics', 'Apparel', 'Accessories', 'Home'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" defaultChecked={cat === 'All'} />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
              <div className="space-y-4">
                <input type="range" min="0" max="1000" className="w-full accent-primary" />
                <div className="flex items-center justify-between text-sm">
                  <Input type="number" defaultValue={0} className="w-20 h-8" />
                  <span className="text-muted-foreground">to</span>
                  <Input type="number" defaultValue={1000} className="w-20 h-8" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col h-full">
                  <Card className="flex-1 overflow-hidden border-transparent hover:border-border transition-all duration-300 shadow-sm hover:shadow-md bg-secondary/30">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <Image
                        src={JSON.parse(product.images)[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-auto">
                      <div>
                        <div className="flex items-center gap-1 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-base sm:text-lg">${product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">
                            ${(product.price * (1 + product.discount/100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
