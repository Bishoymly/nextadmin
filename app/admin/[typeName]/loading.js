import { DataTableLoading } from "@/components/data-table/data-table-loading";
import Page from "@/components/snippets/page";
import Title from "@/components/snippets/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <Page>
      <Title>
        <Skeleton className="h-8 w-[150px]" />
      </Title>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-8 w-[100px] px-2 lg:px-3" />
        </div>
      </div>
      <DataTableLoading columnCount={4} />
    </Page>
  );
}
