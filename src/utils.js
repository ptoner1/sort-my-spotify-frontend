export const formatDateAdded = added_at => {
    let month = added_at.slice(5, 7);
    let day = added_at.slice(8, 10);
    const year = added_at.slice(0, 4);
    if (month[0] === '0') month = month.slice(1);
    if (day[0] === '0') day = day.slice(1);
    return `${month}/${day}/${year}`
}

export const formatPercentage = attribute => {
    const percentage = parseInt(Number(attribute) * 100)
    return percentage
}