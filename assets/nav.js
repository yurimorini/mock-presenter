(function() {

var
  pages = document.querySelectorAll('.pages__page'),
  select = document.querySelector('.nav__list'),
  prev = document.querySelector('.nav__button--prev'),
  next = document.querySelector('.nav__button--next'),
  bar =  document.querySelector('.nav');

var nav = {
  bar: bar,
  select: select,
  prev: prev,
  next: next,
  title: document.title
};

var ctrl = {
  init: function(pages, nav) {
    this.pages = [].map.call(pages, function(page) { return page; });
    this.tree = this.collect(this.pages);
    this.index = this.readHash();
    this.nav = nav;

    this.hideAll(this.pages);
    this.fillSelect(nav.select, this.tree);
    this.initEvents(nav);
    this.goPage(this.index);
  },

  goNext: function() {
    this.goPage(this.index+1);
  },

  goPrev: function() {
    this.goPage(this.index-1);
  },

  goPage: function(index) {
    index = Math.min(index, this.pages.length - 1);
    index = Math.max(index, 0);

    this.hidePage(this.pages[this.index]);
    this.showPage(this.pages[index]);
    this.index = index;
    this.onPageChange();
  },

  onPageChange: function() {
    this.scrollToTop();
    this.updateSelect(this.nav);
    this.updateTitle(this.nav);
    window.location.hash = this.index;
  },

  hideAll: function(pages) {
    var self = this;
    pages.forEach(function(page) {
      self.hidePage(page);
    });
  },

  hidePage: function(page) {
    if (page && page.style)
      page.style.display = 'none';
  },

  showPage: function(page) {
    if (page && page.style)
      page.style.display = '';
  },

  fillSelect: function(select, data) {
    data.forEach(function(item) {
      var len = select.options.length,
        opt = new Option(item.name, item.index);
      select.options[len] = opt;
    });
  },

  readHash: function() {
    var guessed = window.location.hash.substr(1);
    return parseInt(guessed, 10) || 0;
  },

  collect: function(pages) {
    return pages.map(function(page, index) {
      return {
        page: page,
        index: index,
        name: page.dataset.name };
    });
  },

  scrollToTop: function() {
    window.scrollTo(0, 0);
  },

  updateSelect: function(nav) {
    nav.select.selectedIndex = this.index;
  },

  updateTitle: function(nav) {
    var option = nav.select.options[this.nav.select.selectedIndex];
    document.title = [nav.title, option.text]
      .filter(function(e) { return String(e).trim(); })
      .join(" - ");
  },

  initEvents: function(nav) {
    var self = this;

    nav.next.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.goNext();
    }, false);

    nav.prev.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.goPrev();
    }, false);

    nav.select.addEventListener('change', function(e) {
      e.preventDefault();
      var option = nav.select[nav.select.selectedIndex];
      self.goPage(option.value);
    }, false);

    window.addEventListener("hashchange", function() {
      self.goPage(self.readHash());
    }, false);

    window.addEventListener("click", function() {
      var cls = 'highlight';
      nav.bar.classList.add(cls);
      setTimeout(function() {
        nav.bar.classList.remove(cls);
      }, 1000);
    }, false);

    document.addEventListener('keyup', function(e){
      if (e.keyCode == 37) self.goPrev();
      if (e.keyCode == 39) self.goNext();
    }, true)
  }
};

ctrl.init(pages, nav);

})();
