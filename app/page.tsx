"use client";

import { useEffect, useMemo, useState } from "react";
import { AppNotification } from "@/components/layout/app-notification";
import { AppShell } from "@/components/layout/app-shell";
import { ConfirmModal } from "@/components/layout/confirm-modal";
import { ObjectCard } from "@/components/objects/object-card";
import { ObjectForm } from "@/components/objects/object-form";
import { deleteObject, getObjects } from "@/lib/api";
import type { ObjectItem } from "@/lib/types";

export default function HomePage() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const loadObjects = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getObjects();
      setObjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadObjects();
  }, []);

  const handleCreate = (object: ObjectItem) => {
    setObjects((current) => [object, ...current]);
    setNotification({ message: "Objet ajouté avec succès.", type: "success" });
  };

  const handleDelete = async (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }

    try {
      await deleteObject(pendingDeleteId);
      setObjects((current) => current.filter((object) => object.id !== pendingDeleteId));
      setNotification({ message: "Objet supprimé avec succès.", type: "success" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "La suppression a échoué.");
      setNotification({ message: "La suppression a échoué.", type: "error" });
    } finally {
      setPendingDeleteId(null);
    }
  };

  const stats = useMemo(() => {
    return {
      total: objects.length,
      latest: objects[0]?.title ?? "Aucun objet",
    };
  }, [objects]);

  return (
    <AppShell>
      <AppNotification
        message={notification?.message ?? null}
        type={notification?.type ?? "success"}
        onClose={() => setNotification(null)}
      />
      <ConfirmModal
        isOpen={Boolean(pendingDeleteId)}
        title="Supprimer cet objet ?"
        message="Cette action est irréversible. L’objet et son image seront supprimés."
        confirmLabel="Oui, supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
              Vue d’ensemble
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Gérez vos objets en un seul endroit
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Cette première structure du frontend vous permet de créer, visualiser et consulter les objets de manière simple et cohérente.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">Objets enregistrés</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">Dernier ajout</p>
                <p className="text-lg font-semibold text-slate-900">{stats.latest}</p>
              </div>
            </div>
          </div>
          <ObjectForm onCreate={handleCreate} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Collection</h3>
              <p className="text-sm text-slate-600">
                Les objets apparaissent immédiatement après création.
              </p>
            </div>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
              Chargement des objets...
            </div>
          ) : objects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {objects.map((object) => (
                <ObjectCard key={object.id} object={object} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">
                Aucune donnée disponible
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Ajoutez votre premier objet pour démarrer la collection.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
