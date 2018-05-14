'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

     constructor(args, opts) {
	 super(args, opts);
     };

    _indent(text, indentNum) {
	var output = '';
	var array = text.split('\n');

	array.forEach(function(line, num){
	    if(num > 0){
		for(var i=0;i < indentNum;i++){
		    line = ' ' + line;
		}
	    }

	    if(num < array.length - 1){
		output += line + '\n';
	    } else {
		output += line;
	    }
	});
	
	return output;
    };

    prompting() {
	this.log(
	    yosay(`Welcome to ${chalk.blue('generator-alreq-ga-tests')}!`)
	);

	const prompts = [
	    {
		type: 'input',
		name: 'testTitle',
		message: 'Provide a test Title:',
		store: true
	    },
	    {
		type: 'input',
		name: 'testFilename',
		message: 'Filename:',
		store: true

	    },
	    {
		type: 'input',
		name: 'testMainLocale',
		message: 'Main locale for the page:',
		default: 'en',
		store: true
		
	    },
	    {
		type: 'input',
		name: 'testSrcLocale',
		message: 'Locale for the test:',
		store: true		
	    },
	    {
		type: 'editor',
		name: 'cssSrc',
		message: 'CSS:',
		store: true		
	    },
	    {
		type: 'editor',
		name: 'htmlSrc',
		message: 'HTML:',
		store: true		
	    }
	];

	return this.prompt(prompts).then((answers) => {
	    this.config.set(answers);

	});
    }

  writing() {
    this.fs.copyTpl(
	this.templatePath('test-template.html'),
	this.destinationPath(this.config.get('testFilename')),
	{
	    testTitle: this.config.get('testTitle'),
	    testMainLocale: this.config.get('testMainLocale'),
	    testSrcLocale: this.config.get('testSrcLocale'),
	    cssSrc: this._indent(this.config.get('cssSrc'), 6),
	    htmlSrc: this._indent(this.config.get('htmlSrc'), 6)
//	    indent: (text, indent) => this._indent(text, indent) 
	})
  }
	 
};
