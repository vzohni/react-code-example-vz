import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Front End Assessment coded by Victor Zohni in React

export default class Student extends Component{
    static propTypes = {
        student: PropTypes.shape({
            id:PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,             
            lastName: PropTypes.string.isRequired,             
            company: PropTypes.string.isRequired,     
            skill: PropTypes.string.isRequired,              
            email: PropTypes.string.isRequired,  
            pic: PropTypes.string,
            grades: PropTypes.array,
            tags: PropTypes.array,
            studentArr: PropTypes.object,        
        }),       
    }     
   

    state = {       
        toggle: false,
        input: '',
        tagsarr: [],
      }
    
      toggle = () => {
          this.setState({
            toggle: !this.state.toggle
          })
      }     

    calcAverage = (grades) => {
        var sum = 0;
        //console.log(grades);
        grades.forEach ((grade) => {
        sum += parseInt(grade); });
        return sum / grades.length;       
    }    

    
    handleKeyPress = (e) => {
        var newTag = e.target.value;
        
        this.setState({
            input: newTag,
        })             
        if (e.key === 'Enter') {      
           // console.log(newTag);                    
            this.setState(prevState => ({                
                tagsarr: prevState.tagsarr.concat(newTag)
            }))       
           // console.log(this.props.student.id);
            this.props.addTags(this.props.student.id,newTag)

          //console.log(newTag);
        }
        //return clonedElementWithTag;
      }

     render(){   
        const {student} = this.props;       
        const avg = this.calcAverage (student.grades);    
        //const tags = this.handleKeyPress();       
        
        var rows = []
        for (var i = 0; i < student.grades.length; i++) {            
            rows.push(<li key={i}/>);
            rows.push("Test " + (i+1) + ": " +  student.grades[i] + "%");
        }        
       
        var tagslist = []
       // console.log(this.state.tagsarr);
        try{
            for (var j = 0; j < this.state.tagsarr.length; j++)
            {
                tagslist.push(<li className = "tag-box" key={j}> {this.state.tagsarr[j]} </li>);                
            }
            
        }
        catch(e){

        }
      

        return(              
            <div className = "border-div">
                <button onClick = {this.toggle}>+</button>
                <img width={100} height={100} alt="" src={student.pic} />
                <h3>{student.firstName} {student.lastName} </h3>
                <div className = "student-text">                    
                    <p>Email: {student.email}</p>               
                    <p>Company: {student.company}</p>               
                    <p>Skill: {student.skill}</p>   
                    <p>Average: {avg}%</p>                       
                        {this.state.toggle &&  
                        <div> 
                            <div className="test-list">{rows}</div>   
                            <div className="test-list">{tagslist}</div>  
                            <input className="tag-input" type="text" value = {this.state.input}
                            onChange={evt => this.handleKeyPress(evt)}
                            placeholder = "Add a tag" onKeyPress={this.handleKeyPress} />
                        </div>                                
                        }
                    </div>                    
             </div>
                  
        )
    }    
}

