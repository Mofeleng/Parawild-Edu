const convertDateToString = (dateString:any, isShort:boolean) => {
    let options: Intl.DateTimeFormatOptions;
    if (!isShort) {
         options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    } else {
        options = { day: 'numeric', month: 'long', year: 'numeric'};
    }
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}

export default convertDateToString