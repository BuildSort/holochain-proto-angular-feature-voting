declare type FeatureIdeaColumn = 'Feature Ideas' | 'Under Consideration' | 'Scoping' | 'In Development' | 'Completed';

declare interface FeatureIdea {
    title: string;
    description: string;
    creator?: string;
    column?: FeatureIdeaColumn;
}

declare interface Voting{
    voter: string;
    feature : string;
    time : string;
}
