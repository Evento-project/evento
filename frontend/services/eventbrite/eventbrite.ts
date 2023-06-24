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


export { getUserEvents, getEventForOrganizations};