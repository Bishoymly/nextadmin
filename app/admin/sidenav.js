"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export default function SideNav({ items }) {
  const pathname = usePathname();
  return (
    <div className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </div>
  );
}
