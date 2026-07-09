"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Search, ShoppingBag, Heart, User, Sun, Moon, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">Home</Link>
                <Link href="/products" className="text-lg font-medium">Shop</Link>
                <Link href="/categories" className="text-lg font-medium">Categories</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-heading text-xl"
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            R
          </motion.div>
          <span className="font-heading font-bold text-xl hidden sm:block tracking-tight">
            RoseEcom
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
          <Link href="/products" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/categories" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="w-64 pl-9 rounded-full bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:ring-primary" 
            />
          </div>
          
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative group">
            <Heart className="h-5 w-5 group-hover:fill-current transition-all" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full hidden" />
          </Button>

          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg border-l">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4 mt-4">
                  <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Shopping Cart (2)
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden border shrink-0">
                      <Image width={80} height={80} src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">Premium Wireless Headphones</h4>
                        <p className="text-xs text-muted-foreground mt-1">Electronics</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md h-8 bg-background">
                          <button className="px-2 hover:bg-secondary">-</button>
                          <span className="px-2 text-xs font-medium border-x">1</span>
                          <button className="px-2 hover:bg-secondary">+</button>
                        </div>
                        <span className="font-bold text-sm">$299.99</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden border shrink-0">
                      <Image width={80} height={80} src="https://images.unsplash.com/photo-1595225476474-87563907a212" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">Minimalist Mechanical Keyboard</h4>
                        <p className="text-xs text-muted-foreground mt-1">Electronics</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md h-8 bg-background">
                          <button className="px-2 hover:bg-secondary">-</button>
                          <span className="px-2 text-xs font-medium border-x">1</span>
                          <button className="px-2 hover:bg-secondary">+</button>
                        </div>
                        <span className="font-bold text-sm">$149.99</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-xl">$449.98</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    Shipping, taxes, and discounts calculated at checkout.
                  </p>
                  <Button size="lg" className="w-full h-14 text-lg rounded-xl" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
