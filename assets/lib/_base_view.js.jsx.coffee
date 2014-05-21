###* @jsx React.DOM ###

class @AppRouter extends Backbone.Router
	routes:
		"": "dashboard"
		"projects": "dashboard"
		"singles": "singles"
		":slug": "shot"
		"p/:slug": "project"

BaseView = React.createClass
	mixins: [BackboneReact, ReactExtras]

	getBackboneCollections: ->
		# watch collections for changes
		[ @props.singles ]

	getDefaultProps: ->
		# load bootstrapped data
		bootModels()
		{
			singles: redpen.singles
		}

	isVisible: (object, slug) ->
		if @props.currentPage == object
			if slug and @props.currentSlug == slug
				true
			else if slug 
				false
			else
				true
		else
			false

	render: ->
		@div null,
			# render the dashboard
			DashboardView
				visible: @isVisible('dashboard') || @isVisible('singles')
				singlesVisible: @isVisible('singles')
				singles: @props.singles
			# render all singles (but hidden until visible)
			@props.singles.models.map (shot,i) =>
				ShotView( 
					model: shot
					visible: @isVisible('shot', shot.get('slug'))
					key: "sh-#{shot.get('id')}"
				)


redpen.router = new @AppRouter
redpen.router.on 'route', (action, params=[]) ->
	slug = params[0]
	React.renderComponent BaseView( currentPage: action, currentSlug: slug ), $('#app')[0]
Backbone.history.start(pushState: true)