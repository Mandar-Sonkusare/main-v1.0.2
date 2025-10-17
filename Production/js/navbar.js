(() => {
  const NAVBAR_PATH = "components/navbar.html";
  const MENU_PATH = "components/menu.json";

  // Global dropdown state management
  let activeDropdown = null;
  let dropdownTimeout = null;

  function createElement(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(-10px)';
      dropdown.style.pointerEvents = 'none';
    });
    activeDropdown = null;
  }

  function positionDropdown(dropdown, trigger) {
    const rect = trigger.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Reset positioning
    dropdown.style.left = '0';
    dropdown.style.right = 'auto';
    dropdown.style.top = '100%';
    dropdown.style.bottom = 'auto';
    dropdown.style.transform = 'translateY(0)';
    
    // Force dropdown to open downward first
    dropdown.style.top = '100%';
    dropdown.style.bottom = 'auto';
    
    // Check if dropdown goes off right edge
    if (rect.left + dropdownRect.width > viewportWidth - 20) {
      dropdown.style.left = 'auto';
      dropdown.style.right = '0';
    }
    
    // Only check bottom edge if dropdown is actually visible and measured
    if (dropdownRect.height > 0) {
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Only open upward if there's not enough space below AND there's more space above
      if (spaceBelow < dropdownRect.height + 20 && spaceAbove > spaceBelow) {
        dropdown.style.top = 'auto';
        dropdown.style.bottom = '100%';
        dropdown.style.transform = 'translateY(0)';
      }
    }
  }

  function buildDesktopMenu(items) {
    const ul = document.querySelector(".desktop-nav");
    if (!ul) return;
    
    ul.innerHTML = "";
    ul.classList.remove("hidden");
    
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "nav-item relative group";
      
      const a = document.createElement("a");
      a.href = item.href || "#";
      a.textContent = item.label;
      a.className = "nav-link text-black dark:text-white py-4 px-3 inline-block font-medium hover:text-secondary transition-all duration-300 relative";
      li.appendChild(a);
      
      if (Array.isArray(item.children) && item.children.length) {
        // Create dropdown container
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown-menu absolute left-0 top-full bg-gray-900/95 dark:bg-gray-800/95 shadow-2xl rounded-xl border border-gray-700/50 dark:border-gray-600/50 min-w-[300px] w-max max-w-[450px] p-3 opacity-0 transform -translate-y-2 transition-all duration-300 ease-out pointer-events-none z-50 backdrop-blur-xl";
        
        // Create dropdown content
        const content = document.createElement("div");
        content.className = "space-y-1";
        
        item.children.forEach(child => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "dropdown-item";
          
          const childLink = document.createElement("a");
          childLink.href = child.href || "#";
          childLink.textContent = child.label;
          childLink.className = "block px-4 py-3 text-gray-200 dark:text-gray-300 hover:text-white hover:bg-gray-700/50 dark:hover:bg-gray-600/50 rounded-lg transition-all duration-200 text-sm font-medium group";
          itemDiv.appendChild(childLink);
          
          if (Array.isArray(child.children) && child.children.length) {
            const submenu = document.createElement("div");
            submenu.className = "ml-4 mt-2 space-y-1 border-l border-gray-600/50 dark:border-gray-500/50 pl-4";
            
            child.children.forEach(grand => {
              const subItem = document.createElement("div");
              const subLink = document.createElement("a");
              subLink.href = grand.href || "#";
              subLink.textContent = grand.label;
              subLink.className = "block px-3 py-2 text-gray-400 dark:text-gray-400 hover:text-gray-200 hover:bg-gray-700/30 dark:hover:bg-gray-600/30 rounded-md transition-all duration-200 text-xs";
              subItem.appendChild(subLink);
              submenu.appendChild(subItem);
            });
            
            itemDiv.appendChild(submenu);
          }
          
          content.appendChild(itemDiv);
        });
        
        dropdown.appendChild(content);
        li.appendChild(dropdown);
        
        // Add hover and click events
        li.addEventListener('mouseenter', () => {
          if (window.innerWidth >= 1024) {
            closeAllDropdowns();
            activeDropdown = dropdown;
            dropdown.classList.add('active');
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
            dropdown.style.pointerEvents = 'auto';
            // Small delay to ensure proper positioning
            setTimeout(() => {
              positionDropdown(dropdown, a);
            }, 10);
          }
        });
        
        li.addEventListener('mouseleave', () => {
          if (window.innerWidth >= 1024) {
            dropdownTimeout = setTimeout(() => {
              if (activeDropdown === dropdown) {
                closeAllDropdowns();
              }
            }, 150);
          }
        });
        
        a.addEventListener("click", (e) => {
          if (window.innerWidth >= 1024) {
            e.preventDefault();
            if (activeDropdown === dropdown) {
              closeAllDropdowns();
            } else {
              closeAllDropdowns();
              activeDropdown = dropdown;
              dropdown.classList.add('active');
              dropdown.style.opacity = '1';
              dropdown.style.transform = 'translateY(0)';
              dropdown.style.pointerEvents = 'auto';
              // Small delay to ensure proper positioning
              setTimeout(() => {
                positionDropdown(dropdown, a);
              }, 10);
            }
          }
        });
      }
      
      ul.appendChild(li);
    });
  }

  function buildOverlayMenu(items) {
    const container = document.querySelector(".menu-list");
    if (!container) return;
    
    container.innerHTML = "";
    
    items.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = "menu-list-item menu-list-item-anchor" + (idx === 0 ? " active" : "");
      
      const a = document.createElement("a");
      a.href = item.href || "#";
      a.className = "text-white text-[28px] md:text-[42px] xl:text-[56px] leading-[70px] xl:leading-[90px] menu-list-item-text transition-colors duration-300";
      a.textContent = item.label;
      li.appendChild(a);
      
      if (Array.isArray(item.children) && item.children.length) {
        const dd = document.createElement("ul");
        dd.className = "menu-list-item-dropdown relative md:absolute top-0 w-full md:w-auto h-fit left-0 md:left-[48%] space-y-2";
        
        item.children.forEach(child => {
          const ci = document.createElement("li");
          const ca = document.createElement("a");
          ca.href = child.href || "#";
          ca.className = "text-white inline-block pb-1 pl-3 menu-list-item-dropdown-list text-base md:text-lg leading-8 md:leading-[50px] hover:text-secondary transition-colors duration-200";
          ca.textContent = child.label;
          ci.appendChild(ca);
          
          if (Array.isArray(child.children) && child.children.length) {
            const dd2 = document.createElement("ul");
            dd2.className = "pl-6 mt-2 space-y-1 border-l border-white/20";
            
            child.children.forEach(grand => {
              const gi = document.createElement("li");
              const ga = document.createElement("a");
              ga.href = grand.href || "#";
              ga.className = "text-white inline-block pb-1 pl-3 text-sm leading-6 hover:text-secondary transition-colors duration-200";
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

  function setupClickOutside() {
    document.addEventListener('click', (e) => {
      if (activeDropdown && !e.target.closest('.nav-item')) {
        closeAllDropdowns();
      }
    });
  }

  function setupResizeHandler() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        closeAllDropdowns();
      }
    });
  }

  async function injectNavbar() {
    try {
      const resp = await fetch(NAVBAR_PATH, { cache: "no-cache" });
      const html = await resp.text();
      const el = createElement(html);
      const existingHeader = document.getElementById("header");
      if (existingHeader) {
        existingHeader.replaceWith(el);
      } else {
        document.body.prepend(el);
      }

      const menuResp = await fetch(MENU_PATH, { cache: "no-cache" });
      const menu = await menuResp.json();
      buildDesktopMenu(menu.items || []);
      buildOverlayMenu(menu.items || []);
      
      // Setup event handlers
      setupClickOutside();
      setupResizeHandler();

      // Re-init menu handlers if script.js has already run
      if (window.MenuHandler && typeof window.MenuHandler.init === "function") {
        try { window.MenuHandler.init(); } catch (e) { console.warn('MenuHandler init failed:', e); }
      }
      
      // Re-attach dark mode icons if needed
      if (window.DarkMode && typeof window.DarkMode.init === "function") {
        try { window.DarkMode.init(); } catch (e) { console.warn('DarkMode init failed:', e); }
      }
    } catch (e) {
      console.error("Navbar injection failed", e);
    }
  }

  // Initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNavbar);
  } else {
    injectNavbar();
  }
})();