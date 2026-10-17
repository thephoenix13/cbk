import { supabase, supabaseConfigured } from "@/lib/supabase";

export interface Enquiry {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  website: string; // honeypot: real visitors leave this empty
}

// Sends the enquiry through the `send-enquiry` edge function.
// Returns "sent", or "fallback" when the function is unavailable so the page can offer a mail link.
export async function sendEnquiry(e: Enquiry): Promise<"sent" | "fallback"> {
  if (!supabaseConfigured) return "fallback";
  const { error } = await supabase.functions.invoke("send-enquiry", { body: e });
  return error ? "fallback" : "sent";
}

export function enquiryMailto(to: string, e: Enquiry): string {
  const body = [
    `Name: ${e.name}`,
    `Company: ${e.company}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email}`,
    `Service: ${e.service}`,
    "",
    e.message,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
}
