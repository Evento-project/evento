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