# grunt-entwine

> A Grunt plugin for assembling Twine 2 story files from multiple story files,
> JavaScript, and CSS source files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-entwine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-entwine');
```

## The "entwine" task

### Overview
In your project's Gruntfile, add a section named `entwine` to the data object
passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	entwine: {
		options: {
			// Task-specific options go here.
		},
		your_target: {
			files: {
				// Files to assemble.
			},
			options: {
				// Target-specific options.
			}
		},
	}
});
```

The `files` property should look like this:

```js
files: {
	'generated.html': [
		'path/to/a/Twine Story.html',
		'path/to/a/JavaScript file.js',
		'path/to/a/CSS file.css'
	]
}
```

You can add as many entries to the array as you like. Here's how they will be combined:

- Twine story files will combine passages.
- JavaScript files will have their contents appended to the story's JavaScript field.
- CSS files will have their contents appended to the story's stylesheet field.

The first story file listed is treated specially. It will:

- Use its starting passage as the generated story file's starting passage.
- Set the generated story's name, if you haven't overridden it with the
  `storyName` option (see below).

You can use this task with Twine 2 stories without publishing them first. In
order to find the path of a story, use the **Show Library** item in the
**Twine** menu. This will show the full path of your Twine 2 story library.
Combine this with the file name of the story file you'd like to use. Twine 2
will update the file as you edit it, so you don't need to do anything else to
get the most recent version of the story.

### Options

#### options.format
Type: `String`
Default value: `none`

You must set this, either at the task level or in a target. This is a file path
to a Twine 2 story format (usually named `format.js`). If you'd like to use a
format that comes packaged with Twine 2, you can download it from the [source
repository](https://bitbucket.org/klembot/twinejs/src/), under the
`story-formats` directory. Make sure to download the appropriate file named
`format.js`. You don't need any other file from the repository.

#### options.name
Type: `String`
Default value: `none`

The story name to set on the generated story file. If omitted, this will use
the story name of the first story file you add in the `files` list.

### Usage Examples

#### Simple Configuration
The example below shows how to create a single story file from several ones.

```js
grunt.initConfig({
	entwine: {
		files: {
			'dest/My Finished Story.html': [
				'/Users/Me/Documents/Twine/Stories/Part 1.html',
				'/Users/Me/Documents/Twine/Stories/Part 2.html'
			],
		},
	}
});
```

## Release History
1.0.0: Initial version.
