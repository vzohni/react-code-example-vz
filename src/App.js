import React, { Component } from 'react';
import './App.css';
import Student from './Student'

//Front End Assessment coded by Victor Zohni in React 

class App extends Component {

  state = {
    items: [],
    namesearch: '',
    tagsearch: '',

  }

  async componentDidMount() {
    try {
      const res = await fetch("https://www.hatchways.io/api/assessment/students");
      const items = await res.json();

      const tags = [];


      items.students.forEach((item) => {
        item.tags = tags;
        item.studentArr = { tags: [] }
      });


      this.setState({
        items: items.students,
      });

      console.log(items.students);

    } catch (e) {
      // console.log(e);
    }
  }

  addTags = (id, tag) => {
    console.log("id: " + id);
    console.log("tag: " + tag);
    var a = parseInt(id);
    a = a - 1;
    var b = a + "";

    this.state.items[b].studentArr.tags.push(tag);

    console.log(this.state.items[b]);

    this.forceUpdate()
  }

  onChangeHandler = (e) => {
    this.setState({
      namesearch: e.target.value,
    })
  }
  onChangeHandler2 = (e) => {
    this.setState({
      tagsearch: e.target.value,
    })
  }

  hasTag(tags, inputTag) {
    return tags.indexOf(inputTag) > -1
  }



  render() {

    // console.log(this.state.items);        
    let filteredStudents = this.state.items.filter(
      (item) => {
        return item.firstName.toLowerCase().indexOf(this.state.namesearch) !== -1
          || item.lastName.toLowerCase().indexOf(this.state.namesearch) !== -1
      }
    );

    // console.log(this.state.items);

    let studentsWithTags = filteredStudents.filter((student) => {
      // filter tags                  

      return this.hasTag(student.studentArr.tags, this.state.tagsearch)
    })


    const ids = [];
    const noDups = [];


    filteredStudents.forEach((val) => {
      if (!ids.includes(val.id)) {
        ids.push(val.id);
        noDups.push(val);
      }
    });


    for (var i = 0; i < studentsWithTags.length; i++) {
      console.log(studentsWithTags[i]);
      if (!ids.includes(studentsWithTags[i].id)) {
        ids.push(studentsWithTags[i].id);
        noDups.push(studentsWithTags[i]);
      }
    }


    const finArr = []
    noDups.forEach((val) => {
      if (this.hasTag(val.studentArr.tags, this.state.tagsearch)) {
        finArr.push(val)
      }
    });
    console.log(finArr);

    const renderArr = this.state.tagsearch.length === 0 ? noDups : finArr;


    return (
      <div className="App">
        <div className="student-box">
          <input type="text" placeholder="Search by name" value={this.state.namesearch} onChange={this.onChangeHandler} />
          <input type="text" placeholder="Search by tag" value={this.state.tagsearch} onChange={this.onChangeHandler2} />
          <nav>
            <ul>
              {renderArr.map(item => <Student key={item.id} student={item} addTags={this.addTags} />)}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;


