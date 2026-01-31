import busFaresData from '../data/busFares.json';

// Type definition for the JSON data structure
interface BusFaresData {
  lastUpdated: string;
  source: string;
  normal: Array<{ stage: number; fare: number }>;
  expressway: Record<string, number>;
}

const busFares = busFaresData as BusFaresData;

export type BusClass = 'Normal' | 'Semi-Luxury' | 'AC' | 'Expressway';

export interface FareDetails {
  stage: number;
  normal: number;
  semiLuxury: number;
  ac: number;
}

/**
 * Calculates fares for all classes based on the stage number.
 * Rounds up to the nearest integer as per standard practice (or exact value if preferred).
 */
export const getFareForStage = (stage: number): FareDetails | null => {
  // Find exact stage or the closest higher stage if exact not found
  // (Fares usually apply up to a certain distance/stage)
  // For now, exact match or nothing.
  const fareData = busFares.normal.find(s => s.stage === stage);

  if (!fareData) {
    // Fallback: if stage is within range but not explicitly listed (e.g. gaps), find nearest upper bound?
    // The data seems continuous 1..350.
    return null;
  }

  const normal = fareData.fare;

  return {
    stage,
    normal: Math.ceil(normal),
    semiLuxury: Math.ceil(normal * 1.5),
    ac: Math.ceil(normal * 2.0)
  };
};

/**
 * Returns the flat rate for a specific expressway route key.
 */
export const getExpresswayFare = (routeKey: string): number | null => {
  return busFares.expressway[routeKey] || null;
};

/**
 * Get all available expressway routes
 */
export const getExpresswayRoutes = (): string[] => {
  return Object.keys(busFares.expressway);
};

/**
 * Helper to estimate stage from distance (rough approximation)
 * Stage 1 is up to 2km.
 * Then roughly 2-3km per stage?
 * This is a placeholder logic.
 */
export const estimateStageFromDistance = (km: number): number => {
  if (km <= 2) return 1;
  // Simple formula: 1 + (km - 2) / 2 approx?
  // NTC has a complex table, but for estimation:
  const stage = Math.ceil(1 + (km - 2) / 2.5);
  return Math.min(Math.max(stage, 1), 350);
};
