import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, Briefcase, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl p-6 hidden md:flex flex-col">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-black">E</div>
                    <span className="font-bold text-lg tracking-wider">Energon OS</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                        <FolderOpen className="w-5 h-5" />
                        Projetos
                    </Link>
                    <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                        Serviços
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" />
                        Configurações
                    </Link>
                </nav>

                <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">{session.user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                        </div>
                    </div>

                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-400 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sair do Sistema
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-background/95 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
