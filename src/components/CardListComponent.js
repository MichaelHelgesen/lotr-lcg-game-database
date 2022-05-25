import React, { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import CardListComponentQuantity from "./CardListComponentQuantity";
import CardDialog from "./CardDialog";
import CardTooltip from "./CardTooltip";
import { Card, Text, Flex, Box } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;
const builder = imageUrlBuilder({ projectId, dataset, useCdn });
function urlFor(source) {
  return builder.image(source);
}

export const CardListComponent = React.forwardRef((props, ref) => {
  const {
    card,
    cardList,
    traitsList,
    sphereList,
    value,
    deckList,
    deckInformation,
    onChange,
    size,
    setDeckList,
  } = props;
  const [open, setOpen] = useState(false);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const addSymbol = (name) => {
    let imageUrl;
    let width;
    switch (name) {
      case "lore":
        imageUrl = "https://res.cloudinary.com/mikkesblogg/image/upload/v1653041329/lotr-database/LotR-LCG_Lore_r5f0nv.svg";
        width = "20px"
        break;
      case "spirit":
        imageUrl = "https://res.cloudinary.com/mikkesblogg/image/upload/v1653041329/lotr-database/LotR-LCG_Spirit_cfszzw.svg";
        width = "20px"
        break;
      case "leadership":
        imageUrl = "https://res.cloudinary.com/mikkesblogg/image/upload/v1653041329/lotr-database/LotR-LCG_Leadership_kotzlx.svg";
        width = "17px"
        break;
      case "tactics":
        imageUrl = "https://res.cloudinary.com/mikkesblogg/image/upload/v1653041329/lotr-database/LotR-LCG_Tactics_akhxi6.svg";
        width = "20px"
        break;
      default:
        imageUrl = "https://res.cloudinary.com/mikkesblogg/image/upload/v1653294613/lotr-database/neutral_b9nhqd.png"
        width = "15px"
    }
    return <img src={imageUrl} width={width} />
  };

  return (
    <Card shadow={1} padding={2}>
      <Flex align="center">
        <CardListComponentQuantity
          cardList={cardList}
          deckList={deckList}
          setDeckList={setDeckList}
          card={card}
          deckInformation={deckInformation}
          size={size}
          deckLimit={card.deckLimit}
          value={value}
          cardId={card._id}
          onChange={onChange}
        />
        <Box flex={"auto"}>
          <CardTooltip
            card={card}
            size={size}
            setOpen={setOpen}
            traitsList={traitsList}
          />
        </Box>
        <Box>
          <Flex align="flex-end" justify="space-between">
            <Box style={{ width: "25px" }} align={"center"}>
              <Text size={[1]} align="center">
               {addSymbol(card.sphere._ref)}
                {/* card.sphere._ref.slice(0, 1) */}
              </Text>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
              <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
                {card.cardType._ref.slice(0, 1)}
              </Flex>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
            <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
            {card.cost || card.threat}
              </Flex>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
            <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
            {card.willpower}
              </Flex>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
            <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
            {card.attack}
              </Flex>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
            <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
            {card.defense}
              </Flex>
            </Box>
            <Box style={{ width: "25px" }} align={"center"}>
            <Flex align="center" style={{height:"100%", justifyContent:"center", fontSize:"0.8125rem", display:"flex", alignItems: "center"}}>
            {card.health}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <CardDialog
        deckList={deckList}
        traitsList={traitsList}
        sphereList={sphereList}
        deckInformation={deckInformation}
        setDeckList={setDeckList}
        cardList={cardList}
        card={card}
        onClose={onClose}
        open={open}
        size={size}
        value={value}
        onChange={onChange}
        setOpen={setOpen}
      />
    </Card>
  );
});

export default CardListComponent;
