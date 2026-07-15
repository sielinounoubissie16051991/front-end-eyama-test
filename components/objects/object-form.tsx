"use client";

import { useState } from "react";
import { createObject } from "@/lib/api";
import type { ObjectItem } from "@/lib/types";

export function ObjectForm({
  onCreate,
}: {
  onCreate: (object: ObjectItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !imageFile) {
      setError("Veuillez remplir tous les champs et ajouter une image.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      const object = await createObject({
        title: title.trim(),
        description: description.trim(),
        image: imageFile,
      });

      onCreate(object);
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Créer un objet</h2>
        <p className="mt-1 text-sm text-slate-600">
          Ajoutez un nouvel élément avec une image et une courte description.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Titre
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nom de l’objet"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Décrivez l’objet..."
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>

        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Aperçu"
            className="h-44 w-full rounded-2xl object-cover"
          />
        ) : null}

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Publication en cours..." : "Publier l’objet"}
        </button>
      </div>
    </form>
  );
}
