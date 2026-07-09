import Link from "next/link"
import { ArrowRight, Star, Truck, ShieldCheck, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  })
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/20" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            New Winter Collection Available
          </div>
          
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up animation-delay-100">
            Discover Premium <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Lifestyle Products
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 animate-fade-in-up animation-delay-200">
            Elevate your everyday with our curated selection of high-end electronics, 
            apparel, and accessories designed for the modern individual.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Button size="lg" className="rounded-full w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/products">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/categories">
                View Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Trending Now</h2>
              <p className="text-muted-foreground text-lg">Our most popular items this week.</p>
            </div>
            <Button variant="ghost" className="hidden md:inline-flex mt-4 md:mt-0" asChild>
              <Link href="/products">View all products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
                <Card className="h-full overflow-hidden border-transparent hover:border-border transition-all duration-300 shadow-sm hover:shadow-md bg-secondary/30">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={JSON.parse(product.images)[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">(128)</span>
                    </div>
                    <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${(product.price * (1 + product.discount/100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-8 md:hidden" asChild>
            <Link href="/products">View all products</Link>
          </Button>
        </div>
      </section>

      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Express Shipping</h3>
              <p className="text-muted-foreground">On all orders over $150. Delivered within 2-3 business days.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">We accept all major credit cards. Your data is fully encrypted.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground">Not satisfied? Return it within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
