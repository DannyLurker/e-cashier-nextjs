"use client";

import type { CategoryListItem } from "@/features/categories/category.types";
import { cn } from "@/shared/lib/utils";
import { Folder, Pencil, Trash2 } from "lucide-react";

function formatUpdatedAt(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

type TableRowProps = {
  category: CategoryListItem;
  onEdit: (category: CategoryListItem) => void;
  onDelete: (category: CategoryListItem) => void;
};

export default function TableRow({
  category,
  onEdit,
  onDelete,
}: TableRowProps) {
  return (
    <tr className="border-b border-[#eef4ff] last:border-0 hover:bg-[#f8f9ff]/80">
      <td className="px-4 py-3 align-middle">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#e5eeff] text-[#565e74]">
            <Folder className="size-4" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="truncate font-ochre-ui text-sm font-semibold text-[#121c28]">
            {category.name}
          </span>
        </div>
      </td>
      <td className="hidden max-w-xs px-4 py-3 align-middle md:table-cell">
        <span className="line-clamp-2 font-ochre-ui text-sm text-[#524439]/90">
          —
        </span>
      </td>
      <td className="px-4 py-3 align-middle">
        <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md bg-[#121c28] px-2 py-0.5 font-ochre-ui text-xs font-semibold text-white">
          {category.totalProducts}
        </span>
      </td>
      <td className="hidden px-4 py-3 align-middle font-ochre-ui text-sm text-[#524439] lg:table-cell">
        {formatUpdatedAt(category.createdAt)}
      </td>
      <td className="px-4 py-3 align-middle text-end">
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className={cn(
              "rounded-md p-2 text-[#565e74] outline-none transition-colors",
              "hover:bg-[#e5eeff] hover:text-[#121c28]",
              "focus-visible:ring-2 focus-visible:ring-[#894d0d]/40",
            )}
            aria-label={`Edit ${category.name}`}
          >
            <Pencil className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(category)}
            className={cn(
              "rounded-md p-2 text-[#565e74] outline-none transition-colors",
              "hover:bg-[#ffdad6]/60 hover:text-[#ba1a1a]",
              "focus-visible:ring-2 focus-visible:ring-[#894d0d]/40",
            )}
            aria-label={`Delete ${category.name}`}
          >
            <Trash2 className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}
