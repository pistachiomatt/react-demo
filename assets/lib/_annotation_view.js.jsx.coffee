###* @jsx React.DOM ###

@AnnotationView = React.createClass
	mixins: [ReactExtras]
	render: ->
		@firstComment = @props.collection.first()

		<aside class="annotation" style={
			top: @firstComment.get('y_pos'),
			left: @firstComment.get('x_pos')
		}>
			<i class="marker">
				<i class="marker-inner" style={ background: @firstComment.get('user').colour }></i>
			</i>
			<section class="balloon js-balloon">
				{CommentView 
					model: @firstComment
					key: "co-#{@firstComment.get('uuid')}"
				}
				<div class="comment-clip">
					<div class="replies">
						{@props.collection.replies().map (comment) -> 
							CommentView 
								model: comment
								key: "co-#{comment.get('uuid')}"
						}
					</div>
				</div>
				<article class="comment enter-new-comment">
					<form action="/errors/comments">
						<p class="relative">
							<textarea placeholder="Write a comment..."></textarea>
						</p>
						<button type="submit" class="old-button post-comment bottom-stuck primary" style={display:'none'} title="Or press Shift–Enter to post">Post this comment</button>
					</form>
				</article>
				<span class="mouse-catcher-l"></span>
				<span class="mouse-catcher-r"></span>
				<span class="mouse-catcher-b"></span>
			</section>

		</aside>
