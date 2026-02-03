"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validation
    if (!name || !email || !subject || !message) {
        return { success: false, error: "Todos os campos são obrigatórios." };
    }

    if (!email.includes("@")) {
        return { success: false, error: "Email inválido." };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Energon Site <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'iagovventura@gmail.com',
            subject: `[Energon Site] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
                        Nova Mensagem de Contato
                    </h2>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>Nome:</strong> ${name}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Assunto:</strong> ${subject}</p>
                    </div>

                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #8B5CF6; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Mensagem:</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
                    
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        Enviado automaticamente pelo formulário de contato do site Energon
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("Erro ao enviar email:", error);
            return { success: false, error: "Erro ao enviar email. Tente novamente." };
        }

        console.log("Email enviado com sucesso:", data);
        return { success: true };
    } catch (error) {
        console.error("Erro ao processar envio:", error);
        return { success: false, error: "Erro interno. Tente novamente mais tarde." };
    }
}
