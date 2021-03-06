/******************************************************************************* 
 * @license
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/

/*global define console */

define(['i18n!orion/compare/nls/messages', 'dojo', 'orion/auth'], function(messages, dojo, mAuth) {

	function _doServiceCall(fileService, funcName, funcArgs) {
		var clientDeferred = new dojo.Deferred();
		fileService[funcName].apply(fileService, funcArgs).then(
			//on success, just forward the result to the client
			function(result) {
				clientDeferred.callback(result);
			},
			//on failure we might need to retry
			function(error) {
				if (error.status === 401 || error.status === 403) {
					mAuth.handleAuthenticationError(error, function(message) {
						//try again
						fileService[funcName].apply(fileService, funcArgs).then(
							function(result) {
								clientDeferred.callback(result);
							},
							function(error) {
								clientDeferred.errback(error);
							}
						);
					});
				} else {
					//forward other errors to client
					clientDeferred.errback(error);
				}
			}
		);
		return clientDeferred;
	}
	
	function _normalizeURL(location) {
		if (location.indexOf("://") === -1) { //$NON-NLS-0$
			var temp = document.createElement('a'); //$NON-NLS-0$
			temp.href = location;
	        return temp.href;
		}
		return location;
	}
	
	
	/**
	 * Creates a new diff provider.
	 * @class Provides operations on Diff in a compare editor
	 * @name orion.compare.DiffProvider
	 */
	function DiffProvider(serviceRegistry, filter) {
		var allReferences = serviceRegistry.getServiceReferences("orion.core.diff"); //$NON-NLS-0$
		var _references = allReferences;
		if (filter) {
			_references = [];
			for(var i = 0; i < allReferences.length; ++i) {
				if (filter(allReferences[i])) {
					_references.push(allReferences[i]);
				}
			}
		}
		var _patterns = [];
		var _services = [];
		
		for(var i = 0; i < _references.length; ++i) {
			_patterns[i] = new RegExp(_references[i].getProperty("pattern") || ".*");			 //$NON-NLS-1$ //$NON-NLS-0$
			_services[i] = serviceRegistry.getService(_references[i]);
		}

		this._getService = function(location) {
			location = _normalizeURL(location);
			for(var i = 0; i < _patterns.length; ++i) {
				if (_patterns[i].test(location)) {
					return _services[i];
				}
			}
			throw messages["No Matching DiffService for location:"] + location;
		};
	}

	DiffProvider.prototype = /** @lends orion.compare.DiffProvider.prototype */
	{
		getDiffContent: function(diffURI){
			return _doServiceCall(this._getService(diffURI), "getDiffContent", arguments); //$NON-NLS-0$
		},
		getDiffFileURI: function(diffURI){
			return _doServiceCall(this._getService(diffURI), "getDiffFileURI", arguments); //$NON-NLS-0$
		}
		
	};
	return {DiffProvider: DiffProvider};
});