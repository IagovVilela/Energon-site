const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = 'iagovventura@gmail.com';
    const passwordRaw = '123456';

    console.log(`Creating Admin User: ${email}`);

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword
        },
        create: {
            email,
            name: 'Iago Vilela',
            password: hashedPassword,
        },
    })

    console.log(`User created with ID: ${user.id}`);
    console.log(`Login: ${email}`);
    console.log(`Password: ${passwordRaw}`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
