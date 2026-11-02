// React
import {
    
} from 'react'

//services
import { 
addBankCards,
deleteBankCards,
fetchBankCards,
permanentDeleteBankCards,
restoreBankCards,
updateBankCards,
} from '../../../../Services/AdminServices/Services/bankCardsService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'

// icons
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
// Styled Components
const StyledBankCardsPage = styled(Box)(
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
            fetch_all_data: fetchUsers  , 
        }
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'user': "many-to-one",
    'card_number': "string",
    'card_holder_name': "string",
    'expiry_date': "string",
    'cvv': "int",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const BankCardsPage = () => {
    return (
        <StyledBankCardsPage>
            <DatabaseView
                    title="Bank Cards"
                    icon={<CreditCardOutlinedIcon />}
                    handleFetchData={fetchBankCards}
                    handleUpdateData={updateBankCards}
                    handleDeleteData={deleteBankCards}
                    handleRestoreData={restoreBankCards}
                    handlePermanentDeleteData={permanentDeleteBankCards}
                    handleAddData={addBankCards}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledBankCardsPage>
    );
};

export default BankCardsPage;