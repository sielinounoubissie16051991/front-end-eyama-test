"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { deleteObject, getObjectById } from "@/lib/api";
import type { ObjectItem } from "@/lib/types";

export default function ObjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [object, setObject] = useState<ObjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadObject = async () => {
      if (!params?.id) {
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const found = await getObjectById(params.id);
        setObject(found ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadObject();
  }, [params?.id]);

  const handleDelete = async () => {
    if (!object?.id) {
      return;
    }

    try {
      await deleteObject(object.id);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "La suppression a échoué.");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Chargement...</p>
      </div>
    );
  }

  if (!object) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Objet introuvable</p>
        <p className="mt-2 text-sm text-slate-600">
          Cet élément n’existe pas ou a été retiré.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm font-medium text-violet-700">
        ← Retour à la liste
      </Link>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={object.imageUrl} alt={object.title} className="h-80 w-full object-cover" />
        <div className="space-y-4 p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Détail de l’objet
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{object.title}</h1>
          </div>
          <p className="text-base leading-7 text-slate-600">{object.description}</p>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Créé le {new Date(object.createdAt).toLocaleString("fr-FR")}
          </div>
          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            Supprimer cet objet
          </button>
        </div>
      </div>
    </div>
  );
}
