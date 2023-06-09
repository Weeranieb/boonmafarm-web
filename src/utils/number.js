export function formatNumberWithCommas(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the string into integer and decimal parts (if any)
  const [integerPart, decimalPart] = numberString.split(".");

  // Add commas to the integer part
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer part and decimal part (if any) with commas
  if (decimalPart) {
    return `${integerWithCommas}.${decimalPart}`;
  } else {
    return integerWithCommas;
  }
}
