import React, { Component } from 'react';

class App extends Component {
  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>About</h1>
        </div>
        <p><strong>Conferoo is experimental software. Bugs are to be expected.</strong></p>
        <p>Conferoo is a digital platform for paperless conferences. It allows delegates to plan their agenda, consume curated content and interact with polls and feedback forms. Organisers use Conferoo Publisher to orchestrate the whole experience.</p>
        <p>You must have Conferoo Core running in order to use this Publisher app. You will also need at least one front-end app for delegates, which could be a web or native app.</p>
        <p>Note that some tasks, like user management, currently cannot be controlled with this application and need direct edits to the database.</p>

        <h2>Features</h2>
        <p>Conferoo Publisher splits conference management up into strands:</p>
        <ul>
          <li><strong>Events</strong>, which delegates can browse and save to a personalised agenda</li>
          <li><strong>Posts</strong>, or mainly written content in service of your publicity and marketing strategy.</li>
          <li><strong>Polls</strong>, the main way your delegates will interact with each other and you via Conferoo is via polls, which organisers create and set possible responses for.</li>
          <li><strong>Media</strong>, images and documents you wish to make available to delegates, either via other content or as standalone downloads.</li>
        </ul>
        <p>In addition to these key strands of content, Conferoo also allows pages of general conference info to be published.</p>
        <h2>Help</h2>
        <p>You can contact Joshua Hackett for technical support at <a href="mailto:hello@joshuahackett.com">hello@joshuahackett.com</a></p>
      </div>
    );
  }
}

export default App;
