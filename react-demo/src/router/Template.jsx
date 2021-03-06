import React, { Component } from "react";
import { Link } from "react-router-dom";
const url = `http://localhost:5000/get`;
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
  componentDidMount() {
   
     this.getProduct();
  }
 
getProduct () {
    fetch(url)
        .then(data => data.json())
        .then(data =>{
            this.setState({data});
            
        })
        .catch(err=>console.log(err))
}

  render() {
    console.log(this.props.header)
    console.log(this.state.data[this.props.header.toUpperCase()])
    if(this.state.data[this.props.header.toUpperCase()]!=undefined){
    return (
      <ul className="items__wrapper">
        {this.state.data[this.props.header.toUpperCase()].map(item => {
          return (
            <li key={item.id} className="item">
              <Link
                to={`/${this.props.header}/${item.id}`}
                className={`item--div ${this.props.className}`}
              >
                <img src={item.url} alt={`item.name`} className="item--img" />
                <div className="item--spec">
                  <h2 className="item--brand">{item.brand}</h2>
                  <h4 className="item--name">{item.model}</h4>
                  <p className="item--price">{item.price}</p>
                </div>
                <button className="item--btn">Read More...</button>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }else return (<div></div>)}
}

export default Template;
