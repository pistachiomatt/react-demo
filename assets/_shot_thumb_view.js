
/** @jsx React.DOM */

(function() {
  this.ShotThumbView = React.createClass({displayName: 'ShotThumbView',
    mixins: [ReactExtras, SyncModel],
    render: function() {
      return React.DOM.article({
        "className": "shot",
        "data-id": this.props.id
      }, React.DOM.div({
        "className": "container"
      }, React.DOM.a({
        "href": this.props.model.fullSlug(),
        "tabIndex": "-1",
        "onClick": this.showShot
      }, React.DOM.figure(null, React.DOM.img({
        "src": this.props.thumbnail_m_url,
        "height": this.props.thumbnail_m_height
      }))), React.DOM.figcaption(null, React.DOM.div({
        "className": "view-mode"
      }, React.DOM.span({
        "className": "title"
      }, this.props.title), (this.props.version > 1 ? React.DOM.span({
        "className": "version"
      }, ", v", this.props.version) : void 0)))));
    },
    showShot: function() {
      redpen.router.navigate(this.props.slug, {
        trigger: true
      });
      return false;
    }
  });

}).call(this);
