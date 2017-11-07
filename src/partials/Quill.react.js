import React from 'react';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

class Quill extends React.Component {
  constructor(props) {
    super(props)
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean'],
    ]
  }
  formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ]

  render() {
    return (
      <div>
      <ReactQuill
        value={this.props.value}
        onChange={this.props.onChange}
        className="rt-editor"
        modules={this.modules}
        formats={this.formats}
      />
      </div>
    )
  }
}

export default Quill;
