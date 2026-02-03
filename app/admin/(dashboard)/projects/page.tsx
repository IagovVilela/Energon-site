import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";
import { deleteProject } from "@/app/actions/projects";

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
                    <p className="text-muted-foreground">Gerencie o portfólio exibido na página inicial.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Novo Projeto
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
                        Nenhum projeto cadastrado ainda.
                    </div>
                ) : (
                    projects.map((project: any) => (
                        <div key={project.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between group hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover rounded" />
                                    ) : (
                                        <FolderOpen className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{project.title}</h3>
                                    <p className="text-xs text-muted-foreground">{project.category}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noreferrer">
                                        <Button variant="ghost" size="icon">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </a>
                                )}
                                <Link href={`/admin/projects/${project.id}`}>
                                    <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Missing import added manually in thoughts
import { FolderOpen } from "lucide-react";
