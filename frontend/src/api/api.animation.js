export const blink_err = (e) => {
  return new Promise((resolve) => {
    e.$el.style = 'background:#F00;' +
      'transition-property:background;' +
      'transition-duration:0.6s;';
    setTimeout(() => {
      e.$el.style = '';
      resolve();
    }, 1000);
  });
};

export const blink_good = (e) => {
  return new Promise((resolve) => {
    e.$el.style = 'background:#0275d8;' +
      'transition-property:background;' +
      'transition-duration:0.6s;';
    setTimeout(() => {
      e.$el.style = '';
      resolve();
    }, 1000);
  });
};
