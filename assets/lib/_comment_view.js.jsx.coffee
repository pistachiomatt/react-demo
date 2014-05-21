###* @jsx React.DOM ###

@CommentView = React.createClass
	mixins: [ReactExtras, SyncModel]

	commentBody: ->
		if @props.body
			@props.body
		else
			marked @props.raw_body

	render: ->
		<article class="comment" id={"comment-#{@props.id}"}>
			<button class="delete-comment" title="Delete this thread"><i></i></button>

			<div dangerouslySetInnerHTML={ __html: @commentBody() }/>
			<p class="byline">
				— <span class="author" style={backgroundColor: @props.user.colour}>{@props.user.name}</span>
				<span class="time" title={ @props.created_at_long }>{ @props.created_at_short }</span>
			</p>
		</article>