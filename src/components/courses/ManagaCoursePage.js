import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse }from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import propTypes from 'prop-types';
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";


function ManageCoursePage({
  courses,
  authors,
  actions,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props})  {
  const [ course, setCourse ] =  useState({...props.course});
  const [ errors, setErrors ] =  useState({});
  const [ saving, setSaving ] = useState(false);

  useEffect( () => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Laoding courses failed" + error);
      })
    } else {
      setCourse({ ...props.course })
    }

    if (courses.length === 0) {
      loadAuthors().catch(error => {
        alert("Laoding authors failed" + error);
      })
    }
  }, [props.course])

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.authorId = "Author id is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors.length === 0);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
    .then( () => {
      toast.success('Course saved');
      history.push("/courses"); }).catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message})
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse( prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }))
  }


  return (
    authors.length === 0 || courses.length === 0 ? (<Spinner />) : (
    <CourseForm
      onChange={handleChange}
      course={course}
      errors={errors}
      authors={authors}
      onSave={handleSave}
      saving={saving}
    />
  ));
}

ManageCoursePage.propTypes = {
  course: propTypes.object.isRequired,
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
  saveCourse: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    courses: state.courses,
    authors: state.authors,
    course: course,
  };
}

const mapDispatchToProps = {
  loadCourses: loadCourses,
  saveCourse: saveCourse,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);