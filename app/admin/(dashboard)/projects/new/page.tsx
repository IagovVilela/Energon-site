"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProject } from "@/app/actions/projects";
import { MultiImageUpload } from "../components/MultiImageUpload";

export default function NewProjectPage() {
    const [loading, setLoading] = useState(false);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Remove individual file if handled by MultiImageUpload
        formData.delete("galleryFiles");
        // Append all collected gallery files
        galleryFiles.forEach(file => {
            formData.append("galleryFiles", file);
        });

        try {
            await createProject(formData);
            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Erro ao criar projeto.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Novo Projeto</h1>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Título do Projeto</label>
                        <Input name="title" placeholder="Ex: EcoGestor Pro" required className="bg-background/50" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Categoria</label>
                        <Input name="category" placeholder="Ex: Dashboard Administrativo" required className="bg-background/50" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Descrição Curta</label>
                        <Textarea
                            name="description"
                            placeholder="Descreva o projeto de forma impactante..."
                            required
                            className="min-h-[100px] bg-background/50"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Tags (separadas por vírgula)</label>
                        <Input name="tags" placeholder="Ex: React, Node.js, Prisma" required className="bg-background/50" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Anexar Foto (Capa)</label>
                        <Input name="imageFile" type="file" accept="image/*" className="bg-background/50" />
                        <p className="text-[10px] text-muted-foreground uppercase ml-1">Ou cole uma URL abaixo</p>
                        <Input name="imageUrl" placeholder="https://..." className="bg-background/50" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Anexar Vídeo (Opcional)</label>
                        <Input name="videoFile" type="file" accept="video/*" className="bg-background/50" />
                        <p className="text-[10px] text-muted-foreground uppercase ml-1">Ou cole uma URL abaixo</p>
                        <Input name="videoUrl" placeholder="https://..." className="bg-background/50" />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <MultiImageUpload
                            name="galleryFiles"
                            label="Galeria de Processo (Múltiplas fotos)"
                            onFilesChange={(files) => setGalleryFiles(files)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Link do Projeto (Opcional - Site)</label>
                        <Input name="link" placeholder="https://..." type="url" className="bg-background/50" />
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Salvar Projeto
                    </Button>
                </form>
            </div>
        </div>
    );
}
