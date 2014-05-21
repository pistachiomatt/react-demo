(function() {
  var checkCookie, draggedFilesCount, generateTempID, invertClass, isFirefox, isIE, isWebkit, renameProp, showCookieFail, superOf, timeSince;

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
  });

  window.ReactExtras = {
    componentWillMount: function() {
      var _ref;
      return _ref = React.DOM, this.div = _ref.div, this.h1 = _ref.h1, this.h2 = _ref.h2, this.h3 = _ref.h3, this.textarea = _ref.textarea, this.section = _ref.section, this.input = _ref.input, this.span = _ref.span, this.p = _ref.p, this.a = _ref.a, this.header = _ref.header, this.strong = _ref.strong, this.em = _ref.em, this.button = _ref.button, _ref;
    },
    visibilityStyle: function() {
      if (!this.props.visible) {
        return {
          display: 'none'
        };
      } else {
        return {};
      }
    }
  };

  window.BackboneReact = {
    componentDidMount: function() {
      this.getBackboneCollections().forEach((function(_this) {
        return function(collection) {};
      })(this));
    },
    componentWillUnmount: function() {
      this.getBackboneCollections().forEach((function(_this) {
        return function(collection) {
          collection.off(null, null, _this);
        };
      })(this));
    }
  };

  window.SyncModel = {
    getDefaultProps: function() {
      return this.props.model.attributes;
    },
    componentWillUpdate: function() {
      return this.props = _.extend(this.props, this.props.model.attributes);
    }
  };

}).call(this);
