import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useScreenWidth = () => {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    if (isXs) return 'xs';
    if (isSm) return 'sm';
    if (isMd) return 'md';
    if (isLg) return 'lg';
};

export default useScreenWidth;