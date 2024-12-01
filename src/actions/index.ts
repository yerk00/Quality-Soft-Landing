import { createContact, getAllContacts, getOneContact, setAsAnsweredContact, setAsReadContact } from './contacts'
import { createProject, getAllProjects, getOneProject, toggleStatusProject, updateProject } from './projects'
import { technologiesSeed, usersSeed } from './seed'
import { createService, getAllServices, getOneService, toggleStatusService, updateService } from './services'
import { createTeamMember, getAllTeamMembers, getOneTeamMember, toggleStatusTeamMember, updateTeamMember } from './team-members'
import { getAllTechnologies } from './technologies'
import { createUser, getAllUsers, getOneUser, toggleStatusUser, updateUser } from './users'

export const server = {

  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  toggleStatusUser,

  getAllServices,
  getOneService,
  createService,
  updateService,
  toggleStatusService,

  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  toggleStatusProject,

  getAllContacts,
  getOneContact,
  createContact,
  setAsReadContact,
  setAsAnsweredContact,

  getAllTeamMembers,
  getOneTeamMember,
  createTeamMember,
  updateTeamMember,
  toggleStatusTeamMember,

  getAllTechnologies,

  usersSeed,
  technologiesSeed,
}
