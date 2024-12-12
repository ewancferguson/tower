import { Account } from "./Account.js"
import { Event } from "./TowerEvent.js"

export class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.profile = data.profile == undefined ? null : new Account(data.profile)
    this.event = data.event == undefined ? null : new Event(data.event)
  }
}