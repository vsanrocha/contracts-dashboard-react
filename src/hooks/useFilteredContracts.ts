import { Contract } from "@/types/contract";

interface Filters {
  startDateRange?: { from: Date; to: Date };
  endDateRange?: { from: Date; to: Date };
  status?: string;
}

export const useFilteredContracts = (
  contracts: Contract[],
  activeFilters?: Filters
): Contract[] => {
  return contracts.filter((contract) => {
    let matches = true;

    if (activeFilters?.startDateRange) {
      const startDate = new Date(contract.startDate);
      startDate.setHours(0, 0, 0, 0);
      const filterFrom = new Date(activeFilters.startDateRange.from);
      const filterTo = new Date(activeFilters.startDateRange.to);
      filterFrom.setHours(0, 0, 0, 0);
      filterTo.setHours(0, 0, 0, 0);
      matches = matches && startDate >= filterFrom && startDate <= filterTo;
    }

    if (activeFilters?.endDateRange) {
      const endDate = new Date(contract.endDate);
      endDate.setHours(0, 0, 0, 0);
      const filterFrom = new Date(activeFilters.endDateRange.from);
      const filterTo = new Date(activeFilters.endDateRange.to);
      filterFrom.setHours(0, 0, 0, 0);
      filterTo.setHours(0, 0, 0, 0);
      matches = matches && endDate >= filterFrom && endDate <= filterTo;
    }

    if (activeFilters?.status) {
      matches = matches && contract.status === activeFilters.status;
    }

    return matches;
  });
};
