import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'

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
  submitSomeActions = () => {
    // this.props.dispatch(addRecipe({}))
    this.props.add({})
  }

  render() {
    console.log('Props', this.props)

    return (
      <div>
        Hello word ...
      </div>
    )
  }
}

// Convert the previous format (reducers/indes.js) to an array. React works better with arrays (because the map) and Redux with objects
function mapStateToProps (calendar) {
  const dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = 
          calendar[day][meal] ?
            calendar[day][meal] :
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