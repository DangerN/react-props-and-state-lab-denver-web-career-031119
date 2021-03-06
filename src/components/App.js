import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onFindPetsClick = () => {
    let fetchPath = `/api/pets${(this.state.filters.type !== 'all') ? `?type=${this.state.filters.type}` : ''}`
    fetch(fetchPath)
      .then(response => response.json())
      .then(response => {this.setState({pets: response})})
  }

  onAdoptPet = (id) => {
    let newState = this.state.pets.map(pet => {
       if(pet.id === id) {
         pet.isAdopted = true
       }
       return pet
    })
    this.setState({pets: newState})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
               />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
