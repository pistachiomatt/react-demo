
/** @jsx React.DOM */

(function() {
  this.CommentView = React.createClass({displayName: 'CommentView',
    mixins: [ReactExtras, SyncModel],
    commentBody: function() {
      if (this.props.body) {
        return this.props.body;
      } else {
        return marked(this.props.raw_body);
      }
    },
    render: function() {
      return React.DOM.article({
        "className": "comment",
        "id": "comment-" + this.props.id
      }, React.DOM.button({
        "className": "delete-comment",
        "title": "Delete this thread"
      }, React.DOM.i(null)), React.DOM.div({
        "dangerouslySetInnerHTML": {
          __html: this.commentBody()
        }
      }), React.DOM.p({
        "className": "byline"
      }, "— ", React.DOM.span({
        "className": "author",
        "style": {
          backgroundColor: this.props.user.colour
        }
      }, this.props.user.name), React.DOM.span({
        "className": "time",
        "title": this.props.created_at_long
      }, this.props.created_at_short)));
    }
  });

}).call(this);
