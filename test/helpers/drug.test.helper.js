export const uniqueValue = () => Date.now();

export const uniqueDrugData = () => {
    const unique = Date.now();

    return {
        genericName: `Paracetamol-${unique}`,
        brandName: `Panadol-${unique}`,
        therapeuticClass: "Analgesic",
        indications: ["Pain", "Fever"],
        contraindications: ["Liver disease"],
        sideEffects: ["Nausea"],
        interactions: ["Warfarin"],
        route: "Oral",
        manufacturer: "GSK",
        dosageForm: "Tablet",
        strength: "500mg",
        nafdacNumber: `NAFDAC-${unique}`,
        costPrice: 50,
        sellingPrice: 100,
        minimumStockLevel: 10,
        isActive: true
    };
};