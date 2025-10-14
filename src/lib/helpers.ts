// Funkcja do tworzenia slug-a
export function createSlug(text: string): string {
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
}
