"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, CreditCard, Truck, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const [step, setStep] = React.useState(1)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>
      
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
        
        {[
          { num: 1, label: "Shipping" },
          { num: 2, label: "Payment" },
          { num: 3, label: "Success" }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
              step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Shipping Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" required />
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="w-full mt-4 h-12">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3 mb-6 text-sm text-muted-foreground border">
                      <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                      This is a mock checkout. No real money will be charged. Feel free to use test numbers.
                    </div>
                    
                    <form className="space-y-6" onSubmit={handlePayment}>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" required defaultValue="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required defaultValue="12/25" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required defaultValue="123" />
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" size="lg" className="w-1/3 h-12" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button type="submit" size="lg" className="flex-1 h-12" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Pay $449.98"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-12 w-12 text-success" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Payment Successful!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Thank you for your purchase. Your order #ORD-{Math.floor(Math.random() * 100000)} has been placed and is being processed.
                </p>
                <Button size="lg" className="rounded-full px-8" asChild>
                  <a href="/products">Continue Shopping</a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <Card className="border-none shadow-md sticky top-24 bg-secondary/20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock Items */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-md border flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" alt="Product" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Premium Headphones</p>
                      <p className="text-xs text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                  <span className="font-medium">$299.99</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-md border flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1595225476474-87563907a212" alt="Product" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Mechanical Keyboard</p>
                      <p className="text-xs text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                  <span className="font-medium">$149.99</span>
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>$449.98</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$449.98</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
