# UI/UX – Guide d’implémentation (Sprint 1)

## Contexte & périmètre

* **Tech Lead** : Kahel
* **Mock API** : Kylian, Quentin
* **Auth (OAuth Google)** : Abel, Chloé
* **Designer UI/UX** : Thomas (ce README = cahier des charges pour l’UI)
* **QA/Test** : Tim, Alexis
* **Doc** : ODE.int?

Ton rôle se concentre **uniquement sur la partie UI/UX** : création et intégration des composants visuels (sans logique métier ni connexion API). Les autres développeurs intégreront tes composants plus tard.

---

## Objectif du sprint

Créer la base du **design system** et les **interfaces principales** (Profil, Vote, Forum, Messagerie) à partir des maquettes fournies. Les composants doivent être réutilisables, épurés, et compatibles Tailwind.

---

## Stack utilisée

* **React + TypeScript + Vite**
* **Tailwind CSS** (aucun CSS externe)
* **React Router** (juste pour naviguer entre les écrans)
* **Lucide-react** (icônes, optionnel)

---

## Structure du projet (UI uniquement)

```
src/
  components/
    ui/                   # Composants atomiques réutilisables
      Button.tsx
      Input.tsx
      Avatar.tsx
      Card.tsx
      Tabs.tsx
      Modal.tsx
      Toast.tsx
      EmptyState.tsx
      Skeleton.tsx

    composite/            # Composants plus complexes (mélange d'atomes)
      ProfileHeader.tsx
      ProfileBio.tsx
      PreferencesPanel.tsx
      InfoCard.tsx
      VoteCard.tsx
      MessageBubble.tsx
      SidebarList.tsx

  pages/                  # Pages de test UI (mockées)
    ProfileSelf.tsx
    ProfilePublic.tsx
    VoteDashboard.tsx
    ForumHome.tsx
    Messages.tsx
```

Aucune logique d’authentification, de backend ou de state management n’est à intégrer. Chaque page peut simplement contenir des données fictives pour visualiser le rendu des composants.

---

## Design system

### Couleurs

* `--bg: #ffffff`, `--bg-soft: #f7f7f8`
* `--fg: #0f172a`, `--muted: #64748b`
* `--primary: #22d3ee` (bleu cyan)
* `--border: #e5e7eb`
* `--danger: #ef4444`, `--warning: #f59e0b`, `--success: #10b981`

### Style général

* Rayon des coins : `16px`
* Ombres : `shadow-sm`, `shadow-md`
* Espacements : 8/12/16/24/32
* Focus visible, contrastes AA

---

## Pages à concevoir

### 1. Profil

Deux versions :

* **Profil personnel (éditable)** : permet la modification du nom, prénom, bio, photo, et préférences.
* **Profil public (lecture seule)** : affiche uniquement les infos visibles selon les préférences.

Composants à utiliser :

* `ProfileHeader`
* `ProfileBio`
* `PreferencesPanel`
* `InfoCard`

### 2. Vote

Page en trois colonnes :

* **Gauche** : liste des élections
* **Centre** : graphiques placeholders
* **Droite** : récapitulatif de mes voix

Composants : `VoteCard`, `Card`, `Tabs`, `EmptyState`

### 3. Forum

(anciennement “Social”)

* Barre de recherche
* Liste de forums à gauche
* Liste de posts au centre

Composants : `Card`, `SidebarList`, `EmptyState`

### 4. Messagerie

* Liste des conversations à gauche
* Messages (bulles) à droite
* Différence visuelle entre mes messages (cyan) et les autres (gris)

Composants : `MessageBubble`, `SidebarList`, `Input`

---

## Composants essentiels

### Exemple : `Card.tsx`

```tsx
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-[var(--border)] bg-white shadow-sm ${className}`} {...props} />
}
```

### Exemple : `ProfileHeader.tsx`

```tsx
export function ProfileHeader({ avatarUrl, fullName, editable }: {
  avatarUrl?: string
  fullName: string
  editable?: boolean
}) {
  return (
    <div className="flex items-center gap-4">
      <img src={avatarUrl} className="w-16 h-16 rounded-full border border-[var(--border)]" />
      <h2 className="text-lg font-semibold">{fullName}</h2>
    </div>
  )
}
```

---

## Livrables pour vendredi

* [ ] Tous les composants du design system (`ui/`)
* [ ] Composants composites pour chaque page (`composite/`)
* [ ] Maquettes intégrées : Profil, Vote, Forum, Messagerie
* [ ] Pages fonctionnant avec des données statiques (mock)
* [ ] Documentation rapide d’utilisation (README par page)

---

## Règles de contribution

* 1 composant = 1 fichier
* Code propre, lisible, commenté si besoin
* Tailwind uniquement (pas de CSS custom)
* Utiliser les noms et textes exacts des maquettes

---

## Notes supplémentaires

* Tu n’as **pas besoin d’ajouter de logique backend**.
* Les développeurs Mock & Auth se chargeront des connexions.
* Conserve les placeholders (textes, lorem, stats, etc.) visibles sur les maquettes.
* “Social” devient **Forum** dans le code et les routes.
* Les couleurs et styles doivent rester fidèles aux visuels d’origine.
