# Demperm – Client Web UI

Prototype React + Tailwind pour livrer les 4 écrans demandés (Profil, Vote, Forum, Messagerie) selon le cahier des charges du dossier `docs/client/web/README.md`. L'application se concentre uniquement sur l'UI : pas de logique métier ni d'appels réseau, uniquement des données statiques stockées dans `src/data/mockData.ts` afin d'illustrer la structure attendue côté backend.

## Démarrage

```bash
cd src/client/web
npm install
npm run dev   # http://localhost:5173
```

> `npm run build` déclenche `tsc` puis `vite build`. Aucun paquet global requis.

## Structure

```
src/
  components/
    ui/          # Atomes Tailwind (Button, Input, Card, Tabs, Modal, Toast, EmptyState, Skeleton, Avatar)
    composite/   # Organismes alignés sur les maquettes (ProfileHeader, ProfileBio, SidebarList, etc.)
    layout/      # AppShell + navigation
  data/mockData.ts   # Types + mocks servant de contrat avec le futur backend
  pages/             # ProfileSelf, ProfilePublic, VoteDashboard, ForumHome, Messages
  App.tsx / main.tsx # Routing (React Router)
```

Chaque composant composite expose des props décrivant les besoins data du backend. Exemple :

```ts
export interface ProfileHeaderProps {
  fullName: string
  role: string
  location: string
  avatarUrl?: string
  stats?: { label: string; value: string }[]
  editable?: boolean
}
```

Ces interfaces peuvent être directement alimentées par les appels API ultérieurs.

## Pages livrées

- **Profil (self)** : formulaire statique pour photo, bio éditable, préférences et infos personnelles. Les anciennes fonctions (“Past memberships”) utilisent un tableau simple (`Membership`).
- **Profil public** : mêmes blocs en lecture seule, avec carte “Réseau” pour les compteurs abonnés/abonnements.
- **Vote** : grille en trois colonnes (liste des élections, graphiques placeholders, récapitulatif des voix). `Tabs` permet de simuler les différents focus municipale/départementale.
- **Forum** : champ de recherche, navigation latérale, carte “Mes communautés” + tendances, feed de posts mockés.
- **Messagerie** : liste de conversations à gauche, bulles différenciées (cyan pour moi) à droite, champ de saisie prêt pour le branchement futur.

Les textes, sections et intitulés reprennent fidèlement les maquettes fournies. Les placeholders “photo”, “graphique”, etc. gardent la logique noir/blanc du wireframe IOS.

## Design system

- **Couleurs** : variables CSS définies dans `src/index.css` conformément au guide (`--primary: #22d3ee`, `--border: #e5e7eb`, etc.).
- **Rayons** : `rounded-2xl (16px)` partout.
- **Ombres** : `shadow-sm` ou `shadow-lg` selon les blocs.
- **Icônes** : support Lucide (`Modal` expose déjà un bouton `X`).

## Prochaines étapes (backend / logique)

1. **Hydratation via API** : remplacer les mocks par des hooks (ex. `useProfileSelfQuery`) qui injecteront les objets attendus par les composants composites.
2. **Actions** : brancher les boutons (upload photo, mettre à jour préférences, envoyer un message) vers les mutations backend. Les composants gèrent déjà les handlers (`onEdit`, `onAction`, `onSelect`).
3. **État / navigation** : brancher un store (TanStack Query, Zustand…) si nécessaire pour partager l’identité de l’utilisateur entre les pages.
