// ==UserScript==
// @name           Clone from Bugzilla into Orion
// @version        0.4
// @namespace      http://eclipse.org/orion
// @description    Allows to clone repository for the selected bug into Orion
// @include        https://bugs.eclipse.org/bugs/show_bug.cgi?id=*
// ==/UserScript==

/*
 * An excerpt from a bug page from bugs.eclipse.org:
 * 
 * for a logged user:
 *
 * <td id="bz_show_bug_column_1" class="bz_show_bug_column">
 * 	<table>
 *   ...
 *   <tr>
 *    <th class="field_label" id="field_label_product"><a href="describecomponents.cgi">Product:</a></th>
 *    <td class="field_value" id="field_container_product">
 *     <select id="product" name="product">
 *      <option value="ACTF" id="v98_product">ACTF</option>
 *      <option ...>...</option>
 *     </select> 
 *     <script>...</script>
 *    </td>
 *   </tr>
 *   <tr>
 *    <td class="field_label"><label for="component" accesskey="m"><b><a href="describecomponents.cgi?product=Orion">Co<u>m</u>ponent</a>:</b></label></td>
 *    <td>
 *     <select id="component" name="component">
 *      <option value="Client" selected>Client</option>
 *      <option ...>...</option>
 *     </select> 
 *    </td>
 *   </tr>
 *   ...  
 *
 * for guest:
 *
 * <td id="bz_show_bug_column_1" class="bz_show_bug_column">
 * 	<table>
 *   ...
 *   <tr>
 *    <th class="field_label" id="field_label_product"><a href="describecomponents.cgi">Product:</a></th>
 *    <td class="field_value" id="field_container_product">Orion</td>
 *   </tr>
 *   <tr>
 *    <td class="field_label"><label for="component" accesskey="m"><b><a href="describecomponents.cgi?product=Orion">Co<u>m</u>ponent</a>:</b></label></td>
 *    <td>Client</td>
 *   </tr>
 *   ...
 */
(function () {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};

	var map = {};
	map["Orion_Client"] = "git://git.eclipse.org/gitroot/orion/org.eclipse.orion.client.git";
	map["Orion_Editor"] = "git://git.eclipse.org/gitroot/orion/org.eclipse.orion.client.git";
	map["Orion_Git"] = "git://git.eclipse.org/gitroot/orion/org.eclipse.orion.server.git";
	map["Orion_Server"] = "git://git.eclipse.org/gitroot/orion/org.eclipse.orion.server.git";
	map["Platform_Ant"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.git";
	map["Platform_Compare"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.team.git";
	map["Platform_CVS"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.team.git";
	map["Platform_Debug"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.debug.git";
	map["Platform_Doc"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.common.git";
	map["Platform_Releng"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.releng.maps.git";
	map["Platform_Resources"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.resources.git";
	map["Platform_Runtime"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.runtime.git";
	map["Platform_SWT"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.swt.git";
	map["Platform_Team"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.team.git";
	map["Platform_Text"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.text.git";
	map["Platform_UI"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.ui.git";
	map["Platform_User Assistance"] = "git://git.eclipse.org/gitroot/platform/eclipse.platform.ua.git";
	// TODO: add more

	var product = document.getElementById("product");
	var component = document.getElementById("component");
	var guest = false;

	if (product && component) {
		product = product.options[product.selectedIndex].value;
		component = component.options[component.selectedIndex].value;
	} else {
		guest = true;
		product = document.getElementById("field_container_product").textContent.trim();
		component = document.getElementById("field_container_product").parentNode.nextElementSibling.nextElementSibling.children[1].textContent.trim();
	}

	var gitRepoUrl = map[product + "_" + component];
	if (gitRepoUrl) {
	
	    var div = document.createElement("div");
	    div.style.height = "20px";
	    div.className = "bz_alias_short_desc_container edit_form";
	    var parentDiv = document.getElementById("changeform");
	    parentDiv.insertBefore(div, document.getElementsByClassName("bz_alias_short_desc_container edit_form")[0].nextSibling);
	    div.style.display = "none";
	
	    
		var a = document.createElement("a");
		//a.href = "#";
		a.target = "_blank";
		a.appendChild(document.createTextNode("Clone into Orion"));
		a.onclick = function(){
            div.style.display = "block";
		    return true;
		    }
		    
		
		    
		var orionhub = document.createElement("a");
		orionhub.href = "http://orionhub.org/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		orionhub.target = "_blank";
		orionhub.style.float = "right";
		orionhub.style.paddingLeft = "10px";
		div.appendChild(orionhub);
		orionhub.appendChild(document.createTextNode("OrionHub"));
		
		var eclipseorg = document.createElement("a");
		eclipseorg.href = "http://orion.eclipse.org/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		eclipseorg.target = "_blank";
		eclipseorg.style.float = "right";
		eclipseorg.style.paddingLeft = "10px";
		div.appendChild(eclipseorg);
		eclipseorg.appendChild(document.createTextNode("orion.eclipse.org"));
		
		
	    var yourown = document.createElement("a");
		yourown.href = "";
		yourown.target = "_blank";
		yourown.style.float = "right";
		yourown.style.paddingLeft = "10px";
		yourown.appendChild(document.createTextNode("Clone into"));
		//yourown.style.display = "none";
		
		
		var host = document.createElement("input");
		host.className = "txt";
		host.style.float = "right";
		host.style.paddingLeft = "10px";
		host.placeholder = "address";
		host.id = "hostid";
		
		host.onblur=function(){
            yourown.href = "http://" + document.getElementById('hostid').value  + "/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		    return true;
		    }

		     
		div.appendChild(host);    
		div.appendChild(yourown);    
		    
		var span = document.createElement("span");
		if (!guest) {
			span.style["padding"] = "10px";
			span.appendChild(a);
			var saveBtn = document.getElementById("commit_top");
			document.getElementsByClassName("knob-buttons")[0].insertBefore(span, saveBtn);
		} else {
			span.style["float"] = "right";
			span.appendChild(a);
			var desc = document.getElementsByClassName("bz_alias_short_desc_container edit_form")[0];
			desc.appendChild(span);
		}
	}
})();