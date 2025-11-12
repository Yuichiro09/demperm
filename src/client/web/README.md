# Demperm – Client Web UI

Prototype React + Tailwind pour livrer les 4 écrans demandés (Profil, Vote, Forum, Messagerie) selon le cahier des charges du dossier `docs/client/web/README.md`. L'application se concentre uniquement sur l'UI : pas de logique métier ni d'appels réseau, uniquement des données statiques stockées dans `src/data/mockData.ts` afin d'illustrer la structure attendue côté backend.

## Démarrage

```bash
cd src/client/web
npm install
npm run dev   # http://localhost:5173
```

> `npm run build` déclenche `tsc` puis `vite build`. Aucun paquet global requis.

## Structure guidée

Du général vers le spécifique :

1. **`main.tsx`** – point d’entrée React. Monte `App` dans `#root` et place le router.
2. **`App.tsx`** – déclare les routes (profil perso/public, vote, forum, messagerie) et enveloppe le tout dans l’`AppShell`.
3. **`components/layout/AppShell.tsx`** – layout commun : header “Demperm”, navigation principale.
4. **`pages/`**
   - `ProfileSelf.tsx` – profil personnel entièrement éditable (bio, mandats, préférences, infos, messagerie). Gère la modale “Ajouter un mandat”.
   - `ProfilePublic.tsx` – même présentation en lecture seule (public : mandats, bio, posts placeholder, infos limitées à prénom/nom/pseudo).
   - `VoteDashboard.tsx` – tableau de bord (liste d’élections, colonnes de graphiques mockés, résumé de voix).
   - `ForumHome.tsx` – barre de recherche, listes de communautés, flux de posts.
   - `Messages.tsx` – liste de conversations à gauche, bulles (cyan/mine) et champ “Envoyer”.
5. **`components/composite/`** – organismes utilisés par les pages :
   - `ProfileHeader` (avatar + stats + CTA), `ProfileBio`, `PreferencesPanel`, `InfoCard`, `SidebarList`, `VoteCard`, `MessageBubble`.
6. **`components/ui/`** – atomes Tailwind mutualisés : `Button`, `Input`, `Card`, `Avatar`, `Tabs`, `Modal`, `Toast`, `EmptyState`, `Skeleton`.
7. **`data/mockData.ts`** – contrats TypeScript (`Membership`, `Preference`, `Message`, etc.) + valeurs fictives partagées.

Chaque fichier TSX commence par un commentaire descriptif pour rappeler son rôle. Les composites exposent des props simples qui pourront être reliées aux API (ex. `ProfileHeaderProps` pour hydrater l’entête).

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
