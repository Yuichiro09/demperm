// Page profil personnel : édition inline de la bio, des infos et des mandats.
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { InfoField, Membership, profileSelf, Preference, ProfileInfoItem } from '../data/mockData'
import { ProfileHeader } from '../components/composite/ProfileHeader'
import { ProfileBio } from '../components/composite/ProfileBio'
import { PreferencesPanel } from '../components/composite/PreferencesPanel'
import { InfoCard } from '../components/composite/InfoCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'

/**
 * Self profile page with inline editing for bio, personal info, memberships and preferences.
 * @returns JSX.Element for the complete profile editing experience.
 */
export function ProfileSelf() {
  // TODO API: remplacer profileSelf.* par la réponse GET /api/profile/self et hydrater ces états via useEffect + Query.
  const [preferences, setPreferences] = useState<Preference[]>(profileSelf.preferences)
  const [infoItems, setInfoItems] = useState<ProfileInfoItem[]>(profileSelf.info)
  const [memberships, setMemberships] = useState<Membership[]>(profileSelf.memberships)
  const [profile, setProfile] = useState({
    fullName: profileSelf.fullName,
    role: profileSelf.role,
    location: profileSelf.location,
    avatarUrl: profileSelf.avatarUrl,
    bio: profileSelf.bio
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isMembershipModalOpen, setMembershipModalOpen] = useState(false)
  const [newMembership, setNewMembership] = useState({ title: '', start: '', end: '' })

  // Les changements sur les radios/selects “Statut du compte / vote / blocage” sont stockés ici pour être envoyés au backend.
  /**
   * Apply a preference value change to the local state before syncing with the backend.
   * @param id preference identifier (matches backend field)
   * @param value new value selected by the user
   */
  function handlePreferenceChange(id: string, value: string) {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, value } : pref)))
  }

  /**
   * Map changes coming from the InfoCard back to the profile header fields.
   * @param label field label (Prénom, Nom, etc.)
   * @param value user input
   */
  function handleInfoChange(label: InfoField, value: string) {
    const nextInfo = infoItems.map((item) => (item.label === label ? { ...item, value } : item))
    setInfoItems(nextInfo)
    setProfile((prev) => {
      const next = { ...prev }
      if (label === 'Prénom' || label === 'Nom') {
        const firstName = getInfoValue(nextInfo, 'Prénom')
        const lastName = getInfoValue(nextInfo, 'Nom')
        next.fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
      }
      if (label === 'Zone impliquée') {
        next.location = value
      }
      return next
    })
  }

  /**
   * Preview the avatar locally when a file is selected.
   * @param file File selected through the input; `null` clears the preview.
   */
  const handleAvatarChange = useCallback((file: File | null) => {
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setProfile((prev) => ({ ...prev, avatarUrl: previewUrl }))
  }, [])

  /**
   * Update bio text locally before saving.
   * @param event textarea change event
   */
  function handleBioChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    setProfile((prev) => ({ ...prev, bio: value }))
  }

  /**
   * Toggle edit mode which enables inline inputs across the page.
   */
  function toggleEditing() {
    setIsEditing((prev) => !prev)
  }

  /**
   * Add a new membership row to the local state once the modal form is valid.
   */
  function addMembership() {
    if (!newMembership.title.trim() || !newMembership.start.trim()) {
      return
    }
    setMemberships((prev) => [
      ...prev,
      { id: `membership-${Date.now()}`, title: newMembership.title, start: newMembership.start, end: newMembership.end }
    ])
    setNewMembership({ title: '', start: '', end: '' })
  }

  /**
   * Submit handler for the "add membership" modal form.
   * @param event form submission event
   */
  function handleMembershipModalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addMembership()
    setMembershipModalOpen(false)
  }

  /**
   * Reset modal form and display the modal.
   */
  const openMembershipModal = useCallback(() => {
    setNewMembership({ title: '', start: '', end: '' })
    setMembershipModalOpen(true)
  }, [])

  return (
    <div className="space-y-6">
      {/* En-tête : présente les infos principales + gestion du mode édition / avatar */}
      <ProfileHeader
        fullName={profile.fullName}
        role={profile.role}
        location={profile.location}
        avatarUrl={profile.avatarUrl}
        stats={profileSelf.stats /* TODO API: injecter les compteurs abonnés/abonnements renvoyés par le profil. */}
        editable
        onEdit={toggleEditing}
        editLabel={isEditing ? 'Valider les changements' : 'Mettre à jour le profil'}
        onPhotoChange={handleAvatarChange}
        photoEditable={isEditing}
      />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Colonne gauche : mandats historiques accessibles uniquement en lecture + ajout via modal */}
        <div className="space-y-6 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Past memberships</CardTitle>
            </CardHeader>
            <CardContent>
              {memberships.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
                  Ajoutez vos mandats lorsqu’ils seront disponibles.
                </div>
              ) : (
                <table className="w-full text-left text-sm text-muted">
                  <tbody>
                    {memberships.map((membership) => (
                      <tr key={membership.id} className="border-b border-border last:border-0">
                        <td className="py-3 pr-3 text-foreground">{membership.title}</td>
                        <td className="py-3 text-right">
                          <span className="text-xs uppercase tracking-wide text-muted">{membership.start}</span>
                          <span className="ml-1 text-xs text-muted">– {membership.end ?? '-'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {isEditing && (
                <Button type="button" variant="outline" className="mt-4 w-full" onClick={openMembershipModal}>
                  Ajouter un mandat
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Colonne centrale : bio editable et placeholder Posts */}
        <div className="space-y-6 md:col-span-6">
          {/* La bio devient éditable uniquement entre l'ouverture et la validation du mode édition. */}
          <ProfileBio
            bio={profile.bio}
            editable={isEditing}
            placeholder="Décris tes engagements"
            onChange={handleBioChange}
          />

          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
                Aucun post publié pour le moment. Le flux affichera les contributions de l'utilisateur (slider si nécessaire).
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : préférences dynamiques (mode édition) + infos personnelles */}
        <div className="space-y-6 md:col-span-3">
          <PreferencesPanel items={preferences} isEditing={isEditing} onChange={handlePreferenceChange} />
          <InfoCard
            title="Infos"
            items={infoItems}
            isEditing={isEditing}
            onChange={(label, value) => handleInfoChange(label as InfoField, value)}
          />
        </div>
      </div>

      {/* Modal d'ajout de mandat : collecte Intitulé + dates puis met à jour la colonne gauche */}
      <Modal
        title="Ajouter un mandat"
        open={isMembershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setMembershipModalOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" form="membership-form">
              Ajouter
            </Button>
          </div>
        }
      >
        <form id="membership-form" className="space-y-4" onSubmit={handleMembershipModalSubmit}>
          <Input
            label="Intitulé"
            placeholder="Ex : Conseillère départementale"
            value={newMembership.title}
            onChange={(event) => setNewMembership((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date début"
              placeholder="08/2022"
              value={newMembership.start}
              onChange={(event) => setNewMembership((prev) => ({ ...prev, start: event.target.value }))}
              required
            />
            <Input
              label="Date fin"
              placeholder="06/2024"
              value={newMembership.end}
              onChange={(event) => setNewMembership((prev) => ({ ...prev, end: event.target.value }))}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

/**
 * Helper that returns the value of an info item by its label.
 * @param items list of info entries (state)
 * @param label label to look up
 * @returns string value or empty string if missing
 */
function getInfoValue(items: ProfileInfoItem[], label: InfoField) {
  return items.find((item) => item.label === label)?.value ?? ''
}
