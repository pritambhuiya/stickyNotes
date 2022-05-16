/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
const fs = require('fs');

const random = (within) => Math.floor(Math.random() * within);

const colorCode = () => [random(256), random(256), random(256)].join(',');

const colorPicker = () => 'rgb(' + colorCode() + ');';

const generateStyle = (styleContents) => ' style = "' + styleContents + '"';

const generateTag = (tag, contents, style = '') =>
  '<' + tag + style + '>' + contents + '</' + tag.split(' ')[0] + '>';

const rotationAngle = (maxAngle) => {
  const angle = random(maxAngle);
  return angle > 50 ? -(100 - angle) : angle;
};

const generatePin = () => {
  const pinStyle = 'text-align: center;';
  return generateTag('p', '📌', generateStyle(pinStyle));
};

const getInfo = (words, index) => words[index];

const generateNote = ({ names, adverbs, actions, toWhats, emojis }) => {
  const name = getInfo(names, random(names.length));
  const adverb = getInfo(adverbs, random(adverbs.length));
  const action = getInfo(actions, random(actions.length));
  const toWhat = getInfo(toWhats, random(toWhats.length));
  const emoji = getInfo(emojis, random(emojis.length));

  return name + ' ' + adverb + ' ' + action + ' ' + toWhat + ' ' + emoji + '.';
};

const generateStickyContent = () => {
  const contents = {
    names: ['Abin', 'Ashritha', 'Azhar', 'Barnali', 'Chhavi', 'Dileep'],
    adverbs: ['often', 'always', 'frequently', 'sometimes', 'seldom', 'rarely'],
    actions: ['throws', 'eats', 'drinks', 'kicks', 'loves', 'hates'],
    toWhats: ['laptops', 'mobiles', 'bikes', 'animals', 'birds', 'stones'],
    emojis: ['😂', '🥳', '🤭', '🤔', '🤪', '😉', '🤨', '🤫', '😇', '😎', '🤓']
  };

  const sentence = generateNote(contents);
  const noteStyle = 'padding-left: 0.3em;font-style: italic;';

  return generateTag('p', sentence, generateStyle(noteStyle));
};

const sticky = () => {
  const stickyContents = generatePin(100) + generateStickyContent();
  const stickyStyle = 'width: 19%; height: 21%; border-radius: 5%; transform: rotate(' + rotationAngle(100) + 'deg);background-color:' + colorPicker();

  return generateTag('div', stickyContents, generateStyle(stickyStyle));
};

const allStickies = (numberOfStickies) => {
  let stickies = '';

  Array(numberOfStickies).fill(1).forEach(() => {
    stickies += sticky();
  });

  return stickies;
};

const stickyContainer = (stickies) => {
  const containerStyle = 'width: 1200px;height: 900px;font-size: 1.5em;display: flex;flex-wrap: wrap;align-content: flex-start;gap: 0.5em;border: 1.5em solid grey;border-radius: 2em;padding: 0.2%;margin: 0 auto;background-color:' + colorPicker();

  return generateTag('div', stickies, generateStyle(containerStyle));
};

const generatePage = (container) =>
  generateTag('html', generateTag('body', container));

const main = (numberOfStickies) => {
  const stickies = allStickies(numberOfStickies);
  const container = stickyContainer(stickies);
  const pageContents = generatePage(container);

  fs.writeFileSync('sticky.html', pageContents, 'utf8');
};

main(24);
