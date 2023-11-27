import Form from "@/components/form";
import Page from "@/components/snippets/page";
import Title from "@/components/snippets/title";
import { createAction } from "@/lib/actions";
import display from "@/lib/types/display";
import { getType } from "@/lib/types/utils";

export default async function CreatePage({ params }) {
  const type = await getType(params.typeName);

  return (
    <Page>
      <Title>{`Create ${display(type.title ?? params.typeName)}`}</Title>
      <Form
        typeName={params.typeName}
        type={type}
        item={{}}
        formAction={createAction}
      />
    </Page>
  );
}
