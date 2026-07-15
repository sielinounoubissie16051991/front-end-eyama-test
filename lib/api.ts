import type { ObjectItem } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function mapObject(item: Record<string, unknown>): ObjectItem {
  return {
    id: String(item._id ?? item.id ?? ""),
    title: String(item.title ?? ""),
    description: String(item.description ?? ""),
    imageUrl: String(item.imageUrl ?? ""),
    imagePublicId: item.imagePublicId ? String(item.imagePublicId) : undefined,
    createdAt: String(item.createdAt ?? new Date().toISOString()),
  };
}

export async function getObjects(): Promise<ObjectItem[]> {
  const response = await fetch(`${API_BASE_URL}/objects`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les objets depuis l’API.");
  }

  const data = (await response.json()) as Record<string, unknown>[];
  return data.map(mapObject);
}

export async function getObjectById(id: string): Promise<ObjectItem | null> {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Impossible de récupérer les détails de l’objet.");
  }

  const data = (await response.json()) as Record<string, unknown>;
  return mapObject(data);
}

export async function createObject(input: {
  title: string;
  description: string;
  image: File;
}): Promise<ObjectItem> {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("description", input.description);
  formData.append("image", input.image);

  const response = await fetch(`${API_BASE_URL}/objects`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "La création de l’objet a échoué.");
  }

  const data = (await response.json()) as Record<string, unknown>;
  return mapObject(data);
}

export async function deleteObject(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("La suppression de l’objet a échoué.");
  }
}
