/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import EduComponent from 'components/zebooster/com/components/EduComponent.js';

describe('EduComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(EduComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('edu-component');
  });

  it('2+2=4', ()=> {
    expect(2 + 2).to.equal(4)
  })
});
