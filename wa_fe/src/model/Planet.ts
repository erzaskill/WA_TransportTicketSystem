export interface Planet {
    id?: number;
    name: string;
    oxygenPercentage: number;
    inhabitants: Array<string>;
    discoveryDate: Date;
}