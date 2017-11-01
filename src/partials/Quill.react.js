import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

class Quill extends React.Component {
  constructor(props) {
    super(props)
    this.imageHandler = this.imageHandler.bind(this)
  }

  imageHandler = () => {
    var range = this.quill.getSelection();
    var value = prompt('What is the image URL');
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }


  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean'],
      ['hey']
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
      <ReactQuill
        value={this.props.value}
        onChange={this.props.onChange}
        className="rt-editor"
        modules={this.modules}
        formats={this.formats}
      />
    )
  }
}

export default Quill;
