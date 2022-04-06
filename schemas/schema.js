// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
//const sanityClient = require('@sanity/client')

import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: `2022-01-10`})
const {dataset, projectId, useCdn} = client.clientConfig

const query = '*[_type == "card" && pack._ref == $setPack] {name, pack, _id}'
const params = { setPack: "Core" }


/* client.fetch(query, params).then((cards) => {
  cards.forEach((card, index) => {
    console.log(card)
    console.log(`${card.name} ${card.pack._ref} ${card._id}`)
    client.patch("Core")
      .setIfMissing({ cards: [] })
      .insert("after", "cards[-1]", [
        { _key: `${index + 1}`, _ref: card._id, _type: "reference" }
      ])
      .commit()

  })
}) */


/* client.fetch(query, params).then((cards) => {
  cards.forEach((card) => {
    console.log(`${card.name} ${card.pack._ref}`)
  })
})  */

/* client.patch("Core")
.setIfMissing({cards: []})
.insert("after", "cards[-1]", [
  getCards()
])
.commit() */

/* const cardsToRemove = ["cards[0]"]
client.patch("Core").unset(cardsToRemove).commit() */

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import CardLightboxImage from '../src/components/CardLightboxImage'
import StarRating from '../src/components/StarRating'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      type: 'document',
      name: 'card',
      title: "Cards",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          name: 'custom',
          type: 'string',
          inputComponent: CardLightboxImage
        },
        {
          name: 'rating',
          type: 'number',
          inputComponent: StarRating
        },
        {
          name: 'cardImage',
          type: 'image',
          readOnly: true
        },
        {
          name: 'cardText',
          type: 'text',
          readOnly: true
        },
        {
          name: 'traits',
          type: 'array',
          of: [{
            type: "reference",
            weak: true,
            to: {
              type: "trait",
            }
          }],
          readOnly: true
        },
        {
          name: 'cardType',
          type: 'reference',
          weak: true,
          to: {
            type: "cardType"
          },
          readOnly: true
        },
        {
          name: 'sphere',
          type: 'reference',
          weak: true,
          to: [{ type: 'sphere' }],
          readOnly: true
        },
        {
          name: 'cost',
          type: 'string',
          readOnly: true
        },
        {
          name: 'threat',
          type: 'number',
          readOnly: true
        },
        {
          name: 'willpower',
          type: 'number',
          readOnly: true
        },
        {
          name: 'attack',
          type: 'number',
          readOnly: true
        },
        {
          name: 'defense',
          type: 'number',
          readOnly: true
        },
        {
          name: 'health',
          type: 'number',
          readOnly: true
        },
        {
          name: 'cardNumber',
          type: 'string',
          readOnly: true
        },
        {
          name: 'isUnique',
          type: 'boolean',
          readOnly: true
        },
        {
          name: 'quantity',
          type: 'number',
          readOnly: true
        },
        {
          name: 'deckLimit',
          type: 'number',
          readOnly: true
        },
        {
          name: 'illustrator',
          type: 'string',
          readOnly: true
        },
        {
          name: 'hasErrata',
          type: 'boolean',
          readOnly: true
        },
        {
          name: 'position',
          type: 'number',
          readOnly: true
        },
        {
          name: 'url',
          type: 'string',
          readOnly: true
        },
        {
          name: 'imageSrc',
          type: 'string',
          readOnly: true
        },
        {
          name: 'cardFlavor',
          type: 'text',
          readOnly: true
        },
        {
          name: 'pack',
          type: 'reference',
          weak: true,
          to: [{ type: 'pack' }],
          readOnly: true
        },
        {
          title: 'Erfaringer med kortet',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'sphere',
      title: "Spheres",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'cardType',
      title: "Card types",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'trait',
      title: "Traits",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'pack',
      title: "Packs",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'scenario',
      title: "Scenarios",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          name: 'pack',
          type: 'reference',
          weak: true,
          to: [{ type: 'pack' }],
          readOnly: true
        },
        {
          name: 'encounter',
          type: 'array',
          readOnly: true,
          of: [{
            type: "reference",
            weak: true,
            to: [{ type: 'encounter' }]
          }],
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'encounter',
      title: "Encounters",
      fields: [
        {
          name: 'name',
          type: 'string',
          readOnly: true
        },
        {
          name: 'scenario',
          type: 'array',
          readOnly: true,
          of: [{
            type: 'reference',
            weak: true,
            to: { type: "scenario" }
          }],
        },
        {
          title: 'Erfaringer',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'deck',
      title: "Decks",
      fields: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: "scenarios",
          title: "Laget til følgende scenario",
          type: "array",
          of: [{
            type: "reference",
            to: {
              type: "scenario"
            }
          }]
        },
        {
          name: "spheres",
          title: "Spheres",
          type: "array",
          of: [{
            type: "reference",
            to: {
              type: "sphere"
            }
          }]
        },
        {
          name: "cards",
          title: "Kort",
          type: "array",
          of: [{
            type: "reference",
            to: {
              type: "card"
            }
          }]
        },
        {
          title: 'Beskrivelse',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: 'document',
      name: 'journal',
      title: "Game journal",
      fields: [
        {
          name: "date",
          type: "date",
          title: "Dato"
        },
        {
          name: "decks",
          type: "array",
          of: [
            {
              type: "reference",
              to: {
                type: "deck"
              }
            }
          ]
        },
        {
          name: "scenario",
          type: "array",
          title: "Scenario",
          of: [
            {
              type: "reference",
              to: {
                type: "scenario"
              }
            }
          ]
        },
        {
          title: 'Beskrivelse',
          name: 'text',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      type: "document",
      name: "rulesQuestions",
      title: "Rules questions",
      fields: [
        {
          title: "Question",
          type: "string",
          name: "question"
        },
        {
          title: "Answer",
          type: "text",
          name: "answer"
        },
        {
          type: "array",
          name: "relevantReferences",
          title: "References",
          of: [
            {
              type: "reference",
              to: [
                {
                  type: "card",
                },
                {
                  type: "sphere",
                },
                {
                  type: "encounter"
                },
                {
                  type: "pack"
                },
                {
                  type: "cardType"
                },
                {
                  type: "trait"
                },
                {
                  type: "scenario"
                },
                {
                  type: "deck"
                },
                {
                  type: "journal"
                }
              ]
            }
          ]
        }
      ]
    }
  ]),
})
