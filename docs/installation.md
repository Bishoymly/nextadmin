# Installation

## 1. Clone the project

```
npx create-next-app --example https://github.com/Bishoymly/nextadmin myadmin
```

## 2. Connect to your database

Copy the file "sample.env" and rename it to ".env" then replace the proper variable
For CosmosDB: get the connection string and past it inside the variable "COSMOSDB_CONNECTION_STRING"
For MongoDB: get the url and past it inside the variable "MONGODB_URI"

Open the file "lib/db/db.js" and uncomment the proper 2 lines for your database.

## 3. Run the application

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
