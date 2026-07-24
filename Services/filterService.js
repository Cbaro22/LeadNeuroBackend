export const getValidatedFilter = (query, allowedFilters) => {
    const filter = {};

    for (const field in allowedFilters) {
        const value = query[field];

        if (!value) continue;

        if (allowedFilters[field] === "regex") {
            filter[field] = {
                $regex: value,
                $options: "i"
            };
        } else {
            filter[field] = value;
        }
    }

    return filter;
};