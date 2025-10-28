import { useEffect } from "react";
import { useState } from "react";

interface Rezerwacja {
  start: Date | string;
  koniec: Date | string;
  dni: Date[];
}

interface MapaRezerwacji {
  [numerPokoju: string]: Rezerwacja[];
}

interface UseRezerwacjeReturn {
  dodajRezerwacje: (pokoj: string, start: Date, koniec: Date) => void;
  getZarezerwowaneDni: (pokoj: string) => Date[];
  czyDostepny: (pokoj: string, start: Date, koniec: Date) => boolean;
}

function useRezerwacje(): UseRezerwacjeReturn {
  const [rezerwacje, setRezerwacje] = useState<MapaRezerwacji>({});

  const getDniRezerwacji = (
    dataStartu: string | Date,
    dataKonca: string | Date,
  ): Date[] => {
    const dni: Date[] = [];
    const start = new Date(dataStartu);
    const koniec = new Date(dataKonca);

    start.setHours(0, 0, 0, 0);
    koniec.setHours(0, 0, 0, 0);

    const aktualnaData = new Date(start);
    while (aktualnaData <= koniec) {
      dni.push(new Date(aktualnaData));
      aktualnaData.setDate(aktualnaData.getDate() + 1);
    }

    return dni;
  };

  const dodajRezerwacje = (
    numerPokoju: string,
    dataStartu: Date,
    dataKonca: Date,
  ) => {
    setRezerwacje((prev) => ({
      ...prev,
      [numerPokoju]: [
        ...(prev[numerPokoju] || []),
        {
          start: dataStartu,
          koniec: dataKonca,
          dni: getDniRezerwacji(dataStartu, dataKonca),
        },
      ],
    }));
  };

  const getZarezerwowaneDni = (numerPokoju: string): Date[] => {
    if (!rezerwacje[numerPokoju]) return [];
    return rezerwacje[numerPokoju].flatMap((rez) => rez.dni);
  };

  const czyDostepny = (
    numerPokoju: string,
    dataStartu: Date,
    dataKonca: Date,
  ): boolean => {
    const zarezerwowane = getZarezerwowaneDni(numerPokoju);
    const sprawdzane = getDniRezerwacji(dataStartu, dataKonca);

    return !sprawdzane.some((dzien) =>
      zarezerwowane.some((rez) => rez.getTime() === dzien.getTime()),
    );
  };

  return { dodajRezerwacje, getZarezerwowaneDni, czyDostepny };
}

// === Przykładowe użycie hooka ===
export default function ExampleRezerwacje() {
  const { dodajRezerwacje, getZarezerwowaneDni, czyDostepny } = useRezerwacje();

  useEffect(() => {
    // Dummy data
    dodajRezerwacje("101", new Date("2025-10-10"), new Date("2025-10-12"));
    dodajRezerwacje("102", new Date("2025-10-15"), new Date("2025-10-18"));
    dodajRezerwacje("101", new Date("2025-10-20"), new Date("2025-10-22"));

    // Sprawdzenie dostępności
    const dostepny = czyDostepny(
      "101",
      new Date("2025-10-11"),
      new Date("2025-10-13"),
    );
    console.log("Czy pokój 101 jest dostępny w tym zakresie?", dostepny);

    const dni = getZarezerwowaneDni("101");
    console.log("Zarezerwowane dni pokoju 101:", dni);
  }, []);

  return <div>Sprawdź konsolę (dummy data z rezerwacjami)</div>;
}
