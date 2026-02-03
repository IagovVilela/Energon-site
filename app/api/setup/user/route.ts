import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const email = 'iagovventura@gmail.com'; // Admin Email
        const password = 'admin'; // Default Password

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword // Reset password if exists
            },
            create: {
                email,
                name: 'Admin',
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            message: "Admin user created/updated successfully",
            email: user.email,
            password: password
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user", details: String(error) }, { status: 500 });
    }
}
