/// <reference path="../.astro/types.d.ts" />
/// <reference path="astro/client" />

interface IUser {
  name:      string
  lastName: string
  email:     string
  avatar:    string | null
  role:      string

  status:    boolean
}

declare namespace App {
  interface Locals {
    isAuthenticated: boolean
    user: IUser | null
  }
}
