import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import propTypes from 'prop-types';
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData"

function ManageCoursePage({ courses, authors, actions, loadAuthors, loadCourses, ...props})  {
  const [ course, setCourse ] =  useState({...props.course});

  useEffect( () => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Laoding courses failed" + error);
      })
    }

    if (courses.length === 0) {
      loadAuthors().catch(error => {
        alert("Laoding authors failed" + error);
      })
    }
  }, [])

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  course: propTypes.object.isRequired,
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
    course: newCourse
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);