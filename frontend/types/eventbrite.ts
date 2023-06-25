export interface UnlockAttribute {
    value: string;
    trait_type: string;
}

interface CommonEvent {
    name: string;
    image: string;
    description: string;
}

export interface UnlockEvent extends CommonEvent {
    attributes: UnlockAttribute[],
}

export interface BriteEvent extends CommonEvent {
    url: string;
    start: string;
    end: string;
    timezone: string;
    address: string;
}

export const testEvents: BriteEvent[] = [
    {
      "name": "The launch Party Celebration",
      "image": "https://cdn.discordapp.com/attachments/933796379837497414/1073284030809784430/ticketing-image.png",
      "description": "During this we will celebrate our launch as well as show more people how this all works!\nThis is powered by **NFT** using the [Unlock Protocol](https://unlock-protocol.com).",
      "url": "https://www.eventbrite.ca/e/mito-launch-party-tickets-666032700737",
      "start": "2023-06-25T19:00:00",
      "end": "2023-06-26T03:00:00",
      "timezone": "America/Toronto",
      "address": "Toronto, ON"
    }
]