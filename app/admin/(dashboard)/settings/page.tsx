import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { updateSiteConfig } from "@/app/actions/site";

export default async function AdminSettingsPage() {
    const config = await prisma.siteConfig.findUnique({
        where: { id: "config" },
    });

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Configurações Gerais</h1>
                <p className="text-muted-foreground">Personalize os textos principais e as informações de contato do seu site.</p>
            </div>

            <form action={updateSiteConfig} className="space-y-8">
                {/* Seção Hero */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/5 pb-2">Seção Hero (Início)</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Título (Prefixo)</label>
                            <Input name="heroTitle" defaultValue={config?.heroTitle || ""} className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Palavra de Destaque (Neon)</label>
                            <Input name="heroHighlight" defaultValue={config?.heroHighlight || ""} className="bg-background/50" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Descrição Curta</label>
                        <Textarea name="heroDescription" defaultValue={config?.heroDescription || ""} className="bg-background/50 min-h-[80px]" />
                    </div>
                </div>

                {/* Seção Sobre */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/5 pb-2">Seção Sobre</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Título da Seção</label>
                        <Input name="aboutTitle" defaultValue={config?.aboutTitle || ""} className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Texto de Biografia</label>
                        <Textarea name="aboutDescription" defaultValue={config?.aboutDescription || ""} className="bg-background/50 min-h-[120px]" />
                    </div>
                </div>

                {/* Contato */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/5 pb-2">Informações de Contato</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input name="email" defaultValue={config?.email || ""} className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Telefone</label>
                            <Input name="phone" defaultValue={config?.phone || ""} className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Localização</label>
                            <Input name="location" defaultValue={config?.location || ""} className="bg-background/50" />
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 gap-2 text-lg">
                    <Save className="w-5 h-5" /> Salvar Todas as Alterações
                </Button>
            </form>
        </div>
    );
}
