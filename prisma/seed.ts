import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Role } from "@prisma/client";
import { hash } from "bcrypt";

async function main() {
    const hashedPassword = await hash("Missy.2022", 12);
    await prisma.user.upsert({
        where: {
            email: "kitmakesthings@gmail.com",
        },
        update: {},
        create: {
            email: "kitmakesthings@gmail.com",
            firstName: "Kit",
            lastName: "Hamm",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
