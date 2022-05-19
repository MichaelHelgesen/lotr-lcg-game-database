import React, { useState } from "react";
import CardListComponent from "./CardListComponent";
import CardDialog from "./CardDialog";
import {
  Card,
  Text,
  Inline,
  Box,
  Autocomplete,
  SearchIcon,
} from "@sanity/ui";

export const CardSearch = React.forwardRef((props, ref) => {
  const {
    cardList,
    packList,
    traitsList,
    deckInformation,
    sphereList,
    //setDeckList,
    size,
    value,
    onChange,
    //deckList,
    filterList,
    selectValue,
    setSelectValue,
  } = props;
  const references = value.map((reference) => reference._ref);

  const [open, setOpen] = useState(false);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const selectedCard = cardList.filter((card) => card._id == selectValue);

  return (
    <Card radius={0} padding={0} marginTop={3}>
      <Autocomplete
        radius="0"
        // custom search filter
        filterOption={(query, option) =>
          option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        }
        fontSize={[1]}
        icon={SearchIcon}
        openButton
        // options with `payload`
        options={cardList.map((card) => ({ ...card, value: card._id }))}
        padding={[3]}
        placeholder="Type to find card in cardpool …"
        // custom option render function
        renderOption={(option) => {
          return (
            <Box paddingX={2} paddingY={1}>
                <Inline>
              <Text
              size={1}
                style={{
                  color:
                    option.sphere._ref == "lore"
                      ? "green"
                      : option.sphere._ref == "tactics"
                      ? "red"
                      : option.sphere._ref == "neutral"
                      ? "gray"
                      : option.sphere._ref == "spirit"
                      ? "blue"
                      : "purple",
                }}
              >{`${option.name}`}
              </Text><Text muted={true} size={1} >&nbsp;-&nbsp;{option.cardType._ref}, {packList.filter(pack => pack._id == option.pack._ref).map(obj => obj.name)}</Text>
              </Inline>
            </Box>
          );
        }}
        // custom value render function
        renderValue={(value, option) => option?.name || value}
        value={selectValue}
        onSelect={(value) => {
          setSelectValue(value);
          onOpen();
        }}
      />
      <CardDialog
        //deckList={deckList}
        traitsList={traitsList}
        sphereList={sphereList}
        //setDeckList={setDeckList}
        cardList={cardList}
        card={selectedCard[0]}
        onClose={onClose}
        open={open}
        deckInformation={deckInformation}
        size={size}
        value={value}
        onChange={onChange}
        setOpen={setOpen}

      />
    </Card>
  );
});

export default CardSearch;
