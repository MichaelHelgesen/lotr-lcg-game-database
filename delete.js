const sanityClient = require('@sanity/client')

import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: `2022-01-10`})
const {dataset, token, projectId, useCdn} = client.clientConfig

/* const referencesToRemove = ["cardImage.asset"]
client.patch("02003")
.unset(referencesToRemove)
.commit() */

client.delete({
    query: `*[_type == "card"]
  `
})


/* client.delete('d3f08de4-4ec1-4836-82a8-810d166a590b')
  .then(result => {
    console.log('deleted image asset', result)
  }) */