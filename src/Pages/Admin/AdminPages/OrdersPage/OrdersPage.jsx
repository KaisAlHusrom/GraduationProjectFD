// React
import {
    
} from 'react'

//services
import { 
addOrders,
deleteOrders,
fetchOrders,
permanentDeleteOrders,
restoreOrders,
updateOrders,
} from '../../../../Services/AdminServices/Services/ordersService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'

// icons
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'

// Styled Components
const StyledOrdersPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "user",
            "fetched_column": "first_name",
            "related_table_id": "id",
            add_to_add_form: true, 
            fetch_all_data: fetchUsers, 
        }
    ],
    manyToMany:[
        {
            "field_name": "products",
            "fetched_column": "product_name",
            "related_table_id": "id",
            add_to_add_form: true, //TODO: false for now, add with pivot
            fetch_all_data: fetchProducts, 
            pivots: {
                'quantity': "int",
                'sub_total': 'decimal'
            }
        }
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'total_amount': "decimal",
    'status': "enum|accepted,rejected,pending",
    'products': "many-to-many",
    'user': "many-to-one",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const OrdersPage = () => {
    return (
        <StyledOrdersPage>
            <DatabaseView
                    title="Orders"
                    icon={<BorderColorOutlinedIcon />}
                    handleFetchData={fetchOrders}
                    handleUpdateData={updateOrders}
                    handleDeleteData={deleteOrders}
                    handleRestoreData={restoreOrders}
                    handlePermanentDeleteData={permanentDeleteOrders}
                    handleAddData={addOrders}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledOrdersPage>
    );
};

export default OrdersPage;