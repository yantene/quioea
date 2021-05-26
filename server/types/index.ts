export type Cuid = {
  id: string
}

export type Timestamp = {
  createdAt: Date
  updatedAt: Date
}

export type UserInfo = {
  name: string
  displayName?: string
  profile: string
}

export type UserInfoFull = UserInfo & {
  email: string
}

export type Passphrase = {
  passphrase: string
}

export type AuthHeader = {
  authorization: string
}
