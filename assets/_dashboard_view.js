
/** @jsx React.DOM */

(function() {
  this.DashboardView = React.createClass({displayName: 'DashboardView',
    mixins: [ReactExtras],
    componentWillUpdate: function() {
      if (this.props.visible) {
        return true;
      } else {
        return false;
      }
    },
    render: function() {
      return React.DOM.section({
        "className": "dashboard",
        "style": this.visibilityStyle()
      }, React.DOM.div({
        "className": "box-container"
      }, React.DOM.header({
        "className": "primary-header light lighter dashboard-view-header"
      }, React.DOM.div({
        "className": "left"
      }, React.DOM.a({
        "href": "/",
        "className": "logo-link"
      }, React.DOM.h1(null, "Red Pen")), this.GreetingsView()))), React.DOM.div({
        "className": "box-container"
      }, React.DOM.section({
        "className": "single-shots"
      }, React.DOM.div({
        "className": "project-list-projects"
      }, React.DOM.div({
        "className": "gutter-sizer"
      }), React.DOM.div({
        "className": "column-sizer"
      }), this.props.singles.models.map(function(model) {
        return ShotThumbView({
          model: model,
          key: "sh-th-" + (model.get('id'))
        });
      })))));
    },
    GreetingsView: function() {
      var link;
      if (!redpen.user_name) {
        return;
      }
      link = "http://500px.com/search?q=" + redpen.random_hello.country + "&amp;order=votes";
      return React.DOM.span({
        "className": "greetings"
      }, "— ", redpen.random_hello.hello, ", ", (redpen.user_name.split(' ')[0]), "!", React.DOM.span({
        "className": "explanation"
      }, "Now when you visit ", React.DOM.a({
        "href": link,
        "target": "_blank"
      }, redpen.random_hello.country), ", you’ll know how to say “hello”."));
    }
  });

}).call(this);
