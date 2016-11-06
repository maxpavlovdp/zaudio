/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import CarSimulator from 'components/CarSimulator';

describe('CarSimulatorComponent', () => {
    let CarSimulatorComponent;

    beforeEach(() => {
        CarSimulatorComponent = createComponent(CarSimulator);
    });

    it('should have its component name as default className', () => {
        expect(CarSimulatorComponent.props.className).to.equal('car');
    });
});