"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconName = (formData.get("iconName") as string) || "Code";

    await prisma.service.create({
        data: {
            title,
            description,
            iconName,
        },
    });

    revalidatePath("/admin/services");
    revalidatePath("/");
}

export async function deleteService(id: string) {
    await prisma.service.delete({
        where: { id },
    });

    revalidatePath("/admin/services");
    revalidatePath("/");
}

export async function updateSiteConfig(formData: FormData) {
    const heroTitle = formData.get("heroTitle") as string;
    const heroHighlight = formData.get("heroHighlight") as string;
    const heroDescription = formData.get("heroDescription") as string;
    const aboutTitle = formData.get("aboutTitle") as string;
    const aboutDescription = formData.get("aboutDescription") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;

    await prisma.siteConfig.upsert({
        where: { id: "config" },
        update: {
            heroTitle,
            heroHighlight,
            heroDescription,
            aboutTitle,
            aboutDescription,
            email,
            phone,
            location,
        },
        create: {
            id: "config",
            heroTitle,
            heroHighlight,
            heroDescription,
            aboutTitle,
            aboutDescription,
            email,
            phone,
            location,
        },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
}
