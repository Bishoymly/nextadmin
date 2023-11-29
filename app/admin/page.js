import Page from "@/components/snippets/page";
import Title from "@/components/snippets/title";

export default async function ListTypesPage() {
  return (
    <Page>
      <Title>Welcome</Title>
      <ol className="space-y-4">
        <li>
          <b>Step 1: </b>Rename sample.env to .env and set your CosmosDB
          connection string with the name of the database and a contain.
          It&apos;s better to not create the container yourself, as the app will
          create it with the correct partition key.
        </li>
        <li>
          <b>Step 2: </b>Check the json schemas in the models folder, and
          customize them to match your entities.
        </li>
      </ol>
    </Page>
  );
}
