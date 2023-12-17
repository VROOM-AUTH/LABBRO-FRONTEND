function secondsToHoursMins(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours === 0) {
        return `${minutes}m`;
    }
    if (minutes === 0) {
        return `${hours}h`;
    }
    if (hours === 0 && minutes === 0) {
        return "0m";
    } else {
        return `${hours}h ${minutes}m`;
    }
}

export default secondsToHoursMins;
