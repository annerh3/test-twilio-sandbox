"use client";

import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
import { sendTwilioMessage } from "./actions";

export default function TextSender() {
  // const { user, loading } = useAuth();
  // const router = useRouter();
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // if (!loading && !user) {
  //   router.push("/");
  //   return null;
  // }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
    
    const response = await sendTwilioMessage(formData);
    
    if (response.success) {
      setStatus({ type: "success", message: `¡Mensaje enviado con éxito! (SID: ${response.sid})` });
    } else {
      setStatus({ type: "error", message: response.error || "Ocurrió un error al enviar." });
    }
    
    setIsSubmitting(false);
  }

  // if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Enviar WhatsApp</h2>
          <p className="text-sm text-zinc-500">Envía un mensaje de texto a través de Twilio.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="to" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Número de destino
            </label>
            <input
              type="tel"
              id="to"
              name="to"
              placeholder="99349695"
              required
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje aquí..."
              required
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {status.type && (
            <div className={`p-3 rounded-md text-sm ${status.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}
