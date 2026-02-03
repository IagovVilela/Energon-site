import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({
    params
}: {
    params: { id: string }
}) {
    const project = await prisma.project.findUnique({
        where: { id: params.id },
        include: { images: true }
    });


    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
            <EditProjectForm project={project} />
        </div>
    );
}
