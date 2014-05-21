
/** @jsx React.DOM */

(function() {
  var BaseView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.AppRouter = (function(_super) {
    __extends(AppRouter, _super);

    function AppRouter() {
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.routes = {
      "": "dashboard",
      "projects": "dashboard",
      "singles": "singles",
      ":slug": "shot",
      "p/:slug": "project"
    };

    return AppRouter;

  })(Backbone.Router);

  BaseView = React.createClass({displayName: 'BaseView',
    mixins: [BackboneReact, ReactExtras],
    getBackboneCollections: function() {
      return [this.props.singles];
    },
    getDefaultProps: function() {
      bootModels();
      return {
        singles: redpen.singles
      };
    },
    isVisible: function(object, slug) {
      if (this.props.currentPage === object) {
        if (slug && this.props.currentSlug === slug) {
          return true;
        } else if (slug) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    render: function() {
      return this.div(null, DashboardView({
        visible: this.isVisible('dashboard') || this.isVisible('singles'),
        singlesVisible: this.isVisible('singles'),
        singles: this.props.singles
      }), this.props.singles.models.map((function(_this) {
        return function(shot, i) {
          return ShotView({
            model: shot,
            visible: _this.isVisible('shot', shot.get('slug')),
            key: "sh-" + (shot.get('id'))
          });
        };
      })(this)));
    }
  });

  redpen.router = new this.AppRouter;

  redpen.router.on('route', function(action, params) {
    var slug;
    if (params == null) {
      params = [];
    }
    slug = params[0];
    return React.renderComponent(BaseView({
      currentPage: action,
      currentSlug: slug
    }), $('#app')[0]);
  });

  Backbone.history.start({
    root: '/test',
    pushState: true
  });

}).call(this);
