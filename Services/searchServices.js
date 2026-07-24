export const getSearchQuery = (search, searchableFields) => {
    if (!search) return {};

    return {
        $or: searchableFields.map(field => ({
            [field]: {
                $regex: search,
                $options: "i"
            }
        }))
    };
};