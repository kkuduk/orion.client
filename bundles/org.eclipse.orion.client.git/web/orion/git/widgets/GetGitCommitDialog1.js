/*******************************************************************************
 * @license
 * Copyright (c) 2011, 2012 IBM Corporation and others. 
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/
/*global alert confirm orion window widgets eclipse:true serviceRegistry define */
/*jslint browser:true */

define(['i18n!git/nls/gitmessages', 'dojo', 'dijit', 'dojox','orion/commands', 'dijit/Dialog', 'dojo/data/ItemFileReadStore', 'dojox/form/Uploader', 'dojox/form/uploader/FileList', 
        'dojox/form/uploader/plugins/IFrame', 'dijit/form/Button','dijit/ProgressBar', 'orion/widgets/_OrionDialogMixin', 
        'text!orion/git/widgets/templates/GetGitCommitDialog1.html','orion/git/widgets/GitCredentialsDialog'], 
        function(messages, dojo, dijit, dojox, mCommands) {

/**
 */
dojo.declare("orion.git.widgets.GetGitCommitDialog1", [ dijit.Dialog, orion.widgets._OrionDialogMixin ], { //$NON-NLS-0$
	widgetsInTemplate : true,
	templateString : dojo.cache('orion', 'git/widgets/templates/GetGitCommitDialog1.html'), //$NON-NLS-1$ //$NON-NLS-0$

	constructor : function() {
		this.inherited(arguments);
		this.options = arguments[0] || {};

	},
	
	postMixInProperties : function() {
		this.inherited(arguments);
		this.title = "Get Git Commit";
	},
	
	postCreate : function() {
		
		var that = this;
		this.inherited(arguments);
		var sectionsDiv = dojo.byId("div1"); //$NON-NLS-0$
		var sections =  dojo.query(".sectionAnchor"); //$NON-NLS-0$
		var commitNumber = this.options.commitNumber;
		var commandService = this.options.commandService;
		var explorer = this.options.explorer;
		var repoUrl = this.options.repoUrl;
		var reposWithRemote = this.options.repos;
		var repositories = this.options.repositories;
		var commitUrls = this.options.commitUrls;
		var remotesWithComit = this.options.remotesWithComit;
		var indexes = this.options.indexes;
		var selected;
		var rem = this.options.rem;
		sectionsDiv.innerHTML = "Commit " + commitNumber+ " from " + repoUrl + " found on: " ;
		dojo.create("br", {id : remotesWithComit[i], style: "padding: 0px; text-align: left; width: 20px", innerHTML: remotesWithComit[i] },  dojo.byId("buttonDiv"));
		for (var i=0; i<remotesWithComit.length;i++){
				//var value = i.toString();
				dojo.create("span", {id : remotesWithComit[i], style: "padding: 0px; text-align: left; width: 20px", innerHTML: remotesWithComit[i] + "    " },  dojo.byId("buttonDiv"));
				dojo.create("a", {id : commitUrls[i], style: "padding: 0px; text-align: left; width: 50px", innerHTML: "Open Commit", href: commitUrls[i] },  dojo.byId("buttonDiv"));
				//var input = dojo.create("input", {id : reposWithRemote[i] + "radio", type: "radio", name: "radios", value : value ,style: "padding: 0px; float: left; width: 20px;" }, dojo.byId("buttonDiv") );
				dojo.create("br", {id : remotesWithComit[i], style: "padding: 0px; text-align: left; width: 20px", innerHTML: remotesWithComit[i] },  dojo.byId("buttonDiv"));
				//dojo.create("label", {for: reposWithRemote[i] + "radio", innerHTML:reposWithRemote[i]}, dojo.byId("buttonDiv"));
			}
			
		dojo.create("br", {id : remotesWithComit[i], style: "padding: 0px; text-align: left; width: 20px", innerHTML: remotesWithComit[i] },  dojo.byId("buttonDiv")); 
		dojo.create("span", {id : "header", style: "padding: 0px; vertical-align: left; width: 20px", innerHTML: repoUrl + " is also used by the following repos: "},  dojo.byId("fetchDiv0"));
	
		for(var i = 0; i<reposWithRemote.length; i++){
			if (remotesWithComit.indexOf(reposWithRemote[i]) === -1){
				dojo.create("span", {id : reposWithRemote[i], style: "padding: 0px; vertical-align: left; width: 20px", innerHTML: reposWithRemote[i] },  dojo.byId("fetchDiv"));
				commandService.registerCommandContribution("buttonDiv", "eclipse.orion.git.fetchUpdate", 100);
				commandService.renderCommands("buttonDiv", dojo.byId("fetchDiv"), rem[i].Children[indexes[i]], explorer, "tool");
			}
		}
		
		dojo.attr(dojo.byId("header3"), "innerHTML", " create new clone using " + repoUrl);
		var func = function(){
			var lastDiv = dojo.byId("fetchDiv").children;
			dojo.attr(dojo.byId("getCommitButton"), "style", "display: block");
			dojo.attr(lastDiv[0], "style", "display: block");
		var selected;
		
		for(var i=0; i<reposWithRemote.length;i++){
			var radio = dojo.byId(reposWithRemote[i] + "radio");
			if(radio.checked){
				selected = i;
			}
		}
		alert(rem[selected].Children[indexes[selected]]);
		commandService.registerCommandContribution("buttonDiv", "eclipse.orion.git.fetch", 100);
		commandService.renderCommands("itemLevelCommands", dojo.byId("fetchDiv"), rem[selected].Children[indexes[selected]], explorer, "button");
		dojo.attr(dojo.byId("buttoneclipse.removeRemote15"), "style", "display: none");
		
		dojo.attr(dojo.byId("button"), "style", "display: none");
		
	};
	
		dojo.connect(dojo.byId("button"),"onclick", func);

		},

	execute: function(){
		this.options.cloneDialog.startup();
		this.options.cloneDialog.show();

	}
});
	
		

});
