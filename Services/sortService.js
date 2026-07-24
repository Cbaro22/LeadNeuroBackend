export const getValidatedSort = (sort, allowedSortFields) => {
    let validatedSort = sort || "-createdAt";

    const field = validatedSort.startsWith("-")
        ? validatedSort.substring(1)
        : validatedSort;

    if (!allowedSortFields.includes(field)) {
        const error = new Error("Invalid sort field");
        error.statusCode = 400;
        throw error;
    }

    return validatedSort;
};