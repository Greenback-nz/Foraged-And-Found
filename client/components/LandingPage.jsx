import React from 'react'

export class LandingPage extends React.Component {

  constructor() {
    super()
    this.state = {
      showLandingPage: true
    }
  }

  componentDidMount() {
    anime.timeline({ loop: false })
        .add({
            targets: '.ml8 .circle-container',
            scale: [0, 1],
            duration: 1100,
            easing: "easeInOutExpo",
            offset: '-=1000'
        })
        .add({
            targets: '.ml8 .circle-dark',
            scale: [0, 1],
            duration: 1100,
            easing: "easeOutExpo",
            offset: '-=600'
        })
        .add({
            targets: '.ml8 .letters-left',
            scale: [0, 1],
            duration: 1500,
            offset: '-=550'
        })
        .add({
            targets: '.ml8 .sub-title',
            scale: [0, 1],
            duration: 1500,
            offset: '-=550'
        })
        .add({
            targets: '.ml8 .bang',
            scale: [0, 1],
            rotateZ: [45, 15],
            duration: 1200,
            offset: '-=1000'
        })

      anime({
          targets: '.ml8 .circle-dark-dashed',
          rotateZ: 360,
          duration: 10000,
          easing: "linear",
          loop: true
      })
  }

  closeLandingPage = () => {
    this.setState({
      showLandingPage: false
    })
    localStorage.setItem('UrbanForagerRemembersMe', 'true') //set a local storage item in order to skip the landing page 
  }

  render() {
      return (
        <React.Fragment>
            {this.state.showLandingPage &&
                <div className="modal landing-page" style={{ display: 'block' }} data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="full-screen flex-container-center">
                        <div className='row center-animation'>
                            <div className='col-8' onClick={this.closeLandingPage}>
                              <h1 className="ml8">
                                <span className="letters-container">
                                    <span className="letters letters-left">Foraged &amp; Found</span>
                                    <br></br>
                                    <span className='sub-title' onClick={this.closeLandingPage}>
                                        Click to Enter!
                                    </span>
                                </span>
                                <span className="circle circle-white"></span>
                                <span className="circle circle-dark"></span>
                                <span className="circle circle-container"><span className="circle circle-dark-dashed"></span></span>
                              </h1>
                            </div>
                        </div>
                    </div>
                </div>
              }
        </React.Fragment>
      )
  }
}


export default LandingPage
