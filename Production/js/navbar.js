/**
 * Modern Clean Navbar JavaScript
 * Handles dropdowns, mobile menu, and theme toggle functionality
 */

class ModernNavbar {
  constructor() {
    this.activeDropdown = null;
    this.dropdownTimeout = null;
    this.mobileMenuOpen = false;
    this.menuData = null;
    
    this.init();
  }

  async init() {
    try {
      // Load menu data
      await this.loadMenuData();
      
      // Inject navbar HTML
      await this.injectNavbar();
      
      // Build navigation menus
      this.buildDesktopMenu();
      this.buildMobileMenu();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Initialize theme toggle
      this.initThemeToggle();
      
      console.log('Modern Navbar initialized successfully');
    } catch (error) {
      console.error('Failed to initialize navbar:', error);
    }
  }

  async loadMenuData() {
    try {
      const response = await fetch('components/menu.json', { cache: 'no-cache' });
      this.menuData = await response.json();
    } catch (error) {
      console.error('Failed to load menu data:', error);
      // Fallback menu data
      this.menuData = {
        items: [
          { label: 'Home', href: 'index.html' },
          { label: 'About', href: 'about.html' },
          { label: 'Services', href: 'services.html' },
          { label: 'Blog', href: 'blog.html' },
          { label: 'Projects', href: 'project.html' },
          { label: 'Contact', href: 'contact.html' }
        ]
      };
    }
  }

  async injectNavbar() {
    try {
      const response = await fetch('components/navbar.html', { cache: 'no-cache' });
      const html = await response.text();
      
      // Remove existing header
      const existingHeader = document.getElementById('header');
      if (existingHeader) {
        existingHeader.remove();
      }
      
      // Create new header element
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const newHeader = tempDiv.firstElementChild;
      
      // Insert at the beginning of body
      document.body.insertBefore(newHeader, document.body.firstChild);
      
      // Load navbar CSS
      this.loadNavbarCSS();
      
    } catch (error) {
      console.error('Failed to inject navbar:', error);
    }
  }

  loadNavbarCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/navbar.css';
    document.head.appendChild(link);
  }

  buildDesktopMenu() {
    const menuContainer = document.querySelector('.navbar-menu');
    if (!menuContainer || !this.menuData) return;

    menuContainer.innerHTML = '';
    
    this.menuData.items.forEach(item => {
      const menuItem = this.createMenuItem(item);
      menuContainer.appendChild(menuItem);
    });
  }

  createMenuItem(item) {
    const li = document.createElement('li');
    li.className = 'navbar-item';
    
    const link = document.createElement('a');
    link.href = item.href || '#';
    link.textContent = item.label;
    link.className = 'navbar-link';
    li.appendChild(link);
    
    // Add dropdown if item has children
    if (item.children && item.children.length > 0) {
      const dropdown = this.createDropdown(item.children);
      li.appendChild(dropdown);
      
      // Add dropdown toggle functionality
      this.addDropdownToggle(li, link, dropdown);
    }
    
    return li;
  }

  createDropdown(children) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    
    const list = document.createElement('ul');
    list.className = 'dropdown-list';
    
    children.forEach(child => {
      const item = document.createElement('li');
      item.className = 'dropdown-item';
      
      const link = document.createElement('a');
      link.href = child.href || '#';
      link.textContent = child.label;
      link.className = 'dropdown-link';
      item.appendChild(link);
      
      list.appendChild(item);
    });
    
    dropdown.appendChild(list);
    return dropdown;
  }

  addDropdownToggle(container, trigger, dropdown) {
    let hoverTimeout;
    
    // Desktop hover events
    container.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        clearTimeout(hoverTimeout);
        this.showDropdown(dropdown, trigger);
      }
    });
    
    container.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) {
        hoverTimeout = setTimeout(() => {
          this.hideDropdown(dropdown);
        }, 150);
      }
    });
    
    // Click events for touch devices
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        this.toggleDropdown(dropdown);
      }
    });
  }

  showDropdown(dropdown, trigger) {
    this.hideAllDropdowns();
    this.activeDropdown = dropdown;
    
    dropdown.classList.add('active');
    
    // Position dropdown
    this.positionDropdown(dropdown, trigger);
  }

  hideDropdown(dropdown) {
    dropdown.classList.remove('active');
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(dropdown) {
    if (dropdown.classList.contains('active')) {
      this.hideDropdown(dropdown);
    } else {
      this.showDropdown(dropdown, dropdown.previousElementSibling);
    }
  }

  hideAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      this.hideDropdown(dropdown);
    });
  }

  positionDropdown(dropdown, trigger) {
    const rect = trigger.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Reset positioning
    dropdown.style.left = '0';
    dropdown.style.right = 'auto';
    dropdown.style.top = '100%';
    dropdown.style.bottom = 'auto';
    
    // Check if dropdown goes off right edge
    if (rect.left + dropdownRect.width > viewportWidth - 20) {
      dropdown.style.left = 'auto';
      dropdown.style.right = '0';
    }
    
    // Check if dropdown goes off bottom edge
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < dropdownRect.height + 20 && spaceAbove > spaceBelow) {
        dropdown.style.top = 'auto';
        dropdown.style.bottom = '100%';
    }
  }

  buildMobileMenu() {
    const mobileContainer = document.querySelector('.navbar-mobile-list');
    if (!mobileContainer || !this.menuData) return;

    mobileContainer.innerHTML = '';
    
    this.menuData.items.forEach(item => {
      const menuItem = this.createMobileMenuItem(item);
      mobileContainer.appendChild(menuItem);
    });
  }

  createMobileMenuItem(item) {
    const li = document.createElement('li');
    li.className = 'navbar-mobile-item';
    
    const link = document.createElement('a');
    link.href = item.href || '#';
    link.textContent = item.label;
    link.className = 'navbar-mobile-link';
    li.appendChild(link);
    
    // Add mobile dropdown if item has children
    if (item.children && item.children.length > 0) {
      const dropdown = this.createMobileDropdown(item.children);
        li.appendChild(dropdown);
        
      // Add mobile dropdown toggle
      this.addMobileDropdownToggle(li, link, dropdown);
    }
    
    return li;
  }

  createMobileDropdown(children) {
    const dropdown = document.createElement('div');
    dropdown.className = 'mobile-dropdown';
    
    const list = document.createElement('ul');
    list.className = 'mobile-dropdown-list';
    
    children.forEach(child => {
      const item = document.createElement('li');
      item.className = 'mobile-dropdown-item';
      
      const link = document.createElement('a');
      link.href = child.href || '#';
      link.textContent = child.label;
      link.className = 'mobile-dropdown-link';
      item.appendChild(link);
      
      list.appendChild(item);
    });
    
    dropdown.appendChild(list);
    return dropdown;
  }

  addMobileDropdownToggle(container, trigger, dropdown) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  }

  setupEventListeners() {
    // Mobile menu toggle
    const toggleBtn = document.querySelector('.navbar-toggle');
    const mobileOverlay = document.querySelector('.navbar-mobile-overlay');
    const closeBtn = document.querySelector('.navbar-mobile-close');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
          this.closeMobileMenu();
      }
    });
  }

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
      if (this.activeDropdown && !e.target.closest('.navbar-item')) {
        this.hideAllDropdowns();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        this.hideAllDropdowns();
        this.closeMobileMenu();
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAllDropdowns();
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const toggleBtn = document.querySelector('.navbar-toggle');
    const mobileOverlay = document.querySelector('.navbar-mobile-overlay');
    
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    if (this.mobileMenuOpen) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      mobileOverlay.classList.add('active');
      mobileOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      } else {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    const toggleBtn = document.querySelector('.navbar-toggle');
    const mobileOverlay = document.querySelector('.navbar-mobile-overlay');
    
    this.mobileMenuOpen = false;
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ModernNavbar();
  });
  } else {
  new ModernNavbar();
  }

// Export for potential external use
window.ModernNavbar = ModernNavbar;
