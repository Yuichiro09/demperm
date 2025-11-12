// Messagerie : liste des conversations + bulles stylées sans backend.
import { useMemo, useState } from 'react'
import { messagesByPerson, messagesList } from '../data/mockData'
import { SidebarList } from '../components/composite/SidebarList'
import { MessageBubble } from '../components/composite/MessageBubble'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export function Messages() {
  const [activeConversation, setActiveConversation] = useState(messagesList[0]?.id ?? 'papin')

  const conversation = useMemo(() => {
    return messagesByPerson[activeConversation] ?? []
  }, [activeConversation])

  return (
    <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
      <SidebarList
        title="Messagerie"
        items={messagesList.map((item) => ({ id: item.id, title: item.title }))}
        activeId={activeConversation}
        onSelect={setActiveConversation}
      />

      <section className="flex flex-col rounded-2xl border border-border bg-white shadow-sm">
        <header className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">{getConversationTitle(activeConversation)}</h2>
          <p className="text-sm text-muted">Conversation chiffrée</p>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {conversation.length === 0 && <p className="text-sm text-muted">Aucun message pour l'instant.</p>}
          {conversation.map((msg) => (
            <MessageBubble key={msg.id} content={msg.content} mine={msg.mine} timestamp={msg.timestamp} />
          ))}
        </div>
        <footer className="flex items-center gap-3 border-t border-border px-6 py-4">
          <Input className="flex-1" placeholder="Écrire un message" aria-label="Composer un message" />
          <Button>Envoyer</Button>
        </footer>
      </section>
    </div>
  )
}

function getConversationTitle(id: string) {
  return messagesList.find((item) => item.id === id)?.title ?? 'Conversation'
}
