// React
import {
    
} from 'react'

//services
import { 
addOrderItems,
deleteOrderItems,
fetchOrderItems,
permanentDeleteOrderItems,
restoreOrderItems,
updateOrderItems,
} from '../../../../Services/AdminServices/Services/orderItemsService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchOrders } from '../../../../Services/AdminServices/Services/ordersService'
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'

// icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// Styled Components
const StyledOrderItemsPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "order",
            "fetched_column": "id",
            "related_table_id": "id",
            add_to_add_form: true, 
            fetch_all_data: fetchOrders, 
        },
        {
            "field_name": "product",
            "fetched_column": "product_name",
            "related_table_id": "id",
            add_to_add_form: true, 
            fetch_all_data: fetchProducts, 
        }
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    "order": "many-to-one",
    "product": "many-to-one",
    "quantity": "int",
    "sub_total": "decimal",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const OrderItemsPage = () => {
    return (
        <StyledOrderItemsPage>
            <DatabaseView
                    title="Orders Items"
                    icon={<Inventory2OutlinedIcon />}
                    handleFetchData={fetchOrderItems}
                    handleUpdateData={updateOrderItems}
                    handleDeleteData={deleteOrderItems}
                    handleRestoreData={restoreOrderItems}
                    handlePermanentDeleteData={permanentDeleteOrderItems}
                    handleAddData={addOrderItems}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledOrderItemsPage>
    );
};

export default OrderItemsPage;