const LOTR_LCG_API_URL = 'https://ringsdb.com/api/public/scenario/3'
//const LOTR_LCG_API_URL = 'https://ringsdb.com/api/public/cards/Core'


const flatten = require('lodash/flatten');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
//const sanityClient = require('@sanity/client')
const nanoId = require("nanoid")
const path = require("path")
const fs = require('fs')

const sanityClient = require('@sanity/client')
const client = sanityClient.withConfig({apiVersion: `2022-01-10`})
const {dataset, token, projectId, useCdn} = client.clientConfig

function transformSets(externalCard) {
  const scenarioId = externalCard.nameCanonical
  const packId = externalCard.pack_code ? externalCard.pack_code : externalCard.pack.slice(0, externalCard.pack.indexOf(" "))
  const sphereId = externalCard.sphere_code
  const cardId = externalCard.code
  const cardTypeId = externalCard.type_code
  const traits = externalCard.traits ? externalCard.traits.split(" ").map(trait => trait.slice(0, trait.length - 1)) : []
  let transaction = client.transaction()

  // Create sphere
  if (sphereId) {
    client.fetch(`*[_id == "${sphereId}"]`)
      .then(data => {
        if (!data.length) {
          console.log("creating sphere")
          const sphere = {
            _type: 'sphere',
            _id: sphereId,
            name: externalCard.sphere_name,
          }
          transaction.createOrReplace(sphere)
          transaction.commit()
        } else {
          console.log("sphere already exists")
        }
      })
  }

  // Creating traits
  if (traits.length) {
    console.log(traits)
    traits.forEach(trait => {
      client.fetch(`*[_id == "${trait.replace(/[^A-Z0-9]+/ig, "-")}"]`)
        .then(data => {
          if (!data.length) {
            console.log("creating trait")
            const cardTrait = {
              _type: 'trait',
              _id: trait.replace(/[^A-Z0-9]+/ig, "-"),
              name: trait,
            }
            transaction.createOrReplace(cardTrait)
            transaction.commit()
          } else {
            console.log("trait already exists")
          }
        })
    })
  }

  // Create type
  if (cardTypeId) {
    client.fetch(`*[_id == "${cardTypeId}"]`)
      .then(data => {
        if (!data.length) {
          console.log("creating card type")
          const cardType = {
            _type: 'cardType',
            _id: cardTypeId,
            name: externalCard.type_name,
          }
          transaction.createOrReplace(cardType)
          transaction.commit()
        } else {
          console.log("card type already exists")
        }
      })
  }

  // Creating pack
  if (packId) {
    client.fetch(`*[_id == "${packId}"]`)
      .then(data => {
        if (!data.length) {
          console.log("creating pack")
          const pack = {
            _type: 'pack',
            _id: packId,
            name: externalCard.pack_name,
          }
          transaction.createOrReplace(pack)
          transaction.commit()
        } else {
          console.log("pack already exists")
        }
      })
  }


  // Creating card
  if (cardId && !externalCard.encounters) {
    const filePath = `https://ringsdb.com${externalCard.imagesrc}`
    client.fetch(`*[_id == "${cardId}"]`)
      .then(data => {
        if (!data.length) {
          console.log("creating card")
          const card = {
            _id: cardId,
            _type: 'card',
            name: externalCard.name,
            cardText: externalCard.text,
            cardType: { _weak: true, _type: "reference", _ref: cardTypeId },
            cardNumber: externalCard.code,
            threat: externalCard.threat,
            willpower: externalCard.willpower,
            attack: externalCard.attack,
            defense: externalCard.defense,
            health: externalCard.health,
            position: externalCard.position,
            cardFlavor: externalCard.flavor,
            traits: externalCard.traits,
            cost: externalCard.cost,
            isUnique: externalCard.is_unique,
            quantity: externalCard.quantity,
            deckLimit: externalCard.deck_limit,
            illustrator: externalCard.illustrator,
            hasErrata: externalCard.has_errata,
            url: externalCard.url,
            imageSrc: externalCard.imagesrc,
            pack: { _weak: true, _type: "reference", _ref: packId },
            sphere: { _weak: true, _type: 'reference', _ref: sphereId },
            traits:
              traits.length ? traits.map(trait => {
                return { _weak: true, _key: nanoId.nanoid(), _type: 'reference', _ref: trait.replace(/[^A-Z0-9]+/ig, "-") }
              }) : []
            ,
          }
          transaction.createOrReplace(card)
          transaction.commit()

          fetch(filePath)
            .then(data => {
              data.arrayBuffer().then(function (buffer) {
                client.assets
                  .upload('image', Buffer.from(buffer, "binary"), {
                    filename: path.basename(filePath)
                  })
                  .then(imageAsset => {
                    return client
                      .patch(cardId)
                      .set({
                        cardImage: {
                          _type: 'image',
                          asset: {
                            _type: "reference",
                            _ref: imageAsset._id
                          }
                        }
                      })
                      .commit()
                  })
              })
            })
        } else {
          console.log("card already exists")
          client
            .patch(cardId)
            .set(
              { name: externalCard.name },
            )
            .commit()
            .then((updatedCard) => {
              console.log("Updated card")
            })
          fetch(filePath)
            .then(data => {
              data.arrayBuffer().then(function (buffer) {
                client.assets
                  .upload('image', Buffer.from(buffer, "binary"), {
                    filename: path.basename(filePath)
                  })
                  .then(imageAsset => {
                    return client
                      .patch(cardId)
                      .set({
                        cardImage: {
                          _type: 'image',
                          asset: {
                            _type: "reference",
                            _ref: imageAsset._id
                          }
                        }
                      })
                      .commit()
                  })
              })
            })
        }

      })
  }

  // Create scenario
  if (scenarioId) {
    console.log("Creating scenario :", scenarioId)
    const scenario = {
      _id: scenarioId,
      _type: 'scenario',
      name: externalCard.name,
      pack: { _weak: true, _type: "reference", _ref: packId },
      encounter:
        externalCard.encounters.map(encounter => {
          return { _weak: true, _key: nanoId.nanoid(), _type: "reference", _ref: `encounter-${encounter.id}-${encounter.code.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}` }
        })
    }
    transaction.createOrReplace(scenario)
    transaction.commit()
  }

  // Create encounters
  if (externalCard.encounters) {
    externalCard.encounters.forEach(encounter => {
      const encounterId = `encounter-${encounter.id}-${encounter.code.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`
      client.fetch(`*[_id == "${encounterId}"]`)
        .then(data => {

          // If encounter exist
          if (data.length) {
            console.log("encounter exists: ", encounterId)
            const { scenario } = data[0];

            // If scenario array is empty then create reference...
            if (!scenario.length) {
              console.log("scenario is empty, adding reference")
              client
                .patch(encounterId)
                .setIfMissing({ scenario: [] })
                .append("scenario", [{ _key: nanoId.nanoid(), _ref: scenarioId, _type: "reference", _weak: true }])
                .commit()
              //... else if scenario array contains references,
              // then check for match with current scenario
            } else {
              console.log("scenario is not empty, check if reference exists")
              const filterForScenario = scenario.filter(item => item._ref == scenarioId);
              if (!filterForScenario.length) {
                client
                  .patch(encounterId)
                  .setIfMissing({ scenario: [] })
                  .append("scenario", [{ _weak: true, _key: nanoId.nanoid(), _ref: scenarioId, _type: "reference", }])
                  .commit()
              }
            }
            // If encounter does't exist, create it.
          } else {
            console.log("encounter does not exist, creating encounter")
            const encounterObject = {
              _id: encounterId,
              _type: 'encounter',
              name: encounter.name,
              scenario: [{ _weak: true, _key: nanoId.nanoid(), _type: "reference", _ref: scenarioId }]
            }
            transaction.createOrReplace(encounterObject)
            transaction.commit()
          }
        })
    })
  }
}

fetch(LOTR_LCG_API_URL)
  .then(res => res.json())
  .then(cards => {
    console.log(typeof (cards))
    if (typeof (cards) == "object") {
      let cardArray = [];
      cardArray.push(cards)
      cardArray.map(transformSets)
    } else {
      cards.map(transformSets)
    }
  }
  )