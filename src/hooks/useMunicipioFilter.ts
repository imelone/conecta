import { useAuth } from '../context/AuthContext';

/**
 * Hook to filter program data based on user's assigned municipality
 * Returns a function that can be used to filter any array of items
 * that have a 'municipio' property
 */
export const useMunicipioFilter = () => {
  const { userMunicipio } = useAuth();
  
  /**
   * Filter function that returns only items matching the user's municipality
   * or all items if the user is an admin (municipio = "*")
   * 
   * @param data Array of items with municipio property to filter
   * @returns Filtered array based on user's municipality
   */
  const filterByMunicipio = <T extends { municipio: string }>(data: T[]): T[] => {
    // If no user municipality is set or user is not logged in, return no data
    if (!userMunicipio) return [];
    
    // Admin users (with wildcard "*" municipality) can see all municipalities
    if (userMunicipio === "*") return data;
    
    // Regular users can only see their assigned municipality
    return data.filter(item => item.municipio === userMunicipio);
  };

  /**
   * Filter function for more complex nested data structures where
   * municipalities are in a nested array
   * 
   * @param data Complex data with nested municipios array
   * @returns Filtered data structure with only matching municipalities
   */
  const filterNestedMunicipios = <T extends { municipios: { municipio: string }[] }>(
    data: T
  ): T => {
    // If no user municipality is set or user is not logged in, return empty structure
    if (!userMunicipio) {
      return { ...data, municipios: [] } as T;
    }
    
    // Admin users can see all municipalities
    if (userMunicipio === "*") return data;
    
    // Filter the municipios array to only include the user's municipality
    const filteredMunicipios = data.municipios.filter(
      m => m.municipio === userMunicipio
    );
    
    // Return a new object with the filtered municipios
    return { ...data, municipios: filteredMunicipios } as T;
  };

  return { filterByMunicipio, filterNestedMunicipios, userMunicipio };
};
