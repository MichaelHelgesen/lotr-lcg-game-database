// /src/MyCustomString.js

import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FormField } from '@sanity/base/components'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'


export const StarRating = React.forwardRef((props, ref) => {
    const {
        type,
        value,
        readOnly,
        placeholder,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange,
    } = props

    const handleClick = React.useCallback(
        // useCallback will help with performance
        (event) => {
            const inputValue = event
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange] // Verdien å se etter for oppdatering
    )

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        >
            <Rating
                //ref={ref}
                readOnly={readOnly}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={handleClick}
                ratingValue={value}
                showTooltip={true}
                allowHalfIcon={true}
                tooltipArray={["Terrible", "Terrible +", "Bad", "Bad +", "Average", "Average +", "Great", "Great +", "Awesome", "Awesome +"]}
                tooltipDefaultText={"Not rated"}
                />
        </FormField>
    )
}
)

// Create the default export to import into our schema
export default StarRating