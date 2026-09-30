import { RegionId, RegionBundle, RegionConfig } from '../../types';
import { chennaiBundle } from './chennai';
import { kochiBundle } from './kochi';
import { vijayawadaBundle } from './vijayawada';
import { bengaluruBundle } from './bengaluru';

export const REGIONS: Record<RegionId, RegionBundle> = {
  chennai: chennaiBundle,
  kochi: kochiBundle,
  vijayawada: vijayawadaBundle,
  bengaluru: bengaluruBundle,
};

export const REGION_LIST: RegionConfig[] = [
  chennaiBundle.config,
  kochiBundle.config,
  vijayawadaBundle.config,
  bengaluruBundle.config,
];

export const DEFAULT_REGION_ID: RegionId = 'chennai';

export function getRegionBundle(id: RegionId): RegionBundle {
  return REGIONS[id] || REGIONS[DEFAULT_REGION_ID];
}

export function getRegionConfig(id: RegionId): RegionConfig {
  return (REGIONS[id] || REGIONS[DEFAULT_REGION_ID]).config;
}
