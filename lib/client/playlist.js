'use strict';

function compare(a, b) {
  return a.position - b.position;
}

function reverseCompare(a, b) {
  return b.position - a.position;
}

function move(state, origin, target) {
  /* shifts elements at and above target to the right then moves origin there */
  if (origin < 0 || origin >= state.videos.length
    || target < 0 || target >= state.videos.length) {
      // TODO: replace errors
      let error = new Error('index out of range');
      return error;
  }

  let videos = state.videos.slice();
  let currentVideo = state.currentVideo;

  if (origin === target)
    return {};

  if (target < origin) {
    videos.splice(target, 0, videos[origin]);
    videos.splice(origin + 1, 1);
  } else {
    videos.splice(target + 1, 0, videos[origin]);
    videos.splice(origin, 1);
  }

  if (origin === currentVideo) {
    currentVideo = target;
  } else if (origin < currentVideo && target > currentVideo) {
    currentVideo--;
  } else if (origin > currentVideo && target < currentVideo){
    currentVideo++;
  }

  return {videos: videos, currentVideo: currentVideo}
}

function remove(state, index) {
  if (index < 0 || index >= state.videos.length) {
    // TODO: replace errors
    let error = new Error('index out of range');
    return error;
  }

  if (state.videos.length == 1)
    return {videos: [], currentVideo: undefined};

  // adjust current video
  let videos = state.videos.slice();
  let currentVideo = state.currentVideo;
  if (currentVideo < index) {
    currentVideo--;
  } else if (index === videos.length - 1 && currentVideo == index) {
    currentVideo--;
  }

  videos.splice(index, 1);

  return {videos: videos, currentVideo: currentVideo};
}

function insert(state, video, index) {
  if (index < 0 || index > state.videos.length) {
    // TODO: replace errors
    let error = new Error('index out of range');
    return error;
  }
  let videos = state.videos.slice();
  if (index <= state.currentVideo)
    state.currentVideo++;
  videos.splice(index, 0, video);
  return {videos: videos};
}

function sort(state) {
  if (state.order === 'ordered' || state.currentVideo === undefined)
    return { order: 'sorted' };
  let sortedVideos;
  if (state.currentVideo === 0) {
    sortedVideos = state.videos.slice();
    sortedVideos.sort(compare);
  } else {
    let unsortedVideos = state.videos.slice(0, state.currentVideo + 1);
    sortedVideos = state.videos.slice(state.currentVideo + 1);
    sortedVideos.sort(compare);
    sortedVideos = unsortedVideos.concat(sortedVideos);
  }
  return {
    order: 'sorted',
    videos: sortedVideos
  };
}

function reverse(state) {
  if (state.order === 'reversed' || state.currentVideo === undefined)
    return { order: 'reversed' };
  let sortedVideos;
  if (state.currentVideo === 0) {
    sortedVideos = state.videos.slice();
    sortedVideos.sort(reverseCompare);
  } else {
    let unsortedVideos = state.videos.slice(0, state.currentVideo + 1);
    sortedVideos = state.videos.slice(state.currentVideo + 1);
    sortedVideos.sort(reverseCompare);
    sortedVideos = unsortedVideos.concat(sortedVideos);
  }
  return {
    order: 'reversed',
    videos: sortedVideos
  };
}

function shuffle(state) {
  if (state.currentVideo === undefined)
    return { order: 'shuffled' };

  let offset = state.currentVideo;
  if (offset > 0)
    offset++;

  let videos = state.videos.slice();
  for(let i = videos.length - 1; i > offset; i--) {
    let range = i - offset - 1;
    let j = Math.floor(Math.random()*range) + offset;
    [videos[i], videos[j]] = [videos[j], videos[i]];
  }
  return { order: 'shuffled', videos: videos };
}

function load(state, videos, id) {
  // TODO: validate input
  let newState = {
    id: id,
    videos: videos.slice(),
    currentVideo: videos.length > 0 ? 0 : undefined
  }

  if (state.order === 'shuffled')
    Object.assign(newState, shuffle(newState));
  else if (state.order === 'reversed')
    Object.assign(newState, reverse(newState));

  return newState;
}

function skipForward(state) {
  if (state.videos.length === 0 || state.currentVideo === state.videos.length - 1)
    return {}
  return {currentVideo: state.currentVideo + 1};
}

function skipBack(state) {
  if (state.videos.length === 0 || state.currentVideo === 0)
    return {};
  return {currentVideo: state.currentVideo - 1};
}

function selectVideo(state, index) {
  if (index < 0 || index >= state.videos.length) {
    let error = new Error('index out of range');
    return error;
  }
  return {currentVideo: index};
}

module.exports = {
  load,
  shuffle,
  sort,
  reverse,
  insert,
  remove,
  move,
  skipForward,
  skipBack,
  selectVideo,
}
