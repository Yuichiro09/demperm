import { useState } from 'react'
// Vue vote : reproduit le tableau de bord des tendances électorales.
import clsx from 'classnames'
import { elections, voteSummary } from '../data/mockData'
import { SidebarList } from '../components/composite/SidebarList'
import { VoteCard } from '../components/composite/VoteCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { Button } from '../components/ui/Button'

const trendTabs = [
  { id: 'municipales', label: 'Municipales' },
  { id: 'departementales', label: 'Départementales' },
  { id: 'regionales', label: 'Régionales' },
  { id: 'legislatives', label: 'Législatives' }
]

export function VoteDashboard() {
  const [activeElection, setActiveElection] = useState(elections[0]?.id ?? 'municipales')

  return (
    <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)_220px]">
      <SidebarList
        title="Liste des personnalités"
        items={elections.map((election) => ({
          id: election.id,
          title: election.title,
          subtitle: election.candidate,
          meta: election.votes
        }))}
        activeId={activeElection}
        onSelect={setActiveElection}
      />

      <section className="space-y-4">
        <Tabs defaultValue={trendTabs[0].id}>
          <TabsList>
            {trendTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {trendTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card>
                <CardHeader>
                  <CardTitle>Tendance élection {tab.label.toLowerCase()} (top 4)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Placeholder height="200px" label="Graphe" />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Analyse départementale</CardTitle>
          </CardHeader>
          <CardContent>
            <Placeholder height="140px" label="Graphe départemental" />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Graphe régional (non voté)</CardTitle>
            </CardHeader>
            <CardContent>
              <Placeholder height="120px" label="Graphique" className="border-danger" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Graphe législatif</CardTitle>
            </CardHeader>
            <CardContent>
              <Placeholder height="120px" label="Graphique" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Graphe présidentiel</CardTitle>
          </CardHeader>
          <CardContent>
            <Placeholder height="160px" label="Graphique" />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline">Regarder d'autres élections</Button>
        </div>
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Mes voix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {voteSummary.map((summary) => (
              <VoteCard
                key={summary.id}
                title={`${summary.label} : ${summary.value}`}
                subtitle={summary.ratio}
                active={summary.id === activeElection}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="primary" className="w-full">
              Gérer mes communautés
            </Button>
            <Button variant="ghost" className="w-full">
              Bloquer les voix
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

function Placeholder({ height, label, className }: { height: string; label: string; className?: string }) {
  return (
    <div
      className={clsx('flex items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted', className)}
      style={{ height }}
    >
      {label}
    </div>
  )
}
