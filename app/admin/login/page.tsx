"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Terminal, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Credenciais inválidas. Tente novamente.");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-8 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4 p-3 border border-primary/30">
                            <Terminal className="w-full h-full" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Energon OS</h1>
                        <p className="text-muted-foreground text-sm">Acesso Restrito ao Sistema</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@energon.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background/50 border-white/10"
                            />
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block ml-1">Senha</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-background/50 border-white/10"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                                {error}
                            </p>
                        )}

                        <Button className="w-full h-11 text-base relative group overflow-hidden" type="submit">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                ACESSAR SISTEMA <Lock className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Button>
                    </form>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8 opacity-50">
                    &copy; 2024 Energon Tecnologia. Todos os direitos reservados.
                </p>
            </motion.div>
        </div>
    );
}
