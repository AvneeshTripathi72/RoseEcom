import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@roseecom.com' },
    update: {},
    create: {
      email: 'admin@roseecom.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@roseecom.com' },
    update: {},
    create: {
      email: 'user@roseecom.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
    },
  })

  console.log('Users created:', { admin: admin.email, user: user.email })

  const catElectronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Gadgets and gear',
    },
  })

  const catApparel = await prisma.category.upsert({
    where: { name: 'Apparel' },
    update: {},
    create: {
      name: 'Apparel',
      description: 'Clothing and accessories',
    },
  })

  const p1 = await prisma.product.create({
    data: {
      name: 'Premium Wireless Headphones',
      description: 'High-fidelity audio with active noise cancellation.',
      price: 299.99,
      discount: 0,
      stock: 50,
      images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e']),
      categoryId: catElectronics.id,
    },
  })

  const p2 = await prisma.product.create({
    data: {
      name: 'Minimalist Mechanical Keyboard',
      description: 'Tactile switches with a clean, low-profile design.',
      price: 149.99,
      discount: 10,
      stock: 25,
      images: JSON.stringify(['https://images.unsplash.com/photo-1595225476474-87563907a212']),
      categoryId: catElectronics.id,
    },
  })

  const p3 = await prisma.product.create({
    data: {
      name: 'Urban Explorer Backpack',
      description: 'Weather-resistant and designed for the modern commuter.',
      price: 89.99,
      discount: 0,
      stock: 100,
      images: JSON.stringify(['https://images.unsplash.com/photo-1553062407-98eeb64c6a62']),
      categoryId: catApparel.id,
    },
  })

  console.log('Products created:', [p1.name, p2.name, p3.name])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
