###* @jsx React.DOM ###

@DashboardView = React.createClass
	mixins: [ReactExtras]

	componentWillUpdate: ->
		if @props.visible
			true
		else
			false

	render: ->
		<section class="dashboard" style={@visibilityStyle()}>
			<div class="box-container">
				<header class="primary-header light lighter dashboard-view-header">
					<div class="left">
						<a href="/" class="logo-link">
							<h1>Red Pen</h1>
						</a>
						{@GreetingsView()}
					</div>
				</header>
			</div>
			<div class="box-container">
				<section class="single-shots">
					<div class="project-list-projects"> 
						<div class="gutter-sizer"></div>
						<div class="column-sizer"></div>
						{ 
							@props.singles.models.map (model) ->
								ShotThumbView 
									model: model
									key: "sh-th-#{model.get('id')}"
						}
					</div>
				</section> 
			</div>
		</section>

	GreetingsView: ->
		return unless redpen.user_name
		link = "http://500px.com/search?q=#{redpen.random_hello.country}&amp;order=votes"

		<span className="greetings">
			— {redpen.random_hello.hello}, {redpen.user_name.split(' ')[0]}!
			<span className="explanation">
				Now when you visit <a href={link} target="_blank">{ redpen.random_hello.country }</a>, you’ll know how to say “hello”.
			</span>
		</span>

