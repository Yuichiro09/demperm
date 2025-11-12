// Page forum : navigation entre communautés et feed mocké.
import { forumCommunities, mockPosts } from '../data/mockData'
import { Input } from '../components/ui/Input'
import { SidebarList } from '../components/composite/SidebarList'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'

export function ForumHome() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Input type="search" placeholder="Rechercher des posts" />
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)_220px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="ghost">Page d'accueil</Button>
              <Button variant="ghost">Explorer les communautés</Button>
            </CardContent>
          </Card>

          <SidebarList
            title="Mes communautés"
            items={forumCommunities.mine}
            actionLabel="Créer une communauté"
          />
        </div>

        <section className="space-y-4">
          {mockPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
          <EmptyState title="Fin du flux" description="Connecte-toi plus tard pour découvrir de nouveaux posts." />
        </section>

        <SidebarList title="Tendances" items={forumCommunities.trends} />
      </div>
    </div>
  )
}
