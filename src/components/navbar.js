import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"; // If Navbar.js is in `src/components`


export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }), () => {
      document.body.classList.toggle('dark-body', this.state.darkMode);
    });
  };

  render() {
    const { darkMode } = this.state;

    return (
      <div>
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} static-top`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">newsTadka</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>
              <button type="button" className="btn btn-outline-dark" onClick={this.toggleDarkMode}>
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
