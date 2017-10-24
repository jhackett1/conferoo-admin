import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

class Tiny extends Component {
  render() {

    return (
      <TinyMCE
        rows="15"
        content={this.props.content}
        config={{
          plugins: [
              "advlist autolink lists link image charmap anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media contextmenu paste "
          ],
          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default Tiny;
