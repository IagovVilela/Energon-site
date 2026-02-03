"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Image as ImageIcon, Plus } from "lucide-react";

interface MultiImageUploadProps {
    name: string;
    label: string;
    onFilesChange: (files: File[]) => void;
}

export function MultiImageUpload({ name, label, onFilesChange }: MultiImageUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Arquivos selecionados:", e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));

            const updated = [...selectedFiles, ...newFiles];
            setSelectedFiles(updated);
            onFilesChange(updated.map(f => f.file));
            console.log("Galeria atualizada, total de arquivos:", updated.length);

            // Clear input value to allow selecting same file again
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const removeFile = (index: number) => {
        const updated = selectedFiles.filter((_, i) => i !== index);
        // Revoke URL to avoid memory leaks
        URL.revokeObjectURL(selectedFiles[index].preview);
        setSelectedFiles(updated);
        onFilesChange(updated.map(f => f.file));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium">{label}</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedFiles.map((fileObj, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                        <img
                            src={fileObj.preview}
                            alt="preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="aspect-video rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
                >
                    <Plus className="w-6 h-6" />
                    <span className="text-xs font-medium">Adicionar Foto</span>
                </button>
            </div>

            {/* Native input for maximum compatibility */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                id="gallery-input"
            />
            <p className="text-[10px] text-muted-foreground uppercase">
                Você pode selecionar vários arquivos de uma vez ou ir adicionando um por um.
            </p>
        </div>
    );
}
