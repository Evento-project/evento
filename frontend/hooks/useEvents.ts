import { useEffect, useState } from "react"
import axios from "axios"
import { BriteEvent } from "../types/eventbrite"


export default function useEvents(token?: string){

    const [data, setData] = useState<BriteEvent[]|undefined>()
    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState(false)

    
    const getEventForOrganizations = async function (token: string, organizationId: string) {
        const header = { headers: { 'Authorization': `Bearer ${token}` } };
        const ebEventUrl = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/?expand=venue`
        const events = await axios.get(ebEventUrl, header)
        return events.data.events
    }
    
    useEffect(() => {
        (
            async function() {
                if (!token) {
                    return;
                }
                try{
                    setLoading(true)
                    const header = { headers: { 'Authorization': `Bearer ${token}` } };
                    const ebOrganizationUrl = "https://www.eventbriteapi.com/v3/users/me/organizations/"
                    const organizations: any = await axios.get(ebOrganizationUrl, header);
                    const data = organizations.data.organizations
                    const events = await Promise.all(data.map(async (item: any) => {
                        return (await getEventForOrganizations(token, item.id))
                    }))
                    const resultData = events.flat().map((ev) => ({
                        name: ev.name.text,
                        image: ev.logo.url,
                        description: ev.summary,
                        url: ev.url,
                        start: ev.start.local,
                        end: ev.end.local,
                        timezone: ev.start.timezone,
                        address: ev.venue?.address ?? '',
                    }))
                    setData(resultData)
                }catch(err) {
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [token])

    return { data, error, loading }

}