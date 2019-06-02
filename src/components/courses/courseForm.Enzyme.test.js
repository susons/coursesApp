import React from 'react';
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it('renders form and heder', () => {
  const wrapper = renderCourseForm();
  console.log(wrapper.debug())
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual("Add Course");
});

it('labels save buttons as "save" when not saving', () => {
  const wrapper = renderCourseForm();
  console.log(wrapper.debug())
  expect(wrapper.find('button').text()).toBe("Save");
});

it('labels save buttons as "saveing" when saving', () => {
  const wrapper = renderCourseForm({saving: true });
  console.log(wrapper.debug())
  expect(wrapper.find('button').text()).toBe("Saving...");
});