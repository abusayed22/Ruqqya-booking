export function formatDateToISO(dateInput) {
  // Check if the input is null, undefined, or not a valid date
  if (!dateInput || isNaN(new Date(dateInput))) {
    // Return a fallback value or an empty string if invalid
    return "Invalid date";
  }

  // Convert to Date object and format the date to 'YYYY-MM-DD'
  const date = new Date(dateInput);
  return date.toISOString().split("T")[0];
}