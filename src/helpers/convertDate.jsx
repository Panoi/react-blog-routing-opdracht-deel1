import blogposts from "../constants/data.json";

function convertDate(date) {

    let dateString = new Date(date);

    const longOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

     dateString = dateString.toLocaleDateString('nl-NL', longOptions);

    return dateString;
}

export default convertDate;