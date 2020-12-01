import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'

export class QueryInput extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      lastSearches: [],
      selectedVis: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(e) {
    this.setState({query: e.target.value})
  }

  //@Natalie - does this need to be async?
  async handleSubmit(e) {
    e.preventDefault()
    await this.props.getQueryVis(this.state.query)
    await this.props.getResult(this.state.query)
    this.setState({
      ...this.state,
      lastSearches: [...this.state.lastSearches, this.state.query],
      selectedVis: this.state.query
    })
    this.setState({...this.state, query: ''})
  }

  async handleSelect(e) {
    await this.setState({
      ...this.state,
      selectedVis: e.target.getAttribute('value')
    })
    this.props.getQueryVis(this.state.selectedVis)
  }
  render() {
    // console.log("PROPS ", this.props)
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <textarea
                  value={this.state.query}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Query"
                  id="textarea1"
                  className="materialize-textarea"
                />
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
          <div className="col s6">
            <label>Query History</label>
            <ul className="collection">
              {this.state.lastSearches &&
                this.state.lastSearches.map(search => {
                  return (
                    <li
                      key={search}
                      value={search}
                      onClick={this.handleSelect}
                      className="collection-item"
                      id={
                        this.state.selectedVis === search
                          ? 'highlighted'
                          : 'notHighlighted'
                      }
                    >
                      {search}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="card ">
            <div className="card-content ">
              Current search: {this.state.selectedVis}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  queryVis: state.queryVis,
  result: state.result
})

const mapDispatchToProps = dispatch => ({
  getQueryVis: queryStr => {
    dispatch(fetchQueryVis(queryStr))
  },
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  },
  selectQueryVis: queryStr => {
    dispatch(selectQueryVis(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryInput)