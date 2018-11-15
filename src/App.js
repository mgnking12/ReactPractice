import React, { Component } from 'react';
import './App.scss';

 const list = [
                  {
                  title: 'React',
                  url: 'https://reactjs.org/',
                  author: 'Jordan Walke',
                  num_comments: 3,
                  points: 4,
                  objectID: 0,
                  },
                  {
                  title: 'Redux',
                  url: 'https://redux.js.org/',
                  author: 'Dan Abramov, Andrew Clark',
                  num_comments: 2,
                  points: 5,
                  objectID: 1,
                  },
                  ];

// not sure why it is telling me to make this function outside of the react component? Does it have to do with it being a higher order function? 
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());


// 'class App' is declaring a component using React ES6 class component, after you have declared a component, you can use it as an element anywhere in your application by creating an instance of it ex: <App />  ///////// we are then extending the Component class that we are importing above from React
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchTerm: ''
    };
    // In order to define the onDismiss() as class method, you have to bind it in the constructor which we are doing below, We could also bind it in the button instead of the constructor, but we avoid this because that would cause it to bind everytime the button is clicked. We also avoid writing out the business logic for the onDissmiss function in the constructor so it won't "clutter up" the constructor, the constructor is onlythere to instantiate your class with all its properties. Class methods can be auto-bound using JavaScript ES6 arrow functions by themselves, but lets stick with the constructor method for now since that is what it says in the react docs. 
    this.onDismiss = this.onDismiss.bind(this);

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id){
  const notId = item => item.objectID !== id;
  // The filter function returns a new list instead of mutating the old one, and it supports the React convention of using immutable data structures.
  const updatedList = this.state.list.filter(notId);
  this.setState({ list: updatedList });
  }

  // When using a handler in your element, you get access to the synthetic React event in your callback function’s signature.
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state; //Destructuring in JavaScript ES6 provides easier access to properties in objects and arrays, this way we don't have to keep typing this.state when we access searchTerm and list from here on out! 
    return (
      // className is the same thing as 'class' in HTML but has to be used in place of it for JSX. All HTML attributes in JSX are going to follow the camelCase rule
      <div className="App">

        <form>
          <input 
          type="text" 
          value={searchTerm} //we are setting the value to searchTerm so the input value is now a controlled component, if we did not do this it would be an uncontrolled component and react does not like that because uncontrolled components handle their own state.
          onChange={this.onSearchChange}
          />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => //when using js es6 you can remove the parenthesis around the argument if you are only going to have one instead of using (item) you can just using 'item' as we are doing. 
            // return ( /////////this is used when you have a "block body" we removed it because we had a "concise body" when using ES6 and in a concise body an implicit return is attached so there is no need to add return()
              // React can identify modified items when the list changes with a key identifier ////// avoid using the index in an array as the idenifier, the index is not stable and you always need a stable key identifier 
              <div key={item.objectID}>
                <ul>
                  <li className="title">
                    <a href={item.url}>{item.title}</a>
                  </li>
                  <li>{item.author}</li>
                  <li>{item.num_comments}</li>
                  <li>{item.points}</li>
                </ul>
                {/* this button is an example of unidirectional data flow of React. An action is triggered in the view layer with onClick(), a function or class method modifies the local component state, and then the render() method of the component runs again to update the view. */}
                <button 
                onClick={() => this.onDismiss(item.objectID)} 
                type="button">
                Dismiss
                </button>
                {/* This on click function has one function wrapped in another so it won't execute on page load, if we didn't have to pass anything to onDismiss we could just do onClick={onDismiss}, but since we need the item.objectID for the onDismiss function we had to have it in another function. Read more about it on the the-road-to-learn-react.pdf on page 44...... This concept is called higher-order functions in JavaScript */}
              </div>
          )}
      </div>
    );
  }
}

export default App;
