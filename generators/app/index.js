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
	    },
	    {
		type: 'editor',
		name: 'assertion',
		message: 'Assertion:',
		store: true
	    },
	    {
		type: 'editor',
		name: 'instructions',
		message: 'Instructions:',
		store: true
	    },
    	    {
		type: 'editor',
		name: 'ref',
		message: 'Reference comparisons:',
		store: true
	    }

	];

	return this.prompt(prompts).then((answers) => {
	    this.config.set(answers);

	});
    }

    writing() {
	testFile: this.fs.copyTpl(
	    this.templatePath('test-template.html'),
	    this.destinationPath(this.config.get('testFilename')),
	    {
		testTitle: this.config.get('testTitle'),
		testMainLocale: this.config.get('testMainLocale'),
		testSrcLocale: this.config.get('testSrcLocale'),
		cssSrc: this.config.get('cssSrc'),
		htmlSrc: this.config.get('htmlSrc'),
		assertion: this.config.get('assertion'),
		instructions: this.config.get('instructions'),
		ref: this.config.get('ref'),
		indent: (text, indent) => this._indent(text, indent) 
	    });

	css: this.fs.copy(
	    this.templatePath('css'),
	    this.destinationPath('css')
	);

	js: this.fs.copy(
	    this.templatePath('js'),
	    this.destinationPath('js')
	);
    };

    end() {
	goodbye: this.log(chalk.blue('Goodbye!'));
    }
	 
};
