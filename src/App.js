import React, { Component } from 'react';
import './App.scss';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// template literals can be used in ES6 and are done with back-ticks  https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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

const list2 = [
  {
    title: 'rrrrrrReact',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'rrrrrrrRedux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

// not sure why it is telling me to make this function outside of the react component? Does it have to do with it being a higher order function? 
const isSearched = searchTerm => item => 
item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
item.author.toLowerCase().includes(searchTerm.toLowerCase());


// 'class App' is declaring a component using React ES6 class component, after you have declared a component, you can use it as an element anywhere in your application by creating an instance of it ex: <App />  ///////// we are then extending the Component class that we are importing above from React
class App extends Component {
  // constructor(props) is a lifestyle method, you can set your state here and bind class methods here as well 
  constructor(props){
    super(props);
    this.state = {
      list2,
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

// render is a mandatory lifecycle method that returns elements as the output of a component 
  render() {
    const { searchTerm, list, list2 } = this.state; //Destructuring in JavaScript ES6 provides easier access to properties in objects and arrays, this way we don't have to keep typing this.state when we access searchTerm and list from here on out! 
    return (
      // className is the same thing as 'class' in HTML but has to be used in place of it for JSX. All HTML attributes in JSX are going to follow the camelCase rule
      <div className="page">
      <div className="interactions">

      <Search 
      value={searchTerm}
      onChange={this.onSearchChange}
      >
      Search 
      {/* Composable Components - We are passing the 'Search' string to allow it to be accessed through the children property in the Search class. Now the Search component can destruct the children property from the props object, and specify where it should be displayed. When you use the Search component elsewhere, you can use different entities, since it’s not just text that can be passed as children. https://reactjs.org/docs/composition-vs-inheritance.html */}
      </Search>
      </div>  
      <Table 
        list = {list2}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
      />


      <Table 
        list = {list}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
      />
      
      </div>
    );
  }
}


// Functional Stateless Components are functions that take input and return an output, they also have no local state meaning you cannot access or update the state. The inputs are the props, and the output is a component instance in plain JSX
// This is the ES5 Version
// function Search({value, onChange, children}){
//   // const {value, onChange, children} = this.props; instead of destructuring the props this way, we are going to do it in the function signature above https://www.youtube.com/watch?v=PB_d3uBkQPs
//   return(
//     <form>
//     children
//     <input
//     type="text"
//     value={value}
//     onChange={onChange}
//     />
//     </form>
//   );
// }

// this is the ES6 version
const Search = ({value, onChange, children}) => {
  // const {value, onChange, children} = this.props; instead of destructuring the props this way, we are going to do it in the function signature above https://www.youtube.com/watch?v=PB_d3uBkQPs
// putting {return()} makes this a "block body" meaning before the return we could do something else if needed to make it more complex
  return(
    <form>
      {children}
      <input
      type="text"
      value={value}
      onChange={onChange}
      />
    </form>
  );
}


// We turned this class into a functional stateless component above, it is best to use classes only when they are not stateless 
// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props; // we are getting value and onChange from the values passed through <Search /> in the class App, the children prop is used to pass elements to components from above and allows us to compose components together. (See the <Search/> tag in the class App)
//     return (
      
//         <form>
//           {children} <input 
//           type="text" 
//           value={value} //we are setting the value to searchTerm because inputs like to handle their own state and we don't want that. By putting a value here we are making the input value a controlled component, if we did not do this it would be an uncontrolled component which is a no no. https://reactjs.org/docs/forms.html With a controlled component, every state mutation will have an associated handler function, in this case, onSearchChange. 
//           onChange={onChange}
//           />
//         </form>
//         )}
// }


const Table = ({list, pattern, onDismiss}) => {
  return(
    <div className="table">
        {list.filter(isSearched(pattern)).map(item => //when using js es6 you can remove the parenthesis around the argument if you are only going to have one instead of using (item) you can just using 'item' as we are doing. 
            // return ( /////////this is used when you have a "block body" we removed it because we had a "concise body" when using ES6 and in a concise body an implicit return is attached so there is no need to add return()
              // React can identify modified items when the list changes with a key identifier ////// avoid using the index in an array as the idenifier, the index is not stable and you always need a stable key identifier 
              <div key={item.objectID} className="table-row">
                  <span style={largeColumn} className="title">
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span style={midColumn}>{item.author}</span>
                  <span style={smallColumn}>{item.num_comments}</span>
                  <span style={smallColumn}>{item.points}</span>
                
                
                {/* this button is an example of unidirectional data flow of React. An action is triggered in the view layer with onClick(), a function or class method modifies the local component state, and then the render() method of the component runs again to update the view. */}
                <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
                {/* This on click function has one function wrapped in another so it won't execute on page load, if we didn't have to pass anything to onDismiss we could just do onClick={onDismiss}, but since we need the item.objectID for the onDismiss function we had to have it in another function. Read more about it on the the-road-to-learn-react.pdf on page 44...... This concept is called higher-order functions in JavaScript */}
                Dismiss
                </Button>

                <Button onClick={() => console.log("test")} >
                blah
                </Button>
                
              </div>
          )}
          </div>
  )
}

//The className attribute is another React derivate for the HTML attribute class, it is optional that is why we have it as an empty string
const Button = ({onClick, className='', children}) => {
  return(
    <button
    onClick={onClick}
    className={className}
    type="button"  
    >
    {children}
    </button>
  )
}


export default App;
