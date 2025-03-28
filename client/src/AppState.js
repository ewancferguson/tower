import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').Event[]} */
  events: [],

  /** @type {import('./models/TowerEvent.js').Event} */
  activeEvent: null,


  /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],


  /** @type {import('./models/Ticket.js').Ticket[]} */
  ticketProfiles: [],

  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
})

