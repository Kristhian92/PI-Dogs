import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; //https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17

import DogCreate from '../components/DogCreate';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

describe('<DogCreate />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<Provider><DogCreate/></Provider>);
        })
        it('Renderiza un <form>', () => {
            expect(wrapper.find('form')).toHaveLength(1)
        })

        it('Renderiza un label con el texto igual a "Name: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(0).text()).toEqual('Name: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "name"', () => {
            expect(wrapper.find('input[name="name"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Minimum height: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(1).text()).toEqual('Description');
        })

        it('Renderiza un input con la propiedad "name" igual a "heightMin"', () => {
            expect(wrapper.find('input[name="heightMin"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Maximum height: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(3).text()).toEqual('Maximum height: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "heightMax"', () => {
            expect(wrapper.find('input[name="heightMax"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Minimum weight: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(5).text()).toEqual('Minimum weight: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "weightMin"', () => {
            expect(wrapper.find('input[name="weightMin"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Maximum weight: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(7).text()).toEqual('Maximum weight: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "weightMax"', () => {
            expect(wrapper.find('input[name="weightMax"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Expected life span: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(9).text()).toEqual('Expected life span: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "life_span"', () => {
            expect(wrapper.find('input[name="life_span"]')).toHaveLength(1);
        })

        it('Renderiza un label con el texto igual a "Image: "', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(11).text()).toEqual('Image: ');
        })

        it('Renderiza un input con la propiedad "name" igual a "image"', () => {
            expect(wrapper.find('input[name="image"]')).toHaveLength(1);
        })

        it('Renderiza un select', () => {
            expect(wrapper.find('select')).toHaveLength(1)
        })

        it('Renderiza un boton con el "type" "submit"', () => {
            expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
        })
    })

    



});