import React from 'react';

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    }
  }

  handleChanges = e => {
    const course = {...this.state.course, title: e.target.value};
    this.setState({course});
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.course.title)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input type="text"
        value={this.state.course.title}
        onChange={this.handleChanges}/>
        <input type="submit" value="Submit"/>
      </form>
    )

  }
}

export default CoursesPage;