import * as pricing from '../utils/pricing';

export interface RouteFare {
  route: string;
  fare: number | null;
}

/**
 * Service to handle fare data operations.
 * In a full implementation, this would handle caching and fetching updates.
 */

export const fetchFareByStage = async (stage: number): Promise<pricing.FareDetails | null> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));

  return pricing.getFareForStage(stage);
};

export const fetchExpresswayFares = async (): Promise<RouteFare[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));

  const routes = pricing.getExpresswayRoutes();
  return routes.map(route => ({
    route,
    fare: pricing.getExpresswayFare(route)
  }));
};

/**
 * Simulates checking for updates from the NTC website.
 * In the future, this could fetch a fresh JSON or scrape via a serverless function.
 */
export const checkUpdates = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Checked for updates: System is up to date (Source: Local Fallback)");
    return true;
};
