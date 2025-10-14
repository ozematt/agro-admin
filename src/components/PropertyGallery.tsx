import { Edit, Eye, Image, Trash2, Upload } from "lucide-react";
import SectionTitle from "./SectionTitle";

const images = [
  {
    id: 1,
    name: "projekt-logo-2024.jpg",
    size: "2.4 MB",
    date: "2024-09-20",
    category: "Logo",
    url: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Logo+Design",
  },
  {
    id: 2,
    name: "sesja-produktowa-01.jpg",
    size: "5.1 MB",
    date: "2024-09-18",
    category: "Produkty",
    url: "https://via.placeholder.com/300x200/059669/FFFFFF?text=Product+Photo",
  },
  {
    id: 3,
    name: "banner-reklamowy.png",
    size: "1.8 MB",
    date: "2024-09-15",
    category: "Marketing",
    url: "https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Banner+Ad",
  },
  {
    id: 4,
    name: "portret-klienta.jpg",
    size: "3.2 MB",
    date: "2024-09-12",
    category: "Portrety",
    url: "https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Portrait",
  },
];

const UnitGallery = () => {
  return (
    <div className="sectionContainer">
      <div className="mb-6 flex items-center justify-between">
        <SectionTitle Icon={Image} title="Galeria" />
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          <Upload size={20} />
          Dodaj zdjęcie
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={image.url}
                alt={image.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black transition-opacity">
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    // onClick={() => setSelectedImage(image)}
                    className="rounded-lg bg-white p-2 hover:bg-slate-100"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="rounded-lg bg-white p-2 hover:bg-slate-100">
                    <Edit size={16} />
                  </button>
                  <button className="rounded-lg bg-white p-2 text-red-600 hover:bg-slate-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1 truncate font-medium text-slate-900">
                {image.name}
              </h3>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>{image.category}</span>
                <span>{image.size}</span>
              </div>
              <p className="text-xs text-slate-500">{image.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitGallery;
