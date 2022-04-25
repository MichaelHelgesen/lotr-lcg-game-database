import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import CardListComponentDeckQuantity from './CardListComponentQuantity';
import CardDialog from './CardDialog';
import {
    TextInput,
    Stack,
    Label,
    Grid,
    Card,
    Text,
    Button,
    Inline,
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

export const CardListDeckComponent = React.forwardRef((props, ref) => {
    const { card, cardList, deckList, setDeckList, value, onChange, size } = props
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
        <Card padding={1}>
            <Box>
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
                    fallbackPlacements={['top', 'left', "bottom"]}
                    placement="right"
                    portal
                >
                    <Text onClick={onOpen} size={size}>{value[value.map(obj => obj._key).indexOf(card._id)].quantity}x&nbsp;{card.name}</Text>
                </Tooltip>
            </Box>
            <CardDialog cardList={cardList} setDeckList={setDeckList} deckList={deckList} card={card} onClose={onClose} open={open} size={size} value={value} onChange={onChange} setOpen={setOpen} />
        </Card>
    )
})

export default CardListDeckComponent