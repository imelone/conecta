import { useAuth } from '../context/AuthContext';

/**
 * Custom hook to filter data based on user's region
 * @param data Array of data objects that contain a region property
 * @param regionField Path to the region field in the data object (default: 'region')
 * @returns Filtered data based on user's region
 */
export const useRegionFilter = <T extends Record<string, any>>(
  data: T[],
  regionField: string = 'region'
): T[] => {
  const { user, userRegion } = useAuth();
  
  if (!user || userRegion === null) {
    return [];
  }

  // Helper function to get nested property using dot notation
  // Example: getNestedValue(obj, 'data.region.id') gets obj.data.region.id
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((prev, curr) => {
      return prev && prev[curr] !== undefined ? prev[curr] : undefined;
    }, obj);
  };

  return data.filter((item) => {
    // Try to get the region value from the item
    const itemRegion = getNestedValue(item, regionField);
    
    // If the item has a region object with an id property
    if (typeof itemRegion === 'object' && itemRegion !== null && 'id' in itemRegion) {
      return itemRegion.id === userRegion;
    }
    
    // If the item has a region number directly
    if (typeof itemRegion === 'number') {
      return itemRegion === userRegion;
    }
    
    // If the regionField is a string representation of a number
    if (typeof itemRegion === 'string' && !isNaN(Number(itemRegion))) {
      return Number(itemRegion) === userRegion;
    }
    
    return false;
  });
};

export default useRegionFilter;
