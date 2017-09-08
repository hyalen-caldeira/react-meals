import { combineReducers } from 'redux'

import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR
} from '../actions'

const initialCalendarState = {
    sunday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    monday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    tuesday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    wednesday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    thursday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    friday: {
        breakFast: null,
        lunch: null,
        dinner: null
    },
    saturday: {
        breakFast: null,
        lunch: null,
        dinner: null
    }
}

function food (state = {}, action) {
    switch (action.type) {
        case ADD_RECIPE:
            const { recipe } = action

            return {
                ...state,
                [recipe.label]: recipe
            }
        default:
            return state
    }
}

function calendar (state = initialCalendarState, action) {
    const {day, recipe, meal} = action

    switch(action.type) {
        case ADD_RECIPE:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label,
                }
            }
        case REMOVE_FROM_CALENDAR:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: null,
                }
            }
        default:
            return state;
    }
}

export default combineReducers({food, calendar})