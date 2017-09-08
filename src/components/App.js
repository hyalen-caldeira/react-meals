import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import { fetchRecipes } from '../utils/api'
import FoodList from './FoodList'

// import { addRecipe } from '../actions'

/* connect(mapStateToProps, mapDispatchToProps)(MyComponent)

mapStateToProps - 
If this argument is specified, the new component will subscribe to Redux store updates. This means that any time 
the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, 
which will be merged into the component’s props.”

In other words: the properties of the object returned from mapStateToProps() will be passed to the component as props! 
You can think of mapStateToProps() as just a function that lets connect() know how to map specific parts of the 
store’s state into usable props.
*/

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
  }

  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day,
    }))
  }

  closeFoodModal = () => {
    this.setState(() => ({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null,
    }))
  }

  searchFood = (e) => {
    if (!this.input.value) {
      return
    }

    e.preventDefault()

    this.setState(() => ({ loadingFood: true }))

    fetchRecipes(this.input.value)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })))
  }

  render() {
    console.log('Props', this.props)

    const { foodModalOpen, loadingFood, food } = this.state
    const { calendar, add, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>
        <ul className='meal-types'>
          {
            mealOrder.map((mealType) => (
              <li key={mealType} className='subheader'>
                {capitalize(mealType)}
              </li>
            ))
          }
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                        : <button onClick={() => this.openFoodModal({meal, day})} className='icon-btn'>
                          <CalendarIcon size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={(input) => this.input = input}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                        <ArrowRightIcon size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    <FoodList
                      food={food}
                      onSelect={(recipe) => {
                        add({ recipe, day: this.state.day, meal: this.state.meal })
                        this.closeFoodModal()
                      }}
                    />)}
                </div>}
          </div>
        </Modal>

      </div>
    )
  }
}

// Convert the previous format (reducers/index.js) to an array. React works better with arrays (because the map) and Redux with objects
function mapStateToProps ({calendar, food}) {
  const dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = 
          calendar[day][meal] ?
            food[calendar[day][meal]] :
            null

        return meals
      }, {})
    }))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}

// Connect this component to the store. See "Provider" in index.js
export default connect(mapStateToProps, mapDispatchToProps)(App)
/*
  state = {
    calendar : null
  }

  componentDidMount () {
    const { store } = this.props

    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      }
    }))

    this.input.value = ''
  }

  render() {
    return (
      <div>
        <input type='text' ref={(input) => this.input = input} placeholder="Monday's Breakfast">
        </input>
        <button onClick = {this.submitFood}>Submit</button>
        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    )
  }
}

export default App
*/