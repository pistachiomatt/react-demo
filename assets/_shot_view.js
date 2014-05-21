
/** @jsx React.DOM */

(function() {
  this.ShotView = React.createClass({displayName: 'ShotView',
    mixins: [ReactExtras, SyncModel],
    inProject: function() {
      return !this.props.model.has('single_shot');
    },
    componentWillUpdate: function() {
      if (this.props.visible) {
        return true;
      } else {
        return false;
      }
    },
    render: function() {
      this.hiddenIfSingle = {};
      if (!this.inProject()) {
        this.hiddenIfSingle.display = 'none';
      }
      return React.DOM.section({
        "className": "show-shots",
        "style": this.visibilityStyle()
      }, React.DOM.div({
        "className": "box-container"
      }, this.primaryHeader()), React.DOM.figure({
        "className": "shot-container"
      }, React.DOM.div({
        "className": "image-wrapper"
      }, React.DOM.img({
        "src": this.props.file_url,
        "alt": true,
        "className": "shot-image",
        "width": this.props.width,
        "height": this.props.height
      }), this.props.annotations.map((function(_this) {
        return function(collection) {
          return AnnotationView({
            collection: collection,
            key: "an-" + (collection.first().get('id'))
          });
        };
      })(this)))), React.DOM.div({
        "className": "nav-footer",
        "style": this.hiddenIfSingle
      }, React.DOM.button({
        "className": "new-button dark secondary next-button",
        "title": "Or press → arrow"
      }, "Next design in this project"), React.DOM.span({
        "className": "tip"
      }, "(Or use the keyboard arrows", React.DOM.br(null), " to jump next &amp; previous.)")));
    },
    primaryHeader: function() {
      return React.DOM.header({
        "className": "primary-header dark shot-view-header"
      }, React.DOM.div({
        "className": "left"
      }, React.DOM.a({
        "href": "/",
        "className": "logo-link dashboard-link",
        "onClick": this.showHomepage
      }, React.DOM.h1(null, "Red Pen"), React.DOM.strong({
        "style": this.hiddenIfSingle
      }, "— Dashboard")), React.DOM.a({
        "className": "project-link",
        "style": this.hiddenIfSingle
      }, "&nbsp;&rarr;&nbsp;", " ", React.DOM.strong({
        "className": "project-name"
      }, this.props.title))), React.DOM.div({
        "className": "centre project-traversal",
        "style": this.hiddenIfSingle
      }, React.DOM.button({
        "className": "new-button dark text-only previous-button",
        "title": "Or press ← arrow"
      }, React.DOM.i(null), "Previous design"), React.DOM.button({
        "className": "new-button dark secondary next-button",
        "title": "Or press → arrow"
      }, "Next design")), React.DOM.div({
        "className": "right"
      }, React.DOM.a({
        "className": "nav-item",
        "onClick": this.showHomepage,
        "style": this.hiddenIfSingle
      }, "Upload another")));
    },
    showHomepage: function() {
      redpen.router.navigate('/', {
          trigger: true
      });
      return false;
    }
  });

}).call(this);
