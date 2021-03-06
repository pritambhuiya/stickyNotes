const fs = require('fs');

const random = (within) => Math.floor(Math.random() * within);

const randomElementFrom = (array) => array[random(array.length)];

const generateTag = ({ tag, contents, tagClass = '' }) => {
  const classes = tagClass === '' ? '' : ' class="' + tagClass + '"';
  const tagWithAttributes = '<' + tag + classes + '>';

  return tagWithAttributes + contents + '</' + tag + '>';
};

const generatePin = () =>
  generateTag({ tag: 'p', contents: '๐', tagClass: 'pin' });

const getName = (names) => randomElementFrom(names);

const getAdverb = (adverbs) => randomElementFrom(adverbs);

const getAction = (actions) => randomElementFrom(actions);

const getObject = (objects) => randomElementFrom(objects);

const getEmoji = (emojis) => randomElementFrom(emojis);

const generateNote = ({ names, adverbs, actions, objects, emojis }) => {
  const name = getName(names);
  const adverb = getAdverb(adverbs);
  const action = getAction(actions);
  const object = getObject(objects);

  const emoji = getEmoji(emojis);
  const emojiTag = generateTag({ tag: 'span', contents: emoji, tagClass: 'emoji' });

  return [name, adverb, action, object].join(' ') + '.' + emojiTag;
};

const generateStickyContent = () => {
  const contents = {
    names: ['Abin', 'Ashritha', 'Azhar', 'Barnali', 'Chhavi', 'Dileep'],
    adverbs: ['often', 'always', 'frequently', 'sometimes', 'seldom', 'rarely'],
    actions: ['throws', 'eats', 'drinks', 'kicks', 'loves', 'hates'],
    objects: ['laptops', 'mobiles', 'bikes', 'animals', 'birds', 'stones'],
    emojis: ['๐', '๐ฅณ', '๐คญ', '๐ค', '๐คช', '๐', '๐คจ', '๐คซ', '๐', '๐', '๐ค']
  };

  const sentence = generateNote(contents);
  return generateTag({ tag: 'p', contents: sentence, tagClass: 'sentence' });
};

const getColorClass = () => {
  const colorClasses = ['stickyColor1', 'stickyColor2', 'stickyColor3',
    'stickyColor4', 'stickyColor5', 'stickyColor6', 'stickyColor7',
    'stickyColor8', 'stickyColor9'];

  return randomElementFrom(colorClasses);
};

const getAngleClass = () => {
  const anglesClasses = ['R0', 'R10', 'R20', 'R30', 'R40',
    'R-10', 'R-20', 'R-30', 'R-40'];

  return randomElementFrom(anglesClasses);
};

const sticky = () => {
  const stickyContents = generatePin() + generateStickyContent();

  const colorClass = getColorClass();
  const angleClass = getAngleClass();

  const tagClasses = ['sticky', colorClass, angleClass].join(' ');
  return generateTag({ tag: 'div', contents: stickyContents, tagClass: tagClasses });
};

const allStickies = (numberOfStickies) => {
  let stickies = '';

  Array(numberOfStickies).fill(1).forEach(() => {
    stickies += sticky();
  });

  return stickies;
};

const stickyContainer = (numberOfStickies) => {
  const stickies = allStickies(numberOfStickies);
  const colorClasses = ['containerColor1', 'containerColor2', 'containerColor3'];
  const colorClass = randomElementFrom(colorClasses);

  return generateTag({ tag: 'div', contents: stickies, tagClass: 'container ' + colorClass });
};

const generateHtml = (numberOfStickies) => {
  const title = generateTag({ tag: 'title', contents: 'Sticky' });
  const link = '<link rel="stylesheet" href="style.css">';
  const head = generateTag({ tag: 'head', contents: title + link });

  const bodeContents = stickyContainer(numberOfStickies);
  const body = generateTag({ tag: 'body', contents: bodeContents });
  const html = generateTag({ tag: 'html', contents: head + body });

  fs.writeFileSync('sticky.html', html, 'utf8');
};

generateHtml(24);
