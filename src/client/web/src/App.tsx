// Déclare les routes principales (profil, vote, forum, messages).
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ProfileSelf } from './pages/ProfileSelf'
import { ProfilePublic } from './pages/ProfilePublic'
import { VoteDashboard } from './pages/VoteDashboard'
import { ForumHome } from './pages/ForumHome'
import { Messages } from './pages/Messages'

/**
 * Root application router.
 * @returns JSX.Element wrapped in the shared `AppShell`.
 */
export default function App() {
  return (
    <AppShell>
      {/* TODO API: brancher des loaders React Router ici pour hydrater chaque page avant le rendu (session, profil, etc.). */}
      <Routes>
        <Route path="/" element={<Navigate to="/profil" replace />} />
        <Route path="/profil" element={<ProfileSelf />} />
        <Route path="/profil/public" element={<ProfilePublic />} />
        <Route path="/vote" element={<VoteDashboard />} />
        <Route path="/forum" element={<ForumHome />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/profil" replace />} />
      </Routes>
    </AppShell>
  )
}
