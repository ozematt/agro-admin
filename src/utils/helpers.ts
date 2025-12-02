import { HouseItem, PROPERTIES } from "@/config";

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

// NOTE: new Date(`${Date}T00:00:00`) bezpieczne dla "pl" strefy czasowej, brak przesunięcia daty

// Tworzenie daty: np. 29 lis - 30 lis 2025
export const formatDateRange = (
  startDateStr: string,
  endDateStr: string,
): string => {
  const start = new Date(`${startDateStr}T00:00:00`);
  const end = new Date(`${endDateStr}T00:00:00`);

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

// Tworzenie daty: np. "21 listopada 2025, 14:40" lub wersja short "21 lis 2025, 14:40"
export const formatCreatedAt = (
  dateString: string,
  short: boolean = false,
): string => {
  const date = new Date(`${dateString}T00:00:00`);

  const datePart = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: short ? "short" : "long",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart}, ${timePart}`;
};

//Tworzenie dat: np."29 listopada 2025, sobota"
export const formatCheckInOut = (dateString: string) => {
  const datePart = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));

  const dayPart = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
  }).format(new Date(`${dateString}T00:00:00`));

  return ` ${datePart}, ${dayPart}`;
};

// Zwróci dano obiektu na podstawaie slug
export const getCurrentProperty = (
  pathname: string,
  properties: HouseItem[] = PROPERTIES,
) => {
  const slug = pathname.split("/")[2];
  const property = properties.find((property) => property.slug === slug);
  return property as HouseItem;
};

export const getNights = (
  startDate: string | Date,
  endDate: string | Date,
): number => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const diff = end.getTime() - start.getTime();

  const nights = diff / (1000 * 60 * 60 * 24);

  return Math.max(0, Math.floor(nights));
};

// zabezpieczenie dla strefy czasowowej przy wyborze daty
export const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
