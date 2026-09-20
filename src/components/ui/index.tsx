import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "whatsapp";
export function buttonStyles(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `ui-button ui-button--${variant} ${className}`;
}
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, className)}
      {...props}
    />
  );
}
export function Card({ className = "", ...props }: ComponentProps<"article">) {
  return <article className={`ui-card ${className}`} {...props} />;
}
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`ui-container ${className}`} {...props} />;
}
export function SearchField({
  className = "",
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return <input type="search" className={`ui-input ${className}`} {...props} />;
}
export function SectionTitle({
  as: Tag = "h2",
  className = "",
  ...props
}: ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return <Tag className={`ui-section-title ${className}`} {...props} />;
}
const badgeLabels = {
  free: "Venda livre",
  prescription: "Exige receita",
  retained: "Receita retida",
  offer: "Oferta",
};
export function Badge({
  variant,
  className = "",
  children,
  ...props
}: ComponentProps<"span"> & { variant: keyof typeof badgeLabels }) {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`} {...props}>
      {children ?? badgeLabels[variant]}
    </span>
  );
}
