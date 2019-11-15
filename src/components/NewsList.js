import React, {Fragment} from 'react';

const NewsList = (props) =>{
    return(
        <Fragment>        
        <li> 
            <strong>{props.points}</strong> 
            <span onClick={props.commentsCount} className="arrow">{props.comments}</span>
            {props.title} - {props.author}
                <div>
                {props.publish}
                <span> by {props.source} </span>
                </div>
        </li>
        </Fragment>
    )
};
export default NewsList;