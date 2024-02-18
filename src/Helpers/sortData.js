const sortData = (rowsArray, appliedSorts) => {
    const updatedRowsArray = [...rowsArray];

    updatedRowsArray.sort((row1, row2) => {
        let comparisonResult = 0;

        for (const appliedSort of appliedSorts) {
            const { sort, type } = appliedSort;
            const value1 = row1[sort.value];
            const value2 = row2[sort.value];

            if (sort.type === "string" || sort.type === "text" || sort.type === "email" || sort.type === "mobileNumber" || sort.type === "password" || sort.type === "bool") {
                comparisonResult = value1.localeCompare(value2);
            } else if (sort.type === "int" || sort.type === "decimal" || sort.type === "pk") {
                comparisonResult = value1 - value2;
            } else if (sort.type === "date" || sort.type === "dateTime") {
                const date1 = new Date(value1);
                const date2 = new Date(value2);
                comparisonResult = date1 - date2;
            }

            // Apply ascending or descending based on the comparison result
            comparisonResult = type === "ascending" ? comparisonResult : -comparisonResult;

            // If a non-zero result is obtained, break out of the loop
            if (comparisonResult !== 0) {
                break;
            }
        }

        return comparisonResult;
    });

    return updatedRowsArray;
};

export default sortData;

