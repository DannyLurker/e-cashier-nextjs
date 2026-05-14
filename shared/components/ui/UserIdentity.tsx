"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROLE_LABEL } from "@/shared/lib/constants/roles";

function roleLabel(role: string | undefined): string {
  if (!role || !(role in ROLE_LABEL)) return "Member";
  return ROLE_LABEL[role as keyof typeof ROLE_LABEL];
}

function hasAvatar(image: string | null | undefined): image is string {
  return Boolean(image?.trim());
}

export default function UserIdentity({
  isExpanded,
  className,
}: {
  isExpanded: boolean;
  className?: string;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const name = user?.name?.trim() || "Signed in";
  const image = user?.image;
  const roleLine = roleLabel(user?.role).toUpperCase();

  const avatar = (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-[#f5d0c8]/25 ring-1 ring-[#eaf1ff]/15",
        isExpanded ? "size-12" : "size-10",
      )}
    >
      {hasAvatar(image) ? (
        // eslint-disable-next-line @next/next/no-img-element -- user URLs from providers / DB are not preconfigured in next.config
        <img
          src={image}
          alt={isExpanded ? "" : name}
          className="size-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[#0f172a]/35 text-[#eaf1ff]/45">
          <User
            className={cn(isExpanded ? "size-6" : "size-5")}
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
      )}
    </div>
  );

  if (status === "loading") {
    return (
      <div
        className={cn(
          "shrink-0 border-t border-[#eaf1ff]/10 px-2 pb-3 pt-3",
          className,
        )}
      >
        <div
          className={cn(
            "animate-pulse rounded-lg bg-[#0f172a]/20",
            isExpanded ? "mx-1 h-16" : "mx-auto size-10 rounded-full",
          )}
        />
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div
        className={cn(
          "flex shrink-0 justify-center border-t border-[#eaf1ff]/10 px-2 pb-3 pt-3",
          className,
        )}
      >
        <div
          className="flex flex-col items-center gap-1"
          title={`${name} · ${roleLine}`}
          aria-label={`${name}, ${roleLine}`}
        >
          {avatar}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 border-t border-[#eaf1ff]/10 px-2 pb-3 pt-3",
        className,
      )}
    >
      <div className="flex items-center gap-3 rounded-lg bg-[#2a3442] px-3 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
        {avatar}
        <div className="min-w-0 flex-1">
          <p className="font-ochre-ui text-[10px] font-semibold uppercase tracking-wider text-[#eaf1ff]/45">
            {roleLine}
          </p>
          <p className="truncate font-ochre-ui text-base font-semibold leading-snug text-[#eaf1ff]">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
