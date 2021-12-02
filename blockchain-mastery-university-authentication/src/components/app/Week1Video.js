// TODO: Refactor me with a reusable WISTA component
import React, { Component } from 'react';

const styles = {
  wrapper: {
    maxWidth: '800px'
  }
}

class WelcomeVideo extends Component {
  async componentWillMount() {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = "https://fast.wistia.com/embed/medias/vtgypktqkd.jsonp";
    script1.async = true;

    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }

  render() {
    return(
      <div style ={styles.wrapper}>
        <div className="wistia_responsive_padding" style={{'padding': '56.25% 0 0 0', 'position': 'relative'}}>
          <div className="wistia_responsive_wrapper" style={{'height': '100%', 'left': '0', 'position': 'absolute', 'top': '0', 'width': '100%'}}>
            <div className="wistia_embed wistia_async_vtgypktqkd videoFoam=true" style={{'height': '100%', 'position': 'relative', 'width': '100%'}}>&nbsp;</div>
          </div>
        </div>
      </div>
    )
  }
}

export default WelcomeVideo;

