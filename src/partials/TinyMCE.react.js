import React, { Component } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/lists';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      editor: null
    };
  }

  componentDidMount() {
    tinymce.init({
      selector: '#rich-content',
      menubar: 'edit view insert format',
      height: 400,
      plugins: 'image link lists wordcount imagetools code',
      toolbar1: 'formatselect | bold italic | link image | numlist bullist outdent indent  | removeformat | code',
      setup: editor => {
        this.setState({ editor });
        editor.on('keyup change', () => {
          this.props.onChange();
        });
      }
    });
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    return (
      <textarea
        id='rich-content'
        onChange={this.props.onChange}
      />
    )
  }
}

export default Editor;
