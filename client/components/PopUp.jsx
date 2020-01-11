import React from 'react'
import { Link } from 'react-router-dom'


class PopUp extends React.Component {
  constructor() {
    super()
    this.state = {
      showPopUp: false
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.interval = setTimeout(this.popUp, 10000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  popUp = () => {
    this.setState({ showPopUp: true })
  }

  closeModal = () => {
    this.setState({
      showPopUp: false
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showPopUp &&
          <div className="modal popup" style={{ display: 'block' }} id="myModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content popup-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Become A Forage Extraordinaire!</h5>

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  You'll get access to more options and goodies if you sign in or register!
                </div>

                <div className="modal-footer">
                  <Link className="btn bg-main-reverse" to="/login">Login</Link>

                  <Link className="btn bg-main-reverse" to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default PopUp
