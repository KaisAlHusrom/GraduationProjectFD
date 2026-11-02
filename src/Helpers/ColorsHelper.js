const isHexColor = (color) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
const rgbaToHex = (rgbaColor) => {
  if(isHexColor(rgbaColor)){
    return rgbaColor
  }
   // Extract individual values (red, green, blue, alpha) from the RGBA string
  const rgbaValues = rgbaColor
  .substring(5, rgbaColor.length - 1)
  .split(',')
  .map((value) => parseFloat(value.trim()));

  // Convert each RGB value to a hexadecimal representation
  const hexValues = rgbaValues.slice(0, 3).map((value) => {
    const intValue = Math.round(value);
    const hex = intValue.toString(16).padStart(2, '0'); // Ensure two-digit format
    return hex;
  });

  // Convert alpha channel to hexadecimal representation
  let alphaHex = ""
  if(rgbaValues[3]){
    alphaHex = Math.round(rgbaValues[3] * 255)
      .toString(16)
      .padStart(2, '0');
  }

  // Combine the hexadecimal values into a HEX color string with alpha
  const hexColor = `#${hexValues.join('')}${alphaHex}`;

  return hexColor;
  };

const ColorsHelper = {
    rgbaToHex
}
export default ColorsHelper;