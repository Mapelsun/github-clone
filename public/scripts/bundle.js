(()=>{"use strict";const e=new class{constructor(){this.auth_token="f05b7c8a2fe25fe54190556f78fd9f26b681f3aa"}async getUserDetails(){const e=await fetch("https://api.github.com/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"bearer "+this.auth_token},body:JSON.stringify({query:'{\n        user(login: "Mapelsun") {\n          avatarUrl\n          name\n          bio\n          company\n          followers {\n            totalCount\n          }\n          following {\n            totalCount\n          }\n          websiteUrl\n          url\n          twitterUsername\n          status {\n            emoji\n            emojiHTML\n            message\n          }\n          starredRepositories {\n            totalCount\n          }\n          repositories(first: 20) {\n            totalCount\n            nodes {\n              name\n              forkCount\n              isPrivate\n              updatedAt\n              primaryLanguage {\n                color\n                name\n              }\n              stargazerCount\n              url\n              description\n            }\n          }\n          location\n          login\n        }\n      }\n      '})});return await e.json()}},t=new class{toggleMobileNav(){const e=document.querySelector("#hamburger"),t=document.querySelector("#mobileMenu"),n=document.querySelectorAll(".mobile-nav__item");e.addEventListener("click",(()=>{t.classList.toggle("show-mobile")})),n.forEach((e=>{e.addEventListener("click",(()=>{t.classList.remove("show-mobile")}))}))}stickyProfile(){const e=document.querySelector(".user-sticky");window.pageYOffset>400?(e.classList.add("make-sticky"),e.style.opacity="1",e.style.display="flex",e.style.pointerEvents="auto"):(e.classList.remove("make-sticky"),e.style.opacity="0",e.style.display="none",e.style.pointerEvents="none")}updateUserDetails(e){const t=document.querySelector(".details__image"),n=document.querySelectorAll(".icon-avatar"),o=document.querySelector(".details__name"),a=document.querySelector(".details__emoji p"),s=document.querySelector(".details__emoji div"),r=document.querySelector(".details__badge div"),i=document.querySelector(".details__badge span"),l=document.querySelectorAll(".counter"),c=document.querySelector(".user-sticky img"),d=document.querySelector(".user-sticky span"),u=document.querySelector(".details__stats a:nth-of-type(1) span:nth-of-type(1)"),p=document.querySelector(".details__stats a:nth-of-type(2) span:nth-of-type(1)"),m=document.querySelector(".details__stats a:nth-of-type(3) span:nth-of-type(1)"),y=document.querySelector(".details__contact a:nth-of-type(1) span"),h=document.querySelector(".details__contact a:nth-of-type(2) span"),g=document.querySelector(".details__contact a:nth-of-type(3) span"),_=document.querySelector(".details__contact a:nth-of-type(3)"),f=document.querySelector(".details__contact a:nth-of-type(4) span");t.src=e.avatarUrl,n.forEach((t=>t.src=e.avatarUrl)),o.textContent=e.login,a.textContent=e.status.message;const v=document.createElement("div"),S=e.status.emojiHTML;v.innerHTML=S,s.appendChild(v);const C=document.createElement("div"),L=e.status.emojiHTML;C.innerHTML=L,r.appendChild(C),i.textContent=e.status.message,u.textContent=e.followers.totalCount,p.textContent=e.following.totalCount,m.textContent=e.starredRepositories.totalCount,y.textContent=e.company,h.textContent=e.location,g.textContent=e.websiteUrl,_.href=`https://${e.websiteUrl}`,f.textContent=`@${e.twitterUsername}`,l.forEach((t=>t.textContent=e.repositories.totalCount)),this.displayRepositories(e.repositories.nodes),c.src=e.avatarUrl,d.textContent=e.login}formatDate(e){let t=new Date(e);return(new Date-t)/31536e6>1?t.toLocaleDateString("en-US",{month:"short"})+" "+t.toLocaleDateString("en-US",{day:"numeric"})+", "+t.toLocaleDateString("en-US",{year:"numeric"}):t.toLocaleDateString("en-US",{month:"short"})+" "+t.toLocaleDateString("en-US",{day:"numeric"})}displayRepositories(e){const t=document.querySelector(".repos");e.forEach((e=>{const n=document.createElement("li");n.className="repos__list";let o={...e.primaryLanguage};n.innerHTML=`\n                    <div class="repos__item">\n                <div class="repos__details">\n                  <div class="heading">\n                    <a href="${e.url}" target="_blank" rel="noopener noreferrer"\n                      >${e.name}</a\n                    >\n                    ${e.isPrivate?"<span>Private</span>":""}\n                  </div>\n                  ${e.description?`<p class='description'>${e.description}</p>`:""}\n                  <div class="more">\n                  ${o.name?`<div class='more__lang'><span style='background-color: ${o.color};'></span><span>${o.name}</span></div>`:""}\n                    <span>Updated on ${this.formatDate(e.updatedAt)}</span>\n                  </div>\n                </div>\n                <button class="repos__btn">\n                  <svg\n                    viewBox="0 0 16 16"\n                    version="1.1"\n                    width="16"\n                    height="16"\n                    aria-hidden="true"\n                  >\n                    <path\n                      fill-rule="evenodd"\n                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"\n                    ></path></svg\n                  ><span>Star</span>\n                </button>\n              </div>\n               `,t.appendChild(n)}))}printMessage(e){alert(e)}};document.addEventListener("DOMContentLoaded",(()=>{t.toggleMobileNav(),e.getUserDetails().then((e=>t.updateUserDetails(e.data.user))).catch((e=>t.printMessage(e)))})),window.onscroll=t.stickyProfile})();