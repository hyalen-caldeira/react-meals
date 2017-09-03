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

export default calendar