// /src/MyCustomString.js

import React, { useState }  from 'react'
import imageUrlBuilder from '@sanity/image-url'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";

import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: `2022-01-10`})
const {dataset, projectId, useCdn} = client.clientConfig

const builder = imageUrlBuilder({projectId, dataset, useCdn})

function urlFor(source) {
  return builder.image(source)
}

const cardImageStyle = {
  width: "100%!important",
  border: "5px solid green"
}
 

// Import UI components from Sanity UI
import { TextInput, Stack, Label, Grid, Card, Text, Flex, Box } from '@sanity/ui'

export const CardLightboxImage = React.forwardRef((props, ref) => {
  
  return (
    <SimpleReactLightbox>
      <Grid columns={[1, 2, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
        <Card column={1}>
          <SRLWrapper>
            <img width={"100%"} src={urlFor(props.parent.cardImage).url()} />
          </SRLWrapper>
        </Card>
        <Card marginLeft={[2, 2, 3, 5]}>
          <Stack padding={0} space={[5, 5, 5, 6]}>
            <Stack padding={0} space={[3, 3, 2, 2]}>
              <Label size={2}>Name</Label>
              <Text size={[2, 2, 3, 4]} weight={"bold"}>{props.parent.name}</Text>
            </Stack>
            <Stack padding={0} space={[3, 3, 2, 2]}>
              <Label size={2}>Card text</Label>
              <Text size={[2, 2, 2, 3]} weight={"regular"}>
                <div dangerouslySetInnerHTML={{ __html: props.parent.cardText }}></div>
              </Text>
            </Stack>
            <Stack padding={0} space={[3, 3, 2, 2]}>
              <Label size={2}>Stats</Label>
              <Grid columns={[1, 1, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
                {props.parent.cost && <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Cost: {props.parent.cost}</Text></Card>}
                  {props.parent.threat && <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Threat: {props.parent.threat}</Text></Card>}
                <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Willpower: {props.parent.willpower}</Text></Card>
                <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Attack: {props.parent.attack}</Text></Card>
                <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Defense: {props.parent.defense}</Text></Card>
                <Card radius={2}
                  shadow={1}
                  tone="primary" padding={3}><Text align="center">Health: {props.parent.health}</Text></Card>

              </Grid>

        
            </Stack>
          </Stack>
        </Card>

      </Grid>
      {/*       <Stack space={2}>
        <Label>{props.type.title}</Label>
        <TextInput ref={ref} value={props.value} />
        <SRLWrapper>
        
        
        
        </SRLWrapper>
      </Stack> */}
    </SimpleReactLightbox>
  )
}
)

// Create the default export to import into our schema
export default CardLightboxImage