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
/*global define window dojo dijit dojox orion*/
/*jslint browser:true */

define(['i18n!git/nls/gitmessages', 'dojo', 'dijit', 'dojox', 'dijit/Dialog', 'dojo/data/ItemFileReadStore', 'dojox/form/Uploader', 'dojox/form/uploader/FileList', 
        'dojox/form/uploader/plugins/IFrame', 'dijit/form/Button','dijit/ProgressBar', 'orion/widgets/_OrionDialogMixin', 
        'text!orion/git/widgets/templates/GetGitCommitDialog2.html','orion/git/widgets/CloneGitRepositoryDialog','orion/git/widgets/OpenCommitDialog'], 
        function(messages, dojo, dijit, dojox) {

/**
 */
dojo.declare("orion.git.widgets.GetGitCommitDialog2", [ dijit.Dialog, orion.widgets._OrionDialogMixin ], { //$NON-NLS-0$
	widgetsInTemplate : true,
	templateString : dojo.cache('orion', 'git/widgets/templates/GetGitCommitDialog2.html'), //$NON-NLS-1$ //$NON-NLS-0$

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
		var found = this.options.repo_found;
		var commitNumber = this.options.commitNumber;
		var repoUrl = this.options.repoUrl;
		var reposWithRemote = this.options.repos;
		sectionsDiv.innerHTML = "Remote " + repoUrl + " is not attached to your repositories: \n Do you want to clone it?";
	},

	
	execute: function(){
		this.options.cloneDialog.startup();
		this.options.cloneDialog.show();

	}
});

});
