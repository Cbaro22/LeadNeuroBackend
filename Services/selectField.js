export const getSelectedFields = (fields) => {
    if (!fields || typeof fields !== "string") {
        return "";
    }

    return fields
        .split(",")
        .map(field => field.trim())
        .filter(Boolean)
        .join(" ");
};