// EmptyState : placeholder pour listes et feeds vides.
/**
 * Affiche un état vide standardisé (titre + description + action).
 * @param title titre affiché
 * @param description texte optionnel
 * @param action action optionnelle (bouton, lien…)
 */
export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-background-soft px-6 py-10 text-center">
      <p className="text-base font-semibold text-foreground">{title}</p>
      {description && <p className="max-w-md text-sm text-muted">{description}</p>}
      {action}
    </div>
  )
}
