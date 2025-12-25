const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@luminapack.com';
    const password = 'password123';
    const name = 'Admin User';

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        console.log(`✅ Default user created: ${email} / ${password}`);
    } else {
        console.log('ℹ️ Default user already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
