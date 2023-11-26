import Form from "@/components/form";
import Page from "@/components/snippets/page";
import Title from "@/components/snippets/title";
import { updateAction } from "@/lib/actions";
import { getItemById } from "@/lib/cosmos/queries";
import display from "@/lib/types/display";
import { getType } from "@/lib/types/utils";

export default async function EditPage({ params }) {
  const type = await getType(params.typeName);
  const item = await getItemById(params.id, params.typeName);

  return (
    <Page>
      <Title>{`Edit ${display(type.name)}`}</Title>
      <Form type={type} item={item} formAction={updateAction} />
    </Page>
  );
}