import React from "react";
import './ListApp.css';

function ListApp() {
  return <List/>
}

class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listValue: '',
      listAdd: '',
      list: []
    }

    this.handleList = this.handleList.bind(this);
    this.addValue = this.addValue.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  handleList(){
    if(this.state.listValue !== ''){
      this.setState({
        listAdd: this.state.listValue
      }, 
      ()=>this.addList(this.state.listAdd))
    }
    document.querySelector(".textArea").value = '';
    this.setState({
      listValue: ''
    })
  }

  addValue(event){
    this.setState({
      listValue: event.target.value
    })
  }

  addList(value){
    if(this.state.list.includes(value)){
      alert("This is already an item on the list");
    }
    else{
      this.state.list.push(value);
      const node = document.createElement("li");
      node.textContent = value;
      node.classList.add("delete")
      const deleteNode = () => {
        for(let i = 0; i < this.state.list.length; i++){
          if(this.state.list[i].includes(value)){
            this.state.list.splice(i, 1);
            document.querySelector(".listBox").removeChild(document.querySelector(".listBox").children[i]);
          }
        }
      }
      node.addEventListener('click', deleteNode);
      document.querySelector(".listBox").appendChild(node);
    }
  }

  clearList(){
    while (document.querySelector(".listBox").firstChild) { 
      document.querySelector(".listBox").firstChild.remove();
      this.state.list.pop();
    }
  }

  render(){
    return(
      <div className="box">
        <textarea placeholder="Type here" className="textArea" maxLength={68} onChange={this.addValue}></textarea>
        <button className="add" onClick={this.handleList}>Add</button>
        <button className="clear" onClick={this.clearList}>Clear</button>
        <ul className="listBox"></ul>
      </div>
    );
  }
}

export default ListApp;
