"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { updateProject } from "@/app/actions/projects";
import { MultiImageUpload } from "../components/MultiImageUpload";

export default function EditProjectForm({ project }: { project: any }) {
    const [loading, setLoading] = useState(false);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState(project.images || []);
    const router = useRouter();

    console.log("Projeto recebido no form de edição:", project);

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
            await updateProject(project.id, formData);
            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar projeto.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="glass-card p-8 rounded-2xl border border-white/10">
            <div className="mb-6">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                {/* ... fields ... */}
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Título do Projeto</label>
                    <Input name="title" defaultValue={project.title} required className="bg-background/50" />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Categoria</label>
                    <Input name="category" defaultValue={project.category} required className="bg-background/50" />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Descrição Curta</label>
                    <Textarea
                        name="description"
                        defaultValue={project.description}
                        required
                        className="min-h-[100px] bg-background/50"
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Tags (separadas por vírgula)</label>
                    <Input name="tags" defaultValue={project.tags} required className="bg-background/50" />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Alterar Foto (Anexo)</label>
                    <Input name="imageFile" type="file" accept="image/*" className="bg-background/50" />
                    <p className="text-[10px] text-muted-foreground uppercase ml-1">Ou cole uma nova URL</p>
                    <Input name="imageUrl" placeholder="Deixe em branco para manter atual" className="bg-background/50" />
                    {project.imageUrl && (
                        <p className="text-[10px] text-green-500/70 italic">Atual: {project.imageUrl}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Alterar Vídeo (Anexo)</label>
                    <Input name="videoFile" type="file" accept="video/*" className="bg-background/50" />
                    <p className="text-[10px] text-muted-foreground uppercase ml-1">Ou cole uma nova URL</p>
                    <Input name="videoUrl" placeholder="Deixe em branco para manter atual" className="bg-background/50" />
                    {project.videoUrl && (
                        <p className="text-[10px] text-green-500/70 italic">Atual: {project.videoUrl}</p>
                    )}
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                    {/* Existing Gallery Images */}
                    {existingImages && existingImages.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Galeria Atual</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {existingImages.map((img: any) => (
                                    <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border border-green-500/30 group">
                                        <img
                                            src={img.url}
                                            alt="Galeria"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-xs text-white text-center px-2">Já salva</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Gallery Images Upload */}
                    <MultiImageUpload
                        name="galleryFiles"
                        label="Adicionar Mais Fotos à Galeria"
                        onFilesChange={(files) => setGalleryFiles(files)}
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Link do Projeto (Opcional - Site)</label>
                    <Input name="link" defaultValue={project.link || ""} type="url" className="bg-background/50" />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Salvar Alterações
                </Button>
            </form>
        </div>
    );
}
