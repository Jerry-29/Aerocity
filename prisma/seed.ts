// prisma/seed.ts - Database seeding script
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import Decimal from "decimal.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.offerTicketPrice.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.attraction.deleteMany();

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const agentPassword = await bcrypt.hash("agent123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      mobile: "9000000000",
      email: "admin@aerocity.com",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const agent1 = await prisma.user.create({
    data: {
      name: "Agent One",
      mobile: "9111111111",
      email: "agent1@aerocity.com",
      passwordHash: agentPassword,
      role: "AGENT",
      status: "ACTIVE",
    },
  });

  const agent2 = await prisma.user.create({
    data: {
      name: "Agent Two",
      mobile: "9222222222",
      email: "agent2@aerocity.com",
      passwordHash: agentPassword,
      role: "AGENT",
      status: "ACTIVE",
    },
  });

  console.log("✅ Created users:", { admin: admin.id, agent1: agent1.id, agent2: agent2.id });

  // Create tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      name: "Adult Pass",
      slug: "adult-pass",
      description: "Full day access for adults",
      customerPrice: new Decimal("500"),
      agentPrice: new Decimal("400"),
      heightRequirement: null,
      isActive: true,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      name: "Child Pass",
      slug: "child-pass",
      description: "Full day access for children (3-12 years)",
      customerPrice: new Decimal("300"),
      agentPrice: new Decimal("250"),
      heightRequirement: 90,
      isActive: true,
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      name: "Family Package",
      slug: "family-package",
      description: "2 adults + 2 children",
      customerPrice: new Decimal("1200"),
      agentPrice: new Decimal("1000"),
      heightRequirement: null,
      isActive: true,
    },
  });

  console.log("✅ Created tickets:", { ticket1: ticket1.id, ticket2: ticket2.id, ticket3: ticket3.id });

  // Create offer
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);

  const offer = await prisma.offer.create({
    data: {
      name: "Weekend Special",
      description: "30% discount on all tickets for this month",
      startDate,
      endDate,
      isActive: true,
      appliesToAllCustomers: true,
      offerPrices: {
        create: [
          {
            ticketId: ticket1.id,
            offerPrice: new Decimal("350"), // 30% discount
          },
          {
            ticketId: ticket2.id,
            offerPrice: new Decimal("210"), // 30% discount
          },
          {
            ticketId: ticket3.id,
            offerPrice: new Decimal("840"), // 30% discount
          },
        ],
      },
    },
  });

  console.log("✅ Created offer:", offer.id);

  // Create testimonials
  await prisma.testimonial.create({
    data: {
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      rating: 5,
      content: "Had an amazing time at Aerocity! Best water park experience ever.",
      visitDate: new Date("2026-02-01"),
      isApproved: true,
      isFeatured: true,
      displayOrder: 1,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "Priya Singh",
      email: "priya@example.com",
      rating: 4,
      content: "Great rides and excellent service. Will definitely come back!",
      visitDate: new Date("2026-02-05"),
      isApproved: true,
      isFeatured: true,
      displayOrder: 2,
    },
  });

  console.log("✅ Created testimonials");

  // Create announcements
  await prisma.announcement.create({
    data: {
      title: "Park Hours Extended",
      content: "Due to high demand, park hours extended until 10 PM during weekends",
      type: "info",
      isActive: true,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "New Ride Launch",
      content: "Exciting new wave pool opening next month!",
      type: "promotion",
      isActive: true,
    },
  });

  console.log("✅ Created announcements");

  // Create attractions
  await prisma.attraction.create({
    data: {
      name: "Thunder Bolt",
      slug: "thunder-bolt",
      description: "Experience the ultimate adrenaline rush with our fastest slide",
      category: "thrill",
      imageUrl: "/images/attractions/thunder-bolt.jpg",
      heightRequirement: 120,
      isActive: true,
      displayOrder: 1,
    },
  });

  await prisma.attraction.create({
    data: {
      name: "Kids Zone",
      slug: "kids-zone",
      description: "Safe and fun water play area for young children",
      category: "kids",
      imageUrl: "/images/attractions/kids-zone.jpg",
      heightRequirement: 0,
      isActive: true,
      displayOrder: 3,
    },
  });

  await prisma.attraction.create({
    data: {
      name: "Wave Pool",
      slug: "wave-pool",
      description: "Enjoy the feeling of surfing with our artificial waves",
      category: "family",
      imageUrl: "/images/attractions/wave-pool.jpg",
      heightRequirement: null,
      isActive: true,
      displayOrder: 2,
    },
  });

  console.log("✅ Created attractions");

  console.log("✨ Database seeding completed successfully!");
  console.log("\n📝 Test Credentials:");
  console.log("  Admin: mobile=9000000000, password=admin123");
  console.log("  Agent: mobile=9111111111 or 9222222222, password=agent123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
