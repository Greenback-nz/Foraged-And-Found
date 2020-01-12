import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { deleteItem, getUserData } from '../apis/items'
import { setCurrentItem } from '../actions/items'
// import { connect } from 'react-redux'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.items,
      data: null
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) getUserData(this.props.auth.user.user_name).then(data => this.setState({data}))
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      console.log(prevProps.items)
      console.log(this.props.items)
      this.setState({ items: this.props.items })
    }
  }

  handleDelete = (id) => {
    deleteItem(id)
      .then(() => {
        this.refreshPage()
      })
  }

  refreshPage = () => {
    window.location.reload()
  }

  render() {
    return (
      <div className='scrollable'>
        <div className='container rounded bg-main mb-3 item-cont  w-100'>
          <div className='container-fluid rounded bg-main mb-3 px-0 w-100'>
            <h3 className="list-heading">Listed Items</h3>
            <p className="list-paragraph">Click an image to find it on the map</p>
            <div className="row justify-content-center">
              <div className="col-centered w-100">
                <div className='container-fluid'>
                {this.state.items.map((item, i) => {
                  return (
                    <div key={i} className="card list-card text-left" style={{ alignItems: 'left' }} >
                      <div
                        className="ListItemItems text-left"
                        onClick={() => {
                          this.props.dispatch(setCurrentItem(item))
                          if (window.innerWidth < 992) scroll(0,0)
                      }}>
                        <div className="itemListImgDiv">
                          <img className="card-img-top my-3" src={item.image == null ? `/images/icon${item.category_id}.svg` : item.image} alt={item.item_name} style={{ 'MaxWidth': 2 + 'rem' }} />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{item.item_name}</h5>
                          <h6><em>{item.suburb}</em></h6>
                          <p className="card-text">{item.description}</p>


                          {(this.props.auth.isAuthenticated && item.user_id == this.state.data) &&
                            <>
                              <Link to={`/update/${item.id}`}>
                                <button className="btn bg-main-reverse spacer list-button mx-0">Update</button>
                              </Link>
                              <button className="btn bg-main-reverse spacer list-button mx-0" onClick={() => window.confirm("Are you sure you wish to delete this item?") && this.handleDelete(item.id)}>Delete</button>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
                )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}
//
// const mapStateToProps = (state) => {
//   return {
//     items: state.items.items
//   }
// }

export default ItemList
// export default connect(mapStateToProps, {})(ItemList)
