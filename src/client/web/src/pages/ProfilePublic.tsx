// Page profil public : présente les infos visibles par tous sans actions.
import { profilePublic } from '../data/mockData'
import { ProfileHeader } from '../components/composite/ProfileHeader'
import { ProfileBio } from '../components/composite/ProfileBio'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { InfoCard } from '../components/composite/InfoCard'

export function ProfilePublic() {
  const publicInfo = profilePublic.info.filter((item) => ['Prénom', 'Nom', 'Pseudo'].includes(item.label))

  return (
    <div className="space-y-6">
      {/* En-tête public : mêmes composants que le profil personnel mais sans actions */}
      <ProfileHeader
        fullName={profilePublic.fullName}
        role={profilePublic.role}
        location={profilePublic.location}
        avatarUrl={profilePublic.avatarUrl}
        stats={profilePublic.stats}
      />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Colonne gauche : mandats visibles par tous */}
        <div className="space-y-6 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Past memberships</CardTitle>
            </CardHeader>
            <CardContent>
              {profilePublic.memberships.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
                  Ajoutez vos mandats lorsqu’ils seront disponibles.
                </div>
              ) : (
                <table className="w-full text-left text-sm text-muted">
                  <tbody>
                    {profilePublic.memberships.map((membership) => (
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
            </CardContent>
          </Card>
        </div>

        {/* Colonne centrale : Bio + futurs posts publics */}
        <div className="space-y-6 md:col-span-6">
          <ProfileBio bio={profilePublic.bio} />

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

        {/* Colonne droite : infos publiques essentielles (prénom, nom, pseudo) */}
        <div className="space-y-6 md:col-span-3">
          <InfoCard title="Infos publiques" items={publicInfo} />
        </div>
      </div>
    </div>
  )
}
