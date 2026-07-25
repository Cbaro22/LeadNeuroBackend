export const getPagination = (page, limit, totalItems) => {
    const totalPages = Math.ceil(totalItems / limit);

    return {
        currentPage: page,
        totalPages,
        limit,
        totalItems,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null
    };
};