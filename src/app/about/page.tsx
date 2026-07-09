import { Store, Shield, Truck } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-heading font-bold tracking-tight">About RoseEcom</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are redefining premium e-commerce by providing the highest quality products with an unparalleled shopping experience.
          </p>
        </div>

        <div className="aspect-video relative rounded-3xl overflow-hidden bg-muted border">
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" 
            alt="Store Interior" 
            width={1000}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-2xl border flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Store className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">Premium Selection</h3>
            <p className="text-muted-foreground">Every product in our catalog is meticulously vetted for quality and design excellence.</p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">Secure Shopping</h3>
            <p className="text-muted-foreground">Your privacy and security are our top priority. We use state-of-the-art encryption.</p>
          </div>

          <div className="bg-card p-8 rounded-2xl border flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">Global Delivery</h3>
            <p className="text-muted-foreground">Fast, reliable, and carbon-neutral shipping to anywhere in the world.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
