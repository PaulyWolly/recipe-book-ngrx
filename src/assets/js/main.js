$(document).ready( () => {
  const header = $('.head');
  const text = $('.text');
  $(window).scroll( () => {
    const scroll = $(window).scrollTop();
    if (scroll >= 30) {
      header.addClass('scrolled');
      text.addClass('text_style');
    } else {
      header.removeClass('scrolled');
      text.removeClass('text_style');
    }
  });
});
