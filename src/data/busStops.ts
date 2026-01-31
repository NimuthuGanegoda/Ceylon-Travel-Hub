import stopsData from './busStops.json';

export interface BusStop {
  id: number;
  lat: number;
  lon: number;
  name: string;
  tags: Record<string, string>;
}

export const busStops: BusStop[] = stopsData as unknown as BusStop[];
