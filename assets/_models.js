(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Backbone.BaseModel = (function(_super) {
    __extends(BaseModel, _super);

    function BaseModel() {
      return BaseModel.__super__.constructor.apply(this, arguments);
    }

    BaseModel.prototype.save = function(attrs, options) {
      if (this.blacklistedAttrs) {
        attrs = _(this.attributes).omit(this.blacklistedAttrs);
      }
      attrs = attrs || this.toJSON();
      options = options || {};
      options.attrs = attrs;
      return Backbone.Model.prototype.save.call(this, attrs, options);
    };

    BaseModel.prototype.toJSON = function() {
      var attrs;
      if (!this.name) {
        return this.attributes;
      }
      attrs = _.clone(this.attributes);
      attrs[this.name || this.constructor.name.split('Model')[0].toLowerCase()] = _.clone(this.attributes);
      return attrs;
    };

    return BaseModel;

  })(Backbone.Model);

  this.Shot = (function(_super) {
    __extends(Shot, _super);

    function Shot() {
      return Shot.__super__.constructor.apply(this, arguments);
    }

    Shot.prototype.url = '/shots';

    Shot.prototype.name = 'shot';

    Shot.prototype.defaults = {
      title: null,
      raw_description: null,
      description: null,
      slug: null,
      version: 1,
      annotations: []
    };

    Shot.prototype.initialize = function() {
      this.blacklistedAttrs = ['canvas_image', 'update_model', 'description', 'comments'];
      return this.bootComments();
    };

    Shot.prototype.bootComments = function() {
      var annot;
      if (!this.has('comments')) {
        return false;
      }
      annot = this.get('annotations') || [];
      this.get('comments').map(function(firstComment) {
        var a;
        a = new Annotation([firstComment].concat(firstComment.replies));
        return annot = annot.concat([a]);
      });
      return this.set({
        annotations: annot
      });
    };

    Shot.prototype.fullSlug = function() {
      return "/" + (this.get('slug'));
    };

    return Shot;

  })(Backbone.BaseModel);

  this.Project = (function(_super) {
    __extends(Project, _super);

    function Project() {
      return Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.model = Shot;

    Project.prototype.name = 'shot';

    Project.prototype.url = '/shots';

    Project.prototype.comparator = 'project_order';

    return Project;

  })(Backbone.Collection);

  this.Comment = (function(_super) {
    __extends(Comment, _super);

    function Comment() {
      return Comment.__super__.constructor.apply(this, arguments);
    }

    Comment.prototype.url = '/comments';

    Comment.prototype.name = 'comment';

    Comment.prototype.defaults = {
      id: null,
      seen_by: []
    };

    Comment.prototype.initialize = function() {
      return this.blacklistedAttrs = ['shot_model'];
    };

    Comment.prototype.sync = function(method, model, options) {
      var shot;
      if (method === 'create') {
        shot = model.get('shot_model');
        if (!model.has('shot_id')) {
          shot.once('sync', function() {
            model.set({
              shot_id: shot.get('id')
            });
            return model.save();
          });
          return false;
        }
        if (shot.get('has_finished_uploading') === false) {
          shot.once('sync', function() {
            return model.save();
          });
          return false;
        }
        options.success = function(data) {
          model.id = data.comment.id;
          model.set({
            id: data.comment.id,
            body: data.comment.body
          });
          return model.trigger('sync');
        };
        options.error = function(data) {
          if (redpen.marketing_demo) {
            return false;
          }
          if (data.responseText === 'parent_comment_deleted') {
            return false;
          }
          alert("Sorry about this, but there was trouble saving your comment just now.\n\nCould you try posting it again? If that doesn't work, email matt@redpen.io and he'll see what's wrong. Say the error was 'code 20'.");
          return false;
        };
      }
      if (method === 'delete') {
        options.url = "/comments/" + (model.get('id'));
      }
      return Backbone.sync.call(model, method, model, options);
    };

    return Comment;

  })(Backbone.BaseModel);

  this.Annotation = (function(_super) {
    __extends(Annotation, _super);

    function Annotation() {
      return Annotation.__super__.constructor.apply(this, arguments);
    }

    Annotation.prototype.model = Comment;

    Annotation.prototype.replies = function() {
      return _(this.models).rest(1);
    };

    return Annotation;

  })(Backbone.Collection);

  this.Notifications = (function(_super) {
    __extends(Notifications, _super);

    function Notifications() {
      return Notifications.__super__.constructor.apply(this, arguments);
    }

    Notifications.prototype.model = Notification;

    return Notifications;

  })(Backbone.Collection);

  this.bootModels = function() {
    return redpen.singles = new Project(redpen.singleShots);
  };

}).call(this);
