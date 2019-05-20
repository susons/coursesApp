import React from 'react';

class CoursesPage extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      img: '',
    }
    this.onchange=this.onChange.bind(this);
  }
  onChange(e) {
    let files=e.target.files;
    console.warn("data file", files);
    let reader=new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
      const url="test"
      const formData={file: e.target.result}
      console.warn("img data", e.target.result);
      return fetch(url, formData).then(response => console.warn("result", response))

    }

  }
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <input className="UploadButton" type="file" name="file" onChange={(e) => this.onChange(e)}/>
      </div>
    )

  }
}

export default CoursesPage;