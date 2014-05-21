###* @jsx React.DOM ###

@ShotView = React.createClass
	mixins: [ReactExtras, SyncModel]
	inProject: ->
		!@props.model.has('single_shot')

	componentWillUpdate: ->
		if @props.visible
			true
		else
			false

	render: ->
		@hiddenIfSingle = {}
		@hiddenIfSingle.display = 'none' if not @inProject()

		<section class="show-shots" style={@visibilityStyle()}>
			<div class="box-container">
				{@primaryHeader()}
			</div>

			<figure class="shot-container">
				<div class="image-wrapper">
					<img src={@props.file_url} alt="" class="shot-image" width={@props.width} height={@props.height} />
					{@props.annotations.map (collection) =>
						AnnotationView 
							collection: collection
							key: "an-#{collection.first().get('id')}"
					}
				</div>
			</figure>

			<div class="nav-footer" style={@hiddenIfSingle}>
				<button class="new-button dark secondary next-button" title="Or press → arrow">Next design in this project</button>
				<span class="tip">(Or use the keyboard arrows<br/> to jump next &amp; previous.)</span>
			</div>
		</section>

	primaryHeader: ->
		<header class="primary-header dark shot-view-header">
			<div class="left">
				<a href="/" class="logo-link dashboard-link" onClick={@showHomepage}>
					<h1>Red Pen</h1>
					<strong style={@hiddenIfSingle}>— Dashboard</strong>
				</a>

				<a class="project-link" style={@hiddenIfSingle}>
					{"&nbsp;&rarr;&nbsp;"} <strong class="project-name">{@props.title}</strong>
				</a>
			</div>

			<div class="centre project-traversal" style={@hiddenIfSingle}>
				<button class="new-button dark text-only previous-button" title="Or press ← arrow"><i></i>Previous design</button>
				<button class="new-button dark secondary next-button" title="Or press → arrow">Next design</button>
			</div>

			<div class="right">
				<a class="nav-item" onClick={@showHomepage} style={@hiddenIfSingle}>Upload another</a>
			</div>
		</header>

	showHomepage: ->
		redpen.router.navigate '/singles', trigger: true
		return false
