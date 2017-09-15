export const num = () => {//{{{
  const min = 0.0000;
  const max = 1.9000;
  return Math.random() * (max - min) + min;
};//}}}

export const token = (len) => {//{{{
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < len; ++i) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};//}}}

export const get_tags = (text) => { //{{{
  const tags = [];
  const txt = text.trim().split('');
  let reg_tag = false;
  let cur_tag = '';

  for (let i = 0; i < txt.length; i++) {
    if (reg_tag && txt[i] === '#') {
      tags.push(cur_tag);
      cur_tag = '';
    }

    if (!reg_tag && txt[i] === '#') {
      reg_tag = true;
    }

    if (reg_tag && txt[i] === ' ') {
      if (cur_tag !== '#') {
        tags.push(cur_tag);
      }
      reg_tag = false;
      cur_tag = '';
      continue;
    }

    if (reg_tag) {
      cur_tag = cur_tag + txt[i];
    }
  }
  tags.push(cur_tag);
  return tags;
};//}}}
