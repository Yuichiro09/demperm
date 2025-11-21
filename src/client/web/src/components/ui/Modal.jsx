// Modal léger : overlay + header/footers optionnels.
import CloseIcon from '@mui/icons-material/Close'

/**
 * Fenêtre modale simple avec header, contenu libre et footer optionnel.
 * @param title titre du header
 * @param open booléen d'affichage
 * @param onClose callback fermeture
 * @param children contenu du corps
 * @param footer footer optionnel
 */
export function Modal({ title, open, onClose, children, footer }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-white shadow-lg">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {onClose && (
            <button onClick={onClose} className="rounded-full p-1 text-muted hover:bg-background-soft" aria-label="Fermer">
              <CloseIcon fontSize="small" />
            </button>
          )}
        </header>
        <div className="px-6 py-4 text-sm text-foreground">{children}</div>
        {footer && <div className="border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}
