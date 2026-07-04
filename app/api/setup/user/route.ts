import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (process.env.NODE_ENV === "production") {
        const setupSecret = process.env.SETUP_SECRET;
        const providedSecret = new URL(request.url).searchParams.get("secret");

        if (!setupSecret || providedSecret !== setupSecret) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
    }

    try {
        const email = 'iagovventura@gmail.com'; // Admin Email
        const password = process.env.ADMIN_PASSWORD || 'admin123';

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
