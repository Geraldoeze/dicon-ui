import { useState, useCallback, useMemo } from 'react';
import { FilterValue } from '@/services/types';
interface UseFilteringProps<T> {
  data: T[];
  searchableFields?: (keyof T)[];
}

export function useFiltering<T>({ data, searchableFields }: UseFilteringProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);

  const handleFilterChange = useCallback((filters: FilterValue[]) => {
    setActiveFilters(filters);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter(item => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        (searchableFields ? 
          searchableFields.some(field => {
            const value = item[field];
            return typeof value === 'string' && value.toLowerCase().includes(searchLower);
          }) :
          Object.entries(item).some(([_, value]) => 
            typeof value === 'string' && value.toLowerCase().includes(searchLower)
          )
        );

      // Column filters
      const matchesFilters = activeFilters.every(filter => {
        const value = item[filter.column as keyof T];
        return !filter.value || 
          (typeof value === 'string' && value.toLowerCase().includes(filter.value.toLowerCase()));
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, activeFilters, searchableFields]);

  return {
    filteredData,
    searchQuery,
    activeFilters,
    handleFilterChange,
    handleSearchChange,
  };
}
