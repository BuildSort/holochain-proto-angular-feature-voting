declare interface FeatureIdea {
    title: string;
    description: string;
    creator?: string;
    column?: string;
}

declare interface Voting{
    voter: string;
    feature : string;
    time : string;
}
