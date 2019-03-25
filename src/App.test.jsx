// import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'; // , { shallow, mount }
// import TextArea from './components/editor/TextArea';

Enzyme.configure({ adapter: new Adapter() });

describe('Textarea', () => {
  test('renders', () => {
    // const wrapper = shallow(<TextArea />);
    // expect(wrapper.exist()).toBe(true);
  });
});
