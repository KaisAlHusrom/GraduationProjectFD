import PropTypes from 'prop-types';
import { Box, Chip, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled Components
const StyledChipSet = styled(Box)({
    // Add your custom styles here
});

const ChipSet = ({ title, label }) => {
    // Ensure label is an array, or set it to an empty array if undefined
    const chipLabels = Array.isArray(label) ? label : [];

    return (
        <StyledChipSet>
            <Typography variant="body1" sx={{ paddingBottom: 1 }}>
                {title}
            </Typography>
            {chipLabels.map((item, index) => (
                <Chip
                    key={index}
                    label={item}
                    color="primary"
                    clickable
                    style={{ marginRight: '10px' }}
                />
            ))}
        </StyledChipSet>
    );
};

ChipSet.propTypes = {
    title: PropTypes.string,
    label: PropTypes.arrayOf(PropTypes.string) // Define label as an array of strings
};

// Default props
ChipSet.defaultProps = {
    title: '',
    label: []
};

export default ChipSet;
