/** WhatsApp brand icon (kept identical to the original site for identity) */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.5 3.6A11.8 11.8 0 0 0 1.9 17.8L.2 24l6.4-1.7A11.8 11.8 0 1 0 20.5 3.6Zm-8.7 18.3a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4A9.8 9.8 0 1 1 11.8 22Zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-4-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.3 1.5.2 2.1.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
    </svg>
  );
}
