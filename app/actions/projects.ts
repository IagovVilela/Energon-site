"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

async function saveFile(file: File | null, folder: string): Promise<string | null> {
    // Check if file is actually a valid uploaded file
    if (!file || file.size === 0 || !file.name || file.name === '') {
        console.log("Arquivo inválido ou não selecionado:", file?.name || 'null');
        return null;
    }

    console.log(`Salvando arquivo: ${file.name} (${file.size} bytes)`);

    try {
        const url = await uploadToCloudinary(file, folder);
        if (url) {
            console.log(`Arquivo salvo com sucesso no Cloudinary: ${url}`);
            return url;
        }
        return null;
    } catch (error) {
        console.error(`Erro ao salvar arquivo ${file.name}:`, error);
        return null;
    }
}

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    const link = formData.get("link") as string;

    console.log("Iniciando criação de projeto:", title);

    // Prioritize uploaded files over URLs
    const imageFile = formData.get("imageFile") as File;
    const videoFile = formData.get("videoFile") as File;
    const galleryFiles = formData.getAll("galleryFiles") as File[];

    console.log(`Arquivos recebidos: capa=${imageFile?.name}, video=${videoFile?.name}, galeria=${galleryFiles.length} fotos`);

    const imageUrlInput = formData.get("imageUrl") as string;
    const videoUrlInput = formData.get("videoUrl") as string;

    const uploadedImageUrl = await saveFile(imageFile, "uploads");
    const uploadedVideoUrl = await saveFile(videoFile, "uploads");

    const imageUrl = uploadedImageUrl || imageUrlInput;
    const videoUrl = uploadedVideoUrl || videoUrlInput;

    const project = await (prisma.project as any).create({
        data: {
            title,
            category,
            description,
            tags,
            link,
            imageUrl,
            videoUrl,
        },
    });

    console.log("Projeto criado no banco, ID:", project.id);

    // Handle Gallery Images
    if (galleryFiles && galleryFiles.length > 0) {
        console.log("Processando galeria...");
        for (const [index, file] of galleryFiles.entries()) {
            const url = await saveFile(file, "uploads");
            if (url) {
                // Use bracket notation to avoid TS errors if client isn't fully updated yet
                // but engine already has the table
                try {
                    await (prisma as any).projectImage.create({
                        data: {
                            url,
                            projectId: project.id,
                        },
                    });
                    console.log(`Imagem ${index + 1} da galeria salva.`);
                } catch (e) {
                    console.error(`Erro ao salvar imagem ${index + 1} da galeria:`, e);
                }
            }
        }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    console.log("Fluxo de criação concluído com sucesso.");
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    const link = formData.get("link") as string;

    const imageFile = formData.get("imageFile") as File;
    const videoFile = formData.get("videoFile") as File;
    const galleryFiles = formData.getAll("galleryFiles") as File[];

    const imageUrlInput = formData.get("imageUrl") as string;
    const videoUrlInput = formData.get("videoUrl") as string;

    const uploadedImageUrl = await saveFile(imageFile, "uploads");
    const uploadedVideoUrl = await saveFile(videoFile, "uploads");

    // Only update URLs if new ones are provided (file or text input)
    const updateData: any = {
        title,
        category,
        description,
        tags,
        link,
    };

    if (uploadedImageUrl || imageUrlInput) {
        updateData.imageUrl = uploadedImageUrl || imageUrlInput;
    }
    if (uploadedVideoUrl || videoUrlInput) {
        updateData.videoUrl = uploadedVideoUrl || videoUrlInput;
    }

    await (prisma.project as any).update({
        where: { id },
        data: updateData,
    });

    // Handle Gallery Images (Append new ones)
    if (galleryFiles && galleryFiles.length > 0) {
        for (const file of galleryFiles) {
            const url = await saveFile(file, "uploads");
            if (url) {
                try {
                    await (prisma as any).projectImage.create({
                        data: {
                            url,
                            projectId: id,
                        },
                    });
                } catch (e) {
                    console.error("Erro ao adicionar imagem à galeria:", e);
                }
            }
        }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
}
