export const pixelValues = (addNegativeValues = false) => {
    // Generate the pixel values array
    const pixelArray = Array.from({ length: 1001 }, (_, index) => {
        const value = addNegativeValues ? index - 500 : index;
        return `${value * 2}px`;
    });

    // Add the 'auto' value at the beginning of the array
    pixelArray.unshift('auto');
    
    return pixelArray;
}


export const timeValues = Array.from({ length: 601 }, (_, index) => `${index* 100}ms`);



export const numberValues = Array.from({ length: 500 }, (_, index) => `${index * 2 + 2}`);

export const vh = Array.from({ length: 100 }, (_, index) => `${index + 1}vh`);

export const vw = Array.from({ length: 100 }, (_, index) => `${index + 1}vw`);

export const fontWeights = [
    "lighter",
    "normal",
    "bold",
    "bolder",
    ...Array.from({ length: 10 }, (_, index) => index !== 0 && `${index * 100}`).filter(i => i !== false)
];

export const opacities = Array.from({ length: 11 }, (_, index) => `${index / 10}`);

export const percentValues = Array.from({ length: 100 }, (_, index) => `${index + 1}%`);

export const positions = [
    "left top",
    "left center",
    "left bottom",
    "right top",
    "right center",
    "right bottom",
    "center top",
    "center center",
    "center bottom",
]

export const imageValueTypes = [
    "Url",
    "Conic Gradient",
    "Linear Gradient",
    "Radial Gradient",
    "Repeating Conic Gradient",
    "Repeating Linear Gradient",
    "Repeating Radial Gradient",
]

export const linearGradientDirections = [
    "to right",
    "to left",
    "to top",
    "to bottom",
    "to top right",
    "to top left",
    "to bottom right",
    "to bottom left",
]

export const conicGradientFromValues = Array.from({ length: 361 }, (_, index) => `${index}`);

export const radialGradientValues = [
    "ellipse",
    "circle",
]

export const normalDirections = [
    "top",
    "right",
    "left",
    "bottom",
]

export const cornerDirections = [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
]