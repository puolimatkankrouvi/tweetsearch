export function parseTwitterDate(str) {
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };

    try {       
        const dateArray = str.split(" ");
        const day =  [dateArray[5], months[dateArray[1]], dateArray[2]].join("-");
        const time = dateArray[3];
        const isoDateString = `${day}T${time}Z`;
        const date = new Date(isoDateString);
        if (isFinite(date)) {
            return date.toLocaleString();
        }

        return null;
    }
    catch {
        return null;
    }
}