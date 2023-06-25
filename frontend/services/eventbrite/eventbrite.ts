/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const getUserEvents = async function (token: string) {
  const header = { headers: { 'Authorization': `Bearer ${token}` } };
  const ebOrganizationUrl = "https://www.eventbriteapi.com/v3/users/me/organizations/"
  const organizations: any = await axios.get(ebOrganizationUrl, header);
  const data = organizations.data.organizations
  const events = await Promise.all(data.map((item: any) => {
    return getEventForOrganizations(token, item.id)
  }))
  return events.flat()
}

const getEventForOrganizations = async function (token: string, organizationId: string) {
  const header = { headers: { 'Authorization': `Bearer ${token}` } };
  const ebEventUrl = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`
  const events = await axios.get(ebEventUrl, header)
  return events.data.events
}

const addLinkToEvent = async function (token: string, eventId: string, network: number, lock: string ) {
  const header = { headers: { 'Authorization': `Bearer ${token}` } };
  const ebEventUrl = `https://www.eventbriteapi.com/v3/events/${eventId}/?token=${token}/`
  const events = await axios.get(ebEventUrl, header)
  const data = events.data
  const url = `https://app.unlock-protocol.com/demo?network=${network}&lock=${lock}`
  const updater = await axios.post(ebEventUrl, {"event.summary": data.summary.concat(`Crypto: ${url}`)}, header )
}

export { getUserEvents, getEventForOrganizations, addLinkToEvent};