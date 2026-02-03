import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Code } from "lucide-react";
import Link from "next/link";
import { deleteService } from "@/app/actions/site";

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
                    <p className="text-muted-foreground">Gerencie os serviços que você oferece aos clientes.</p>
                </div>
                <Button className="gap-2" disabled>
                    <Plus className="w-4 h-4" /> (Em breve)
                </Button>
            </div>

            <div className="grid gap-4">
                {services.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
                        Nenhum serviço cadastrado ainda.
                    </div>
                ) : (
                    services.map((service: any) => (
                        <div key={service.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between group hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <form action={async () => {
                                    "use server";
                                    await deleteService(service.id);
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
