"use server";

import twilio from "twilio";

export async function sendTwilioMessage(formData: FormData) {
  const to = formData.get("to") as string;
  const body = formData.get("message") as string;

  if (!to || !body) {
    return { success: false, error: "Faltan datos requeridos (número o mensaje)." };
  }

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;
  

  if (!accountSid || !authToken || !twilioNumber) {
    return { 
      success: false, 
      error: "Faltan credenciales de Twilio. Verifica tus variables de entorno (.env)." 
    };
  }

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body,
      to: `whatsapp:+504${to}`,
      from: `whatsapp:${twilioNumber}`,
    });
    return { success: true, sid: message.sid };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
