"use client";
import { useState } from "react";
import { Button, SectionTitle } from "@/components/ui";
export function ContactForm() {
  const [sent, setSent] = useState(false);
  return <section className="ui-card"><SectionTitle className="text-2xl">Envie sua mensagem</SectionTitle><p id="contact-note" className="mt-3 text-sm leading-relaxed text-muted">Formulário demonstrativo. Nenhum dado é enviado ou armazenado. Use informações fictícias.</p><form aria-describedby="contact-note" className="mt-7 grid gap-5" onSubmit={event => {event.preventDefault();setSent(true);event.currentTarget.reset();}} onChange={() => setSent(false)}>
    <div><label htmlFor="contact-name" className="form-label">Nome</label><input id="contact-name" name="nome" className="ui-input" autoComplete="off" required maxLength={120} /></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="contact-phone" className="form-label">Telefone</label><input id="contact-phone" name="telefone" type="tel" className="ui-input" autoComplete="off" maxLength={30} required /></div><div><label htmlFor="contact-email" className="form-label">E-mail</label><input id="contact-email" name="email" type="email" className="ui-input" autoComplete="off" maxLength={160} required /></div></div>
    <div><label htmlFor="contact-subject" className="form-label">Assunto</label><select id="contact-subject" name="assunto" className="ui-input" defaultValue="" required><option value="" disabled>Selecione um assunto</option>Produtos e catálogo</option><option>Serviços demonstrativos</option><option>Sobre o projeto</option><option>Outros assuntos</option></select></div>
    <div><label htmlFor="contact-message" className="form-label">Mensagem</label><textarea id="contact-message" name="mensagem" rows={5} className="ui-input resize-y" maxLength={2000} required /></div>
    <Button type="submit">Enviar mensagem</Button><p role="status" aria-live="polite" className={sent ? "rounded-xl bg-health-soft p-4 text-sm font-semibold text-health" : "sr-only"}>{sent ? "Mensagem demonstrativa enviada." : ""}</p>
  </form></section>;
}
