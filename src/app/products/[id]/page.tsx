import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Truck, Shield, RotateCcw, Heart, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  const images = JSON.parse(product.images) as string[]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border">
            <Image
              src={images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <div key={i} className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer ${i === 0 ? 'border-primary' : 'border-transparent'}`}>
                  <Image src={img} alt={`Thumbnail ${i+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 text-sm text-primary font-medium">{product.category?.name}</div>
          <h1 className="text-4xl font-heading font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground underline cursor-pointer">
              128 Reviews
            </span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through mb-1">
                  ${(product.price * (1 + product.discount/100)).toFixed(2)}
                </span>
                <span className="bg-destructive/10 text-destructive text-sm font-bold px-2 py-1 rounded-md mb-1">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border rounded-lg overflow-hidden h-14 bg-background">
              <Button variant="ghost" size="icon" className="h-full px-4 rounded-none hover:bg-secondary">
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium">1</div>
              <Button variant="ghost" size="icon" className="h-full px-4 rounded-none hover:bg-secondary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1 h-14 text-lg rounded-lg">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-lg">
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary/30 p-6 rounded-2xl">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs text-muted-foreground">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Return Delivery</p>
                <p className="text-xs text-muted-foreground">Free 30 Days Delivery Returns.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">1 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Included with all purchases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
