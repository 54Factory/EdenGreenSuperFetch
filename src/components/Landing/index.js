import React from 'react';

const LandingPage = ({history}) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            {/* <img
              className="ui image massive"
              src="/assets/anonymousProfile200px.png"
              alt="logo"
            /> */}
            <div className="content">SuperFetch</div>
          </h1>
          <div onClick={() => history.push('/dashboard')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
