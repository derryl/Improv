Improv
======

JS library for inserting dynamic CSS, with interpolated values.

*Note:* This tool is a work-in-progress. I'd love to hear your feedback, or [suggestions for improvement](https://github.com/derryl/Improv/issues/new).


###Why?

Sometimes you need to style elements dynamically (for instance, changing all links to a programmatically-generated color). Perhaps not for serious applications, but maybe for a fun side-project (such as [Colors That Don't Suck](http://www.colorsthatdontsuck.com)).

To do this, you'd typically manipulate the `style` attribute for every one of those elements -- a laborious and messy process. Or perhaps you're using a data-binding framework, which makes the process easier -- but still quite messy.

With jQuery, you might do something like:

	var newColor = ...
	$('a.uses-custom-color').attr('style', 'color: ' + newColor);
	
Or with a library like Angular, you might try:

	<a href="#" style="color: {{ newColor }}">Link</a>
	// And in the controller
	$scope.newColor = ...


Enter **Improv**, a better way to handle these scenarios.

###What does it do?

With Improv, you provide CSS "templates" with variable expressions written directly in the code. This way, you can swap out entire sets of styles -- complete with custom values -- and see their results without manipulating any other DOM elements.

###Example

Simply provide a link to the CSS file, and provide your data object. Improv takes care of the rest:

**rules.css**

	a {
		color: {{ linkColor }};
	}
	button {
		background: {{ buttonColor }};
		padding: {{ buttonPadding }};
	}
	
You'd invoke Improv thusly:

	Improv.add( 'rules.css', {
		linkColor: '#e24500',
		buttonColor: '#e24500',
		buttonPadding: '20px'
	})
	
And the following would be appended inside your `<head>` tag:

	<style>
		a {
		color: #e24500;
		}
		button {
			background: #e24500;
			padding: 20px;
		}
	</style>
	

Again, if you have any feedback, I'd [love to hear it](https://github.com/derryl/Improv/issues/new).

	
####To Do:
- caching requested templates
- allow inline templates (similar to Handlebars)
- allow hot-swapping of individual properties (by selector, etc)
