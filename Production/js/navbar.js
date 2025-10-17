(()=>{
  const NAVBAR_PATH = "components/navbar.html";
  const MENU_PATH = "components/menu.json";

  function createElement(html){
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function buildDesktopMenu(items){
    const ul = document.querySelector(".desktop-nav");
    if(!ul) return;
    ul.innerHTML = "";
    ul.classList.remove("hidden");
    items.forEach(item=>{
      const li = document.createElement("li");
      li.className = "relative group";
      const a = document.createElement("a");
      a.href = item.href || "#";
      a.textContent = item.label;
      a.className = "text-black dark:text-white py-3 inline-block font-medium hover:text-secondary transition-colors duration-200";
      li.appendChild(a);
      if(Array.isArray(item.children) && item.children.length){
        const dd = document.createElement("ul");
        dd.className = "absolute left-0 top-full hidden group-hover:block bg-black/95 text-white min-w-[320px] w-max max-w-[500px] shadow-2xl p-6 rounded-lg border border-white/10 backdrop-blur-md";
        item.children.forEach(child=>{
          const ci = document.createElement("li");
          const ca = document.createElement("a");
          ca.href = child.href || "#";
          ca.textContent = child.label;
          ca.className = "block px-4 py-3 hover:text-secondary hover:bg-white/5 rounded transition-colors duration-200 text-sm font-medium";
          ci.appendChild(ca);
          if(Array.isArray(child.children) && child.children.length){
            const dd2 = document.createElement("ul");
            dd2.className = "ml-4 mt-2 border-l border-white/20 pl-4 space-y-1";
            child.children.forEach(grand=>{
              const gi = document.createElement("li");
              const ga = document.createElement("a");
              ga.href = grand.href || "#";
              ga.textContent = grand.label;
              ga.className = "block px-3 py-2 hover:text-secondary hover:bg-white/5 rounded text-xs text-gray-300 transition-colors duration-200";
              gi.appendChild(ga);
              dd2.appendChild(gi);
            });
            ci.appendChild(dd2);
          }
          dd.appendChild(ci);
        });
        li.appendChild(dd);
        // Click toggle for desktop as well
        a.addEventListener("click",(e)=>{
          if(window.innerWidth>=1024){
            e.preventDefault();
            dd.classList.toggle("hidden");
          }
        });
      }
      ul.appendChild(li);
    });
  }

  function buildOverlayMenu(items){
    const container = document.querySelector(".menu-list");
    if(!container) return;
    container.innerHTML = "";
    items.forEach((item, idx)=>{
      const li = document.createElement("li");
      li.className = "menu-list-item menu-list-item-anchor" + (idx===0?" active":"");
      const a = document.createElement("a");
      a.href = item.href || "#";
      a.className = "text-white text-[28px] md:text-[42px] xl:text-[56px] leading-[70px] xl:leading-[90px] menu-list-item-text";
      a.textContent = item.label;
      li.appendChild(a);
      if(Array.isArray(item.children) && item.children.length){
        const dd = document.createElement("ul");
        dd.className = "menu-list-item-dropdown relative md:absolute top-0 w-full md:w-auto h-fit left-0 md:left-[48%]";
        item.children.forEach(child=>{
          const ci = document.createElement("li");
          const ca = document.createElement("a");
          ca.href = child.href || "#";
          ca.className = "text-white inline-block pb-1 pl-3 menu-list-item-dropdown-list text-base md:text-lg leading-8 md:leading-[50px]";
          ca.textContent = child.label;
          ci.appendChild(ca);
          if(Array.isArray(child.children) && child.children.length){
            const dd2 = document.createElement("ul");
            dd2.className = "pl-5";
            child.children.forEach(grand=>{
              const gi = document.createElement("li");
              const ga = document.createElement("a");
              ga.href = grand.href || "#";
              ga.className = "text-white inline-block pb-1 pl-3 text-sm leading-8";
              ga.textContent = grand.label;
              gi.appendChild(ga);
              dd2.appendChild(gi);
            });
            ci.appendChild(dd2);
          }
          dd.appendChild(ci);
        });
        li.appendChild(dd);
      }
      container.appendChild(li);
    });
  }

  async function injectNavbar(){
    try{
      const resp = await fetch(NAVBAR_PATH, { cache: "no-cache" });
      const html = await resp.text();
      const el = createElement(html);
      const existingHeader = document.getElementById("header");
      if(existingHeader){ existingHeader.replaceWith(el); } else { document.body.prepend(el); }

      const menuResp = await fetch(MENU_PATH, { cache: "no-cache" });
      const menu = await menuResp.json();
      buildDesktopMenu(menu.items || []);
      buildOverlayMenu(menu.items || []);

      // Re-init menu handlers if script.js has already run
      if(window.MenuHandler && typeof window.MenuHandler.init === "function"){
        try{ window.MenuHandler.init(); }catch(_e){}
      }
      // Re-attach dark mode icons if needed
      if(window.DarkMode && typeof window.DarkMode.init === "function"){
        try{ window.DarkMode.init(); }catch(_e){}
      }
    }catch(e){
      console.error("Navbar injection failed", e);
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", injectNavbar);
  }else{
    injectNavbar();
  }
})();


