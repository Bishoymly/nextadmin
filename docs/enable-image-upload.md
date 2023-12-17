# Enable Image Upload

## 1. Create Vercel Blob Storage

If you already have a Vercel blob storage created, skip to step 2.

Go to your Vercel project > Storage

![Storage](/docs/images/Storage1.png)

Click Create Blob Storage, then click Create & Continue

![Create Blob](/docs/images/Storage2.png)

Click Connect to add the needed variable to your project environment variables.

![Connect](/docs/images/Storage3.png)

## 2. Add environment variable

Open the blob store from Vercel and click on the ".env.local" tab like this:
![Env](/docs/images/Storage4.png)

Copy the env variable and open your ".env" and paste it to replace the variable "BLOB_READ_WRITE_TOKEN"

That's it. From the sample models, open Post and it should have an image field that will now upload images to the blob storage.

## 3. Add an image field to your models

To add an image field to one of your models, just use a string type and add a "format":"uri" which will use the File component that has the features to upload an image.

```Json
{
  "title": "Profile",
  "type": "object",
  "properties": {
    "avatar": {
      "type": "string",
      "format": "uri"
    },
  }
}
```

Note: that the File component runs on the client side, and it needs to post the image to the route `/api/upload?filename=...` so if you want to change/remove that route, please make sure to adjust the code in File component accordingly.
