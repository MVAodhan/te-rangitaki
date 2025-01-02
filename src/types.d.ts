export interface Post {
  id: string
  title: string
  author: string
  created: string
  tree: { content: [] }
  excerpt: string
  slug: string
}

export interface IUser {
  collectionId: string
  collectionName: string
  created: string
  email: string
  emailVisibility: boolean
  id: string
  name: string
  updated: string
  verified: boolean
  role: string
}

export interface IComment {
  id: string
  author: string
  content: string
  timestamp: string
}
