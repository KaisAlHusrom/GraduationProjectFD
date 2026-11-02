import DateHelper from "./DateHelper";

export const filterData = async (rowsArray, appliedFilters, relations) => {
    const updatedRowsArray = rowsArray.filter(row => {
        // Loop through applied filters
        for (const appliedFilter of appliedFilters) {
            const { filter, process, value, startDate, endDate, period, relationValue } = appliedFilter;
            let relation = ""
            if(filter.type === "one-to-many" || filter.type === "many-to-many" || filter.type === "many-to-one"){
                if(filter.type === 'one-to-many'){
                    relation =  relations.oneToMany.filter(relation => relation["field_name"] === filter.value)[0]
                }
        
                if(filter.type === 'many-to-many'){
                    relation = relations.manyToMany.filter(relation => relation["field_name"] === filter.value)[0]
                }
        
                if(filter.type === 'many-to-one'){
                    relation = relations.manyToOne.filter(relation => relation["field_name"] === filter.value)[0]
                }
            }
            
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
            } else if(filter.type === "int" || filter.type === "decimal" || filter.type === "pk") {
                
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
            } else if(filter.type === "one-to-many" || filter.type === "many-to-many") {
                if(row[filter.value]) {
                    const relationWithFetchedColumn = relationValue.map(item => item[relation["fetched_column"]]);
                    const originalDataWithFetchedColumn = row[filter.value].map(item => item[relation["fetched_column"]]);
                    if (!relationWithFetchedColumn.some(fetchedColumn => originalDataWithFetchedColumn.includes(fetchedColumn))) {
                        return false;
                    }
                } else {
                    return false
                }
            } else if(filter.type === "many-to-one") {
                if(row[filter.value]) {
                    const relationWithFetchedColumn = relationValue[relation["fetched_column"]];
                    const originalDataWithFetchedColumn = row[filter.value][relation["fetched_column"]];
                    if ((relationWithFetchedColumn !== originalDataWithFetchedColumn)) {
                        return false;
                    }
                } else {
                    return false
                }
            }
        }

        // If the row passes all filters, include it in the result
        return true;
    });

    // Update the state with the filtered data
    return updatedRowsArray


};

export const writeFilterObject = (column, type, process, value = "", startDate = "", endData = "", period = "", relationValue = null) => {
    return {
            "filter": {
                "value": column,
                "type": type
            },
            "process": process,
            "value": value,
            "startDate": startDate,
            "endDate": endData,
            "period": period,
            "relationValue": relationValue
        }
}