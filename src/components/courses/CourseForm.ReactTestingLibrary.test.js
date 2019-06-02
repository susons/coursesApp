import React from 'react'
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

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
  return render(<CourseForm {...props} />);
}

it("should render Add course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should say Save when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should say Save when not saving", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  debug();
  getByText("Saving...");
});