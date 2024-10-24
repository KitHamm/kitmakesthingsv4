import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Role } from "@prisma/client";
import { hash } from "bcrypt";

async function main() {
    const oldInvoiceItems = await prisma.invoiceItem.findMany();

    // for (let i = 0; i < oldInvoiceItems.length; i++) {
    //     await prisma.invoiceItem.update({
    //         where: {
    //             id: oldInvoiceItems[i].id,
    //         },
    //         data: {
    //             invoiceReference: oldInvoiceItems[i].invocieReference,
    //         },
    //     });
    // }

    // const hashedPassword = await hash("n7nNWFTkoejrs:Q3Phf", 12);
    // await prisma.user.upsert({
    //     where: {
    //         email: "kitmakesthings@gmail.com",
    //     },
    //     update: {},
    //     create: {
    //         email: "kitmakesthings@gmail.com",
    //         firstName: "Kit",
    //         lastName: "Hamm",
    //         password: hashedPassword,
    //         role: Role.ADMIN,
    //     },
    // });
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
