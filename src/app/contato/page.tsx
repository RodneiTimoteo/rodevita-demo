import type { Metadata } from "next";
import { Container, SectionTitle } from "@/components/ui";
import {
  InstitutionalHero,
  InstitutionalIcon,
  WhatsAppCta,
} from "@/components/institutional/shared";
import { ContactForm } from "@/components/institutional/contact-form";
export const metadata: Metadata = {
  title: "Contato | RodeVita Drogaria & Bem-estar",
  description:
    "Explore os canais fictícios de contato da RodeVita e seu formulário demonstrativo. Nenhuma mensagem ou dado é enviado pelo formulário.",
};
export default function ContactPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Fale conosco"
        title="Estamos por perto."
        description="Entre em contato pelos canais demonstrativos da RodeVita."
      />
      <Container className="py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <section>
            <p className="eyebrow">Canais de contato</p>
            <SectionTitle className="text-2xl">
              Uma conversa faz a diferença.
            </SectionTitle>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["WhatsApp", "(00) 99999-9999"],
                ["Telefone", "(00) 3333-3333"],
                ["E-mail", "contato@rodevita.demo"],
              ].map(([label, value]) => (
                <div className="border-b border-border pb-5" key={label}>
                  <dt className="text-sm font-semibold text-brand">{label}</dt>
                  <dd className="mt-2 break-words text-muted">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <h2 className="font-semibold text-brand">Endereço fictício</h2>
              <address className="mt-2 not-italic leading-relaxed text-muted">
                Av. Central, 123
                <br />
                Centro
                <br />
                Cidade Demonstrativa - PE
              </address>
            </div>
            <div className="mt-7">
              <h2 className="font-semibold text-brand">Horário</h2>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
                <dt>Segunda a sábado</dt>
                <dd>08h às 20h</dd>
                <dt>Domingo</dt>
                <dd>08h às 13h</dd>
              </dl>
            </div>
            <p className="mt-7 rounded-xl bg-warning-soft p-4 text-xs text-warning">
              Dados fictícios para fins de demonstração.
            </p>
          </section>
          <ContactForm />
        </div>
        <section className="my-14" aria-labelledby="location-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Um lugar no nosso conceito</p>
              <SectionTitle id="location-title" className="text-2xl">
                Nossa localização
              </SectionTitle>
            </div>
            <p className="text-xs text-muted">
              Ilustração conceitual · Não representa um endereço real
            </p>
          </div>
          <div className="concept-map">
            <div aria-hidden="true" className="map-roads" />
            <div className="relative mx-auto max-w-sm rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
              <span className="mx-auto mb-4 flex w-fit text-health">
                <InstitutionalIcon kind="heart" />
              </span>
              <h3 className="font-bold text-brand">RodeVita</h3>
              <p className="mt-2 text-sm text-muted">
                Av. Central, 123 · Centro
              </p>
              <p className="mt-1 text-xs text-muted">
                Cidade Demonstrativa - PE
              </p>
              <span className="mt-4 inline-block rounded-full bg-health-soft px-3 py-1 text-xs text-health">
                Localização fictícia
              </span>
            </div>
          </div>
        </section>
        <WhatsAppCta
          title="Prefere atendimento rápido?"
          text="Explore a experiência de contato pelo canal de WhatsApp já integrado ao projeto."
        />
      </Container>
    </main>
  );
}
