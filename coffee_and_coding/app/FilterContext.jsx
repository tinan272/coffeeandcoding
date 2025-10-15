import { createContext, useContext, useMemo } from "react";
import { useQueryParams, StringParam, ArrayParam } from "use-query-params";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
    const [query, setQuery] = useQueryParams({
        search: StringParam,
        sort: StringParam,
        city: ArrayParam,
        cost: ArrayParam,
        rating: ArrayParam,
        parking: ArrayParam,
    });

    const updateCity = (cities) => {
        setQuery(
            { city: cities && cities.length > 0 ? cities : undefined },
            "pushIn"
        );
    };

    const updateCost = (costs) => {
        setQuery(
            { cost: costs && costs.length > 0 ? costs : undefined },
            "pushIn"
        );
    };

    const updateRating = (ratings) => {
        setQuery(
            { rating: ratings && ratings.length > 0 ? ratings : undefined },
            "pushIn"
        );
    };

    const updateParking = (parking) => {
        setQuery(
            { parking: parking && parking.length > 0 ? parking : undefined },
            "pushIn"
        );
    };

    const updateSearch = (search) => {
        setQuery({ search: search || undefined }, "pushIn");
    };

    const setSort = (sortType) => {
        setQuery((prev) => ({
            ...prev,
            sort: sortType || undefined,
        }));
    };

    const clearAll = () => {
        setQuery(
            {
                search: undefined,
                sort: undefined,
                city: undefined,
                cost: undefined,
                rating: undefined,
                parking: undefined,
            },
            "pushIn"
        );
    };

    const filters = useMemo(
        () => ({
            sort: query?.sort || [],
            search: query?.search || [],
            cities: query?.city || [],
            costs: query?.cost || [],
            ratings: query?.rating || [],
            parkings: query?.parking || [],
        }),
        [query?.city, query?.cost, query?.rating, query?.parking]
    );

    const allSelectedOptions = useMemo(() => {
        return [
            ...(query?.cost || []),
            ...(query?.city || []),
            ...(query?.rating || []),
            ...(query?.parking || []),
        ];
    }, [query?.city, query?.cost, query?.rating, query?.parking]);

    const value = useMemo(
        () => ({
            query,
            setQuery,
            filters,
            allSelectedOptions,
            updateCity,
            updateCost,
            updateParking,
            updateRating,
            updateSearch,
            clearAll,
            setSort,
        }),
        [query, filters, allSelectedOptions]
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilters have to be used in FilterProvider.");
    }
    return context;
}

export function useFilterQuery() {
    const { query } = useFilters();
    return query;
}

export function useFilterValues() {
    const { filters } = useFilters();
    return filters;
}

export function useFilterActions() {
    const {
        updateCity,
        updateCost,
        updateRating,
        updateSearch,
        setSort,
        clearAll,
    } = useFilters();

    return {
        updateCity,
        updateCost,
        updateRating,
        updateSearch,
        setSort,
        clearAll,
    };
}
