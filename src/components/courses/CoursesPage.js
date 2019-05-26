import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

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
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input type="text"
          value={this.state.course.title}
          onChange={this.handleChanges}/>
        <input type="submit" value="Save"/>
        {
          console.log(this.state.course)
        }
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    )

  }
}

CoursesPage.propTypes = {
  actions: propTypes.object.isRequired,
  courses: propTypes.array.isRequired
};


function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);