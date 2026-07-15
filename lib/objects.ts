import type { ObjectItem } from "@/lib/types";

const STORAGE_KEY = "eyama-objects";

export function getSeedObjects(): ObjectItem[] {
  return [
    {
      id: "seed-1",
      title: "Vase en céramique",
      description:
        "Un objet de décoration à exposer dans un salon moderne.",
      imageUrl:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      createdAt: "2026-07-10T09:30:00.000Z",
    },
    {
      id: "seed-2",
      title: "Lampe de bureau",
      description:
        "Lampe compacte avec une lumière douce pour les soirées de travail.",
      imageUrl:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      createdAt: "2026-07-12T15:45:00.000Z",
    },
  ];
}

export function readObjectsFromStorage(): ObjectItem[] {
  if (typeof window === "undefined") {
    return getSeedObjects();
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return getSeedObjects();
    }

    const parsed = JSON.parse(storedValue) as ObjectItem[];
    return parsed.length > 0 ? parsed : getSeedObjects();
  } catch {
    return getSeedObjects();
  }
}

export function persistObjects(objects: ObjectItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
}

export function getObjectById(id: string): ObjectItem | undefined {
  return readObjectsFromStorage().find((object) => object.id === id);
}
