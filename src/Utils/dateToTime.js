function dateToTime(date) {
    const dateTimeString = date;

    // Parse the string into a Date object
    const dateTime = new Date(dateTimeString);

    // Get the UTC hours and minutes
    const hours = dateTime.getUTCHours().toString().padStart(2, "0");
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");

    // Formatted time in 24-hour format
    const time = `${hours}:${minutes}`;

    return time;
}
export default dateToTime;
