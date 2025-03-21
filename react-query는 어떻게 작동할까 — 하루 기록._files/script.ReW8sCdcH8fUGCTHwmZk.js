/* TistoryToolbar, TistoryTooltipLayer */
$(document).ready(function() {
  /*
   * Tistory Layer Tooltip
   */
  // Set 'Tistory Layer Tooltip'
  var messages = {
    Request: H.skinOptions.messageRequest,
    Unheart: H.skinOptions.messageUnheart,
    Heart: H.skinOptions.messageHeart,
    Unsubscribe: H.skinOptions.messageUnsubscribe,
    Subscribe: H.skinOptions.messageSubscribe,
    Url: H.skinOptions.messageUrl
  };
  h.setTooltipMessages(messages, $('.article.content__permalink').length > 0);
  /*
   * TistoryToolbar
   */
  // Init 'TistoryToolbar'

  h.initTistoryToolbar('#sidebar__tistory', '#nav__s2');
});

/* Loader */
$(window).on('load', function() {
  // 'Loader' Out
  $('#__loader').fadeOut(500);
});

/* Navigation */
$(document).ready(function() {
  // Set 'Sidebar' Toogle
  h.setSidebarToggleButton('#__nav > #nav__s1 > .profile', '#__sidebar', '#sidebar__mask', 250); // Copy Post headings to '#nav__metainfo'

  h.copyHeadingToNavigation('.content__permalink > header > .heading > *:not(.metainfo)', '#__nav > #nav__metainfo');
});

/* Permalink */
$(document).ready(function() {
  /*
   * Article
   */
  // Set Styled Heading
  h.setStyledHeading('.content__permalink', 'header > .img', H.skinOptions.articleMode, {
    controllable: true,
    modeHandsControlElement: '.content__permalink .contents_style > div.h[data-mode]'
  }); // Media contents alignment

  h.setAlignImageCenter({
    imageSlideBlock: true,
    imageBlock: true,
    imageGridBlock: true
  }); // Add 'a' tag into headings

  h.setAnchorHeadings('.content__permalink .contents_style', '> h2, > h3, > h4');
  /*
   * Highlight.js
   */
  // set Highlight.js Theme

  h.setHljsTheme(H.skinOptions.hljsThemeLight, H.skinOptions.hljsThemeDark); // init Highlight.js

  hljs.initHighlighting();
  /*
   * Post Buttons (tistoryEtcLayer, tistorySnsLayer, Comment)
   */
  // Comment

  h.setCommentToggleButton('.permalink__comment'); // init TistoryLayer

  h.initTistoryLayer('.content__permalink .permalink__btn');
  /*
   * Tag
   */
  // Remove ',' text in Tags

  $('.permalink__tags').contents().filter(function() {
    return this.nodeType === 3;
  }).remove();
  /*
   * Scrollspy
   */
  // Set 'Scrollspy'

  h.setScrollspy({
    context: '.content__permalink .contents_style',
    spy: '#__spy ul',
    headings: '> h2, > h3'
  });
});

/* Notification */
$(document).ready(function() {
  // Set timer for 'Notification'
  setTimeout(function() {
    h.setNotification('#next', '.thumbnail', 'bottom-right', 15000);
    h.setNotification('#prev', '.thumbnail', 'bottom-left', 15000);
  }, 3000);
});

/* Notice */
$(document).ready(function() {
  // Remove list element when 'Notice' permalink page
  $('#tt-body-page #__notice > .__list[data-mode]').remove();
});

/* List */
$(document).ready(function() {
  // Set Styled Heading
  h.setStyledHeading('.main__list', 'header > .img', H.skinOptions.listImageMode, {
    attr: 'data-image-mode'
  }); // List Style - Grid, Gallery

  h.setListCount('.__list.main__list > ul', {
    grid: H.skinOptions.gridColumnCount,
    gallery: H.skinOptions.galleryColumnCount
  }); // Set List Title

  h.setListTitle('.__list > .list__header .title', T.config.BLOG.title);
});

/* Footer */
$(document).ready(function() {
  // Switch skin theme
  $('#__theme-btn').click(function() {
    // set Skin Theme
    h.switchSkinTheme(); // Set highlight.js Theme

    h.setHljsTheme(H.skinOptions.hljsThemeLight, H.skinOptions.hljsThemeDark);
  });
});

/* Scoll Indicator */
$(document).ready(function() {
  // Set 'Scroll Indicator'
  $(window).on('scroll', function() {
    return h.setScrollIndicator('#scroll-indicator .progress-bar');
  });
});

