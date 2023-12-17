import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/NextAdminIcon.png"
          alt="NextAdmin"
          width={100}
          height={100}
          priority
        />
        <span className="text-4xl font-extrabold ml-8 lg:text-8xl">
          Next Admin
        </span>
      </div>

      <div className="my-6">
        <Link href="/admin">
          <Button className="group">
            Start Here &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-12">
        <div className="flex-1">
          <h2 class="text-2xl font-semibold mb-4">Getting Started</h2>
          <ul className="list-disc ml-6">
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://github.com/Bishoymly/nextadmin/blob/main/docs/installation.md"
              >
                Installation
              </a>
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://github.com/Bishoymly/nextadmin/blob/main/docs/customize-models.md"
              >
                Customize Models
              </a>
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://github.com/Bishoymly/nextadmin/blob/main/docs/enable-image-upload.md"
              >
                Enable Image Upload
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 class="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc ml-6">
            <li>Connect to your NoSQL CosmosDB or MongoDB</li>
            <li>Define your models using a standard JSON Schema</li>
            <li>
              Generate admin pages to manage your data and store them in your
              database
            </li>
            <li>Beautifully designed shadcn/ui components</li>
            <li>Dark/Light themes support</li>
            <li>
              Data grid with server side paging, sorting, searching and
              filtering
            </li>
            <li>Forms with client and server validation</li>
            <li>Customize components to render your models</li>
            <li>
              Use it to quickly get to market with standard features then
              progressively add custom developed pages
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 class="text-2xl font-semibold mb-4">Tech Stack</h2>
          <ul className="list-disc ml-6">
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://nextjs.org/"
              >
                Next.js
              </a>{" "}
              as the React framework
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://tailwindcss.com/"
              >
                Tailwind
              </a>{" "}
              for CSS styling
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://ui.shadcn.com/"
              >
                shadcn/ui
              </a>{" "}
              for the UI components
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://github.com/sadmann7/shadcn-table"
              >
                shadcn-table
              </a>{" "}
              for server side data grid
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://azure.microsoft.com/en-us/products/cosmos-db"
              >
                CosmosDB
              </a>{" "}
              or{" "}
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://www.mongodb.com/"
              >
                MongoDB
              </a>{" "}
              for the NoSQL database
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://json-schema.org/"
              >
                JSON Schema
              </a>{" "}
              for defining entities schemas
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="https://vercel.com/storage/blob"
              >
                Vercel Blob
              </a>{" "}
              for image uploads
            </li>
            <li>
              <a
                className="text-blue-500 underline"
                target="_blank"
                href="http://vercel.com/"
              >
                Vercel
              </a>{" "}
              for deployment
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
