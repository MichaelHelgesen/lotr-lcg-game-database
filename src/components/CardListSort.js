import React, { useState, useEffect } from "react";
import CardListComponent from "./CardListComponent";
import styles from "../components/cardListSort.css";
import {
  Text,
  Flex,
  Box,
} from "@sanity/ui";

export const CardListSort = React.forwardRef((props, ref) => {
  const {
    cardList,
    setCardList,
    value,
    sortParameter,
    setSortParameter,
    replaceSpecialCharacters,
  } = props;

  const references = value.map((reference) => reference._ref);

  useEffect(() => {
    setCardList((prevState) => {
      /* const newArr = prevState.map((prevObj) => {
        return {
          ...prevObj,
          numberInDeck: references.filter(
            (reference) => reference === prevObj._id
          ).length,
        };
      }); */
      return [...prevState].sort((a, b) => {
        let nameA;
        let nameB;
        if (typeof a[sortParameter.param] == "object") {
          nameA = a[sortParameter.param]._ref.toLowerCase();
          nameB = b[sortParameter.param]._ref.toLowerCase();
        } else if (sortParameter.param == "numberInDeck") {
          nameA =
            value.map((obj) => obj._key).indexOf(a._id) != -1
              ? value[value.map((obj) => obj._key).indexOf(a._id)].cardQuantity
              : undefined;
          nameB =
            value.map((obj) => obj._key).indexOf(b._id) != -1
              ? value[value.map((obj) => obj._key).indexOf(b._id)].cardQuantity
              : undefined;
        } else if (sortParameter.param == "cost") {
          a[sortParameter.param]
            ? a[sortParameter.param] != "X"
              ? (nameA = Number(a.cost) || 0)
              : (nameA = 100)
            : (nameA = a.threat);
          b[sortParameter.param]
            ? b[sortParameter.param] != "X"
              ? (nameB = Number(b.cost) || 0)
              : (nameB = 100)
            : (nameB = b.threat);
        } else if (typeof a[sortParameter.param] == "string") {
          nameA = replaceSpecialCharacters(
            a[sortParameter.param].toLowerCase()
          );
          nameB = replaceSpecialCharacters(
            b[sortParameter.param].toLowerCase()
          );
        } else {
          nameA = a[sortParameter.param];
          nameB = b[sortParameter.param];
        }
        if (
          typeof nameA != "number" &&
          typeof nameA != "string" &&
          nameA === nameB
        ) {
          return 0;
        } else if (typeof nameA != "number" && typeof nameA != "string") {
          return 1;
        } else if (typeof nameB != "number" && typeof nameA != "string") {
          return -1;
        } else if (nameA < nameB) {
          return sortParameter.state ? -1 : 1;
        } else if (nameA > nameB) {
          return sortParameter.state ? 1 : -1;
        } else {
          return 0;
        }
      });
    });
  }, [sortParameter]);

  const sortList = (sortParam) => {
    //setOrder((prevState) => !prevState);
    if (sortParameter.param == "") {
      setSortParameter((prevState) => {
        return {
          ...prevState,
          param: sortParam,
        };
      });
    } else if (sortParameter.param != sortParam) {
      setSortParameter((prevState) => {
        return {
          state: true,
          param: sortParam,
        };
      });
    } else {
      setSortParameter((prevState) => {
        return {
          ...prevState,
          state: !prevState.state,
        };
      });
    }
  };

  const createSortEl = (parameter, text) => {
    return (
      <Box style={{width:"25px"}} align={"center"}
        onClick={() => {
          sortList(parameter);
        }}
      >
        {sortParameter.param == parameter ? (
          <Flex direction={"column"} align={"center"}>
            <Text weight={"bold"} align={"center"} size={1}>
              {text}
            </Text>
            <Box style={{ position: "relative" }}>
              {sortParameter.state ? (
                <span
                  style={{ width: "10px" }}
                  className={styles.caretSmall}
                ></span>
              ) : (
                <span
                  style={{ width: "10px" }}
                  className={`${styles.caretSmall} ${styles.smallTop}`}
                ></span>
              )}
            </Box>
          </Flex>
        ) : (
          <Text size={1} align={"center"}>{text}</Text>
        )}
      </Box>
    );
  };

  return (
    <Flex  padding={2} marginTop={2}>
      <Box 
        style={{width: "100px"}}
        onClick={() => {
          sortList("numberInDeck");
        }}
      >
        {sortParameter.param == "numberInDeck" ? (
          <Text weight={"bold"} size={1}>
            Qty
            {sortParameter.state ? (
              <span className={styles.caret}></span>
            ) : (
              <span className={`${styles.caret} ${styles.top}`}></span>
            )}
          </Text>
        ) : (
          <Text size={1}>Qty</Text>
        )}
      </Box>
      <Box
       flex={"auto"}
        onClick={() => {
          sortList("name");
        }}
      >
        {sortParameter.param == "name" ? (
          <Text weight={"bold"} size={1}>
            Name
            {sortParameter.state ? (
              <span className={styles.caret}></span>
            ) : (
              <span className={`${styles.caret} ${styles.top}`}></span>
            )}
          </Text>
        ) : (
          <Text size={1}>Name</Text>
        )}
      </Box>
      <Box >
        <Flex align="flex-end" justify="space-between">
          {createSortEl("sphere", "S")}
          {createSortEl("cardType", "T")}
          {createSortEl("cost", "T/C")}
          {createSortEl("willpower", "W")}
          {createSortEl("attack", "A")}
          {createSortEl("defense", "D")}
          {createSortEl("health", "H")}
        </Flex>
      </Box>
    </Flex>
  );
});

export default CardListSort;
