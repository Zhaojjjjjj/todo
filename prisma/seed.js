require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.SUPABASE_URL;
const pool = new Pool({
	connectionString,
	ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	const password = "123456"; // 默认密码
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.upsert({
		where: { username: "admin" },
		update: {
			password: hashedPassword,
		},
		create: {
			username: "admin",
			password: hashedPassword,
			name: "管理员",
			avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
		},
	});

	console.log("Seed successful:", user);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
