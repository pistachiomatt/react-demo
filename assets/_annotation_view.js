
/** @jsx React.DOM */

(function() {
  this.AnnotationView = React.createClass({displayName: 'AnnotationView',
    mixins: [ReactExtras],
    render: function() {
      this.firstComment = this.props.collection.first();
      return React.DOM.aside({
        "className": "annotation",
        "style": {
          top: this.firstComment.get('y_pos'),
          left: this.firstComment.get('x_pos')
        }
      }, React.DOM.i({
        "className": "marker"
      }, React.DOM.i({
        "className": "marker-inner",
        "style": {
          background: this.firstComment.get('user').colour
        }
      })), React.DOM.section({
        "className": "balloon js-balloon"
      }, CommentView({
        model: this.firstComment,
        key: "co-" + (this.firstComment.get('uuid'))
      }), React.DOM.div({
        "className": "comment-clip"
      }, React.DOM.div({
        "className": "replies"
      }, this.props.collection.replies().map(function(comment) {
        return CommentView({
          model: comment,
          key: "co-" + (comment.get('uuid'))
        });
      }))), React.DOM.article({
        "className": "comment enter-new-comment"
      }, React.DOM.form({
        "action": "/errors/comments"
      }, React.DOM.p({
        "className": "relative"
      }, React.DOM.textarea({
        "placeholder": "Write a comment..."
      })), React.DOM.button({
        "type": "submit",
        "className": "old-button post-comment bottom-stuck primary",
        "style": {
          display: 'none'
        },
        "title": "Or press Shift–Enter to post"
      }, "Post this comment"))), React.DOM.span({
        "className": "mouse-catcher-l"
      }), React.DOM.span({
        "className": "mouse-catcher-r"
      }), React.DOM.span({
        "className": "mouse-catcher-b"
      })));
    }
  });

}).call(this);
