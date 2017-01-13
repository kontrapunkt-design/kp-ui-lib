'use strict';

import foundation from 'foundation';

var foundationPlugins = class {
  constructor(elem) {
    $(document).foundation();
    console.log('load foundation');
  }
}

export default foundationPlugins;
