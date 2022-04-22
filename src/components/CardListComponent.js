import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import CardListComponentQuantity from './CardListComponentQuantity';
import CardDialog from './CardDialog';
import {
    TextInput,
    Stack,
    Label,
    Grid,
    Card,
    Text,
    Button,
    Flex,
    Box,
    Dialog,
    Checkbox,
    Portal,
    Tooltip,
    Container
} from "@sanity/ui";
import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig
const builder = imageUrlBuilder({ projectId, dataset, useCdn })
function urlFor(source) {
    return builder.image(source)
}

export const CardListComponent = React.forwardRef((props, ref) => {
    const { card, value, onChange, size } = props
    const [open, setOpen] = useState(false)

    const onClose = React.useCallback(
        () => {
            setOpen(false)
        }, []
    );

    const onOpen = React.useCallback(
        () => {
            setOpen(true)
        }, []
    );
    return (
        <Card shadow={1} padding={2}>
            <Flex align="center">
                <CardListComponentQuantity size={size} deckLimit={card.deckLimit} value={value.length} cardId={card._id} quantityInDeck={card.quantityInDeck} onChange={onChange} />
                <Box flex="3">
                    <Tooltip
                        content={
                            <Container padding={2} width="0">
                                <Text muted size={1}>
                                    <Flex padding="4">
                                        <Card flex="1">
                                            <img src={urlFor(card.cardImage).width(100).height(100).fit("crop").crop("top").rect(120, 0, 270, 600).url()} />
                                        </Card>
                                        <Card flex="2" marginLeft={[2, 2, 3, 5]}>
                                            <Stack padding={0} space={[1]}>
                                                <Stack padding={0} space={[1]}>
                                                    <Text size={[2]} weight={"bold"}>{card.name}</Text>
                                                    <Text size={[1]} weight={"regular"}>{card.traits.map(trait => trait._ref + " ")}</Text>
                                                    <Text size={[1]} weight={"regular"}>{card.sphere._ref.slice(0, 1).toUpperCase() + card.sphere._ref.slice(1)}</Text>
                                                    <Text size={[1]} weight={"regular"}>{card.cardType._ref.slice(0, 1).toUpperCase() + card.cardType._ref.slice(1)}</Text>
                                                    <Flex>
                                                        <Text size={[1]} weight={"regular"}>{card.cost}</Text>
                                                        <Text size={[1]} weight={"regular"}>{card.health}</Text>
                                                        <Text size={[1]} weight={"regular"}>{card.attack}</Text>
                                                        <Text size={[1]} weight={"regular"}>{card.defense}</Text>
                                                        <Text size={[1]} weight={"regular"}>{card.willpower}</Text>
                                                    </Flex>
                                                    <Text size={[1]} weight={"regular"}>
                                                        <div dangerouslySetInnerHTML={{ __html: card.cardText }}></div>
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                        </Card>

                                    </Flex>
                                </Text>
                            </Container>
                        }
                        fallbackPlacements={['right', 'left']}
                        placement="top"
                        portal
                    >
                        <Text onClick={onOpen} size={size}>{card.name}</Text>
                    </Tooltip>
                </Box>
                <Box flex="1">
                        <Flex align="flex-end" justify="space-between">
                            <Box><Text size={[1]} align="center">{card.sphere._ref.slice(0,1)}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.cardType._ref.slice(0,1)}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.cost || card.threat}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.willpower}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.attack}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.defense}</Text></Box>
                            <Box><Text size={[1]} align="center">{card.health}</Text></Box>
                        </Flex>
                </Box>
            </Flex>
            <CardDialog card={card} onClose={onClose} open={open} size={size} value={value.length} onChange={onChange} setOpen={setOpen} />
        </Card>
    )
})

export default CardListComponent