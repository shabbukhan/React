import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import NewsList from './components/NewsList';
import Search from './components/Search';

class App extends Component {

  //constructor(){
    //super();
    //this.pageChangeHandler = this.pageChangeHandler.bind(this)
  //}

  state = {
    posts: [],
    page: 0,
    date: [],
    loader: false
  };

  getData = async pageId => {
    await axios(`https://hn.algolia.com/api/v1/search?page=${pageId}`)
      .then(data => {
        //console.log(data)
        this.setState({
          posts: data.data.hits,
          loader: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData(this.state.page);
    this.setState({
      loader: true
    });
    console.log('componentDidMount' + this.getData(this.state.page))
  };

  pageChangeHandler = () => {    
    this.setState({
        page: this.state.page + 1,
        loader: true
    }, () => {
      this.getData(this.state.page);
    });
    console.log(this.getData(this.state.page))
  };

  latestHandler = () =>{
    let list = this.state.posts;
    var sorting = list.sort(function(a,b){
      return new Date(b.created_at) - new Date(a.created_at);
    });

    this.setState({posts: sorting});
    console.log(sorting)
  };

  oldestHandler = () =>{
    let list = this.state.posts;
    var sorting = list.sort(function(a,b){
      return new Date(a.created_at) - new Date(b.created_at);
    });

    this.setState({posts: sorting});
    console.log(sorting)
  }; 
  
  getCounts = (e) =>{
    return parseInt(e.target.textContent++);
  };

  searchFilter = (e) =>{
    e = e.target.value;
    //let emptye = e.target.value = '';
    let list = this.state.posts;

    var filteredData = list.filter((item, index, arr) => {
    //https://www.peterbe.com/plog/a-darn-good-search-filter-function-in-javascript
      if(new RegExp(e).test(item.title)){
        return item
      }   
});
this.setState({posts: filteredData});
console.log(filteredData);

}

  render(){
    let list = this.state.posts;
      return(
        <Fragment>
        <Header 
        oldestHandler={this.oldestHandler}
        latestHandler={this.latestHandler} 
        />
        <Search change={this.searchFilter} />
        {this.state.loader ?
          <div className="loader">
            <Loader type="ThreeDots" color="#ff6600" height={100} width={100} />
          </div>
        : 
        <main tabIndex='0' role='main'>
        <article className='bodyContent'><ul className="listing">
        {
           list.map((item, index) => {
           let publishedDate = new Date(item.created_at).getFullYear();
           let today = new Date().getFullYear();
           let publish = today - publishedDate + " years ago";
           var parser = document.createElement('a');
           parser.href = item.url;

            return <NewsList key={index} 
            points={item.points}
            comments={item.num_comments}
            commentsCount={this.getCounts}
            title={item.title} 
            author={item.author}
            publish={publish}
            source={parser.host}
             />

            })
        }
        </ul>
       <Button click={this.pageChangeHandler} buttonName='Load More' />
       </article>
       </main>
        }
        
         <Footer role='navigation' footerMenu='Home' tabIndex='1' /> 
        </Fragment>
      )
  }

}

export default App;
