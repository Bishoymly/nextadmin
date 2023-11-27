import { ModeToggle } from "@/components/mode-toggle";
import SideNav from "./sidenav";
import Link from "next/link";
import display from "@/lib/types/display";
import { getAllTypes } from "@/lib/types/utils";
import Image from "next/image";

export default async function AdminLayout({ children }) {
  const types = await getAllTypes();
  const items = types.map((t) => {
    return {
      title: display(t),
      href: `/admin/${t}`,
    };
  });

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex-none flex justify-between items-center border-b border-border px-4 py-2">
        <Link href="/admin" className="flex flex-row items-center">
          <Image src="/NextAdminIcon.png" width={26} height={26} />
          <span className="text-lg font-bold ml-2">Next Admin</span>
        </Link>
        <div className="flex flex-row space-x-2">
          <ModeToggle />
        </div>
      </nav>
      <div className="flex-1 flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="p-2 border-b lg:w-1/5 lg:border-r lg:border-b-0">
          <SideNav items={items} />
        </aside>
        <div className="flex-1 pr-8">{children}</div>
      </div>
    </div>
  );
}
