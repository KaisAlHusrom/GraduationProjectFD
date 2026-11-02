// Translation.js
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const Translation = ({ id, defaultMessage }) => (
  <FormattedMessage id={id} defaultMessage={defaultMessage} />
);

Translation.propTypes = {
    id: PropTypes.any,
    defaultMessage: PropTypes.string,
}

export default Translation;
