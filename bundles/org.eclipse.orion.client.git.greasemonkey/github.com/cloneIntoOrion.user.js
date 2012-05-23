// ==UserScript==
// @name           Clone from Github into Orion
// @version        0.4
// @namespace      http://eclipse.org/orion
// @description    Allows to clone repositories from Github into Orion
// @include        https://github.com/*/*
// ==/UserScript==

/*
 * An excerpt from a repo summary page from github.com:
 * 
 * <div class="url-box">
 *  <ul class="native-clones">
 *   <li><a href="/eclipse/orion.client/zipball/master" class="minibutton btn-download " rel="nofollow" title="Download this repository as a zip file"><span><span class="icon"></span>ZIP</span></a>
 *  </ul>
 *  <ul class="clone-urls">
 *   <li class="http_clone_url"><a href="https://github.com/eclipse/orion.client.git" data-permissions="Read-Only">HTTP</a></li>
 *   <li class="public_clone_url"><a href="git://github.com/eclipse/orion.client.git" data-permissions="Read-Only">Git Read-Only</a></li>
 *  </ul>
 *  <input type="text" spellcheck="false" class="url-field" />
 *  <span style="display:none" id="clippy_4858" class="clippy-text"></span>
 *  <span id="clippy_tooltip_clippy_4858" class="clippy-tooltip tooltipped" title="copy to clipboard">...</span>
 *  <p class="url-description"><strong>Read+Write</strong> access</p>
 * </div>
 */

  function toggleDisplay(node, option) {
            if(node.nodeType == 1){
                node.style.display = option;
            }
            node = node.firstChild;
            while (node) {
                toggleDisplay(node, option);
                node = node.nextSibling;
            }
        };



(function () {
	try {

        
		var nativeClonesUl = document.getElementsByClassName("native-clones")[0];
		var gitRepoUrl = document.getElementsByClassName("url-field")[0].value;
		var orionSmallGif = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAOCAYAAAC2POVFAAAAAXNSR0IArs4c6QAABUpJREFUSMfFll1sHFcZhp9zdnZn1xs7tjebqBvbUrxJ6/inMu1N4wuaKkikgggat1X5KdA6iUoQSL2jlwhZCJCQkBKVpq1UpNKEn0YRCTQqitM0EsgWiUtLDU0g3vgva7Nr7493d2Zn5nxcbG2apimX+aS5+XTOnPe853lnjuIjValUZGZ2lqmpKTLT0yQ3b2agr5/tO7YTj8fRWivuYCkAEZHFpSVeevFl3vnbu7S1tbJly2bK5RI3FrJ0dHTx1FPfZGdvD1YodOcEi4jMzy/IwUPPyPCjj8mpU6dlcXFJSqWS5PN5+eulS3L48HfliSe+KpOTk2KMkTsmtu668uOf/FT2Dz8m4+MTt4gREclkrsvXn/yWPPPtw1IsFgTAGCNrj4jcNOd2fQAJaiJB7ZZ+EARSLpfF87xb1l97n5VdXOKdyUn27HmI+++/7xYulVLKGCPfePJrHDn6PFNT/8R1Xbl48SLl8iqO45JMJiiVytLS0qx8P5CJiQkKhQIP7Prs/8SsvidB4QLelUMgAV7mBxJK7EM336caeanx+usn2bo1RRAEEvoQt9XVVS5ceJvu7m6s69dnCYwwtGsIy7I+kUettfrP0pJsiDcxfS3Dzp09nDx5ipXlAhta4uRyeXY9sIvV1YqIGN588xz/ztxgoLerITR/RoKrhzC1a6CjjaiU/kyw8idk+bio9q+owGg++OAK58bOk0wmMcaI1lpls1leffVXPPLIl9ArK3lsO0JTU9On4tIUj9PW1oZbr6EUhMMRegf6eO6577Pvi/uYmLjEzMwMSik2tmwkFo0QjW9BvGUJZkYx7g3QsbVMN47YmYX5n+FVF8SOKJpb2gh84ZVXfkkulwPAsixisSjRaAxtTIDvB2itP1WsMYa656FUYzEjhni8ibbWVlpbWzCmjud5DXS0IqQVSofB+RdSfRe4TS6daeqFy6zh3d7eTKlU5MSJ3+L7vqyZqBRYiUQCz/PJ53OIiKg1NR+rcrlMqVjEtmMopbHtCAvzC/z+9Gkuvv0X0untpFKp9Y1ZVggxPlKfB/RNjn4scvjOHKEWwfM8+vv7uOeeHl544RgDA/2k093E43FEwEqn00TCFuPj4wwODt7OVTnzxzeoOS733tuPZVkoNPMLN7h65QqdnV08++z3SCY3qXrdEzGCGAUKlNL//2OvowD4vk84bDM0NMTKSoGXXzrGgw/tRlBorbGSySS7dz/I2bNn+czgIL7vy0eDZoyRTCbDideO09fbSzqdxvM8HNehoyOFkhTZxSxGzLpTAhjxUcoCuxtU+LauoiC84W4IaYwYqtUKkUiYhx/ey9TU3xkbe4tI2MayNDocDqvh4f10p+/myNHn+c2vf8fs3JwUiyXJZrMydv4tRkd/hIjh4MERotGoqtVq1ByHrR0d7B/+MtWqw9Ejv6BSrUgoFEIpReDXMRKCWB+67XOfzKxSsHEP9sYBjBFMIATGYIyhqSmmnn56hPb2BLVqrRE2gEQiofL5ZTn+2nHO/OEMY+fH2LQpSaG4QrFYJJ1Oc2BkhK6uznUmPdfFdWr09PTw+OOPcuzYi4ydO8/evZ9HKXCcCjWnjlJxZWrTwvzPCZbfAON+KDSMlfgCbP0OOtysCsWq+L6LCfz1sKVSd3HgwAijPxylWnVupr5er0sul+P99/9BsbiCbdvs2LGDbdu2Ydv2+ljXdWV2bp6obZNK3UW9XufadIZYLEpHKsXs3Bw1x6Grs5Pm5ubG/cMvi6m8h9SuNrTG0uj4IMraoADqXiBzszMoDV2dXaz9FHzfl8uXL5NMbua/c8bERMhYc/8AAAAASUVORK5CYII=)";

		
		
		var closehref = document.createElement("a");
		closehref.href = "javascript:;";
		closehref.className = "close js-menu-close";
		closehref.style.display = "none";
		closehref.style.verticalAlign = "top";
		closehref.style.textDecoration = "none";
		closehref.onclick = function(){
		    toggleDisplay(selectionDialog, "none");
		    return true;
		    }
		closehref.hover = function(){
		    closehref.style.textDecoration = "none";
		}
		    
		var close = document.createElement("span");
		close.className = "mini-icon remove-close";
		close.style.display = "none";
		close.style.verticalAlign = "top";


		var header = document.createElement("div");
		header.innerHTML = "Clone repository into";
		header.className = "context-title";
		header.style.display="none";
		header.id  = "header";	
		header.style.position = "static";
		
		var selectSection = document.createElement("div");
		selectSection.className = "context-body pane-selector commitish-selector js-navigation-container";
		selectSection.style.display = "none";
		selectSection.id = "SS";
		
		var selectSection2 = document.createElement("div");
		selectSection2.className = "js-filter-tab js-filter-branches";
		selectSection.style.display = "none";
		
		var orionhubDiv = document.createElement("div");
		orionhubDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		
		orionhubDiv.onmouseover = function(){
            orionhubDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target navigation-focus";
		    return true;
		    }
		    
  		orionhubDiv.onmouseout = function(){
            orionhubDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		    return true;
		    }
		orionhubDiv.style.display = "none";
		
		var h41 = document.createElement("h4");
		h41.style.display = "none";
		
		var orionhubA = document.createElement("a");
		orionhubA.href = "http://orionhub.org/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		orionhubA.className = "js-navigation-open";
		orionhubA.target = "_blank";
		orionhubA.innerHTML = "OrionHub";
		orionhubA.style.display = "none";
		orionhubA.onclick = function(){
            toggleDisplay(selectionDialog, "none");
		    return true;
		    }
		
	    var orioneclipseorgDiv = document.createElement("div");
		orioneclipseorgDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		orioneclipseorgDiv.onmouseover = function(){
            orioneclipseorgDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target navigation-focus";
		    return true;
		    }
		    
  		orioneclipseorgDiv.onmouseout = function(){
            orioneclipseorgDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		    return true;
		    }
		    
		orioneclipseorgDiv.style.display = "none";
		
		var h42 = document.createElement("h4");
		h42.style.display = "none";
		
		var orioneclipseorgA = document.createElement("a");
		orioneclipseorgA.className = "js-navigation-open";
		orioneclipseorgA.href = "http://orion.eclipse.org/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		orioneclipseorgA.rel = "nofollow";
		orioneclipseorgA.target = "_blank";
		orioneclipseorgA.innerHTML = "orion.eclipse.org";
		orioneclipseorgA.style.display = "none";
		orioneclipseorgA.onclick = function(){
            toggleDisplay(selectionDialog, "none");
		    return true;
		    }
	    
		
	    var otherDiv = document.createElement("div");
		otherDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		
		otherDiv.onmouseover = function(){
            otherDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target navigation-focus";
		    return true;
		    }
		    
  		otherDiv.onmouseout = function(){
            otherDiv.className = "commitish-item branch-commitish selector-item js-navigation-item js-navigation-target";
		    return true;
		    }
		otherDiv.style.display = "none";
		
		var h43 = document.createElement("h4");
		h43.style.display = "none";
		h43.style.paddingRight = "0px";
		h43.style.width = "65px";
		

		
		var formDiv = document.createElement("div");
		formDiv.className = "filterbar";
		formDiv.style.display = "none";
		
		var host = document.createElement("input");
		host.className = "commitsh-filter";
		host.placeholder = "address";
		host.style.display = "none";
		host.style.styleFloat = "right";
		host.style.cssFloat = "right";
		host.style.styleFloat = "top";
		host.style.cssFloat = "top";
		host.style.paddingLeft = "2px";
		host.style.width = "200px";
		host.name = "hostName";
		host.type = "text";
		host.id = "hostid";
		host.value = "";
		host.onblur=function(){
            otherA.href = "http://" + document.getElementById('hostid').value + "/git/git-repository.html#,cloneGitRepository=" + gitRepoUrl;
		    return true;
		    }
		
	    var val = host.getAttribute('value');
		
	    var otherA = document.createElement("a");
		otherA.href = "";
		
		otherA.style.paddingRight = "0px"
		otherA.className = "js-navigation-open";
		otherA.target = "_blank";
		otherA.innerHTML = "Clone into ";
		otherA.style.display = "none";
		otherA.onclick = function(){
            toggleDisplay(selectionDialog, "none");
		    return true;
		    }
		
		
		var li = document.createElement("li");
		li.style.width = "130px";
		var div = document.createElement("div");
		div.className = "js-menu-container context-menu-container";
		div.style.backgroundPosition = "right 2px";
		div.style.paddingLeft = "2px";
		div.style.paddingRight = "45px";
		div.style.marginRight = "5px";
		div.style.width = "130px";
		
		var a = document.createElement("a");
		a.className = "minibutton switcher";
		a.id = "cloneinto"
		a.target = "_blank";
		a.onclick = function(e){
            e.stopPropagation();
            toggleDisplay(selectionDialog, "block");
            close.style.display = "none";
            close.style.display = "block";
		    return true;
		    }


		var span = document.createElement("span");
		span.innerHTML = "Clone into";
		span.style.backgroundRepeat = "no-repeat";
		span.style.backgroundPosition = "78% 4px";
		span.style.paddingLeft = "2px";
		span.style.paddingRight = "5px";
		span.style.backgroundImage = orionSmallGif;
		span.style.marginRight = "2px";
		span.style.width = "125px";
		
		var selectionDialog = document.createElement("div");
		selectionDialog.className = "context-pane commitsh-context js-menu-content";
		selectionDialog.style = "margin-top: -146px";
		selectionDialog.style.display = "none";
		selectionDialog.id = "sd"
		selectionDialog.onclick = function(e){
            e.stopPropagation();
        }

        document.body.onclick = function(){
            toggleDisplay(selectionDialog, "none");
            return true;
        }

		a.appendChild(span);
		div.appendChild(a)
		li.appendChild(div);
		nativeClonesUl.appendChild(li);
			
    	selectionDialog.appendChild(closehref);
		closehref.appendChild(close);
		
		selectionDialog.appendChild(header);

		
		
		selectionDialog.appendChild(selectSection);
		selectSection.appendChild(selectSection2);
		
		
		h41.appendChild(orionhubA);
		orionhubDiv.appendChild(h41);
		selectSection2.appendChild(orionhubDiv);
		
		h42.appendChild(orioneclipseorgA);
		orioneclipseorgDiv.appendChild(h42);
		selectSection2.appendChild(orioneclipseorgDiv);
		
		h43.appendChild(otherA);
		otherDiv.appendChild(host);
		otherDiv.appendChild(h43);
		selectSection2.appendChild(otherDiv);
		
		//formDiv.appendChild(host);
		//formDiv.appendChild(port);
		selectSection2.appendChild(formDiv);
		
		
		nativeClonesUl.appendChild(selectionDialog);
	} catch (e) {
		// silently ignore, not on the right page
	}
})();

