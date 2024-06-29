export const linearColoredText = theme => {
    return {
        backgroundImage: `linear-gradient(123deg, ${theme.palette.text.primary} 24%, ${theme.palette.primary.main} 65%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text', // Needed for WebKit browsers
        color: 'transparent',
    }
}