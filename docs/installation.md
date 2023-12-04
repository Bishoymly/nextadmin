# Installation

## 1. Clone the project

```
npx create-next-app --example https://github.com/Bishoymly/nextadmin myadmin
```

## 2. Create a free tier CosmosDb

### using Azure CLI

To create an account with free tier using CLI, set the --enable-free-tier parameter to true:

```PowerShell
# Create a free tier account for API for NoSQL

az cosmosdb create \
    -n "Myaccount" \
    -g "MyResourcegroup" \
    --enable-free-tier true \
    --default-consistency-level "Session"
```

### using PowerShell

To create an account with free tier using Azure PowerShell, set the -EnableFreeTier parameter to true:

```PowerShell
# Create a free tier account for API for NoSQL.
New-AzCosmosDBAccount -ResourceGroupName "MyResourcegroup" `
    -Name "MyAccount" `
    -EnableFreeTier $true `
    -DefaultConsistencyLevel "Session" `
    -Location "East US" `
```

## 3. Add Connection String

In Azure Portal, open the Azure Cosmos DB account and go to "Keys" to get your database connection string.

Copy the file "sample.env" and rename it to ".env" then get the connection string from Azure Portal and past it inside the variable "COSMOSDB_CONNECTION_STRING"

<img alt="Next Admin" src="/docs/images/AzurePortalConnectionString.png">

## 4. Run the application

```
npm run dev
```

And open your browser on http://localhost:3000/ to try the admin application

<table>
<tr>
<td><img src="/docs/images/Screenshot1.png" /></td>
<td><img src="/docs/images/Screenshot2.png" /></td>
</tr>
<tr>
<td><img src="/docs/images/Screenshot3.png" /></td>
<td><img src="/docs/images/Screenshot4.png" /></td>
</tr>
</table>
