import { ReactNode, useCallback, useState } from 'react'
// Vue vote : reproduit le tableau de bord des tendances électorales.
import clsx from 'classnames'
import { SidebarList, SidebarItem } from '../components/composite/SidebarList'
import { VoteCard } from '../components/composite/VoteCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'

const trendTabs = [
  { id: 'municipales', label: 'Municipales' },
  { id: 'departementales', label: 'Départementales' },
  { id: 'regionales', label: 'Régionales' },
  { id: 'legislatives', label: 'Législatives' }
]

type VoteSummary = { id: string; label: string; value: string; ratio: string }

// TODO API: remplacer ces tableaux par les réponses GET /api/elections et GET /api/vote-summary.
const elections: SidebarItem[] = []
const voteSummary: VoteSummary[] = []

/**
 * Vote dashboard page with sidebar, tabbed graphs and quick actions.
 * @returns JSX.Element describing the vote layout.
 */
export function VoteDashboard() {
  const [activeElection, setActiveElection] = useState<string | null>(null)
  const [expandedGraphs, setExpandedGraphs] = useState<Record<string, boolean>>({
    [`trend-${trendTabs[0].id}`]: true
  })
  const hasElections = elections.length > 0
  const hasVoteSummary = voteSummary.length > 0
  /** Select an election from the sidebar (future API selection). */
  const handleSelectElection = useCallback((id: string) => setActiveElection(id), [])
  /**
   * Expand/collapse a graph card by its identifier.
   * @param id card identifier
   */
  const toggleGraph = useCallback((id: string) => {
    setExpandedGraphs((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)_220px]">
      {hasElections ? (
        <SidebarList
          title="Liste des personnalités"
          items={elections}
          activeId={activeElection ?? undefined}
          onSelect={handleSelectElection}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Liste des personnalités</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Aucune donnée"
              description="Les élections apparaîtront automatiquement dès qu'elles seront synchronisées avec l'API."
            />
          </CardContent>
        </Card>
      )}

      <section className="space-y-4">
        <Tabs defaultValue={trendTabs[0].id}>
          <TabsList>
            {trendTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {trendTabs.map((tab) => {
            const graphId = `trend-${tab.id}`
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <GraphCard id={graphId} title={`Tendance élection ${tab.label.toLowerCase()} (top 4)`} expanded={Boolean(expandedGraphs[graphId])} onToggle={toggleGraph}>
                  <Placeholder label="Graphe" height="200px" />
                </GraphCard>
              </TabsContent>
            )
          })}
        </Tabs>

        <GraphCard id="analysis" title="Analyse départementale" expanded={Boolean(expandedGraphs.analysis)} onToggle={toggleGraph}>
          <Placeholder label="Graphe départemental" height="140px" />
        </GraphCard>

        <div className="space-y-4">
          <GraphCard id="regional" title="Graphe régional (non voté)" expanded={Boolean(expandedGraphs.regional)} onToggle={toggleGraph}>
            <Placeholder label="Graphique" height="120px" className="border-danger" />
          </GraphCard>
          <GraphCard id="legislative" title="Graphe législatif" expanded={Boolean(expandedGraphs.legislative)} onToggle={toggleGraph}>
            <Placeholder label="Graphique" height="120px" />
          </GraphCard>
        </div>

        <GraphCard id="presidential" title="Graphe présidentiel" expanded={Boolean(expandedGraphs.presidential)} onToggle={toggleGraph}>
          <Placeholder label="Graphique" height="160px" />
        </GraphCard>

        <div className="flex justify-end">
          <Button variant="outline">Regarder d'autres élections</Button>
        </div>
      </section>

      <aside className="space-y-4">
        {hasVoteSummary ? (
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
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Mes voix</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Pas encore de voix"
                description="Les statistiques apparaîtront quand l'utilisateur aura enregistré des votes."
              />
            </CardContent>
          </Card>
        )}

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

type GraphCardProps = {
  id: string
  title: string
  expanded: boolean
  onToggle: (id: string) => void
  children: ReactNode
}

/**
 * Collapsible wrapper for each graph area.
 * @param id unique identifier per graph.
 * @param title section title.
 * @param expanded indicates whether content is visible.
 * @param onToggle callback to toggle state.
 * @param children graph placeholder content.
 */
function GraphCard({ id, title, expanded, onToggle, children }: GraphCardProps) {
  return (
    <Card>
      <CardHeader
        onClick={() => onToggle(id)}
        className="flex cursor-pointer items-center justify-between border-b border-border px-4 py-3"
      >
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      {expanded && <CardContent className="pt-4">{children}</CardContent>}
    </Card>
  )
}

type PlaceholderProps = {
  label: string
  height: string
  className?: string
}

/**
 * Placeholder component used until real charts are plugged in.
 * @param label text displayed in the middle.
 * @param height CSS height (string).
 * @param className optional additional classes.
 */
function Placeholder({ label, height, className }: PlaceholderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted',
        className
      )}
      style={{ height }}
    >
      {label}
    </div>
  )
}
