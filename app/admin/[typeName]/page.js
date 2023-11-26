import { getItemsByType } from "@/lib/cosmos/queries";
import { getType } from "@/lib/types/utils";
import SimpleGrid from "@/components/simple-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Page from "@/components/snippets/page";
import Title from "@/components/snippets/title";
import display from "@/lib/types/display";

export default async function ListPage({ params }) {
  const items = await getItemsByType(params.typeName);
  const type = await getType(params.typeName);

  return (
    <Page>
      <Title>{display(type.name)}</Title>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Link href={`/admin/${params.typeName}/create`}>
            <Button className="h-8 px-2 lg:px-3">
              Create
              <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <SimpleGrid data={items} type={type} />
    </Page>
  );
}
