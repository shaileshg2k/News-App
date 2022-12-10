import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className="mb-5 mb-5 text-center">

        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

