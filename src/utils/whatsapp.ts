const WHATSAPP_NUMBER = "5511973288576";
export function whatsappUrl(message?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
