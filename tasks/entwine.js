'use strict';
var path = require('path');
var Story = require('twine-utils/story');
var StoryFormat = require('twine-utils/story-format');

module.exports = function(grunt) {
	grunt.registerMultiTask(
		'entwine',
		'A Grunt plugin for assembling Twine 2 story files from multiple ' +
		'story files, JavaScript, and CSS source files.',
		function() {
			var opts = this.options();
			var format = new StoryFormat();
			
			if (! opts.format) {
				grunt.fail.warn('You must specify a format in the options of this task.');
			}
			
			format.load(grunt.file.read(opts.format));
			
			this.files.forEach(function(fileGroup) {
				var story = new Story();
				
				fileGroup.src.forEach(function(srcName) {
					var src = grunt.file.read(srcName);
					
					switch (path.extname(srcName)) {
						case '.css':
							story.mergeStylesheet(src);
							break;
							
						case '.htm':
						case '.html':
							story.mergeHtml(src);
							break;
						
						case '.js':
							story.mergeJavaScript(src);
							break;

						case '.tw':
						case '.txt':
							story.mergeTwee(src);
							break;
							
						default:
							grunt.fail.warn("Don't know how to merge " + srcName + "." +
								"Its extension should be .css, .htm, .html, " +
								".tw, .txt, or .js.");
					}
				});
				
				if (opts.name) {
					story.attributes.name = opts.name;
				}
				
				grunt.file.write(fileGroup.dest, format.publish(story));
			});
		}
	);
};
