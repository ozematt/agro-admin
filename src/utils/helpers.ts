// Funkcja do tworzenia slug-a
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-") // zamień wszystko co nie jest literą/cyfrą na -
    .replace(/^-+|-+$/g, ""); // usuń - z początku i końca
};

// Tworzenie tytułu ze sluga
export const createTitle = (url: string) => {
  return url.split("/")[2]
    ? (url.split("/")[2].charAt(0).toUpperCase() + url.split("/")[2].slice(1))
        .split("-")
        .join(" ")
    : "Panel";
};

// Tworzenie przedziału dat
export const formatDateRange = (startDateStr: string, endDateStr: string) => {
  const start = new Date(`${startDateStr}T00:00:00`);
  const end = new Date(`${endDateStr}T00:00:00`);

  const monthNames = [
    "sty",
    "lut",
    "mar",
    "kwi",
    "maj",
    "cze",
    "lip",
    "sie",
    "wrz",
    "paź",
    "lis",
    "gru",
  ];

  const startDay = start.getDate();
  const startMonth = monthNames[start.getMonth()];

  const endDay = end.getDate();
  const endMonth = monthNames[end.getMonth()];

  const year = end.getFullYear();

  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
};

// Tworzenie numeru rezerwacji
export const createReservationNumber = (startDate: string) => {
  const date = new Date(`${startDate}T00:00:00`);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `#R${year}-${month}${day}`;
};
