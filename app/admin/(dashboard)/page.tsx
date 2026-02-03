import { prisma } from "@/lib/prisma";
import { FolderOpen, Briefcase, UserCheck } from "lucide-react";

async function getStats() {
    const projectsCount = await prisma.project.count();
    const servicesCount = await prisma.service.count();
    const adminCount = await prisma.user.count();

    return { projectsCount, servicesCount, adminCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo ao Energon OS. Aqui está o resumo do seu sistema.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Card 1 */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-md">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Total de Projetos</span>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.projectsCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        +0 no último mês
                    </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-md">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Serviços Ativos</span>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.servicesCount}</div>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-md">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Administradores</span>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.adminCount}</div>
                    <p className="text-xs text-muted-foreground mt-1 text-green-500">
                        Sistema Seguro
                    </p>
                </div>
            </div>

            {/* Quick Actions or Recents */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 p-6 rounded-xl bg-card border border-border shadow-md">
                    <h3 className="font-semibold mb-4">Visão Geral</h3>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted rounded-lg">
                        Gráfico de Visitas (Em breve)
                    </div>
                </div>
            </div>
        </div>
    );
}
