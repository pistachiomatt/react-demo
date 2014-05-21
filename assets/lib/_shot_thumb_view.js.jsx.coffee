###* @jsx React.DOM ###

@ShotThumbView = React.createClass
	mixins: [ReactExtras, SyncModel]
	render: ->
		<article class="shot" data-id={@props.id}>
			<div class="container">
				<a href={@props.model.fullSlug()} tabIndex="-1" onClick={@showShot}>
					<figure>
						<img src={ @props.thumbnail_m_url } height={ @props.thumbnail_m_height }/>
					</figure>
				</a>
				<figcaption>
					<div class="view-mode">
						<span class="title">{ @props.title }</span>
						{ if @props.version > 1 
							<span class="version">, v{ @props.version }</span>
						}
					</div>
				</figcaption>
			</div>
		</article>

	showShot: ->
		redpen.router.navigate @props.slug, trigger: true
		return false
