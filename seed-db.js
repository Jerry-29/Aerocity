// Temporary seed script to populate database
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await prisma.bookingItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.offerTicketPrice.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
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
    console.log("✅ Created admin user:", admin.id);

    // Create tickets
    const tickets = await Promise.all([
      prisma.ticket.create({
        data: {
          name: "Adult Pass",
          slug: "adult-pass",
          description: "Full day access for adults",
          customerPrice: "500",
          agentPrice: "400",
          isActive: true,
        },
      }),
      prisma.ticket.create({
        data: {
          name: "Child Pass",
          slug: "child-pass",
          description: "Full day access for children (3-12 years)",
          customerPrice: "300",
          agentPrice: "250",
          heightRequirement: 90,
          isActive: true,
        },
      }),
      prisma.ticket.create({
        data: {
          name: "Family Package",
          slug: "family-package",
          description: "2 adults + 2 children",
          customerPrice: "1200",
          agentPrice: "1000",
          isActive: true,
        },
      }),
      prisma.ticket.create({
        data: {
          name: "Senior Pass",
          slug: "senior-pass",
          description: "Special discounted admission for seniors (60+)",
          customerPrice: "250",
          agentPrice: "200",
          isActive: true,
        },
      }),
    ]);

    console.log("✅ Created 4 tickets");
    tickets.forEach((t) => console.log(`   - ${t.name} (ID: ${t.id})`));

    console.log("\n✨ Database seeded successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("   Admin Mobile: 9000000000");
    console.log("   Admin Password: admin123");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
