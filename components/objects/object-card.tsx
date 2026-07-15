import Link from "next/link";
import type { ObjectItem } from "@/lib/types";

export function ObjectCard({
  object,
  onDelete,
}: {
  object: ObjectItem;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/objects/${object.id}`}>
        <img
          src={object.imageUrl}
          alt={object.title}
          className="h-48 w-full object-cover"
        />
      </Link>
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/objects/${object.id}`} className="text-lg font-semibold text-slate-900">
            {object.title}
          </Link>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            Nouveau
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">{object.description}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {new Date(object.createdAt).toLocaleDateString("fr-FR")}
        </p>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(object.id)}
            className="mt-2 rounded-full border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            Supprimer
          </button>
        ) : null}
      </div>
    </div>
  );
}
