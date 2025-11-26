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
export const createTitle = (url: string): string => {
  return url.split("/")[2]
    ? (url.split("/")[2].charAt(0).toUpperCase() + url.split("/")[2].slice(1))
        .split("-")
        .join(" ")
    : "Panel";
};

// Tworzenie daty: np. 29 lis - 30 lis 2025
export const formatDateRange = (
  startDateStr: string,
  endDateStr: string,
): string => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const startDate = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
  }).format(start);

  const endDate = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(end);

  return `${startDate} - ${endDate}`;
};

// Tworzenie numeru rezerwacji: np. #R2025-113010
export const createReservationNumber = (startDate: string): string => {
  const date = new Date(`${startDate}T00:00:00`);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return `#R${year}-${month}${day}${randomNumber}`;
};

// Tworzenie daty: np. "Utworzono 21 listopada 2025, 14:40"
export const formatCreatedAt = (dateString: string): string => {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `Utworzono: ${datePart}, ${timePart}`;
};

//Tworzenie dat: np."29 listopada 2025, sobota"
export const formatCheckInOut = (dateStr: string) => {
  const datePart = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));

  const dayPart = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
  }).format(new Date(dateStr));

  return ` ${datePart}, ${dayPart}`;
};
