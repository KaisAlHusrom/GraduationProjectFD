import DateHelper from "./DateHelper";

const filterData = (rowsArray, appliedFilters) => {
    const updatedRowsArray = rowsArray.filter(row => {
        // Loop through applied filters
        for (const appliedFilter of appliedFilters) {
            const { filter, process, value, startDate, endDate, period } = appliedFilter;
            
            // Check the type of filter and apply the appropriate condition
            if (
                filter.type === "string" || 
                filter.type === "text" ||
                filter.type === "email" || 
                filter.type === "mobileNumber" || 
                filter.type === "password" ||
                filter.type === "bool"
            ) {
                
                if (!String(row[filter.value]).toLowerCase().includes(String(value).toLowerCase())) {
                    return false;
                }
            } else if (filter.type === "date" || filter.type === "dateTime") {
                const existDate = new Date(row[filter.value]);
                const filterDate = new Date(value);

                const startDateValue = new Date(startDate);
                const endDateValue = new Date(endDate);

                switch (process) {
                    case "=":
                        if (existDate !== filterDate) {
                            return false;
                        }
                        break;
                    case ">":
                        if (!(existDate > filterDate)) {
                            return false;
                        }
                        break;
                    case "<":
                        if (!(existDate < filterDate)) {
                            return false;
                        }
                        break;
                    case ">=":
                        if (!(existDate >= filterDate)) {
                            return false;
                        }
                        break;
                    case "<=":
                        if (!(existDate <= filterDate)) {
                            return false;
                        }
                        break;
                    case "between":
                        
                        if (!(existDate >= startDateValue && existDate <= endDateValue)) {
                            return false;
                        }
                        break;
                    case "relative to today":
                        if (period === "this week" && !DateHelper.isInThisWeek(existDate)) {
                            return false;
                        }
                        if (period === "this month" && !DateHelper.isInThisMonth(existDate)) {
                            return false;
                        }
                        if (period === "this year" && !DateHelper.isInThisYear(existDate)) {
                            return false;
                        }
                        break;
                    default:
                        break;
                }
            } else if(filter.type === "int" || filter.type === "decimal") {
                
                switch (process) {
                    case "=":
                        
                        if (row[filter.value] !== Number(value)) {
                            return false;
                        }
                        break;
                    case ">":
                        if (!(row[filter.value] > Number(value))) {
                            
                            return false;
                        }
                        break;
                    case "<":
                        if (!(row[filter.value] < Number(value))) {
                            
                            return false;
                        }
                        break;
                    case ">=":
                        if (!(row[filter.value] >= Number(value))) {
                            return false;
                        }
                        break;
                    case "<=":
                        if (!(row[filter.value] <= Number(value))) {
                            return false;
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        // If the row passes all filters, include it in the result
        return true;
    });

    // Update the state with the filtered data
    return updatedRowsArray


};

export default filterData;