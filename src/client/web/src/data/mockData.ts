export type Membership = {
  id: string
  title: string
  start: string
  end?: string
}

export type Preference = {
  id: string
  label: string
  value: string
  editable?: boolean
  options?: { label: string; value: string }[]
  actionHref?: string
}

export type ProfileInfoItem = {
  label: string
  value: string
}
export type InfoField = 'Prénom' | 'Nom' | 'Pseudo' | 'Date de naissance' | 'Email' | 'Zone impliquée'

export const profileSelf = {
  fullName: '',
  role: '',
  location: '',
  avatarUrl: '',
  bio: '',
  stats: [
    { label: 'Abonnés', value: '0' },
    { label: 'Abonnements', value: '0' }
  ],
  memberships: [] satisfies Membership[],
  preferences: [
    {
      id: 'pref-1',
      label: 'Statut du compte',
      value: 'Public',
      editable: true,
      options: [
        { label: 'Public', value: 'Public' },
        { label: 'Privé', value: 'Privé' }
      ]
    },
    {
      id: 'pref-2',
      label: 'Statut vote',
      value: 'Public',
      editable: true,
      options: [
        { label: 'Public', value: 'Public' },
        { label: 'Privé', value: 'Privé' }
      ]
    },
    {
      id: 'pref-3',
      label: 'Bloquer les voix',
      value: 'Non',
      editable: true,
      options: [
        { label: 'Non', value: 'Non' },
        { label: 'Oui', value: 'Oui' }
      ]
    },
    { id: 'pref-4', label: 'Gérer mes communautés', value: 'Accès rapide', actionHref: '/forum' },
    { id: 'pref-5', label: 'Gérer mes amitiés', value: 'Ouvert', actionHref: '/messages' }
  ] satisfies Preference[],
  info: [
    { label: 'Prénom', value: '' },
    { label: 'Nom', value: '' },
    { label: 'Pseudo', value: '' },
    { label: 'Date de naissance', value: '' },
    { label: 'Email', value: '' },
    { label: 'Zone impliquée', value: '' }
  ] satisfies ProfileInfoItem[]
}

export const profilePublic = {
  fullName: profileSelf.fullName,
  role: profileSelf.role,
  location: profileSelf.location,
  avatarUrl: profileSelf.avatarUrl,
  bio: profileSelf.bio,
  stats: profileSelf.stats,
  memberships: profileSelf.memberships,
  info: [
    { label: 'Prénom', value: '' },
    { label: 'Nom', value: '' },
    { label: 'Pseudo', value: '' }
  ]
}

export const mockPosts = [
  { id: 'post-1', title: 'Post 1', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 'post-2', title: 'Post 2', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
  { id: 'post-3', title: 'Post 3', excerpt: 'Duis aute irure dolor in reprehenderit.' }
]

export const forumCommunities = {
  mine: [
    { id: 'comm-1', title: 'Communauté 1', subtitle: 'Titre du post' },
    { id: 'comm-2', title: 'Communauté 2', subtitle: 'Titre du post' },
    { id: 'comm-3', title: 'Communauté 3', subtitle: 'Titre du post' },
    { id: 'comm-4', title: 'Communauté 4', subtitle: 'Titre du post' },
    { id: 'comm-5', title: 'Communauté 5', subtitle: 'Titre du post' }
  ],
  trends: [
    { id: 'trend-1', title: 'Communauté populaire 1', subtitle: 'Titre du post' },
    { id: 'trend-2', title: 'Communauté populaire 2', subtitle: 'Titre du post' },
    { id: 'trend-3', title: 'Communauté populaire 3', subtitle: 'Titre du post' },
    { id: 'trend-4', title: 'Communauté populaire 4', subtitle: 'Titre du post' },
    { id: 'trend-5', title: 'Communauté populaire 5', subtitle: 'Titre du post' }
  ]
}

export const messagesList = [
  { id: 'choupinou', title: 'Choupinou' },
  { id: 'amynomous', title: 'Amynomous' },
  { id: 'pierre', title: 'Pierre Chabrier' },
  { id: 'sylvain', title: 'Sylvain Lévy' },
  { id: 'papin', title: 'Jean-Pierre Papin' },
  { id: 'sophie', title: 'Sophie' }
]

export type Message = { id: string; content: string; mine?: boolean; timestamp: string }

export const messagesByPerson: Record<string, Message[]> = {
  papin: [
    { id: 'm1', content: 'Hello Julie, je voulais te remercier pour ta confiance !', mine: false, timestamp: '09:41' },
    { id: 'm2', content: 'Merci pour ta confiance !', mine: false, timestamp: '09:42' },
    { id: 'm3', content: 'Avec plaisir !', mine: true, timestamp: '09:43' }
  ],
  choupinou: [
    { id: 'm4', content: 'Salut Julie ! On se voit ce soir ?', mine: false, timestamp: '13:05' },
    { id: 'm5', content: 'Oui, à 19h.', mine: true, timestamp: '13:06' }
  ],
  amynomous: [{ id: 'm6', content: 'Message automatique', mine: false, timestamp: 'Hier' }],
  pierre: [{ id: 'm7', content: 'Peux-tu revoir mon post ?', mine: false, timestamp: '08:12' }],
  sylvain: [{ id: 'm8', content: 'On avance sur le rapport ?', mine: false, timestamp: 'Hier' }],
  sophie: [{ id: 'm9', content: 'Merci Julie !', mine: false, timestamp: 'Hier' }]
}
