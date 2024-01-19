const sortData = (rowsArray, appliedSorts) => {
    const updatedRowsArray = [...rowsArray];

    updatedRowsArray.sort((row1, row2) => {
        for (const appliedSort of appliedSorts) {
            const { sort, type } = appliedSort;

            // const getValue = (row, sortField) => {
            //     const fieldPath = sortField.split('_');
            //     let value = row;

            //     for (const path of fieldPath) {
            //         value = value[path];
            //     }

            //     return value;
            // };

            const value1 = row1[sort.value];
            const value2 = row2[sort.value];

            if (sort.type === "string" || sort.type === "text" || sort.type === "email" || sort.type === "mobileNumber" || sort.type === "password" || sort.type === "bool") {
                const comparisonResult = value1.localeCompare(value2);
                return type === "ascending" ? comparisonResult : -comparisonResult;
            }

            if (sort.type === "int" || sort.type === "decimal") {
                const comparisonResult = value1 - value2;
                return type === "ascending" ? comparisonResult : -comparisonResult;
            }

            if (sort.type === "date" || sort.type === "dateTime") {
                const date1 = new Date(value1);
                const date2 = new Date(value2);
                const comparisonResult = date1 - date2;
                return type === "ascending" ? comparisonResult : -comparisonResult;
            }
        }

        return 0; // No sorting needed for the current iteration
    });

    return updatedRowsArray;
};

export default sortData;
